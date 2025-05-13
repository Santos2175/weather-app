import { useFavorites } from '@/hooks/use-favorite';
import { ScrollArea } from './ui/scroll-area';
import FavoriteCityTablet from './FavoriteCityTablet';
import { Scrollbar } from '@radix-ui/react-scroll-area';

const FavoriteCities = () => {
  const { favorites, removeFavorite } = useFavorites();

  if (!favorites.length) {
    return null;
  }
  return (
    <>
      <h1 className='text-xl font-bold tracking-tight'>Favorites</h1>
      <ScrollArea className='w-full pb-4'>
        <div className='flex gap-4'>
          {favorites.map((city) => (
            <FavoriteCityTablet
              key={city.id}
              {...city}
              onRemove={() => removeFavorite.mutate(city.id)}
            />
          ))}
        </div>
        <Scrollbar orientation='horizontal' className='mt-2' />
      </ScrollArea>
    </>
  );
};

export default FavoriteCities;
