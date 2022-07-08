from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name='apiOverview'),
    path('task-list/',
         views.taskList.as_view({'get': 'list'}), name='taskList'),
    path('task-detail/<str:pk>/', views.taskDetail, name='taskDetail'),
    # path('task-create/', views.taskCreate, name='taskCreate'),
    path('task-create/', views.taskCreateView.as_view(), name='taskCreate'),
    path('task-update/<str:pk>/', views.taskUpdate, name='taskUpdate'),
    path('task-delete/<str:pk>/', views.taskDelete, name='taskDelete'),
]
