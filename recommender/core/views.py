import json
import requests

from functools import total_ordering

from rest_framework import views
from rest_framework.response import Response

@total_ordering
class UserProfile:
    def __init__(self, id, username, mutual_connections, institutions, about, headline):
        self.id = id
        self.username = username
        self.mutual_connections = mutual_connections
        self.institutions = institutions
        self.about = about
        self.headline = headline
        self.same_institution = False
        self.about_similarity = 0
        self.headline_similarity = 0

    def __lt__(self, other):
        # mutual_connections
        # same_institution?
        # about_similarity + headline_similarity
        # return ((self.mutual_connections) < (other.mutual_connections))
        return self.mutual_connections > other.mutual_connections

    # def myfunc(self):
    #     print("Hello my name is " + self.name)


class Recommendations(views.APIView):
    """
    Recommendations.
    GET /core/recommendations
    """
    def get(self, request, format=None):
        username = self.request.query_params.get('username', None)
        token = self.request.query_params.get('token', None)

        currentUserProfile = requests.request(method='get', url='http://localhost:8081/api/profile/' + username,
            headers={'Authorization': token})

        userProfiles = requests.request(method='get', url='http://localhost:8081/api/profile/otherprofiles/' + username,
            headers={'Authorization': token})

        user_profiles = []
        for user_profile in userProfiles.json():
            user_profiles.append(UserProfile(user_profile['user']['id'], 
                user_profile['user']['username'], user_profile['numMutualConnections'], 
                user_profile['institutions'], user_profile['about'],
                user_profile['headline']))

        # for user_profile in user_profiles:
        #     # same_institution?
        #     # calculate about_similarity
        #     # calculate headline_similarity
        #     pass

        user_profiles.sort()

        user_profiles = user_profiles[:5]

        ids = []
        for user_profile in user_profiles:
            ids.append(user_profile.id)

        # ids2 = []
        # for user_profile in user_profiles:
        #     ids2.append(user_profile.id)
        
        # response = {
        #     "content": ids,
        #     "content2": ids2,
        # }

        response = {
            "currentUserProfile": currentUserProfile.json(),
            "userProfiles": userProfiles.json(),
            "ids": ids,
        }

        # response = {
        #     "username": username
        # }
        response_str = json.dumps(response)
        response_json = json.loads(response_str)
        return Response(response_json)
