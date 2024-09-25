import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuthContext } from 'src/contexts/auth-context';

export const AuthGuard = (props) => {
  const { children } = props;
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      console.log('AuthGuard component mounted');
      console.log('isAuthenticated:', isAuthenticated);

      if (!router.isReady) {
        return;
      }

      // Prevent from calling twice in development mode with React.StrictMode enabled
      if (ignore.current) {
        return;
      }

      ignore.current = true;

      // Check if the user is authenticated
      if (!isAuthenticated) {
        console.log('Not authenticated, redirecting to login page');
        router.replace({
          pathname: '/auth/login',
          query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
        }).catch(console.error);
      } else {
        // If the user is authenticated, set checked to true
        setChecked(true);
      }
    };

    checkAuthentication();
  }, [router.isReady, isAuthenticated]);

  console.log('Checked:', checked);

  if (!checked) {
    console.log('Authentication check in progress...');
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};
