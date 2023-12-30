'use client'
import Loading from '@/components/loading/Loading';
import Homepage from '../components/home/Homepage'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectLoading, startLoading, stopLoading } from '@/redux/slices/loadingSlice';
// import { authMiddleware } from '../../authMiddleware'; // Import the authMiddleware

const Home = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  // useEffect(() => {
  //   // Add the authMiddleware check
  //   authMiddleware()
  //     .then((isAuthenticated) => {
  //       if (!isAuthenticated) {
  //         // Redirect or handle unauthorized access
  //         console.log('User is not authenticated. Redirect or handle accordingly.');
  //       } else {
  //         // Proceed with loading logic
  //         // dispatch(startLoading());
  //         setTimeout(() => {
  //           dispatch(stopLoading());
  //         }, 1000);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error checking authentication:', error);
  //     });
  // }, [dispatch]);
  useEffect(() => {
    // dispatch(startLoading());

    setTimeout(() => {
      dispatch(stopLoading());
    }, 1000);
  }, [dispatch]);

  return (
    <div>
      <div>
        {isLoading ? (
          <Loading text="XO Game is Loading ..."  />
        ) : (
          <Homepage />
        )}
      </div>
    </div>
  );
};

export default Home;
