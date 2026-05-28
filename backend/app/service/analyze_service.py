import pandas as pd
from app.database import get_engine
from sklearn.ensemble import IsolationForest


def load_table(name: str):
    engine = get_engine()
    return pd.read_sql(f"SELECT * FROM {name}", engine)


def detect_missing(df):
    return df.isnull().sum().to_dict()


def detect_duplicates(df):
    return int(df.duplicated().sum())


def detect_type_anomalies(df):
    anomalies = {}

    for col in df.columns:
        if df[col].dtype in ["object"]:
            continue

        errors = []

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