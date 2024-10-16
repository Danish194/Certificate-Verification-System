export const errorHandler = (err, res) => {
    res.status(500).json({
      message: err.message || 'Something went wrong',
      error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  };
  