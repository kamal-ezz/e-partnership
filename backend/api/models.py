from django.db.models.fields import DateTimeField
from account.models import User
from django.db import models


# Create your models here.
class Convention(models.Model):
    titre = models.CharField(max_length=50, blank=False, null=False)
    institution_a = models.CharField(max_length=70, blank=False, null=False)
    institution_b = models.CharField(max_length=70, blank=False, null=False)
    contenu = models.TextField(blank=False, null=False)
    date_debut = models.DateField(blank=False, null=False) 
    date_fin = models.DateField(blank=False, null=False)
    dernier_modification = models.DateTimeField(verbose_name='last modification',auto_now=True)
    
    class Etat(models.TextChoices):
        EN_COURS = 'en cours'
        SIGNE = 'signé'
        VALIDE = 'validé'
        REFUSE = 'réfusé'
    
    etat = models.CharField(choices=Etat.choices, default=Etat.EN_COURS, max_length=20)

    def __str__(self):
        return self.titre


class Article(models.Model):
    convention = models.ForeignKey(Convention, on_delete=models.CASCADE)
    titre = models.CharField(max_length=50, blank=False, null=False)
    contenu = models.TextField(blank=False, null=False)
    
    def __str__(self):
        return self.titre


class Intervenant(models.Model):
    convention = models.ForeignKey(Convention, on_delete=models.CASCADE)
    #user = models.ForeignKey(User, on_delete=models.CASCADE)
    email = models.EmailField(verbose_name='email', max_length=255)
    signature = models.ImageField(max_length=255, null=True, blank=True, upload_to='signatures')

    def __str__(self):
        return str(self.email)

class Activity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    class Type(models.TextChoices):
        CREATION = 'creation'
        SIGNING = 'signing'
    type = models.CharField(choices=Type.choices, default=Type.CREATION, max_length=20)
    date = DateTimeField(verbose_name = 'activity date',auto_now_add=True)

    def __str__(self):
        return self.date

# Message et Annonce ?