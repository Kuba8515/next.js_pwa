const exercises = [
  {
    id: 1,
    title: '',
    description: '',
    image_url: '',
  },
  {
    id: 2,
    title: '',
    description: '',
    image_url: '',
  },
  {
    id: 3,
    title: '',
    description: '',
    image_url: '',
  },
  {
    id: 4,
    title: '',
    description: '',
    image_url: '',
  },
  {
    id: 5,
    title: '',
    description: '',
    image_url: '',
  },
];

exports.down = async function down(sql) {
  console.log('Deleting exercises...');
  for (const workout of workouts) {
    await sql`
      DELETE FROM
        exercises
      WHERE
        title = ${workout.title} AND description = ${workout.description} AND image_url = ${workout.imageUrl}
    `;
  }
};
