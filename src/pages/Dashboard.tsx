import { Button } from '@/components/ui/button';
import WeatherSkeleton from '@/components/WeatherSkeleton';
import { useGeolocation } from '@/hooks/use-geolocation';
import { RefreshCcw } from 'lucide-react';

const Dashboard = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeolocation();
  console.log(coordinates);

  const handleRefresh = () => {
    getLocation();

    if (coordinates) {
      // reload weather data
    }
  };

  if (locationLoading) {
    <WeatherSkeleton />;
  }

  return (
    <div className='space-y-4'>
      {/* Favourites Cities */}
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold tracking-tight'>My Location</h1>
        <Button variant={'outline'} size={'icon'} onClick={handleRefresh}>
          <RefreshCcw className='h-4 w-4' />
        </Button>
      </div>
      {/* Current and hourly weather */}
    </div>
  );
};

export default Dashboard;
