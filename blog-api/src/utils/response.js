const successResponse = (
  res,
  data = null,
  message = "Success",
  code = 200,
) => {
  res.writeHead(code, {
    "Content-Type": "application/json",
  });

  res.end(
    JSON.stringify({
      success: true,
      statusCode: code,
      message,
      data,
    }),
  );
};


const errorResponse = (
  res,
  message = "Something went wrong",
  code = 500,
  errors = null,
) => {
  res.writeHead(code, {
    "Content-Type": "application/json",
  });

  res.end(
    JSON.stringify({
      success: false,
      statusCode: code,
      message,
      ...(errors && { errors }),
    }),
  );
};


module.exports = {
  successResponse,
  errorResponse,
};