const workouts = [
  {
    id: 1,
    title: 'Very beginner workout plan',
    description:
      'Goal: general strength, stability, mobility and conditioning / Ability level: very beginner - beginner',
  },
  {
    id: 2,
    title: 'Lean and mean',
    description:
      'Goal: blend of muscle building, fat loss, and strength / Ability level: beginner and intermediate',
  },
  {
    id: 3,
    title: 'Bodyweight workout',
    description:
      'Goal: general strength, stability, mobility and conditioning / Ability level: intermediate - advanced',
  },

  {
    id: 4,
    title: 'Strong as an ox',
    description:
      'Goal: power and strength / Ability level: intermediate - advanced',
  },
  {
    id: 5,
    title: 'Bulk up',
    description:
      'Goal: increase muscle-mass, fat loss / Ability level: intermediate',
  },
  {
    id: 6,
    title: 'Big friggin arms',
    description:
      'Goal: re-stimulate muscle growth / Ability level: All levels, suggested for intermediates',
  },
  {
    id: 7,
    title: 'Build for the beach',
    description:
      'Goal: muscle-building, fat loss, and athletic conditioning / Ability level: intermediate (scaleable for beginner)',
  },
];

exports.up = async function up(sql) {
  console.log('Inserting workouts...');
  for (const workout of workouts) {
    await sql`
      INSERT INTO workouts
        (title, description)
      VALUES
        (${workout.title}, ${workout.description});
    `;
  }
};

exports.down = async function down(sql) {
  console.log('Deleting workouts...');
  for (const workout of workouts) {
    await sql`
      DELETE FROM
        workouts
      WHERE
        title = ${workout.title} AND description = ${workout.description};
    `;
  }
};
