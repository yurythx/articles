import uuid
from django.db import models
from django.utils.text import slugify

class BaseUUIDModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class SlugMixin(models.Model):
    slug = models.SlugField(max_length=255, unique=True, blank=True)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        if not self.slug:
            source = getattr(self, 'name', None) or getattr(self, 'title', None)
            if source:
                slug_candidate = slugify(source)
                unique_slug = slug_candidate
                counter = 1
                
                # Check for collisions excluding current instance
                # We need to access the class of the instance dynamically to check the DB
                ModelClass = self.__class__
                
                while ModelClass.objects.filter(slug=unique_slug).exclude(pk=self.pk).exists():
                    unique_slug = f"{slug_candidate}-{counter}"
                    counter += 1
                
                self.slug = unique_slug
        super().save(*args, **kwargs)

class AppModule(BaseUUIDModel, SlugMixin):
    name = models.CharField(max_length=100, help_text="Module name (e.g. Articles)")
    # slug will be generated from name
    display_name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_system_module = models.BooleanField(default=False)
    config_json = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return self.display_name
