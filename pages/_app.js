import '../styles/globals.css';
import { useCallback, useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [username, setUsername] = useState();

  const refreshUsername = useCallback(async () => {
    const response = await fetch('/api/profile');
    const profile = await response.json();

    console.log(profile);
    if ('errors' in profile) {
      console.log(profile.errors);
      return;
    }
    setUsername(profile.user.username);
  }, []);

  useEffect(() => {
    refreshUsername();
  }, [refreshUsername]);

  return (
    <div>
      <Component
        {...pageProps}
        username={username}
        refreshUsername={refreshUsername}
      />
    </div>
  );
}

export default MyApp;
