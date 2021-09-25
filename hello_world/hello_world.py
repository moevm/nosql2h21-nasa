from pymongo import MongoClient
client = MongoClient('localhost', 27017)

db = client.nasa
print("DB name: ", db.name)

collection = db.worlds
print("Collection name: ", collection.name)

print("Docs:")
for doc in collection.find():
    print(doc)
