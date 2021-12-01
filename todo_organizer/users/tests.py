from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient

from .models import CustomUser
from .views import UsersViewSet


class TestCustomUserViewSet(TestCase):
    password = 'geekbrains'

    def setUp(self, ):
        self.superuser = get_user_model().objects.create_superuser(
            'django',
            'django@test.local',
            self.password
        )
        self.user = get_user_model().objects.create_user(
            'test_user',
            'user@test.local',
            self.password
        )

        self.superuser_data = {'username': 'django',
                               'first_name': 'django',
                               'last_name': 'superuser',
                               'email': 'django@superuser.local',
                               'password': self.password}

        self.user_data = {'username': 'Иван',
                          'first_name': 'Иван',
                          'last_name': 'Иванов',
                          'email': 'data@test.local',
                          'password': self.password}

        self.user_data_upd = {'username': 'Петр',
                              'first_name': 'Петр',
                              'last_name': 'Петров',
                              'email': 'data_UPD@test.local',
                              'password': self.password}

    def test_get_list_guest(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UsersViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_list_auth(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        force_authenticate(request, user=self.user)
        view = UsersViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/',
                               self.user_data)

        view = UsersViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/',
                               self.user_data)

        force_authenticate(request, user=self.superuser)
        view = UsersViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_user(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/',
                               self.user_data)

        force_authenticate(request, user=self.user)
        view = UsersViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail_guest(self):
        user = CustomUser.objects.create(**self.user_data)
        client = APIClient()
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_detail_user(self):
        user = CustomUser.objects.create(**self.user_data)
        client = APIClient()
        client.force_authenticate(user=self.user)
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        user = CustomUser.objects.create(**self.user_data)
        client = APIClient()
        client.login(username=self.superuser_data['first_name'],
                     password=self.superuser_data['password'])

        response = client.put(f'/api/users/{user.id}/',
                              self.user_data_upd)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = CustomUser.objects.get(id=user.id)
        self.assertEqual(user.username, self.user_data_upd['username'])
        self.assertEqual(user.first_name, self.user_data_upd['first_name'])
        self.assertEqual(user.last_name, self.user_data_upd['last_name'])
        self.assertEqual(user.email, self.user_data_upd['email'])
        client.logout()
