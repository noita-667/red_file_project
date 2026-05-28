import pandas as pd
from app.database import get_engine


def clean_data(table: str, rules: dict):
    engine = get_engine()

    df = pd.read_sql(f"SELECT * FROM {table}", engine)

    if rules.get("fill_missing"):
        for col, method in rules["fill_missing"].items():

            if col not in df.columns:
                continue

            if df[col].dtype == "object" and method in ["mean", "median"]:
                continue

            if method == "mean":
                df[col] = df[col].fillna(df[col].mean())

            elif method == "median":
                df[col] = df[col].fillna(df[col].median())

            elif method == "mode":
                if not df[col].mode().empty:
                    df[col] = df[col].fillna(df[col].mode().iloc[0])

    if rules.get("remove_duplicates"):
        df = df.drop_duplicates()

    if "fix_types" in rules and rules["fix_types"]:
        for col, dtype in rules["fix_types"].items():
            try:
                if dtype == "int":
                    df[col] = pd.to_numeric(df[col], errors="coerce").astype("Int64")
                elif dtype == "float":
                    df[col] = pd.to_numeric(df[col], errors="coerce")
                elif dtype == "str":
                    df[col] = df[col].astype(str)
            except Exception:
                pass

    if table == "erreurs":
        return {"status": "error", "detail": "Impossible de nettoyer la table 'erreurs'."}

    df.to_sql(table, engine, if_exists="replace", index=False)

    return {
        "status": "success",
        "rows_after_cleaning": len(df),
        "table": table
    }
