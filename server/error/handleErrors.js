/* eslint-disable no-unused-vars */
const handleErrors = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.success = err.success || false;
  err.message = err.message || "Internal server error";
  res.status(err.statusCode).json({ success: err.success, msg: err.message });
};

export default handleErrors;
