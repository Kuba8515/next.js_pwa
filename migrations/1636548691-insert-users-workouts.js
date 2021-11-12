const usersWorkouts = [
  {
    user_id: 1,
    workout_id: 1,
  },
  {
    user_id: 3,
    workout_id: 4,
  },
  {
    user_id: 2,
    workout_id: 6,
  },
  {
    user_id: 4,
    workout_id: 7,
  },
];

exports.up = async function up(sql) {
  console.log('Inserting user_workouts...');
  for (const usersWorkout of usersWorkouts) {
    await sql`
      INSERT INTO users_workouts
        (user_id, workout_id)
      VALUES
        (${usersWorkout.user_id}, ${usersWorkout.workout_id})`;
  }
};

exports.down = async function down(sql) {
  console.log('Deleting user_workouts...');
  for (const usersWorkout of usersWorkouts) {
    await sql`
      DELETE FROM
        users_workouts
      WHERE
        user_id = ${usersWorkout.user_id} AND workout_id = ${usersWorkout.workout_id};
    `;
  }
};
