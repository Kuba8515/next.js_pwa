import '../styles/globals.css';
import { useCallback, useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [username, setUsername] = useState();

  const callProfile = useCallback(async () => {
    const response = await fetch('/api/profile');
    const profile = await response.json();

    console.log(profile);
    if ('errors' in profile) {
      console.log(profile.errors);
      return;
    }
    console.log('Profile', profile.user.username);

    setUsername(profile.user.username);
  }, []);
  useEffect(() => {
    callProfile();
  }, [callProfile]);

  return (
    <div>
      <Component {...pageProps} username={username} callProfile={callProfile} />
    </div>
  );
}

export default MyApp;
