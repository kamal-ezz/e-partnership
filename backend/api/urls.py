from .views import ActivityViewSet, ArticleViewSet, ConventionViewSet, ConventionsList, IntervenantViewSet, ConventionsWithMeIncluded, UploadSignature
from django.db import router
from django.urls import path
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register('conventions', ConventionViewSet, basename='conventions')
router.register('articles', ArticleViewSet, basename='articles')
router.register('intervenants', IntervenantViewSet, basename='intervenants')
router.register('activities', ActivityViewSet, basename='activities')

urlpatterns = [ 
    path('conventions/me', ConventionsWithMeIncluded.as_view(), name='conventionsWithMeIncluded'),
    path('upload/signature', UploadSignature.as_view(), name='uploadSignature'),
    path('search', ConventionsList.as_view(), name='conventionsList'),
]

urlpatterns += router.urls