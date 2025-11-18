import pandas as pd
from app.database import get_engine
from sklearn.ensemble import IsolationForest


# Charger une table SQL dans un DataFrame
def load_table(name: str):
    engine = get_engine()
    return pd.read_sql(f"SELECT * FROM {name}", engine)


# Détection des valeurs manquantes
def detect_missing(df):
    return df.isnull().sum().to_dict()


# Détection des doublons
def detect_duplicates(df):
    return int(df.duplicated().sum())


# Détection d'anomalies de types
def detect_type_anomalies(df):
    anomalies = {}

    for col in df.columns:
        # On ignore les colonnes clés primaires, dates, strings
        if df[col].dtype in ["object"]:
            continue

        errors = []

        # On essaie de convertir les valeurs pour voir les erreurs
        for val in df[col]:
            try:
                if pd.isna(val):
                    continue
                float(val)
            except:
                errors.append(val)

        if errors:
            anomalies[col] = list(set(errors))

    return anomalies