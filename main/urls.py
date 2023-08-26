from django.urls import path, include
from . import views
from .views import SignUpAPI, SignInAPI, MainUser
from knox import views as knox_views

urlpatterns = [
    path('', views.apiOverview, name='apiOverview'),
    path('task-list/',
         views.taskList.as_view({'get': 'list'}), name='taskList'),
    path('task-detail/<str:pk>/', views.taskDetail, name='taskDetail'),
    # path('task-create/', views.taskCreate, name='taskCreate'),
    path('task-create/', views.taskCreateView.as_view(), name='taskCreate'),
    path('task-update/<str:pk>/', views.taskUpdate, name='taskUpdate'),
    path('task-delete/<str:pk>/', views.taskDelete, name='taskDelete'),
    path('api/auth/', include('knox.urls')),
    path('api/auth/register', SignUpAPI.as_view()),
    path('api/auth/login', SignInAPI.as_view()),
    path('api/auth/user', MainUser.as_view()),
    path('api/auth/logout',knox_views.LogoutView.as_view(), name="knox-logout"),
]
