import requests


user_data = {'username': 'django',
             'password': 'geekbrains'}

url = 'http://localhost:8000/api/token/'
url_ref = 'http://localhost:8000/api/token/refresh/'

response = requests.post(
    url,
    data=user_data
)

print(response.status_code)
print(response.json())
