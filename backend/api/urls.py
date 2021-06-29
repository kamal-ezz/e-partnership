
from .views import ActivityViewSet, ArticleViewSet, ConventionViewSet, IntervenantViewSet, ConventionsWithMeIncluded
from django.db import router
from django.urls import path
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register('conventions', ConventionViewSet, basename='conventions')
router.register('articles', ArticleViewSet, basename='articles')
router.register('intervenants', IntervenantViewSet, basename='intervenants')
router.register('activities', ActivityViewSet, basename='activities')

urlpatterns = [ 
    path('conventions/me', ConventionsWithMeIncluded.as_view(), name='conventionsWithMeIncluded')
]

urlpatterns += router.urls