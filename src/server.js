const express = require('express');
const { CircuitBreaker } = require('./circuitBreaker');
const { unstableApi } = require('./externalService');

const app = express();
const PORT = process.env.PORT || 3000;

const breaker = new CircuitBreaker(unstableApi, {
  failureThreshold: Number(process.env.FAILURE_THRESHOLD) || 3,
  cooldownTime: Number(process.env.COOLDOWN_MS) || 5000,
  successThreshold: Number(process.env.SUCCESS_THRESHOLD) || 2
});

app.get('/test', async (req, res) => {
  const failRate = req.query.failRate ? Number(req.query.failRate) : 0.5;

  try {
    const data = await breaker.call({ failRate });
    res.json({ ok: true, data, breaker: breaker.getStatus() });
  } catch (err) {
    const isOpen = breaker.getStatus().state === 'OPEN';
    res.status(isOpen ? 503 : 500).json({
      ok: false,
      error: err.message,
      code: err.code || 'ERR',
      breaker: breaker.getStatus()
    });
  }
});

app.get('/status', (req, res) => {
  res.json(breaker.getStatus());
});

const path = require("path");

// Servir carpeta public
app.use(express.static(path.join(__dirname, "../public")));


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
