from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),
    path('jobs', views.getJobs),
    path('jobs-all', views.getJobsAll),
    path('questions', views.getQuestions),
    path('create-job', views.createJob),
    path('get-score', views.getScore),

    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.registerUser , name='registerUser'),
]