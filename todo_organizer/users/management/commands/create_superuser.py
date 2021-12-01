from django.core.management.base import BaseCommand

from users.models import CustomUser


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('superuser_name', type=str)

    def handle(self, *args, **options):
        superuser_name = options['superuser_name']
        CustomUser.objects.create_superuser(username=f'{superuser_name}',
                                            first_name=f'{superuser_name}',
                                            last_name=f'superuser',
                                            email=f'{superuser_name}@email.local',
                                            password='geekbrains')
        print(f'Superuser {superuser_name} created')
