import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';

// import { getUsers } from '../../util/database';

export default function Users(props) {
  return (
    <Layout username={props.username}>
      <Head>
        <title>Users</title>
      </Head>
      <div className="text-center mb-2 md:mb-0 pr-4 mt-32">
        <h2 className="font-bold text-2xl">Users List</h2>
        <ul className="list-disc mt-8">
          {props.users.map((user) => {
            return (
              <li key={`user-li-${user.id}`}>
                {user.username}:{' '}
                <Link href={`/users/${user.id}`}>
                  <a>{user.username} single page</a>
                </Link>
                <div>{user.following ? '❤️' : '🖤'}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { getUsers } = await import('../../util/database');
  const users = await getUsers();
  console.log(users);
  const cookies = context.req.cookies.following || '[]';
  const following = JSON.parse(cookies);
  const glorifiedUsers = users.map((user) => {
    const isTheUserFollowed = following.some((userCookieObj) => {
      return Number(user.id) === userCookieObj.id;
    });

    const userObj = following.find((cookieObj) => {
      return cookieObj.id === Number(user.id);
    });

    return {
      ...user,
      following: isTheUserFollowed,
    };
  });
  return {
    props: {
      users: glorifiedUsers,
    },
  };
}
