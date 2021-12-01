# from rest_framework.relations import StringRelatedField, HyperlinkedRelatedField
from rest_framework.serializers import ModelSerializer

from .models import Project, ToDo


class ProjectModelBaseSerializer(ModelSerializer):
    # users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ProjectModelSerializer(ProjectModelBaseSerializer):
    class Meta(ProjectModelBaseSerializer.Meta):
        model = Project
        fields = None
        exclude = ['repository']


class ToDoModelSerializer(ModelSerializer):
    # project = StringRelatedField()
    # author = StringRelatedField()

    class Meta:
        model = ToDo
        fields = '__all__'
