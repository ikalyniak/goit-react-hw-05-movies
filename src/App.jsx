import { Switch, Route } from 'react-router-dom';

import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';
import HomePage from './views/HomePage';
import MoviesPage from './views/MoviesPage';
import MovieDetailsPage from './views/MovieDetailsPage';
import NotFoundView from './views/NotFoundView';
import './App.css';

function App() {
  return (
    <div className="App">
      <Container>
        <AppBar />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies">
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId" exact>
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;

//API Key: b3f7842d4247fd44ff025435e97fa37b
//https://www.themoviedb.org/talk/6150f01467dcc90043dd1173?page=1#6150f01467dcc90043dd1176
