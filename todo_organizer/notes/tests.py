import json

from django.contrib.auth import get_user_model
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Project


class TestProjectViewSet(APITestCase):
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

    def test_get_list(self):
        self.client.login(username=self.superuser_data['first_name'],
                          password=self.superuser_data['password'])

        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_project(self):
        project = mixer.blend(Project, name='Test Project')
        self.client.force_login(user=self.user)
        response = self.client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_project = json.loads(response.content)
        self.assertEqual(response_project['name'], 'Test Project')
