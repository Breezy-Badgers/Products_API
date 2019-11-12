import csv
from pymongo import MongoClient
mongo_client = MongoClient()
db = mongo_client.products

header = ['id','styleId','url','thumbnail_url']
file_name = '/home/luke/Documents/immersive/Products_API/photo_split/photos.csv'
csvfile=open(file_name)
input_file = csv.reader(csvfile, delimiter='|')
for row in input_file:
    data=row[0]
    data=data.split(',')
    if(data[0] != 'id'):
        temp={}
        i = 0
        for each in data:
            bit = each.strip('\"')
            if((i == 0) or (i == 1)):
                bit = int(each)
            temp[header[i]] = bit
            i += 1
        if(int(temp['id'])%10000 == 0):
            print(temp['id'])
        db.photos.insert(temp)        
        
