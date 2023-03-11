module.exports = (error, req, res, next) => {
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  console.log(error);
  res.status(status).json(error);
};
