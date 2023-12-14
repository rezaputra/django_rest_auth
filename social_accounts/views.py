from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import GoogleSignSerializer
# Create your views here.


class GoogleSignInView(GenericAPIView):
    serializer_class = GoogleSignSerializer

    def post(self, requests):
        serializer = self.serializer_class(data=requests.data)
        serializer.is_valid(raise_exception=True)
        data = ((serializer.validated_data)['access_token'])
        
        return Response(data, status=status.HTTP_200_OK)
