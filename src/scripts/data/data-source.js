// import CONFIG from '../globals/config';
import API_ENDPOINT from '../globals/api-endpoint';

class DataSource {
  static async listRestaurants() {
    const response = await fetch(API_ENDPOINT.LIST_RESTO);
    const result = await response.json();
    return result.restaurants;
  }
}

export default DataSource;
