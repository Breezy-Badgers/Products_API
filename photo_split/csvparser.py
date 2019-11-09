import csv
from pymongo import MongoClient
mongo_client = MongoClient()
db = mongo_client.products

header = ['id', 'styleId', 'thumbnail_url', 'url']
file_name = '/home/luke/Documents/immersive/Products_API/photo_split/photos.csv'
csvfile=open(file_name)
input_file = csv.reader(csvfile, delimiter='|')
for row in input_file:
    data=row[0]
    data=data.split(',')
    print(data[0])
    temp={}
    i = 0
    for each in data:
        temp[header[i]] = each
        i += 1
    db.photos.insert(temp)        
    
