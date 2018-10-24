const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default;
import List from "./List";
import RawTransactions from "./RawTransactions";
import axios from "axios";

class SLP extends BITBOXSDK {
  constructor(config) {
    super(config);
    if (config && config.restURL && config.restURL !== "")
      this.restURL = config.restURL;
    else this.restURL = "https://rest.bitcoin.com/v1/";

    this.List = new List(this.restURL);
    this.RawTransactions = new RawTransactions(
      this.restURL,
      this.RawTransactions
    );
  }

  async list(id) {
    let path;
    if (!id) {
      path = `${this.restURL}slp/list`;
    } else {
      path = `${this.restURL}slp/list/${id}`;
    }
    try {
      const response = await axios.get(path);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data;
      throw error;
    }
  }

  async balancesForAddress(address) {
    try {
      const response = await axios.get(
        `${this.restURL}slp/balancesForAddress/${address}`
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data;
      throw error;
    }
  }

  async balance(address, id) {
    try {
      const response = await axios.get(
        `${this.restURL}slp/balance/${address}/${id}`
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data;
      throw error;
    }
  }

  async convert(address) {
    try {
      const response = await axios.get(
        `${this.restURL}slp/address/convert/${address}`
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data;
      throw error;
    }
  }
}

export default SLP;
