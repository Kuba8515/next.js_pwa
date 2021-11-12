exports.up = async function up(sql) {
  await sql`
    ALTER TABLE
      users
    ADD COLUMN
      password_hash varchar(60) NOT NULL
  `;
};

exports.down = async function down(sql) {
  await sql`
    ALTER TABLE
      users
    DROP COLUMN
      password_hash
  `;
};
