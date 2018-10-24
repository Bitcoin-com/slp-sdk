import axios from "axios"
class DataRetrieval {
  constructor(restURL) {
    this.restURL = restURL
  }

  async balancesForAddress(address) {
    try {
      const response = await axios.get(
        `${this.restURL}dataRetrieval/balancesForAddress/${address}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  async balancesForId(propertyId) {
    try {
      const response = await axios.get(
        `${this.restURL}dataRetrieval/balancesForId/${propertyId}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  async balance(address, propertyId) {
    try {
      const response = await axios.get(
        `${this.restURL}dataRetrieval/balance/${address}/${propertyId}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  async balancesHash(propertyId) {
    try {
      const response = await axios.get(
        `${this.restURL}dataRetrieval/balancesHash/${propertyId}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  async crowdSale(propertyId) {
    try {
      const response = await axios.get(
        `${this.restURL}dataRetrieval/crowdSale/${propertyId}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  async currentConsensusHash() {
    try {
      const response = await axios.get(
        `${this.restURL}dataRetrieval/currentConsensusHash`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  async grants(propertyId) {
    try {
      const response = await axios.get(
        `${this.restURL}dataRetrieval/grants/${propertyId}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  async info() {
    try {
      const response = await axios.get(`${this.restURL}dataRetrieval/info`)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  async payload(txid) {
    try {
      const response = await axios.get(
        `${this.restURL}dataRetrieval/payload/${txid}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  async property(propertyId) {
    try {
      const response = await axios.get(
        `${this.restURL}dataRetrieval/property/${propertyId}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  async seedBlocks(startBlock, endBlock) {
    try {
      const response = await axios.get(
        `${this.restURL}dataRetrieval/seedBlocks/${startBlock}/${endBlock}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  async STO(txid, recipientFilter) {
    try {
      const response = await axios.get(
        `${this.restURL}dataRetrieval/STO/${txid}/${recipientFilter}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  async transaction(txid) {
    try {
      const response = await axios.get(
        `${this.restURL}dataRetrieval/transaction/${txid}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  async blockTransactions(index) {
    try {
      const response = await axios.get(
        `${this.restURL}dataRetrieval/blockTransactions/${index}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  async pendingTransactions(address) {
    let path = `${this.restURL}dataRetrieval/pendingTransactions`
    if (address) {
      path = `${
        this.restURL
      }dataRetrieval/pendingTransactions?address=${address}`
    }
    try {
      const response = await axios.get(path)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  async properties() {
    try {
      const response = await axios.get(
        `${this.restURL}dataRetrieval/properties`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  async transactions() {
    try {
      const response = await axios.get(
        `${this.restURL}dataRetrieval/transactions`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  async frozenBalance(address, propertyId) {
    try {
      const response = await axios.get(
        `${this.restURL}dataRetrieval/frozenBalance/${address}/${propertyId}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  async frozenBalanceForAddress(address) {
    try {
      const response = await axios.get(
        `${this.restURL}dataRetrieval/frozenBalanceForAddress/${address}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  async frozenBalanceForId(propertyId) {
    try {
      const response = await axios.get(
        `${this.restURL}dataRetrieval/frozenBalanceForId/${propertyId}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }
}

export default DataRetrieval
