import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../components/Layout';
import WorkoutCard from '../../components/WorkoutCard';
import {
  addOrRemoveFromFollowingArray,
  getParsedCookie,
  setParsedCookie,
} from '../../util/cookies';

// import { getUser } from '../../util/database';

export default function User(props) {
  const [following, setFollowing] = useState(
    getParsedCookie('following') || [],
  );
  if ('errors' in props) {
    return <div>Error: {props.errors[0].message}</div>;
  }

  if (!props.user) {
    return <div>No user passed...</div>;
  }

  function followClickHandler() {
    // 1. check the current state of the cookie
    const followingArray = getParsedCookie('following') || [];

    const newCookie = addOrRemoveFromFollowingArray(
      followingArray,
      props.user.id,
    );

    setParsedCookie('following', newCookie);
    setFollowing(newCookie);
  }
  return (
    <Layout username={props.username}>
      <Head>
        <title>Single user</title>
      </Head>
      <div className="text-center mb-2 md:mb-0 pr-4 mt-4">
        <strong>Personal User Page of {props.user.name}</strong>
        <div>Username: {props.user.username}</div>
        <div>Email: {props.user.email}</div>
        <button onClick={followClickHandler}>
          {following.some((cookieObj) => props.user.id === cookieObj.id)
            ? 'unfollow'
            : 'follow'}
        </button>
        <br />
        <strong>User Workout</strong>
        {props.workouts.map((workout) => {
          return (
            <div key={`workout-${workout.id}`}>
              <span>{workout.title}</span>
              <br />
              <span>{workout.description}</span>
            </div>
          );
        })}
        <main className="p-4">
          <div className="flex flex-wrap justify-between">
            <WorkoutCard
              image="/images/beginner.jpg"
              name="Very beginner workout plan"
            />
            <WorkoutCard
              image="/images/lean_and_mean.jpg"
              name="Lean and mean"
            />
            <WorkoutCard
              image="/images/bodyweight.jpg"
              name="Bodyweight workout"
            />
            <WorkoutCard image="/images/strong.jpg" name="Strong as an ox" />
            <WorkoutCard image="/images/bulkup.jpg" name="Bulk up" />
            <WorkoutCard image="/images/bigarms.jpg" name="Big friggin arms" />
            <WorkoutCard image="/images/beach.jpg" name="Build for the beach" />
          </div>
        </main>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { getUser, getWorkoutsByUserId, getUserBySessionToken } = await import(
    '../../util/database'
  );
  console.log(context.query.userId);
  const user = await getUser(Number(context.query.userId));
  const workouts = await getWorkoutsByUserId(context.query.userId);
  const sessionToken = context.req.cookies.sessionToken;
  const sessionUser = await getUserBySessionToken(sessionToken);
  console.log(sessionUser);

  if (!sessionUser) {
    return {
      redirect: {
        permanent: false,
        destination: `/login?returnTo=/users/${user.id}`,
      },
    };
  }

  if (sessionUser.id !== Number(context.query.userId)) {
    return {
      props: {
        errors: [{ message: 'Not allowed' }],
      },
    };
  }
  return {
    props: {
      user,
      workouts,
    },
  };
}
