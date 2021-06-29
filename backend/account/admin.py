from django.contrib import admin

from django.contrib.auth.admin import UserAdmin

from .models import User

# Register your models here.


""" class UserAdmin(UserAdmin):
    list_display = ('email','username','is_admin', 'is_staff')
    search_fields = ('email', 'username')
    readonly_fields = ('id',) 

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()


admin.site.register(User, UserAdmin) """

admin.site.register(User)
