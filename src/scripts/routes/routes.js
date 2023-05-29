import Home from '../views/pages/home';
import Favorite from '../views/pages/favorite';
import Resto from '../views/pages/resto';

const routes = {
  '/': Home,
  '/home': Home,
  '/favorite': Favorite,
  '/resto/:id': Resto,
};

export default routes;
