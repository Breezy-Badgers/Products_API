import csv
from pymongo import MongoClient
mongo_client = MongoClient()
db = mongo_client.products

header = ['id','productId','name','sale_price','original_price','default_style']
file_name = '/home/luke/Documents/immersive/Products_API/photo_split/styles.csv'
csvfile=open(file_name)
input_file = csv.reader(csvfile, delimiter='|')
for row in input_file:
    data=row[0]
    data=data.split(',')
    if(data[0] != 'id'):
        temp={}
        i = 0
        for each in data:
            temp[header[i]] = each
            i += 1
        if(int(temp['id'])%1000 == 0):
            print(temp['id'])
        db.styles.insert(temp)        
        
