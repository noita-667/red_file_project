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
    id        SERIAL PRIMARY KEY,
    nom       VARCHAR(100),
    age       INTEGER,
    email     VARCHAR(255),
    ville     VARCHAR(100),
    telephone VARCHAR(20)
);

INSERT INTO clients (nom, age, email, ville, telephone) VALUES
('Alice',   28,   'alice@mail.com',   'Paris',      '0612345678'),
('Bob',     NULL, 'bob@mail.com',     'Lyon',       '06-INVALIDE'),
('Alice',   28,   'alice@mail.com',   'Paris',      '0612345678'),
('Alice',   28,   'alice@mail.com',   'Paris',      '0612345678'),
('Claire',  35,   NULL,               'Marseille',  'non renseigné'),
('David',   NULL, 'david@mail.com',   'Bordeaux',   '0698765432'),
('Eva',     42,   'eva@mail.com',     NULL,          NULL),
('Frank',   NULL, NULL,               'Nantes',     'ABCD-1234'),
('Grace',   29,   'grace@mail.com',   'Toulouse',   '0711223344'),
('Grace',   29,   'grace@mail.com',   'Toulouse',   '0711223344');

CREATE TABLE ventes (
    id         SERIAL PRIMARY KEY,
    produit    VARCHAR(100),
    quantite   INTEGER,
    prix       NUMERIC(10,2),
    vendeur    VARCHAR(100),
    code_promo VARCHAR(20)
);

INSERT INTO ventes (produit, quantite, prix, vendeur, code_promo) VALUES
('Chaise',  10,   49.99,  'Martin', '10'),
('Table',   NULL, 199.99, 'Dupont', '20'),
('Lampe',   5,    NULL,   'Martin', 'GRATUIT'),
('Chaise',  10,   49.99,  'Martin', '10'),
('Chaise',  10,   49.99,  'Martin', '10'),
('Bureau',  NULL, 349.00, NULL,     NULL),
('Canapé',  2,    799.99, 'Durand', '5'),
('Étagère', NULL, NULL,   'Dupont', 'N/A'),
('Miroir',  3,    89.99,  NULL,     '15'),
('Miroir',  3,    89.99,  NULL,     '15');

CREATE TABLE transactions (
    id          SERIAL PRIMARY KEY,
    client_id   INTEGER,
    montant     NUMERIC(10,2),
    statut      VARCHAR(50),
    date_op     DATE,
    reference   VARCHAR(30)
);

INSERT INTO transactions (client_id, montant, statut, date_op, reference) VALUES
(1,    120.00, 'validé',    '2024-01-10', '1001'),
(2,    NULL,   'en_attente','2024-01-11', '1002'),
(1,    120.00, 'validé',    '2024-01-10', '1001'),
(1,    120.00, 'validé',    '2024-01-10', '1001'),
(3,    450.50, NULL,        '2024-01-12', 'REF-ERREUR'),
(NULL, 89.00,  'validé',    '2024-01-13', '1004'),
(4,    NULL,   'annulé',    NULL,         '1005'),
(5,    230.00, 'validé',    '2024-01-14', 'MANQUANT'),
(6,    75.00,  NULL,        '2024-01-15', '1007'),
(6,    75.00,  NULL,        '2024-01-15', '1007');

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
