/**
 * Common database helper functions.
 */
class DBHelper {

  static get DB_VERSION() {
    return 1;
  }

  static get RESTAURANTS_STORES_NAME() {
    return  "restaurants";
  }

  static get RESTAURANT_DETAIL_STORE_NAME() {
    return "restaurant_details";
  }

  static get REVIEW_REQUEST_STORE_NAME() {
    return "review_request";
  }

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL() {
    const port = 1337; // Change this to your server port
    return `http://localhost:${port}/restaurants`;
  }

  static get REVIEWS_URL() {
    const port = 1337; // Change this to your server port
    return `http://localhost:${port}/reviews`;
  }


  /**
   * Add restaurants into IndexedDB.
   */

  static async addRestaurantsIntoIDB(restaurants) {
    const db = await idb.openDB(DBHelper.RESTAURANTS_STORES_NAME, DBHelper.DB_VERSION, DBHelper.createRestaurantsDB());
    const tx = db.transaction(DBHelper.RESTAURANTS_STORES_NAME, 'readwrite');
    restaurants.forEach(async (r) => {
      tx.store.add(r)
    });
    await tx.done;
  }


  /**
   * Get restaurants from IndexedDB.
   */

  static async getRestaurantsFromIDB() {
    const db = await idb.openDB(DBHelper.RESTAURANTS_STORES_NAME, DBHelper.DB_VERSION, DBHelper.createRestaurantsDB());
    const res = await db.getAllFromIndex(DBHelper.RESTAURANTS_STORES_NAME, 'createdAt');
    return res;
  }


  static createRestaurantsDB() {
    return {
       upgrade(db) {
        const store = db.createObjectStore(DBHelper.RESTAURANTS_STORES_NAME, {
          // The 'id' property of the object will be the key.
          keyPath: 'id',
          // If it isn't explicitly set, create a value by auto incrementing.
          autoIncrement: true,
        });
        store.createIndex('createdAt', 'createdAt');
      }
    }
  }

  static createRestaurantDB() {
    return {
       upgrade(db) {
        const store = db.createObjectStore(DBHelper.RESTAURANT_DETAIL_STORE_NAME, {
          // The 'id' property of the object will be the key.
          keyPath: 'id',
          // If it isn't explicitly set, create a value by auto incrementing.
          autoIncrement: true,
        });
      }
    }
  }

  static createReviewRequestDB() {
    return {
      upgrade(db) {
        const store = db.createObjectStore(DBHelper.REVIEW_REQUEST_STORE_NAME, {
          autoIncrement: true,
        });
      }
    }
  }

  /**
   * Add restaurant into IDB.
   */
  static async addRestaurantIntoIDB(restaurant) {
    const db = await idb.openDB(DBHelper.RESTAURANT_DETAIL_STORE_NAME, DBHelper.DB_VERSION, DBHelper.createRestaurantDB());
    await db.put(DBHelper.RESTAURANT_DETAIL_STORE_NAME, restaurant);
  }


  /**
   * Get a restaurant from IndexedDB.
   */

  static async getRestaurantFromIDB(id) {
    const db = await idb.openDB(DBHelper.RESTAURANT_DETAIL_STORE_NAME, DBHelper.DB_VERSION, DBHelper.createRestaurantDB());
    const value = await db.get(DBHelper.RESTAURANT_DETAIL_STORE_NAME, Number(id));
    return value;
  }

  /**
   * Add review request into IDB to defer submission of the form.
   */
  static async addReviewRequestIntoIDB(review) {
    const db = await idb.openDB(DBHelper.REVIEW_REQUEST_STORE_NAME, DBHelper.DB_VERSION, DBHelper.createReviewRequestDB());
    await db.put(DBHelper.REVIEW_REQUEST_STORE_NAME, review);
  }

  /**
   * Get a stored review request from IDB.
   */
  static async getReviewRequestFromIDB() {
    const db = await idb.openDB(DBHelper.REVIEW_REQUEST_STORE_NAME, DBHelper.DB_VERSION, DBHelper.createReviewRequestDB());
    const value = await db.getAll(DBHelper.REVIEW_REQUEST_STORE_NAME);
    return value[0];
  }

