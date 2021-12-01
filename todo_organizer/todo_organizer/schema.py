import graphene
from graphene_django import DjangoObjectType

from notes.models import Project, ToDo
from users.models import CustomUser


class UserDjangoType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = '__all__'


class ProjectDjangoType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoDjangoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(UserDjangoType)
    user_by_id = graphene.Field(UserDjangoType,
                                pk=graphene.Int())

    all_projects = graphene.List(ProjectDjangoType)
    projects_by_name = graphene.List(ProjectDjangoType,
                                     name=graphene.String())

    all_todos = graphene.List(ToDoDjangoType)
    todos_by_project = graphene.List(ToDoDjangoType,
                                     project_id=graphene.Int())

    def resolve_all_users(root, info):
        return CustomUser.objects.all()

    def resolve_user_by_id(root, info, pk):
        return CustomUser.objects.filter(pk=pk).first()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_projects_by_name(root, info, name=''):
        return Project.objects.filter(name__contains=name)

    def resolve_all_todos(root, info):
        return ToDo.objects.all()

    def resolve_todos_by_project(root, info, project_id):
        return ToDo.objects.filter(project_id=project_id)


class UserMutation(graphene.Mutation):
    class Arguments:
        pk = graphene.ID()
        email = graphene.String()

    user = graphene.Field(UserDjangoType)

    @classmethod
    def mutate(cls, root, info, pk, email):
        user = CustomUser.objects.get(pk=pk)
        user.email = email
        user.save()
        return UserMutation(user=user)


class Mutation(graphene.ObjectType):
    update_user = UserMutation.Field()


schema = graphene.Schema(query=Query,
                         mutation=Mutation)
