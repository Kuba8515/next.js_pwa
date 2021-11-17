exports.up = async function up(sql) {
  console.log('Creating exercises table...');
  await sql`
    CREATE TABLE exercises (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
      title VARCHAR(60) NOT NULL,
      description VARCHAR(140) NOT NULL,
			image_url VARCHAR(100) NOT NULL
    );
  `;
};

exports.down = async function down(sql) {
  console.log('Dropping exercises table...');
  await sql`DROP TABLE exercises;`;
};
