import pandas as pd
from sqlalchemy.orm import Session
from app.database import get_engine
from app.models.models import CleaningLog
from app.service.table_service import SYSTEM_TABLES


def clean_data(table: str, rules: dict, db: Session) -> dict:
    if table in SYSTEM_TABLES:
        return {"status": "error", "detail": f"Table système '{table}' protégée."}

    engine = get_engine()
    df = pd.read_sql(f'SELECT * FROM "{table}"', engine)

    if rules.get("fill_value"):
        for col, val in rules["fill_value"].items():
            if col not in df.columns: continue
            try:
                typed_val = float(val) if df[col].dtype != "object" else val
            except (ValueError, TypeError):
                typed_val = val
            df[col] = df[col].fillna(typed_val)

    if rules.get("fill_missing"):
        for col, method in rules["fill_missing"].items():
            if col not in df.columns: continue
            if df[col].dtype == "object" and method in ("mean", "median"): continue
            if method == "mean":     df[col] = df[col].fillna(df[col].mean())
            elif method == "median": df[col] = df[col].fillna(df[col].median())
            elif method == "mode":
                if not df[col].mode().empty: df[col] = df[col].fillna(df[col].mode().iloc[0])

    if rules.get("remove_duplicates"):
        df = df.drop_duplicates()

    if rules.get("fix_types"):
        for col, dtype in rules["fix_types"].items():
            try:
                if dtype == "int":   df[col] = pd.to_numeric(df[col], errors="coerce").astype("Int64")
                elif dtype == "float": df[col] = pd.to_numeric(df[col], errors="coerce")
                elif dtype == "str":   df[col] = df[col].astype(str)
            except: pass

    df.to_sql(table, engine, if_exists="replace", index=False)

    db.add(CleaningLog(table_name=table))
    db.commit()

    return {"status": "success", "rows_after_cleaning": len(df), "table": table}
