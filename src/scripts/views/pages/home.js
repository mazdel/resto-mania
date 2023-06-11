import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/blur-up/ls.blur-up';

import DataSource from '../../data/data-source';
import {
  createRestoItem,
  createNotFoundResto,
} from '../templates/template-creator';

const Home = {
  async render() {
    return /* html */ `
    <section id='hero'>
      <div class='hero'>
        <picture>
          <source media="(min-width: 768px)" data-srcset="/images/alt_heroes/vietnamese-food.jpg">
          <source media="(min-width: 480px)" data-srcset="/images/alt_heroes/vietnamese-food-medium.jpg">
          <img alt="hero image" src="/images/alt_heroes/vietnamese-food-lqip.jpg" class="lazyload" data-src='/images/alt_heroes/vietnamese-food-small.jpg'>
        </picture>
      </div>
    </section>
    <section class='content' id="content">
      <div class="head-content">
        <h2>Daftar d'Best Restaurant</h2>
      </div>
      <div class="body-content" id="resto-list">
      </div>
    </section>
    `;
  },
  async afterRender() {
    window.scrollTo(0, 0);
    const dataSource = await DataSource.listRestaurants();
    const restoContainer = document.querySelector('#resto-list');
    if (dataSource.length === 0) {
      restoContainer.innerHTML = createNotFoundResto;
      return false;
    }
    dataSource.forEach((resto) => {
      restoContainer.innerHTML += createRestoItem(resto);
    });
    return true;
  },
};
export default Home;
