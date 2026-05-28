-- psql -U postgres -f datacleaner_simple.sql

CREATE DATABASE datacleaner ENCODING 'UTF8' TEMPLATE template0;
\connect datacleaner

CREATE TABLE users (
    id            SERIAL       PRIMARY KEY,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

-- admin / 1234
INSERT INTO users (email, password_hash)
VALUES ('admin', '$2b$12$K1QA2zGQqCmeqoYJxT9bqOLbh9y.k3V6uB3UYpFq0JGhFf3qWHLAm');

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