  /**
   * Delete review request from IDB.
   */
  static async deleteReviewRequestFromIDB() {
    await idb.deleteDB(DBHelper.REVIEW_REQUEST_STORE_NAME);
  }

  /**
   * Create a new restaurant review.
   */
  static async createRestaurantReview(body, callback) {
    try {
      const res = await fetch(DBHelper.REVIEWS_URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const json = await res.json();
      const data = {
        ...json,
        date: json.createdAt
      };
      callback(data, null);
    } catch (e) {
      callback(null, e);
    }
  }

  /**
   * Fetch all restaurants.
   */
  static async fetchRestaurants(callback) {
    try {
      const storedRestaurants = await DBHelper.getRestaurantsFromIDB();
      if (storedRestaurants.length > 0) {
        callback(null, storedRestaurants);
        return;
      }
      const res = await fetch(DBHelper.DATABASE_URL);
      const json = await res.json();
      callback(null, json);
      DBHelper.addRestaurantsIntoIDB(json);
    } catch(e) {
      callback(e, null);
    }
  }

  /**
   * Fetch a restaurant by its ID.
   */
  static async fetchRestaurantById(id, callback) {
    // fetch all restaurants with proper error handling.
    try {
      const storedRestaurant = await DBHelper.getRestaurantFromIDB(id);
      if (storedRestaurant) {
        callback(null, storedRestaurant);
        return;
      }
      const res = await fetch(`${DBHelper.DATABASE_URL}/${id}`);
      const json = await res.json();
      callback(null, json);
      DBHelper.addRestaurantIntoIDB(json);
    } catch(e) {
      callback(e, null);
    }
  }

  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  static fetchRestaurantByCuisine(cuisine, callback) {
    // Fetch all restaurants  with proper error handling
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given cuisine type
        const results = restaurants.filter(r => r.cuisine_type == cuisine);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  static fetchRestaurantByNeighborhood(neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given neighborhood
        const results = restaurants.filter(r => r.neighborhood == neighborhood);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        let results = restaurants
        if (cuisine != 'all') { // filter by cuisine
          results = results.filter(r => r.cuisine_type == cuisine);
        }
        if (neighborhood != 'all') { // filter by neighborhood
          results = results.filter(r => r.neighborhood == neighborhood);
        }
        callback(null, results);
      }
    });
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchNeighborhoods(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all neighborhoods from all restaurants
        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)
        callback(null, uniqueNeighborhoods);
      }
    });
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all cuisines from all restaurants
        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type)
        // Remove duplicates from cuisines
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i)
        callback(null, uniqueCuisines);
      }
    });
  }

  /**
   * Restaurant page URL.
   */
  static urlForRestaurant(restaurant) {
    return (`./restaurant.html?id=${restaurant.id}`);
  }

  static altForRestaurant(restaurant) {
    return restaurant.name;
  }

  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) {
    return (`/img/${restaurant.id}-medium.jpg`);
  }

  static sourcesForRestaurant(restaurant) {
    return [
      {
        srcset: `/img/${restaurant.id}-small.jpg`,
        media: "(max-width: 400px)"
      },
      {
        srcset: `/img/${restaurant.id}-large.jpg`,
        media: "(min-width: 1000px)"
      },
      {
        srcset: `/img/${restaurant.id}-medium.jpg`,
      },
      
    ]
  }

  /**
   * Map marker for a restaurant.
   */
   static mapMarkerForRestaurant(restaurant, map) {
    // https://leafletjs.com/reference-1.3.0.html#marker  
    const marker = new L.marker([restaurant.latlng.lat, restaurant.latlng.lng],
      {title: restaurant.name,
      alt: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant)
      })
      marker.addTo(newMap);
    return marker;
  } 
  /* static mapMarkerForRestaurant(restaurant, map) {
    const marker = new google.maps.Marker({
      position: restaurant.latlng,
      title: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant),
      map: map,
      animation: google.maps.Animation.DROP}
    );
    return marker;
  } */

}

