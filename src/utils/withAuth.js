import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login'); // Redirect to login if no token
      } else {
        setIsAuthenticated(true); // Set authenticated if token exists
      }
    }, [router]);

    return <WrappedComponent {...props} isAuthenticated={isAuthenticated} />;
  };

  // Set the display name for easier debugging
  AuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};

export default withAuth;
