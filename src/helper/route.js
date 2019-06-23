const fs = require('fs')
const path = require('path')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const Handlebars = require('handlebars')
// const config = require('../config/defaultConfig')
const mime = require('../helper/mime')
const compress = require('../helper/compress')
const range = require('../helper/range')
const isFresh = require('../helper/cache')


const tplPath = path.join(__dirname, '../template/dir.tpl')
const source = fs.readFileSync(tplPath, 'utf8')
const template = Handlebars.compile(source)


module.exports = async function (req, res, filePath, config) {
  try {
    const states = await stat(filePath)
    if (states.isFile()) {
      const contType = mime(filePath)
      res.setHeader('Content-Type', `${contType};charset=utf8`)

      // use cache
      if (isFresh(states, req, res)) {
        res.statusCode = 304
        res.end()
        return;
      }

      let rs;
      // #region range 读取文件部分内容
      // curl -r 0-10 -i http://127.0.0.1:3000/LICENSE
      // HTTP/1.1 200 OK
      // Content-Type: text/plain;charset=utf8
      // Accept-Ranges: byteds
      // Content-Range: bytes 0-10/1065
      // Content-Length: 10
      // Date: Sat, 22 Jun 2019 13:12:44 GMT
      // Connection: keep-alive

      // MIT Licens%
      // #endregion
      const {code, start, end} = range(states.size, req, res)
      if (code === 200) {
        res.statusCode = 200
        rs = fs.createReadStream(filePath)
      } else if (code === 206) {
        res.statusCode = 206
        rs = fs.createReadStream(filePath, {start, end})
      }
      if (filePath.match(config.compress)) {
        rs = compress(rs, req, res)
      }
      rs.pipe(res)
    } else if (states.isDirectory()) {
      const files = await readdir(filePath)
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      const dir = path.relative(config.root, filePath)
      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '',
        // files
        files: files.map(file => {
          return {
            file,
            icon: mime(file)
          }
        })
      }
      // #region path.relative()
      // /Users/jbn/Desktop/study/node/node-example/anydoor/src
      // /Users/jbn/Desktop/study/node/node-example/anydoor/src/template
      // template
      // path.relative(A, B) B 相对于 A 的路径
      // console.info(config.root, filePath, path.relative(config.root, filePath))
      // #endregion
      res.end(template(data))
    }
  } catch (error) {
    console.error(error)
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end(`${error}`)
  }

}
