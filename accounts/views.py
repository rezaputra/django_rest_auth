from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegisterSerializer
from .utils import sent_code_to_user
# Create your views here.


class RegisterUserView(GenericAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request):
        user_data = request.data
        serializer = self.serializer_class(data=user_data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user = serializer.data
            sent_code_to_user(user['email'])
            return Response({
                'data': user,
                'message': f'Hi, Thanks for signing up a passcode' 
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


