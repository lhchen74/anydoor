const {createGzip, createDeflate} = require('zlib')

module.exports = (rs, req, res) => {
  const accepetEncoding = req.headers['accept-encoding']
  if (!accepetEncoding || !accepetEncoding.match(/\b(gzip|deflate)\b/)) {
    return rs
  } else if (accepetEncoding.match(/\bgzip\b/)) {
    res.setHeader('Content-Encoding', 'gzip')
    return rs.pipe(createGzip())
  } else if (accepetEncoding.match(/\bdeflate\b/)) {
    res.setHeader('Content-Encoding', 'deflate')
    return rs.pipe(createDeflate())
  }
}
