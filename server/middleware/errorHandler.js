export function notFoundHandler(_request, response) {
  response.status(404).json({ error: 'Route not found.' });
}

export function errorHandler(error, _request, response, _next) {
  console.error('Unhandled API error:', error.message);
  response.status(error.statusCode || 500).json({
    error: error.statusCode && error.statusCode < 500
      ? error.message
      : 'An unexpected server error occurred.',
  });
}
