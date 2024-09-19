const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const currencyRoutes = require("./src/routes/currencyRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/api", currencyRoutes);

app.get("/", (request, result) => {
  result.send("Currency converter server is running.");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
