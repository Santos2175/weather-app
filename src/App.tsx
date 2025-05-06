import { BrowserRouter } from 'react-router';
import Layout from '@/components/Layout.tsx';
import { ThemeProvider } from '@/context/theme-provider';

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <Layout>Hello World</Layout>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
