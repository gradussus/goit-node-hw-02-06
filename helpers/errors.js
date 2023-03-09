class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}
class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}
class Error400 extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

module.exports = {
  ConflictError,
  UnauthorizedError,
  NotFoundError,
  Error400,
};
