import pandas as pd
from sqlalchemy.orm import Session
from app.database import get_engine
from app.models.models import AnalysisReport


def load_table(name: str) -> pd.DataFrame:
    with get_engine().connect() as conn:
        return pd.read_sql(f'SELECT * FROM "{name}"', conn)

def detect_missing(df): return df.isnull().sum().to_dict()
def detect_duplicates(df):
    cols = [c for c in df.columns if c != 'id']
    return int(df.duplicated(subset=cols).sum())

def detect_type_anomalies(df):
    anomalies = {}
    # Vérifie les colonnes texte (VARCHAR) qui contiennent des valeurs mixtes
    for col in df.select_dtypes(include="object").columns:
        non_null = df[col].dropna().astype(str)
        if non_null.empty:
            continue
        numeric_count = non_null.apply(_is_numeric).sum()
        # Anomalie si la colonne a des valeurs numériques ET non-numériques mélangées
        if 0 < numeric_count < len(non_null):
            bad_vals = [v for v in non_null if not _is_numeric(v)]
            if bad_vals:
                anomalies[col] = list(set(bad_vals))
    return anomalies

def _is_numeric(v):
    try: float(str(v)); return True
    except: return False

def run_analysis(table: str) -> dict:
    df = load_table(table)
    return {
        "missing_values":     detect_missing(df),
        "duplicates":         detect_duplicates(df),
        "datatype_anomalies": detect_type_anomalies(df),
    }

def save_analysis(table: str, result: dict, db: Session):
    db.add(AnalysisReport(table_name=table, **result))
    db.commit()
