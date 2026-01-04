from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import ArticleViewSet, CategoryViewSet, TagViewSet, UploadImageView

router = DefaultRouter()
router.register(r'posts', ArticleViewSet, basename='articles')
router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'tags', TagViewSet, basename='tags')

urlpatterns = [
    path('', include(router.urls)),
    path('uploads/', UploadImageView.as_view(), name='article_upload'),
]
