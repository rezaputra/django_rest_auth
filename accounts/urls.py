from django.urls import path
from .views import RegisterUserView, VerifyUserEmail, LoginUserView, TestAuthenticationView


urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('verified/', VerifyUserEmail.as_view(), name='verified'),
    path('login/', LoginUserView.as_view(), name='login'),
    path('profile/', TestAuthenticationView.as_view(), name='granted')
]