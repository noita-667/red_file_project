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
