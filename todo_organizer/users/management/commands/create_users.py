from django.core.management.base import BaseCommand

from users.models import CustomUser


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('count', type=int)

    def handle(self, *args, **options):
        count = options['count']
        for i in range(count):
            _user = f'user_{i + 1}'
            CustomUser.objects.create_user(username=f'{_user}',
                                           first_name=f'{_user}',
                                           last_name=f'{_user}',
                                           email=f'{_user}@mail.local',
                                           password='geekbrains')
            print(f'User {i + 1} created')
        print('done')
