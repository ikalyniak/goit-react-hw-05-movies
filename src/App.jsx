import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Loader from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';
// import HomePage from './views/HomePage';
// import MoviesPage from './views/MoviesPage';
// import MovieDetailsPage from './views/MovieDetailsPage';
// import NotFoundView from './views/NotFoundView';
import './App.css';

const HomePage = lazy(() => import('./views/HomePage'));
const MoviesPage = lazy(() => import('./views/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./views/MovieDetailsPage'));
const NotFoundView = lazy(() => import('./views/NotFoundView'));

function App() {
  return (
    <div className="App">
      <Container>
        <AppBar />
        <Suspense
          fallback={
            <Loader
              type="ThreeDots"
              color="#00BFFF"
              height={80}
              width={80}
              timeout={3000}
            />
          }
        >
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>

            <Route path="/movies" exact>
              <MoviesPage />
            </Route>

            <Route path="/movies/:movieId">
              <MovieDetailsPage />
            </Route>

            <Route>
              <NotFoundView />
            </Route>
          </Switch>
        </Suspense>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
