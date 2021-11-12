const users = [
  { id: '1', username: 'Ines', name: 'Ines Habacht', email: 'yellow' },
  { id: '2', username: 'Lucas', name: 'Lucas Oblast', email: 'blue' },
  { id: '3', username: 'Andrea', name: 'Andrea Kanneher', email: 'purple' },
  { id: '4', username: 'Ingo', name: 'Ingo Bingo', email: 'black' },
];

exports.up = async function up(sql) {
  console.log('Inserting users...');

  // await sql`
  //   INSERT INTO users
  //     (username, name, id, email)
  //   VALUES
  //     ('Ines', 'Ines Habacht', '1', 'ines@gmail.com'),
  //     ('Lucas', 'Lucas Oblast', '2', 'lucas@gmail.com'),
  //     ('Andrea', 'Andrea Kanneher', '3', 'andrea@gmail.com'),
  //     ('Ingo', 'Ingo Bingo', '4', 'ingo@gmail.com');
  //   `;
  for (const user of users) {
    await sql`
      INSERT INTO users
        (id, username, name, email)
      VALUES
        (${user.id}, ${user.username}, ${user.name}, ${user.email});
    `;
  }
};

exports.down = async function down(sql) {
  console.log('Deleting users...');

  // await sql`
  //   DELETE FROM
  //     users
  //   WHERE
  //     (name = 'Ines Habacht' AND username = 'Ines' AND id = '1' AND email = 'ines@gmail.com') OR
  //     (name = 'Lucas Oblast' AND username = 'Lucas' AND id = '2' AND email = 'lucas@gmail.com') OR
  //     (name = 'Andrea Kanneher' AND username = 'Andrea' AND id = '3' AND email = 'andrea@gmail.com') OR
  //     (name = 'Ingo Bingo' AND username = 'Ingo' AND id = '4' AND email = 'ingo@gmail.com');`;
  for (const user of users) {
    await sql`
      DELETE FROM
        users
      WHERE
        id = ${user.id} AND username = ${user.username} AND name = ${user.name} AND email = ${user.email}
    `;
  }
};
