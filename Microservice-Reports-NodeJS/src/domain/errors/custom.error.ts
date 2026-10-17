export class CustomError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = 'CustomError';
  }

  static badRequest(message: string): CustomError {
    return new CustomError(400, message);
  }

  static notFound(message: string): CustomError {
    return new CustomError(404, message);
  }

  static internalServer(message: string): CustomError {
    return new CustomError(500, message);
  }
}
