
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Provider } from 'react-redux';
import { store } from '@/appRedux/store';
import HomeRoutes from '@/HomeRoutes';

const queryClient = new QueryClient();

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient} >
        <UserProvider>
          <HomeRoutes>
            <Component {...pageProps} />
          </HomeRoutes>
        </UserProvider>
      </QueryClientProvider>
    </Provider>
  );
}
export default App;