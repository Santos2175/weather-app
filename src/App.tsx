import { BrowserRouter, Routes, Route } from 'react-router';
import Layout from '@/components/Layout.tsx';
import { ThemeProvider } from '@/context/theme-provider';
import Dashboard from '@/pages/Dashboard';
import City from '@/pages/City';

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <Layout>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/city/:cityName' element={<City />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
