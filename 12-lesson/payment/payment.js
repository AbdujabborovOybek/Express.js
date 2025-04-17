const port = 8081;
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/payment", (req, res) => {
  const { amount, currency } = req.body;

  // Simulate payment processing
  console.log(`Processing payment of ${amount} ${currency}`);

  // Simulate success response
  res.status(200).json({
    status: "success",
    message: `Payment of ${amount} ${currency} processed successfully`,
  });
});

// if route not found
app.use((req, res) => {
  res.status(404).send("Route not found");
});

// if any error occurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Payment service running at http://localhost:${port}`);
});
