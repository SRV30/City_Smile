import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { getHomeData } from '../services/home.service';

const Home = () => {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const result = await getHomeData();
        if (result.success) {
          setHomeData(result.data.hero);
        } else {
          setError('Failed to load content');
        }
      } catch (err) {
        console.error(err);
        setError('Error connecting to server');
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <main>
      <Hero data={homeData} />
      {/* Other sections will be added here in future phases */}
    </main>
  );
};

export default Home;
