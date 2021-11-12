import Image from 'next/image';
import Link from 'next/link';
import { Home, LiftLogo, Moon, Sun } from '../components/Icons';

export default function Header(props) {
  console.log(props.username);
  return (
    <nav className="transition bg-white shadow-bottom dark:bg-gray-800">
      <div>
        <Image src="/images/logo.png" alt="logo" width={200} height={200} />
      </div>
      <div>
        {props.username ? (
          <>Logged in as {props.username} &nbsp;&nbsp;&nbsp;</>
        ) : (
          'Not logged in'
        )}
      </div>
      <ul>
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
            <Link href="/register">
              <a>Register</a>
            </Link>
          </>
        )}

        {props.username && (
          <Link href="/logout">
            <a>Logout</a>
          </Link>
        )}
      </ul>
    </nav>
    // <nav className="transition bg-white shadow-bottom dark:bg-gray-800">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <div className="flex items-center justify-between h-16">
    //       <div className="flex items-center">
    //         <div
    //           className="flex-shrink-0 cursor-pointer"
    //           onClick={() => {
    //             router.push('/home');
    //           }}
    //         >
    //           <LiftLogo />
    //         </div>

    //         <div className="md:block">
    //           <div className="ml-8 flex items-baseline space-x-4">
    //             <a
    //               aria-label="Home"
    //               onClick={() => {
    //                 router.push('/home');
    //               }}
    //               className="cursor-pointer dark:text-gray-300 text-gray-700 dark:hover:bg-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
    //             >
    //               <Home aria-label="Home" />
    //             </a>
    //           </div>
    //         </div>
    //       </div>
    //       <div className=" md:block">
    //         <div className="ml-4 flex items-center md:ml-6">
    //           <button
    //             aria-label="dark mode"
    //             onClick={toggleMode}
    //             className="bg-white hover:bg-gray-100 focus:ring focus:ring-gray-500 transition dark:bg-gray-800 dark:hover:bg-gray-900 focus:outline-none rounded-md p-1.5"
    //           >
    //             {mode === 'dark' ? (
    //               <Sun aria-hidden="true" />
    //             ) : (
    //               <Moon aria-hidden="true" />
    //             )}
    //           </button>
    //           <div className="ml-6 relative" ref={wrapperRef}>
    //             <div>
    //               <button
    //                 aria-label="profile menu"
    //                 className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
    //                 id="user-menu"
    //                 aria-haspopup="true"
    //                 onClick={() => setProfileOpen(!profileOpen)}
    //                 onKeyDown={() => setProfileOpen(!profileOpen)}
    //               >
    //                 <span className="sr-only">Open user menu</span>
    //                 {user?.photoURL ? (
    //                   <img
    //                     className="h-8 w-8 rounded-full"
    //                     src={user?.photoURL}
    //                     alt="User profile picture"
    //                   />
    //                 ) : (
    //                   <img
    //                     src="/whitepng.png"
    //                     className="h-8 w-8 rounded-full object-cover"
    //                   />
    //                 )}
    //               </button>
    //             </div>
    //             <Transition
    //               show={profileOpen}
    //               enter="transition ease-out duration-100 transform"
    //               enterFrom="opacity-0 scale-95"
    //               enterTo="opacity-100 scale-100"
    //               leave="transition ease-in duration-75 transform"
    //               leaveFrom="opacity-100 scale-100"
    //               leaveTo="opacity-0 scale-95"
    //             >
    //               <div
    //                 className="z-20 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 text-gray-700 dark:text-gray-100  bg-white dark:bg-black ring-1 ring-black ring-opacity-5"
    //                 role="menu"
    //                 aria-orientation="vertical"
    //                 aria-labelledby="user-menu"
    //               >
    //                 <a
    //                   href="#"
    //                   className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 "
    //                   role="menuitem"
    //                   tabIndex="0"
    //                   onClick={() => router.push('/profile')}
    //                 >
    //                   Profile
    //                 </a>

    //                 <a
    //                   href="#"
    //                   className="block px-4 py-2 text-sm  hover:bg-gray-100 dark:hover:bg-gray-800"
    //                   role="menuitem"
    //                   tabIndex="0"
    //                   onClick={logout}
    //                 >
    //                   Sign out
    //                 </a>
    //                 <a
    //                   href="#"
    //                   className="block px-4 py-2 text-sm  hover:bg-gray-100 dark:hover:bg-gray-800"
    //                   role="menuitem"
    //                   tabIndex="0"
    //                   onClick={openDeleteModal}
    //                 >
    //                   Delete account
    //                 </a>
    //               </div>
    //             </Transition>
    //             <DeleteAccountModal
    //               isDeleteModalOpen={isDeleteModalOpen}
    //               closeDeleteModal={closeDeleteModal}
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </nav>
  );
}
