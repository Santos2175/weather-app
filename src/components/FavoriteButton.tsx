import { Star } from 'lucide-react';
import { Button } from './ui/button';

const FavoriteButton = () => {
  return (
    <Button variant={'outline'} size={'icon'}>
      <Star />
    </Button>
  );
};

export default FavoriteButton;
