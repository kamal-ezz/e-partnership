from backend.api.models import Signataire
from rest_framework import permissions


class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user


class IsAuthorsOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        s = []
        for e in Signataire.objects.filter(convention=obj.id):
            s.append(e)
        
        return obj.user == request.user or obj.user.email in s