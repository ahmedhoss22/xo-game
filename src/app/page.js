'use client'
import Loading from '@/components/loading/Loading';
import Homepage from './(private_route)/home/page'
import Login from './(guest_route)/login/page'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectLoading, startLoading, stopLoading } from '@/redux/slices/loadingSlice'; 
import WinModel from '@/components/winModel/WinModel';

const MainPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
 
  useEffect(() => {
    // dispatch(startLoading());

    setTimeout(() => {
      dispatch(stopLoading());
    }, 1000);
  }, [dispatch]);

  return (
    <div>
      <div>
       {/* <WinModel/> */}
         {/* {isLoading ? (
          <Loading text="XO Game is Loading ..."  />
        ) : (
          <Homepage/>

        )} */}
        <Login/>
      </div>
    </div>
  );
};

export default MainPage;
