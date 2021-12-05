import pandas as pd

csvFilePathMeteorite = r'Meteorite_Landings.csv'
jsonFilePathMeteorite = r'Meteorite_Landings.json'

csvFilePathNEOS = r'neos.csv'
jsonFilePathNEOS = r'neos.json'

df = pd.read_csv(csvFilePathMeteorite)
df.to_json(jsonFilePathMeteorite)
