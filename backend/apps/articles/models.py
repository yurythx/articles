from django.db import models
from django_resized import ResizedImageField
from apps.core.models import BaseUUIDModel, SlugMixin

class Category(BaseUUIDModel, SlugMixin):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Tag(BaseUUIDModel, SlugMixin):
    name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name

class Article(BaseUUIDModel, SlugMixin):
    title = models.CharField(max_length=255)
    content = models.TextField()
    category = models.ForeignKey(Category, related_name='articles', on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, related_name='articles', blank=True)
    author = models.ForeignKey('accounts.CustomUser', related_name='articles', on_delete=models.SET_NULL, null=True)
    banner = ResizedImageField(
        size=[1200, 630],
        quality=85,
        upload_to='articles/banners/',
        force_format='WEBP',
        blank=True, 
        null=True
    )
    is_published = models.BooleanField(default=False)

    def __str__(self):
        return self.title
