from sqlalchemy.orm import Session
from sqlalchemy import text


def get_all_clients(db: Session) -> list:
    rows = db.execute(text("SELECT id, nom, age, email, ville, telephone FROM clients ORDER BY id")).fetchall()
    return [dict(r._mapping) for r in rows]


def get_client_detail(client_id: int, db: Session) -> dict | None:
    # Client
    client_row = db.execute(
        text("SELECT id, nom, age, email, ville, telephone FROM clients WHERE id = :id"),
        {"id": client_id}
    ).fetchone()

    if not client_row:
        return None

    # Ventes
    ventes_rows = db.execute(
        text("SELECT id, produit, quantite, prix, code_promo FROM ventes WHERE client_id = :id ORDER BY id"),
        {"id": client_id}
    ).fetchall()

    # Transactions
    transactions_rows = db.execute(
        text("SELECT id, montant, statut, date_op, reference FROM transactions WHERE client_id = :id ORDER BY id"),
        {"id": client_id}
    ).fetchall()

    return {
        "client":       dict(client_row._mapping),
        "ventes":       [dict(r._mapping) for r in ventes_rows],
        "transactions": [dict(r._mapping) for r in transactions_rows],
    }
