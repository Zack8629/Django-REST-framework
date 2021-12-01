from rest_framework.viewsets import ModelViewSet

from .filters import CustomUserFilter
from .models import CustomUser
from .pagination import CustomUserPagination
from .serializers import UserModelSerializer


class UsersViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserModelSerializer
    pagination_class = CustomUserPagination
    filterset_class = CustomUserFilter
