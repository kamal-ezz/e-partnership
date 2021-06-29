from .models import Activity, Article, Convention, Intervenant
from rest_framework import serializers

class ConventionSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'titre', 'contenu', 'institution_a','institution_b','date_debut', 'date_fin','etat','dernier_modification')
        model = Convention



class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','convention', 'titre', 'contenu',)
        model = Article



class IntervenantSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','email', 'convention', 'signature', )
        model = Intervenant

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','user', 'type', 'date', )
        model = Activity

