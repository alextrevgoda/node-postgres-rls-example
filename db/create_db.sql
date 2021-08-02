CREATE TABLE "rapid_users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR,
  "full_name" VARCHAR,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "apis" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR,
  "created_by" INTEGER REFERENCES rapid_users(id),
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

CREATE ROLE rapidapi_rls_user WITH PASSWORD 'rapidapi_rls_user';
ALTER USER rapidapi_rls_user login;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO rapidapi_rls_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO rapidapi_rls_user;
GRANT USAGE ON SCHEMA public TO rapidapi_rls_user;