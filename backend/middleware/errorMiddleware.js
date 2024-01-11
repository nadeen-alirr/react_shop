const notfound = (req, res, next) => {
  const error = new Error(`not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  let statuscode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message;

  if (error.name === "CastError" && error.kind === "ObjectId") {
    message = "Resourse not found";
    statuscode = 404;
  } 
    res.status(statuscode).json({
      message,
      stack: process.env.NODE_ENV === 'production' ? '🥞':error.stack
    });
};
export { notfound, errorHandler };
