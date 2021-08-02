ALTER TABLE "rapid_users" ENABLE ROW LEVEL SECURITY;

CREATE POLICY rapid_user_policies ON "rapid_users"
USING (true);

-- ##########################################################################

ALTER TABLE "apis" ENABLE ROW LEVEL SECURITY;

CREATE POLICY api_select ON "apis" FOR SELECT
USING (
  created_by = current_setting('app.user_id')::BIGINT 
);

CREATE POLICY api_insert ON "apis" FOR INSERT
WITH CHECK (true);

CREATE POLICY api_update ON "apis" FOR UPDATE
USING (
  created_by = current_setting('app.user_id')::BIGINT 
);

CREATE POLICY api_delete ON "apis" FOR DELETE
USING (
  created_by = current_setting('app.user_id')::BIGINT 
);

ALTER USER postgres NOBYPASSRLS;