import requests
from datetime import date
import json
url1 = 'http://127.0.0.1:8000/list'
data1= {"createdAt":date.today().__str__(),"dueBy":date.today().__str__(),"title":"sup","text":"sup bro","partOf":["60c2306205f7ff1d5d9b8442"]}
url = 'http://127.0.0.1:8000/type'
data= {"name":"work","color":"#FFFFFF"}
# response = requests.post(url,json=data)
response = requests.post(url1,json=data1)
print(response.text)