import urllib.error

from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .filters import ProjectFilter, ToDoFilter
from .models import Project, ToDo
from .pagination import ProjectPagination, ToDoPagination
from .serializers import ProjectModelSerializer, ToDoModelSerializer, ProjectModelBaseSerializer


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    pagination_class = ProjectPagination
    filterset_class = ProjectFilter

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return ProjectModelSerializer
        return ProjectModelBaseSerializer


class ToDoViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    pagination_class = ToDoPagination
    filterset_class = ToDoFilter

    def destroy(self, request, *args, **kwargs):
        try:
            item = self.get_object()
            item.is_active = False
            item.save()
        except urllib.error.HTTPError:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
