'use client'
import Loading from '@/components/loading/Loading';
import Homepage from '../components/home/Homepage'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectLoading, startLoading, stopLoading } from '@/redux/slices/loadingSlice';
const Home = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(startLoading());

    setTimeout(() => {
      dispatch(stopLoading());
    }, 3000);
  }, [dispatch]);

  return (
    <div>
       <div>
      {isLoading ? (
        <Loading text="XO Game is Loading ..." />
      ) : (
        <Homepage/>   
        )}
    </div>
      
    </div>
  )
}



export default Home;
