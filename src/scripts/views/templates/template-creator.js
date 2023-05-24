import ellipsisParagraph from '../../utils/ellipsis-paragraph';

const createRestoItem = (resto) => /* html */ `
  <article id='${resto.id}' class="item-content col-3 col-md-10">
    <figure class='item-content-head'>
      
        <div class="item-legend-left">${resto.city}</div>
        <div class="item-legend-right">${resto.rating}</div>
      
      
      <div class='item-image'><img src='${resto.pictureId}'/>
      </div>
    </figure>
    <summary class='item-content-body'>
    <h3><a href='#'> ${resto.name}</a></h3>
      <p>${ellipsisParagraph(resto.description, 40)}</p>
    </summary>
  </article>
  `;
const createRestoDetail = (resto) => /* html */ `
  <div id='${resto.id}'></div>
`;
export { createRestoItem, createRestoDetail };
