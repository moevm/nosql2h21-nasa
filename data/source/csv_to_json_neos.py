import csv
import json
from collections import OrderedDict

fieldnames = ("ad", "diameter", "first_obs", "full_name", "last_obs", "pha", "q")


def make_json(csvFilePath, jsonFilePath):
    entries = []

    with open(csvFilePath, 'r') as csvfile:
        reader = csv.DictReader(csvfile, fieldnames)
        for row in reader:
            #if row[0] in fieldnames
            entry = OrderedDict()
            for field in fieldnames:
            if 
                entry[field] = row[field]
            entries.append(entry)

    with open(jsonFilePath, 'w') as jsonfile:
        json.dump(entries, jsonfile)
        jsonfile.write('\n')


csvFilePath = r'neos.csv'
jsonFilePath = r'neos.json'


make_json(csvFilePath, jsonFilePath)
