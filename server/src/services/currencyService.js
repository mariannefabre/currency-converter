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

const getConversionData = async (baseCurrency, outputCurrency, amount) => {
  try {
    const apiUrl = `${process.env.SECOND_API_URL}/${process.env.SECOND_API_KEY}/pair/${baseCurrency}/${outputCurrency}/${amount}`;
    const response = await axios.get(apiUrl);
    const { conversion_rate, time_last_update_utc, conversion_result } =
      response.data;
    console.log(response.data);
    if (response?.data?.result !== "success") {
      throw new Error(
        `No conversion found for ${baseCurrency}/${outputCurrency}`
      );
    }
    return {
      exchangeRate: conversion_rate,
      lastUpdateUtc: time_last_update_utc,
      conversionResult: conversion_result,
    };
  } catch (error) {
    console.error(`Error with the conversion: ${error.message}`);
    throw error;
  }
};

module.exports = {
  getAllCurrencies,
  getConversionData,
};
