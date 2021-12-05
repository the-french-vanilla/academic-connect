import json

from rest_framework import views
from rest_framework.response import Response

class TrendingNews(views.APIView):
    """
    TrendingNews.
    GET /core/trendingnews
    """
    def get(self, request, format=None):
        response = {
            "test": "test"
        }
        response_str = json.dumps(response)
        response_json = json.loads(response_str)
        return Response(response_json)
