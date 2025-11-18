import pandas as pd
from app.database import get_engine


def clean_data(table: str, rules: dict):
    engine = get_engine()

    # On charge la table SQL dans un DataFrame
    df = pd.read_sql(f"SELECT * FROM {table}", engine)

    # --- 1. Gestion des valeurs manquantes ---
    if rules.get("fill_missing"):
        for col, method in rules["fill_missing"].items():

            if col not in df.columns:
                continue  # sécurité

            # Si colonne non numérique : on ignore
            if df[col].dtype == "object" and method in ["mean", "median"]:
                continue

            if method == "mean":
                df[col] = df[col].fillna(df[col].mean())

            elif method == "median":
                df[col] = df[col].fillna(df[col].median())

            elif method == "mode":
                if not df[col].mode().empty:
                    df[col] = df[col].fillna(df[col].mode().iloc[0])

    # --- 2. Suppression des doublons ---
    if rules.get("remove_duplicates"):
        df = df.drop_duplicates()

    # --- 3. Correction types (optionnel) ---
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
                pass  # on ignore les erreurs pour éviter un crash

    # Sécurité : interdit d’écraser la table des erreurs
    if table == "erreurs":
        return {"status": "error", "detail": "Impossible de nettoyer la table 'erreurs'."}

    # On remplace le contenu de la table avec les nouvelles données
    df.to_sql(table, engine, if_exists="replace", index=False)

    return {
        "status": "success",
        "rows_after_cleaning": len(df),
        "table": table
    }
