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
    id     SERIAL PRIMARY KEY,
    nom    VARCHAR(100),
    age    INTEGER,
    email  VARCHAR(255),
    ville  VARCHAR(100)
);

INSERT INTO clients (nom, age, email, ville) VALUES
('Alice',  28,   'alice@mail.com',   'Paris'),
('Bob',    NULL, 'bob@mail.com',     'Lyon'),
('Alice',  28,   'alice@mail.com',   'Paris'),
('Claire', 35,   NULL,               'Marseille'),
('David',  NULL, 'david@mail.com',   'Bordeaux'),
('Eva',    42,   'eva@mail.com',     NULL);

CREATE TABLE ventes (
    id         SERIAL PRIMARY KEY,
    produit    VARCHAR(100),
    quantite   INTEGER,
    prix       NUMERIC(10,2),
    vendeur    VARCHAR(100)
);

INSERT INTO ventes (produit, quantite, prix, vendeur) VALUES
('Chaise',   10,   49.99,  'Martin'),
('Table',    NULL, 199.99, 'Dupont'),
('Lampe',    5,    NULL,   'Martin'),
('Chaise',   10,   49.99,  'Martin'),
('Bureau',   NULL, 349.00, NULL),
('Canapé',   2,    799.99, 'Durand');

CREATE TABLE transactions (
    id          SERIAL PRIMARY KEY,
    client_id   INTEGER,
    montant     NUMERIC(10,2),
    statut      VARCHAR(50),
    date_op     DATE
);

INSERT INTO transactions (client_id, montant, statut, date_op) VALUES
(1,    120.00, 'validé',   '2024-01-10'),
(2,    NULL,   'en_attente','2024-01-11'),
(1,    120.00, 'validé',   '2024-01-10'),
(3,    450.50, NULL,       '2024-01-12'),
(NULL, 89.00,  'validé',   '2024-01-13'),
(4,    NULL,   'annulé',   NULL);

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
