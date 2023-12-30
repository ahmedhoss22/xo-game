// withAdminAccess.js

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const withAdminAccess = (WrappedComponent) => {
  const AdminComponent = (props) => {
    const router = useRouter();
    const user = useSelector((state) => state.user); // Assuming your user details are stored in the Redux state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!user) {
        // Redirect unauthenticated users to the login page
        router.push('/login');
        return;
      }

      // Check if the user is an admin
      if (!user.isAdmin) {
        // Redirect non-admin users to the home page or another page
        router.push('/');
        return;
      }

      // Set loading to false once the authentication check is complete
      setLoading(false);
    }, [user, router]);

    if (loading) {
      // You might want to render a loading spinner or message here
      return <div>Loading...</div>;
    }

    // Render the wrapped component if the user is an admin
    return user && user.isAdmin ? <WrappedComponent {...props} /> : null;
  };

  return AdminComponent;
};

export default withAdminAccess;
