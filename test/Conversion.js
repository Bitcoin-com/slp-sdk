const assert = require("assert");
const slp = require("./../lib/SLP").default;
const SLP = new slp({
  restURL: "https://rest.bitcoin.com/v1/"
});

describe("#Conversion", () => {
  describe("#toSLPAddress", () => {
    it(`should convert cashAddr to slpAddr`, async () => {
      try {
        const slpAddr = await SLP.Conversion.toSLPAddress(
          "bitcoincash:qz9tzs6d5097ejpg279rg0rnlhz546q4fslra7mh29"
        );
        assert.equal(
          slpAddr,
          "simpleledger:qz9tzs6d5097ejpg279rg0rnlhz546q4fsnck9wh5m"
        );
      } catch (error) {
        throw error;
      }
    });

    it(`should convert legacyAddr to slpAddr`, async () => {
      try {
        const slpAddr = await SLP.Conversion.toSLPAddress(
          "1DeLbv5EMzLEFDvQ8wZiKeSuPGGtSSz5HP"
        );
        assert.equal(
          slpAddr,
          "simpleledger:qz9tzs6d5097ejpg279rg0rnlhz546q4fsnck9wh5m"
        );
      } catch (error) {
        throw error;
      }
    });
  });

  describe("#toCashAddress", () => {
    it(`should convert slpAddr to cashAddr`, async () => {
      try {
        const cashAddr = await SLP.Conversion.toCashAddress(
          "simpleledger:qz9tzs6d5097ejpg279rg0rnlhz546q4fsnck9wh5m"
        );
        assert.equal(
          cashAddr,
          "bitcoincash:qz9tzs6d5097ejpg279rg0rnlhz546q4fslra7mh29"
        );
      } catch (error) {
        throw error;
      }
    });

    it(`should convert legacyAddr to cashAddr`, async () => {
      try {
        const cashAddr = await SLP.Conversion.toCashAddress(
          "1DeLbv5EMzLEFDvQ8wZiKeSuPGGtSSz5HP"
        );
        assert.equal(
          cashAddr,
          "bitcoincash:qz9tzs6d5097ejpg279rg0rnlhz546q4fslra7mh29"
        );
      } catch (error) {
        throw error;
      }
    });
  });

  describe("#toLegacyAddress", () => {
    it(`should convert slpAddr to legacyAddr`, async () => {
      try {
        const legacyAddr = await SLP.Conversion.toLegacyAddress(
          "simpleledger:qz9tzs6d5097ejpg279rg0rnlhz546q4fsnck9wh5m"
        );
        assert.equal(legacyAddr, "1DeLbv5EMzLEFDvQ8wZiKeSuPGGtSSz5HP");
      } catch (error) {
        throw error;
      }
    });

    it(`should convert cashAddr to legacyAddr`, async () => {
      try {
        const legacyAddr = await SLP.Conversion.toLegacyAddress(
          "bitcoincash:qz9tzs6d5097ejpg279rg0rnlhz546q4fslra7mh29"
        );
        assert.equal(legacyAddr, "1DeLbv5EMzLEFDvQ8wZiKeSuPGGtSSz5HP");
      } catch (error) {
        throw error;
      }
    });
  });
});
