class CircuitBreaker {
  constructor(requestFn, options = {}) {
    this.requestFn = requestFn;

    this.failureThreshold = options.failureThreshold ?? 3;   // fallas seguidas para abrir
    this.cooldownTime = options.cooldownTime ?? 10_000;     // ms que permanece OPEN
    this.successThreshold = options.successThreshold ?? 2;  // éxitos seguidos para cerrar desde HALF_OPEN

    this.state = 'CLOSED';
    this.failures = 0;
    this.successes = 0;
    this.nextAttempt = 0;
  }

  async call(...args) {
    if (this.state === 'OPEN') {
      if (Date.now() >= this.nextAttempt) {
        this.state = 'HALF_OPEN';
      } else {
        const err = new Error('Circuit is OPEN: fast-fail');
        err.code = 'OPEN_CIRCUIT';
        throw err;
      }
    }

    try {
      const result = await this.requestFn(...args);
      this._onSuccess();
      return result;
    } catch (err) {
      this._onFailure(err);
      throw err;
    }
  }

  _onSuccess() {
    if (this.state === 'HALF_OPEN') {
      this.successes += 1;
      if (this.successes >= this.successThreshold) {
        this._close();
      }
    } else {
      this._resetCounts();
    }
  }

  _onFailure() {
    this.failures += 1;
    if (this.state === 'HALF_OPEN' || this.failures >= this.failureThreshold) {
      this._open();
    }
  }

  _open() {
    this.state = 'OPEN';
    this.nextAttempt = Date.now() + this.cooldownTime;
    this.successes = 0;
  }

  _close() {
    this.state = 'CLOSED';
    this._resetCounts();
  }

  _resetCounts() {
    this.failures = 0;
    this.successes = 0;
  }

  getStatus() {
    return {
      state: this.state,
      failures: this.failures,
      successes: this.successes,
      nextAttempt: this.nextAttempt,
      failureThreshold: this.failureThreshold,
      successThreshold: this.successThreshold,
      cooldownTime: this.cooldownTime
    };
  }
}

module.exports = { CircuitBreaker };
