import Head from 'next/head';
import { useState } from 'react';
import { AddIcon } from '../../components/Icons';
import Layout from '../../components/Layout';
import WorkoutCard from '../../components/WorkoutCard';
import {
  addOrRemoveFromFollowingArray,
  getParsedCookie,
  setParsedCookie,
} from '../../util/cookies';

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
        <br />
        <strong>User Workout</strong>
        <div className="md:mb-0 mt-4 text-center">
          <ul className="m-4 align-center p-8 ml-16 mr-16 gap-8 list-none">
            {props.workouts.map((workout) => {
              return (
                <li key={`workout-li-${workout.id}`}>
                  <WorkoutCard
                    title={workout.title}
                    link={workout.id}
                    description={workout.description}
                    image={workout.imageUrl}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { getUser, getUserBySessionToken, getWorkouts } = await import(
    '../../util/database'
  );
  console.log(context.query.userId);
  const user = await getUser(Number(context.query.userId));
  const workouts = await getWorkouts(context.query.id);
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
