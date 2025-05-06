import { BrowserRouter } from 'react-router';
import Layout from '@/components/layout';

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>Hello World</Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
