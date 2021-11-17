import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { isPropertySignature } from 'typescript';
import Layout from '../components/Layout';

export default function Home(props) {
  return (
    // <Layout username={props.username}>
    //   <h1 className="text-4xl text-center font-bold pt-56">
    //     A healthy mind in a healthy body
    //   </h1>
    //   <h3 className="text-2xl text-center font-medium pt-6">
    //     Create a workout plan for your own fitness goals
    //   </h3>
    //   <p className="text-center space-x-14 pt-12">
    //     <Link href="/login">
    //       <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
    //         Log in
    //       </a>
    //     </Link>
    //     <Link href="/login">
    //       <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
    //         Sign up
    //       </a>
    //     </Link>
    //   </p>
    // </Layout>
    <main>
      <div className="flex items-center min-h-screen p-6 bg-white dark:bg-gray-900">
        <div className="flex-0 h-full max-w-4xl mx-auto overflow-hidden bg-gray-100 rounded-lg shadow-xl dark:bg-black">
          <div className="flex flex-col overflow-y-auto md:flex-row w-72 sm:w-80 md:w-auto">
            <div className="h-48 md:h-auto md:w-1/2 ">
              <Image
                aria-hidden="true"
                className="object-cover w-full h-full dark:hidden"
                src="/images/whitepng.png"
                alt="Office"
                height="640px"
                width="426px"
              />
            </div>
            <main className="flex items-center justify-center md:p-6 mt-2 py-6 md:mt-0 md:w-1/2">
              <div className=" text-gray-700 dark:text-gray-200  ">
                <h1 className="px-0 sm:px-4 md:px-0 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-2 md:mb-3 tracking-tighter md:leading-3 ">
                  A healthy mind in a healthy body
                </h1>

                <h2 className="  md:text-lg text-center text-base font-medium mb-6 md:mb-12 leading-3  lg:leading-3 ">
                  Train hard, track smart.
                </h2>
                <div className="pt-2 md:pt-0 text-center space-x-14">
                  <Link href="/login">
                    <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                      Log in
                    </a>
                  </Link>
                  <Link href="/register">
                    <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                      Sign up
                    </a>
                  </Link>
                  <br />
                  <div className="relative right-7 mt-8">
                    <Link href="/users">
                      <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                        Continue as guest
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </main>
  );
}
