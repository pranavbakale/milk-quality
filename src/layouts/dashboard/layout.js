import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { withAuthGuard } from 'src/hocs/with-auth-guard';
import { SideNav } from './side-nav';
import { TopNav } from './top-nav';

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH
  }
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%'
});

export const Layout = withAuthGuard((props) => {
  const { children } = props;
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);
  const [userName, setUserName] = useState(""); // State to store the username
  const [userAvatar, setUserAvatar] = useState(""); // State to store the username

  // Function to update userAvatar state
  const updateUserAvatar = (newAvatar) => {
    setUserAvatar(newAvatar);
  };


  const handlePathnameChange = useCallback(
    () => {
      if (openNav) {
        setOpenNav(false);
      }
    },
    [openNav]
  );

  useEffect(
    () => {
      handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname, handlePathnameChange]
  );

  // useEffect to fetch the user name when the component mounts
  useEffect(() => {
    // Fetch the user name from the appropriate source (e.g., from localStorage or from API)
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (!token) {
          throw new Error('Token not found in localStorage');
        }

        const response = await fetch(`http://localhost:5000/user-details?token=${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include token in the Authorization header
          },
          credentials: 'include',
        });
        if (response.ok) {
          const userData = await response.json();
          // console.log(userData);
          setUserName(userData.user.name);
          setUserAvatar(userData.user.avatar);
        } else {
          throw new Error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserName();
  }, [setUserAvatar, setUserName]);

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)}
        userName={userName}
        userAvatar={userAvatar}
        updateUserAvatar={updateUserAvatar} />
      <SideNav
        onClose={() => setOpenNav(false)}
        open={openNav}
      />
      <LayoutRoot>
        <LayoutContainer>
          {children}
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
});
