from django.urls import path
from .views import RegisterUserView, VerifyUserEmail, LoginUserView,\
      TestAuthenticationView, PasswordResetRequestView, PasswordResetConfirm,\
        SetNewPassword, LogoutUserView


urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('verified/', VerifyUserEmail.as_view(), name='verified'),
    path('login/', LoginUserView.as_view(), name='login'),
    path('profile/', TestAuthenticationView.as_view(), name='granted'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password-reset'),
    path('password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirm.as_view(), name='password-reset-confirm'),
    path('set-new-password/', SetNewPassword.as_view(), name='set-new-password'),
    path('logout/', LogoutUserView.as_view(), name='logout')
]