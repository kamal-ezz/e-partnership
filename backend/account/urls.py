from django.urls import path, include
import rest_framework
#from .views import ObtainAuthTokenView, ProfileViewSet, UserViewSet, registration_view
from rest_framework.routers import SimpleRouter

""" router = SimpleRouter()
router.register('profiles', ProfileViewSet, basename='profiles')
router.register('users', UserViewSet, basename='users')
 """

urlpatterns = [
    #path('register', registration_view,name="register"),
    #path('login', ObtainAuthTokenView.as_view(), name="login"), 
    path('', include('djoser.urls')),
    path('', include('djoser.urls.authtoken')),
]

#urlpatterns += router.urls
