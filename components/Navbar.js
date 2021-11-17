import { Transition } from '@headlessui/react';
import { WindmillContext } from '@windmill/react-ui';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import {
  Calender,
  DatePicker,
  Home,
  LiftLogo,
  Moon,
  Sun,
} from '../components/Icons';

export default function Header(props) {
  const { mode, toggleMode } = useContext(WindmillContext);
  const router = useRouter();
  return (
    <nav className="transition bg-white shadow-bottom dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div
              className="flex-shrink-0 cursor-pointer"
              onClick={() => {
                router.push('/');
              }}
            >
              <LiftLogo />
            </div>
            <div className="md:block">
              <div className="ml-8 flex items-baseline space-x-4">
                <a
                  aria-label="Home"
                  onClick={() => {
                    router.push('/');
                  }}
                  className="cursor-pointer dark:text-gray-300 text-gray-700 dark:hover:bg-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <Home aria-label="Home" />
                </a>

                {/* <DatePicker
            aria-label="Calender"
            name="startDate"
            dateFormat="MMM dd, yyyy"
            closeOnScroll={true}
            withPortal
            customInput={
              <div className="cursor-pointer dark:text-gray-300 text-gray-700 dark:hover:bg-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                <Calender />
              </div>
            }
          /> */}
              </div>
            </div>
            <div className=" md:block ml-8">
              {props.username ? (
                <>Logged in as {props.username} &nbsp;&nbsp;&nbsp;</>
              ) : (
                'Not logged in'
              )}
            </div>
            <div className="justify-end ml-auto">
              <ul className="ml-72 flex items-baseline space-x-4 gap-20 font-bold">
                <li>
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/users">
                    <a>Admin</a>
                  </Link>
                </li>
                <li>
                  <Link href="/users">
                    <a>Users</a>
                  </Link>
                </li>
                {!props.username && (
                  <>
                    <Link href="/login">
                      <a>Login</a>
                    </Link>
                    <Link
                      href="/register"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                    >
                      <a>Get Started</a>
                    </Link>
                  </>
                )}

                {props.username && <a href="/logout">Logout</a>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
