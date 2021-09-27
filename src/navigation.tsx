import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { AntsPage } from './pages/Ants/AntsPage';

export function AppNavigation() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect from="/" exact to="/ants" />
        <Route exact path="/ants">
          <AntsPage />
        </Route>
        <Route>
          <div>404 not found</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
