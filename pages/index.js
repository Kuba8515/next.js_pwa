import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { isPropertySignature } from 'typescript';
import Layout from '../components/Layout';

export default function Home(props) {
  return (
    <Layout username={props.username}>
      <div
        className="h-full w-full"
        style={{
          backgroundSize: 'cover',
          // backgroundAttachment: 'fixed',
          backgroundImage: `url("/images/background_home.jpg")`,
          // minHeight: 100 vh,
        }}
      >
        <h1 className="text-4xl text-center font-bold pt-56">
          A healthy mind in a healthy body
        </h1>
        <h3 className="text-2xl text-center font-medium pt-6">
          Create a workout plan for your own fitness goals
        </h3>
        <p className="text-center space-x-14 pt-12">
          <Link href="/login">
            <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
              Log in
            </a>
          </Link>
          <Link href="/login">
            <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
              Sign up
            </a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}
