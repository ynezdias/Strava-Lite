from flask import request
from flask_restful import Resource
from sqlalchemy import func, text
from extensions import db, cache
from models import Run
from auth import token_required

class UserAnalytics(Resource):
    @token_required
    @cache.cached(timeout=60, query_string=True)
    def get(self, current_user, user_id):
        """
        Get analytics and PB for a user
        ---
        tags:
          - Analytics
        parameters:
          - in: path
            name: user_id
            required: true
            type: string
        responses:
          200:
            description: Analytics Payload (Pace, PB, 7-day-rolling)
        """
        if str(current_user.id) != user_id:
            return {"message": "Unauthorized"}, 403
            
        # 1. Average Pace (seconds per distance unit)
        avg_pace_query = db.session.query(
            func.sum(Run.duration) / func.sum(Run.distance)
        ).filter(Run.user_id == current_user.id, Run.distance > 0).scalar()
        
        # 2. Personal Bests (Max Distance, Min Duration)
        pb_query = db.session.query(
            func.max(Run.distance).label('max_distance'),
            func.min(Run.duration).label('min_duration')
        ).filter(Run.user_id == current_user.id).first()
        
        # 3. Rolling 7-day activity totals using window functions (SQL)
        sql = text("""
            SELECT 
                date,
                distance,
                SUM(distance) OVER (
                    PARTITION BY user_id
                    ORDER BY date 
                    RANGE BETWEEN INTERVAL '7 days' PRECEDING AND CURRENT ROW
                ) as rolling_7_day_distance
            FROM runs WHERE user_id = :user_id
            ORDER BY date DESC
            LIMIT 30;
        """)
        result = db.session.execute(sql, {"user_id": current_user.id})
        rolling_data = [
            {
                "date": row[0].isoformat() if hasattr(row[0], 'isoformat') else str(row[0]), 
                "distance": float(row[1]), 
                "rolling_7_day_distance": float(row[2]) if row[2] else 0.0
            }
            for row in result
        ]

        return {
            "average_pace_sec_per_unit": float(avg_pace_query) if avg_pace_query else 0,
            "personal_best": {
                "max_distance": float(pb_query.max_distance) if pb_query.max_distance else 0,
                "min_duration": float(pb_query.min_duration) if pb_query.min_duration else 0
            },
            "rolling_7_day_totals": rolling_data
        }, 200

class Leaderboard(Resource):
    @cache.cached(timeout=300)
    def get(self):
        """
        Global Leaderboard
        ---
        tags:
          - Analytics
        responses:
          200:
            description: Top runners by distance
        """
        # Global leaderboard for total distance across all users
        leaders = db.session.query(
            Run.user_id,
            func.sum(Run.distance).label('total_distance')
        ).group_by(Run.user_id).order_by(func.sum(Run.distance).desc()).limit(10).all()
        
        return [{
            "user_id": str(r.user_id),
            "total_distance": float(r.total_distance)
        } for r in leaders], 200
