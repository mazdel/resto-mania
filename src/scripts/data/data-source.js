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

  static async postReview(data) {
    const response = await fetch(`${API_ENDPOINT.POST_REVIEW}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  }
}

export default DataSource;
