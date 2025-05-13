import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from './ui/button';
import { useState } from 'react';
import { Loader2, Search } from 'lucide-react';
import { useSearchLocations } from '@/hooks/use-weather';
import { CommandSeparator } from 'cmdk';
import { useNavigate } from 'react-router';

const CitySearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const { data: locations, isLoading } = useSearchLocations(query);

  const handleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split('|');

    setOpen(false);
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  return (
    <>
      <Button
        variant='outline'
        className='relative w-full justify-start cursor-pointer text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64'
        onClick={() => setOpen(true)}>
        <Search className='h-4 w-4 mr-2' />
        Search cities...
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput
            placeholder='Search cities...'
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {query.length > 2 && !isLoading && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}

            {/* Favourites */}
            <CommandGroup heading='Favourites'>
              <CommandItem>Favourites</CommandItem>
            </CommandGroup>
            <CommandSeparator />

            {/* Recent Searches */}
            <CommandGroup heading='Recent Searches'>
              <CommandItem>Recent Searches</CommandItem>
            </CommandGroup>
            <CommandSeparator />

            {/* Search Results */}
            {locations && locations.length > 0 && (
              <CommandGroup heading='Suggestions'>
                {isLoading && (
                  <div className='flex items-center justify-center p-4'>
                    <Loader2 className='h-4 w-4 animate-spin' />
                  </div>
                )}

                {locations.map((location) => (
                  <CommandItem
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelect}>
                    <Search className='mr-2 h-4 w-4' />
                    <span>{location.name}</span>

                    {location.state && (
                      <span className='text-sm text-muted-foreground'>
                        , {location.state}
                      </span>
                    )}

                    <span className='text-sm text-muted-foreground'>
                      , {location.country}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
