from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import ActivitySerializer, ArticleSerializer, ConventionSerializer, IntervenantSerializer
from .models import Activity, Article, Convention, Intervenant
from rest_framework import viewsets, status
from rest_framework.response import Response
import json

# Create your views here.
class ConventionViewSet(viewsets.ModelViewSet):
    #permission_classes = [IsAuthenticated]
    queryset = Convention.objects.all()
    serializer_class = ConventionSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    #permission_classes = [IsAuthenticated]
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=isinstance(request.data, list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(json.dumps(serializer.data, ensure_ascii=False), content_type="application/json")


class IntervenantViewSet(viewsets.ModelViewSet):
    #permission_classes = [IsAuthenticated]
    queryset = Intervenant.objects.all()
    serializer_class = IntervenantSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=isinstance(request.data, list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(json.dumps(serializer.data, ensure_ascii=False), content_type="application/json")

class ActivityViewSet(viewsets.ModelViewSet):
    #permission_classes = [IsAuthenticated]
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class UploadSignature(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def get(self, request, *args, **kwargs):
        intervenants = Intervenant.objects.all()
        serializer = IntervenantSerializer(intervenants, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        posts_serializer = IntervenantSerializer(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class ConventionsWithMeIncluded(APIView):
    def get(self, request):
        v = Intervenant.objects.filter(user = request.user).values('convention')
        conventions = [ConventionSerializer(Convention.objects.get(pk = i['convention'])).data for i in v]
        return Response(conventions)