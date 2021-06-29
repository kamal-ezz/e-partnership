from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token  


class User(AbstractUser):
    email = models.EmailField(verbose_name='email', max_length=255, unique=True)
    phone = PhoneNumberField(blank=True, null=True, unique=True)
    institution = models.CharField(max_length=40)
    occupation = models.CharField(max_length=40)
    secteur_activité = models.CharField(max_length=100, null=True, blank=True)
    photo = models.ImageField(max_length=255, null=True, blank=True, upload_to='profile_pictures', default='https://bootdey.com/img/Content/avatar/avatar7.png')

    REQUIRED_FIELDS = ['username','phone','institution','occupation']
    USERNAME_FIELD = 'email'

    def get_username(self):
        return self.email


""" 
class MyAccountManager(BaseUserManager):
    def create_user(self, email, username, institution, occupation, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have an username')
        if not institution:
            raise ValueError('Users must specify their institution')
        if not occupation:
            raise ValueError('Users must specify their occupation')

        user = self.model(
            email = self.normalize_email(email),
            username = username,
            institution = institution,
            occupation = occupation
        )

        user.set_password(password)
        user.save(using=self._db)
        return user
        
    def create_superuser(self, email, username, institution, occupation, password):
        user = self.create_user(
            email = self.normalize_email(email),
            username = username,
            institution = institution,
            occupation = occupation,
            password = password
        )
        
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user """

# Create your models here.
""" class User(AbstractBaseUser):
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    institution = models.CharField(max_length=40)
    occupation = models.CharField(max_length=40)
    username = models.CharField(max_length=30, unique=True)
    date_joined = models.DateTimeField(verbose_name='date joined',auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login',auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'institution', 'occupation']

    objects = MyAccountManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin
    
    def has_module_perms(self, app_label):
        return True """


"""
class Profile(models.Model):  
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    telephone = PhoneNumberField(blank=True, null=True, unique=True)
    photo = models.ImageField(max_length=255, null=True, blank=True, default='', upload_to='profile_photos')
    secteur_activité = models.CharField(max_length=100, null=True, blank=True)
    services = models.CharField(max_length=200, null=True, blank=True)


    def __str__(self):
        return str(self.user.__str__())


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
 """

