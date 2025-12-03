export const notFoundMiddleware = (_, res) => {
  res.status(404).json({
    message: 'Route not found!',
  });
};
