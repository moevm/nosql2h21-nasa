import csv
import json
from collections import OrderedDict

fieldnames = ("GeoLocation", "fall", "id", "mass", "name",
              "nametype", "recclass", "reclat", "reclong", "year")


def make_json(csvFilePath, jsonFilePath):
    entries = []

    with open(csvFilePath, 'r') as csvfile:
        reader = csv.DictReader(csvfile, fieldnames)
        for row in reader:
            entry = OrderedDict()
            for field in fieldnames:
                entry[field] = row[field]
            entries.append(entry)

    with open(jsonFilePath, 'w') as jsonfile:
        json.dump(entries, jsonfile)
        jsonfile.write('\n')


csvFilePath = r'Meteorite_Landings.csv'
jsonFilePath = r'Meteorite_Landings.json'


make_json(csvFilePath, jsonFilePath)
