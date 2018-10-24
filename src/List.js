import axios from "axios";
class List {
  constructor(restURL) {
    this.restURL = restURL;
  }

  async list(id) {
    let path;
    if (!id) {
      path = `${this.restURL}list`;
    } else {
      path = `${this.restURL}list/${id}`;
    }
    try {
      const response = await axios.get(path);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data;
      throw error;
    }
  }

  async list(id) {
    try {
      const response = await axios.get(`${this.restURL}list/${id}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data;
      throw error;
    }
  }
}

export default List;
