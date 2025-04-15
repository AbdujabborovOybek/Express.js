class response {
  success(res, msg = null, data = null) {
    return res.status(200).json({
      status: "success",
      message: msg || "Success",
      result: data,
    });
  }

  created(res, msg = null, data = null) {
    return res.status(201).json({
      status: "success",
      message: msg || "Created",
      result: data,
    });
  }

  noContent(res, msg = null) {
    return res.status(204).json({
      status: "success",
      message: msg || "No Content",
      data: null,
    });
  }

  badRequest(res, msg = null) {
    return res.status(400).json({
      status: "error",
      message: msg || "Bad Request",
      data: null,
    });
  }

  unauthorized(res, msg = null) {
    return res.status(401).json({
      status: "error",
      message: msg || "Unauthorized",
      data: null,
    });
  }

  forbidden(res, msg = null) {
    return res.status(403).json({
      status: "error",
      message: msg || "Forbidden",
      data: null,
    });
  }

  notFound(res, msg = null) {
    return res.status(404).json({
      status: "error",
      message: msg || "Not Found",
      data: null,
    });
  }

  conflict(res, msg = null) {
    return res.status(409).json({
      status: "error",
      message: msg || "Conflict",
      data: null,
    });
  }

  internalServerError(res, msg = null) {
    return res.status(500).json({
      status: "error",
      message: msg || "Internal Server Error",
      data: null,
    });
  }

  serviceUnavailable(res, msg = null) {
    return res.status(503).json({
      status: "error",
      message: msg || "Service Unavailable",
      data: null,
    });
  }

  custom(res, status, msg = null, data = null) {
    return res.status(status).json({
      status: "error",
      message: msg || "Error",
      data: data,
    });
  }

  error(res, msg = null, data = null) {
    return res.status(500).json({
      status: "error",
      message: msg || "Error",
      data: data,
    });
  }

  validationError(res, errors) {
    return res.status(422).json({
      status: "error",
      message: "Validation Error",
      errors: errors,
    });
  }
}

module.exports = new response();
