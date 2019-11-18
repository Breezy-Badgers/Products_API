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
        db.styles.update({'style_id': temp['styleId']}, {'$push': {'photos':temp}})        
        


# header = ['style_id','productId','name','sale_price','original_price','default']
# file_name = '/home/luke/Documents/immersive/Products_API/photo_split/styles.csv'
# csvfile=open(file_name)
# input_file = csv.reader(csvfile, delimiter='|')
# # csv_counter = 1
# for row in input_file:
#     # csv_counter += 1
#     # if(csv_counter > 200):
#     #     break
#     data=row[0]
#     data=data.split(',')
#     if(data[0] != 'id'):
#         temp={}
#         i = 0
#         for each in data:
#             bit = each.strip('\"')
#             if((i != 2) and bit != 'null'):
#                 bit = int(each)
#             temp[header[i]] = bit
#             i += 1
#         temp['photos'] = []
#         temp['skus'] = []
#         if(int(temp['style_id'])%10000 == 0):
#             print(temp['style_id'])
#         db.styles.insert(temp)        
            

# header = ['id', 'styleId', 'size', 'quantity']
# file_name = '/home/luke/Documents/immersive/Products_API/photo_split/skus.csv'
# csvfile=open(file_name)
# input_file = csv.reader(csvfile, delimiter='|')
# # csv_counter = 1
# for row in input_file:
#     # csv_counter += 1
#     # if(csv_counter > 1500):
#     #     break
#     data=row[0]
#     data=data.split(',')
#     if(data[0] != 'id'):
#         temp={}
#         i = 0
#         for each in data:
#             bit = each.strip('\"')
#             if((i != 2)):
#                 bit = int(each)
#             if(i == 2):
#                 bit = bit.replace('.', '\.')
#             temp[header[i]] = bit
#             i += 1
#         if(int(temp['id'])%10000 == 0):
#             print(temp['id'])
#         db.styles.update({'style_id': temp['styleId']}, {'$push': {'skus':temp}})
#         # db.styles.update({'style_id':temp['styleId']}, {'$set':{'skus[' + temp['size'] + ']':temp['quantity']}})        
        