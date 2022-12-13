export class AppError extends Error {
  constructor(
    message = "Internal server error",
    statusCode = 500,
    success = false
  ) {
    super(message);
    this.statusCode = statusCode;
    this.success = success || this.constructor.success;
  }
}

export class RecordNotFoundError extends AppError {
  constructor(id, str) {
    super(
      str
        ? `${str} with id='${id}' was not found`
        : `Event with id='${id}' was not found`,
      400
    );
  }
}

export class NoFoundError extends AppError {
  constructor(str) {
    super(`There are no ${str}`, 400, true);
  }
}
