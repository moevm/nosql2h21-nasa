import csv
import json
from collections import OrderedDict

fieldnames = ("name", "id",  "nametype", "recclass", "mass",  "fall", "year", "reclat", "reclong",   "GeoLocation")


def make_json(csvFilePath, jsonFilePath):
    entries = []

    with open(file=csvFilePath, mode='r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile, fieldnames)
        for row in reader:
            entry = OrderedDict()
            for field in fieldnames:
                entry[field] = row[field]
            entries.append(entry)

    with open(file=jsonFilePath, mode='w', encoding='utf-8') as jsonfile:
        json.dump(entries, jsonfile)
        jsonfile.write('\n')


csvFilePath = r'Meteorite_Landings.csv'
jsonFilePath = r'Meteorite_Landings.json'


make_json(csvFilePath, jsonFilePath)
