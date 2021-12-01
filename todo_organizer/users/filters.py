from django_filters import rest_framework as filters

from .models import CustomUser


class CustomUserFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = CustomUser
        fields = ['name']
