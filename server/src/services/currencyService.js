const axios = require("axios");

const getAllCurrencies = async () => {
  try {
    const apiUrl = `${process.env.API_URL}/symbols?access_key=${process.env.API_KEY}`;
    const response = await axios.get(apiUrl);
    const currencyCodes = Object.keys(response.data.symbols);
    if (response?.data?.success !== true) {
      throw new Error("No currencies found");
    }
    return currencyCodes;
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const getExchangeRate = async (baseCurrency, outputCurrency) => {
  try {
    const apiUrl = `${process.env.API_URL}/latest?access_key=${process.env.API_KEY}&base=${baseCurrency}&symbols=${outputCurrency}`;
    const response = await axios.get(apiUrl);
    const { rates, date, timestamp } = response.data;
    const exchangeRate = rates[outputCurrency];
    if (response?.data?.success !== true) {
      throw new Error(`No exchange rate found for ${outputCurrency}`);
    }

    return {
      exchangeRate,
      date,
      timestamp,
    };
  } catch (error) {
    console.error(`Error fetching exchange rate: ${error.message}`);
    throw error;
  }
};

const convertCurrency = async (baseCurrency, outputCurrency, amount) => {
  try {
    const { exchangeRate, date, timestamp } = await getExchangeRate(
      baseCurrency,
      outputCurrency
    );
    const convertedAmount = exchangeRate * amount;
    return {
      exchangeRate,
      date,
      timestamp,
      convertedAmount,
    };
  } catch (error) {
    throw new Error(`Failed to convert currency: ${error.message}`);
  }
};

module.exports = {
  convertCurrency,
  getAllCurrencies,
};
