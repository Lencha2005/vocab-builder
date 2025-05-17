module.exports = {
  experimental: {
    serverActions: true,
  },
  matcher: [
    '/dictionary/:path*',
    '/recommend/:path*',
    '/training/:path*',
    '/login',
    '/register',
  ],
};
