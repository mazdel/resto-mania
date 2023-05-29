import DataSource from '../../data/data-source';
import { createRestoItem } from '../templates/template-creator';

const Home = {
  async render() {
    return /* html */ `
    <section id='hero'>
      <div class='hero'>
        <img alt="hero image" src='/images/heros/hero-image_4.jpg'>
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
    dataSource.forEach((resto) => {
      restoContainer.innerHTML += createRestoItem(resto);
    });
    console.log(dataSource);
  },
};
export default Home;
