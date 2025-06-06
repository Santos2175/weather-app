import { Loader2, X } from 'lucide-react';
import { Button } from './ui/button';
import { useWeatherQuery } from '@/hooks/use-weather';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

interface IFavoriteTabletProps {
  id: string;
  name: string;
  lat: number;
  lon: number;
  onRemove: (id: string) => void;
}
const FavoriteCityTablet = ({
  id,
  name,
  lat,
  lon,
  onRemove,
}: IFavoriteTabletProps) => {
  const navigate = useNavigate();
  const { data: weather, isLoading } = useWeatherQuery({ lat, lon });

  const handleClick = () => {
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };
  return (
    <div
      onClick={handleClick}
      role='button'
      className='relative flex min-w-[200px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-2 sm:p-4 pr-4 sm:pr-8 shadow-sm transition-all hover:shadow-lg'
      tabIndex={0}>
      <Button
        variant={'ghost'}
        size={'icon'}
        className='absolute -right-0.5 -top-0.5 sm:right-1 sm:top-1 h-6 w-6 rounded-full p-0 hover:text-destructive-foreground group-hover:opacity-100'
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
          toast.error(`Removed ${name} from Favorites`);
        }}>
        <X className='h-4 w-4' />
      </Button>

      {isLoading ? (
        <div className='flex items-center h-8 justify-center'>
          <Loader2 className='h-4 w-4 animate-spin' />
        </div>
      ) : weather ? (
        <>
          <div className='flex items-center sm:gap-2'>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
              className='h-8 w-8'
            />

            <div>
              <p className='font-medium'>{name}</p>
              <p className='text-xs text-muted-foreground'>
                {weather.sys.country}
              </p>
            </div>
          </div>

          <div className='ml-auto text-right'>
            <p className='text-lg sm:text-xl font-bold'>
              {Math.round(weather.main.temp)}°
            </p>
            <p className='text-[11px] sm:text-xs capitalize text-muted-foreground'>
              {weather.weather[0].description}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default FavoriteCityTablet;
