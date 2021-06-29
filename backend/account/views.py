""" from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .serializers import ProfileSerializer, RegisterSerializer, UserSerializer
from .models import Profile, User
from rest_framework import viewsets, generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated

def validate_email(email):
	user = None
	try:
	    user = User.objects.get(email=email)
	except User.DoesNotExist:
		return None
	if user != None:
		return email

def validate_username(username):
    user = None
    try:
	    user = User.objects.get(username=username)
    except User.DoesNotExist:
        return None
    if  user != None:
        return username

@api_view(['POST'])
def registration_view(request):
    serializer = RegisterSerializer(data = request.data)
    data = {}

    email = request.data.get('email', '0').lower()
    if validate_email(email) != None:
        data['error_message'] = 'That email is already in use.'
        data['response'] = 'Error'
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

    username = request.data.get('username', '0')
    if validate_username(username) != None:
        data['error_message'] = 'That username is already in use.'
        data['response'] = 'Error'
        return Response(data, status=status.HTTP_400_BAD_REQUEST)
    

    s = ''

    if serializer.is_valid():
        user = serializer.save()
        data['response'] = "succesfully registered a new user"
        data['email'] = user.email
        data['username'] = user.username
        data['institution'] = user.institution
        data['occupation'] = user.occupation
        token = Token.objects.get(user=user).key
        data['token'] = token
        s = status.HTTP_201_CREATED
    else: 
        data = serializer.errors
        s = status.HTTP_400_BAD_REQUEST
    
    return Response(data, status = s)

class ObtainAuthTokenView(APIView):
    
    authentication_classes = []
    permission_classes = []
    
    def post(self, request):
        context = {}
        s = ''

        email = request.POST.get('email')
        password = request.POST.get('password')
        account = authenticate(email=email, password=password)
        
        if account:
            try:
                token = Token.objects.get(user=account)
            except Token.DoesNotExist:
                token = Token.objects.create(user=account)
            context['response'] = 'Successfully authenticated.'
            context['pk'] = account.pk
            context['email'] = email.lower()
            context['token'] = token.key
            s = status.HTTP_200_OK
        
        else:
            context['response'] = 'Error'
            context['error_message'] = 'Invalid credentials'
            s = status.HTTP_400_BAD_REQUEST
            
        return Response(context, status=s)


class ProfileViewSet(viewsets.ModelViewSet):
    #permission_classes = [IsAuthenticated]
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserSerializer """