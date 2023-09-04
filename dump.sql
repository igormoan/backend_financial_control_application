DROP TABLE IF EXISTS billing;
DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    cpf VARCHAR(11) UNIQUE,
    phone VARCHAR(14),
    created_date TIMESTAMP DEFAULT NOW()
);

CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    phone VARCHAR(14) NOT NULL,
    zip VARCHAR(8),
    address TEXT, 
    complement TEXT,
    district TEXT,
    city TEXT,
    state VARCHAR(2),
    is_late BOOLEAN NOT NULL DEFAULT false,
    created_date TIMESTAMP DEFAULT NOW(),
    updated_date TIMESTAMP DEFAULT NOW()
);

CREATE TABLE billing (
    id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL REFERENCES clients(id),
    value DECIMAL(12, 2) CHECK(value > 0),
    due_date TIMESTAMP NOT NULL,
    paid BOOLEAN NOT NULL,
    description TEXT,
    created_date TIMESTAMP DEFAULT NOW()
);