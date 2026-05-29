-- psql -U postgres -f datacleaner_simple.sql

CREATE DATABASE datacleaner ENCODING 'UTF8' TEMPLATE template0;
\connect datacleaner

CREATE TABLE users (
    id            SERIAL       PRIMARY KEY,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

-- admin@admin.com / 1234
INSERT INTO users (email, password_hash)
VALUES ('admin@admin.com', '$2b$12$X6Xdo41/yTL3ELs5whdo6u2Rv1Mxq9iKRfX9PhIF0edvBlUU4V6MS');

-- ── Tables de données utilisateur ──────────────────────────────────────────

CREATE TABLE clients (
    id        INTEGER PRIMARY KEY,
    nom       VARCHAR(100),
    age       INTEGER,
    email     VARCHAR(255),
    ville     VARCHAR(100),
    telephone VARCHAR(20)
);

INSERT INTO clients (id, nom, age, email, ville, telephone) VALUES
(1, 'Jack',   32,   'jack@mail.com',   'Paris',     '0612345678'),
(2, 'Paul',   45,   'paul@mail.com',   'Lyon',      '0698765432'),
(3, 'Marie',  28,   'marie@mail.com',  'Marseille', '0711223344'),
(4, 'Sophie', NULL, 'sophie@mail.com', 'Bordeaux',  NULL),
(5, 'Luc',    38,   NULL,              'Nantes',    '06-INVALIDE');

CREATE TABLE ventes (
    id         INTEGER PRIMARY KEY,
    client_id  INTEGER REFERENCES clients(id),
    produit    VARCHAR(100),
    quantite   INTEGER,
    prix       NUMERIC(10,2),
    code_promo VARCHAR(20)
);

INSERT INTO ventes (id, client_id, produit, quantite, prix, code_promo) VALUES
(1,  1, 'Chaise',  10,   49.99,  '10'),
(2,  1, 'Table',   NULL, 199.99, '20'),
(3,  1, 'Lampe',   5,    NULL,   'GRATUIT'),
(4,  1, 'Bureau',  2,    349.00, NULL),
(5,  2, 'Canapé',  1,    799.99, '5'),
(6,  3, 'Miroir',  3,    89.99,  '15'),
(7,  3, 'Étagère', NULL, NULL,   'N/A'),
(8,  4, 'Chaise',  NULL, 49.99,  NULL),
(9,  5, 'Lampe',   2,    NULL,   'GRATUIT'),
(10, 5, 'Table',   1,    199.99, NULL);

CREATE TABLE transactions (
    id          INTEGER PRIMARY KEY,
    client_id   INTEGER REFERENCES clients(id),
    montant     NUMERIC(10,2),
    statut      VARCHAR(50),
    date_op     DATE,
    reference   VARCHAR(30)
);

INSERT INTO transactions (id, client_id, montant, statut, date_op, reference) VALUES
(1,  1, 340.00, 'validé',    '2024-01-10', '1001'),
(2,  1, 120.00, 'validé',    '2024-02-03', '1002'),
(3,  1, NULL,   'en_attente','2024-03-15', '1003'),
(4,  2, 89.00,  'validé',    '2024-01-22', '1004'),
(5,  3, 450.50, 'annulé',    '2024-02-10', '1005'),
(6,  3, 210.00, 'validé',    '2024-03-01', '1006'),
(7,  3, NULL,   'en_attente','2024-03-20', '1007'),
(8,  4, 75.00,  'validé',    '2024-02-14', '1008'),
(9,  5, 320.00, NULL,        '2024-01-30', 'REF-ERREUR'),
(10, 1, 95.00,  'validé',    '2024-04-01', '1010');

-- ── Tables système ───────────────────────────────────────────────────────────

CREATE TABLE cleaning_logs (
    id         SERIAL       PRIMARY KEY,
    table_name VARCHAR(255) NOT NULL,
    done_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE analysis_reports (
    id                 SERIAL       PRIMARY KEY,
    table_name         VARCHAR(255) NOT NULL,
    missing_values     JSONB        NOT NULL,
    duplicates         INTEGER      NOT NULL,
    datatype_anomalies JSONB        NOT NULL,
    done_at            TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
