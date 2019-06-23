module.exports = {
  root: process.cwd(),
  host: '127.0.0.1',
  port: 3000,
  compress: /\.(html|js|css|json|md)/,
  cache: {
    maxAge: 600,
    expires: true,
    cacheControl: true,
    lastModified: true,
    etag: true
  }
}
