import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../components/Layout';
import {
  addOrRemoveFromFollowingArray,
  getParsedCookie,
  setParsedCookie,
} from '../../util/cookies';

// import { getUser } from '../../util/database';

export default function User(props) {
  // This is to get the url query in the frontend
  // const router = useRouter();
  // const { user } = router.query;
  const [following, setFollowing] = useState(
    getParsedCookie('following') || [],
  );

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
      <strong>Personal User Page of {props.user.name}</strong>
      <div>Username: {props.user.username}</div>
      <div>Email: {props.user.email}</div>
      <button onClick={followClickHandler}>
        {following.some((cookieObj) => props.user.id === cookieObj.id)
          ? 'unfollow'
          : 'follow'}
      </button>
      <p></p>
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
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { getUser } = await import('../../util/database');
  console.log(context.query.userId);
  const user = await getUser(Number(context.query.userId));
  const { getWorkoutsByUserId } = await import('../../util/database');
  const workouts = await getWorkoutsByUserId(context.query.userId);
  return {
    props: {
      user,
      workouts,
    },
  };
}
