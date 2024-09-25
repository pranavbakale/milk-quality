import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(user
        ? ({
          isAuthenticated: true,
          isLoading: false,
          user
        })
        : ({
          isLoading: false
        })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:5000/user-details?token=${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          const userData = await response.json();
          dispatch({
            type: HANDLERS.INITIALIZE,
            payload: userData
          });
        } else {
          dispatch({
            type: HANDLERS.INITIALIZE
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: HANDLERS.INITIALIZE
        });
      }
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const signIn = async (userData) => {
    try {
      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: userData
      });
      localStorage.setItem('isAuthenticated', 'true');
    } catch (err) {
      console.error(err);
      throw new Error('Failed to sign in');
    }
  };


  const signUp = async (email, name, password) => {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password }),
        credentials: 'include',
      });

      if (response.ok) {
        const userData = await response.json();
        dispatch({
          type: HANDLERS.SIGN_IN,
          payload: userData
        });
        window.sessionStorage.setItem('authenticated', 'true');
      } else {
        throw new Error('Failed to sign up');
      }
    } catch (err) {
      console.error(err);
      throw new Error('Failed to sign up');
    }
  };

  // const signOut = async () => {
  //   try {
  //     localStorage.removeItem('isAuthenticated');
  //   }
  //   catch (err) {
  //     console.error(err);
  //     throw new Error('Failed to sign out');
  //   }
  // };
  const signOut = async () => {
    try {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('token'); // Remove token from local storage
      dispatch({
        type: HANDLERS.SIGN_OUT
      });
    } catch (err) {
      console.error(err);
      throw new Error('Failed to sign out');
    }
  };


  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
