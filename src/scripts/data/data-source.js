// import CONFIG from '../globals/config';
import API_ENDPOINT from '../globals/api-endpoint';

class DataSource {
  static async listRestaurants() {
    const response = await fetch(API_ENDPOINT.LIST_RESTO);
    const result = await response.json();
    return result.restaurants;
  }

  static async detailRestaurant(idResto) {
    const response = await fetch(`${API_ENDPOINT.DETAIL_RESTO}${idResto}`);
    const result = await response.json();
    return result.restaurant;
  }
}

export default DataSource;
