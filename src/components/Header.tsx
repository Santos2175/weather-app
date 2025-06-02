import { Link } from 'react-router-dom';
import { useTheme } from '@/context/theme-provider';
import ThemeToggle from './theme-toggle';
import Logo1 from '@/assets/logo.png';
import Logo2 from '@/assets/logo2.png';
import CitySearch from './CitySearch';

const Header = () => {
  const { theme } = useTheme();
  return (
    <header className='sticky top-0 z-30  w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2'>
      <div className='container mx-auto flex h-16 items-center gap-12 xs:gap-0 xs:justify-between px-4'>
        <Link to='/'>
          <img
            src={theme === 'dark' ? Logo1 : Logo2}
            alt='company logo'
            className='h-14'
          />
        </Link>

        <div className=' flex gap-4'>
          <CitySearch />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
