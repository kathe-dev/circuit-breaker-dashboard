// Simula un servicio externo con fallas aleatorias controlables
function unstableApi({ failRate = 0.5, minDelayMs = 100, maxDelayMs = 400 } = {}) {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * (maxDelayMs - minDelayMs + 1)) + minDelayMs;
    setTimeout(() => {
      const roll = Math.random();
      if (roll < failRate) {
        const err = new Error('External service failure');
        err.code = 'EXTERNAL_FAIL';
        reject(err);
      } else {
        resolve({ message: '✅ Success from external service', roll, delay });
      }
    }, delay);
  });
}

module.exports = { unstableApi };
