import pandas as pd
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.database import get_engine


def get_all_clients(db: Session) -> list:
    query = text("""
        SELECT
            id,
            nom,
            age,
            email,
            ville,
            telephone
        FROM clients
        ORDER BY id
    """)

    with get_engine().connect() as conn:
        df = pd.read_sql(query, conn)
    return df.to_dict(orient="records")


def get_client_detail(client_id: int, db: Session) -> dict | None:
    with get_engine().connect() as conn:

        client_query = text("""
            SELECT
                id,
                nom,
                age,
                email,
                ville,
                telephone
            FROM clients
            WHERE id = :id
        """)

        client_df = pd.read_sql(
            client_query,
            conn,
            params={"id": client_id}
        )

        if client_df.empty:
            return None

        ventes_query = text("""
            SELECT
                id,
                produit,
                quantite,
                prix,
                code_promo
            FROM ventes
            WHERE client_id = :id
            ORDER BY id
        """)

        ventes_df = pd.read_sql(
            ventes_query,
            conn,
            params={"id": client_id}
        )

        transactions_query = text("""
            SELECT
                id,
                montant,
                statut,
                date_op,
                reference
            FROM transactions
            WHERE client_id = :id
            ORDER BY id
        """)

        transactions_df = pd.read_sql(
            transactions_query,
            conn,
            params={"id": client_id}
        )

    return {
        "client": client_df.iloc[0].to_dict(),
        "ventes": ventes_df.to_dict(orient="records"),
        "transactions": transactions_df.to_dict(orient="records"),
    }