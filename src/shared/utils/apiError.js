export default class ApiError extends Error {

  constructor(message, status = 500, data = null) {

    super(message);

    this.name = "ApiError";
    this.status = status;
    this.data = data;
    this.success = false;

  }

  static badRequest(message = "Bad Request") {
    return new ApiError(message, 400);
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiError(message, 401);
  }

  static forbidden(message = "Forbidden") {
    return new ApiError(message, 403);
  }

  static notFound(message = "Not Found") {
    return new ApiError(message, 404);
  }

  static server(message = "Server Error") {
    return new ApiError(message, 500);
  }

}