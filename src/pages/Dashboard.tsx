import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import WeatherSkeleton from '@/components/WeatherSkeleton';
import { useGeolocation } from '@/hooks/use-geolocation';
import { AlertTriangle, MapPin, RefreshCcw } from 'lucide-react';

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

  // Show skeleton on Loading
  if (locationLoading) {
    return <WeatherSkeleton />;
  }

  // Show alert on location error
  if (locationError) {
    return (
      <Alert variant={'destructive'}>
        <AlertTriangle className='h-4 w-4' />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className='flex flex-col gap-6'>
          <p>{locationError}</p>
          <Button onClick={getLocation} variant={'outline'} className='w-fit'>
            <MapPin className='mr-2 h-4 w-4' />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // Show error if no coordinates
  if (!coordinates) {
    return (
      <Alert variant={'destructive'}>
        <AlertTitle className='h-4 w-4' />
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className='flex flex-col gap-6'>
          <p>Please enable location access to see your local weather.</p>
          <Button onClick={getLocation} variant={'outline'} className='w-fit'>
            <MapPin className='mr-2 h-4 w-4' />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
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
