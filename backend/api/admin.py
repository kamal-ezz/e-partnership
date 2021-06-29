from .models import Convention, Article, Intervenant, Activity
from django.contrib import admin

# Register your models here.

admin.site.register(Convention)
admin.site.register(Article)
admin.site.register(Intervenant)
admin.site.register(Activity)