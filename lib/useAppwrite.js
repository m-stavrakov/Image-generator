import { useState, useEffect } from 'react';

// CUSTOM FETCH HOOK - just replacing fn with the function you need like getAllPosts
const useAppwrite = (fn) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
  
        try {
          const response = await fn();
          setData(response);
        } catch (error) {
          Alert.alert('Error', error.message);
        }finally {
          setIsLoading(false);
        }
      }
  
    useEffect(() => {
      fetchData();
    }, []);

    // this is for when the page is reloaded when user swipes up / refresh control
    const refetch = () => fetchData();

    return { data, isLoading, refetch };
};

export default useAppwrite;