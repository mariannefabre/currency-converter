const express = require("express");
const {
  convertCurrency,
  getAllCurrencies,
} = require("../services/currencyService");
const router = express.Router();

router.post("/convert", async (req, res) => {
  const { base, target, amount = 1 } = req.body;

  if (!base || !target) {
    return res
      .status(400)
      .json({ error: "Base and target currencies are required" });
  }

  try {
    const conversionResult = await convertCurrency(base, target, amount);
    res.json(conversionResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/currencies", async (req, res) => {
  try {
    const currencies = await getAllCurrencies();
    res.json(currencies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
