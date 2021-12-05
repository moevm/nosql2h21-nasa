import pandas as pd
import pdb
from itertools import groupby
from collections import OrderedDict
import json

df = pd.read_csv('neos.csv', usecols = ["ad", "diameter", "first_obs", "full_name", "last_obs", "pha", "q"])
df.to_json('neos.json', orient='records', lines=True)
