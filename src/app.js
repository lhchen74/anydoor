const http = require('http')
const path = require('path')
const chalk = require('chalk')

const route = require('./helper/route')
const conf = require('./config/defaultConfig')
const openUrl = require('./helper/openUrl')

class Server {
  constructor(config) {
    this.conf = Object.assign({}, conf, config)
  }

  start() {
    const server = http.createServer((req, res) => {
      const filePath = path.join(this.conf.root, req.url)
      route(req, res, filePath, this.conf)
      // #region 异步回调
      // fs.stat(filePath, (err, stat) => {
      //   if(err) {
      //     res.statusCode = 404
      //     res.setHeader('Content-Type', 'text/plain')
      //     res.end(`${filePath} is not dir or file`)
      //   }

      //   if (stat.isFile()) {
      //     res.statusCode = 200
      //     res.setHeader('Content-Type', 'text/plain')
      //     fs.createReadStream(filePath).pipe(res)
      //   } else if (stat.isDirectory) {
      //     fs.readdir(filePath, (err, files) => {
      //       res.statusCode = 200
      //       res.setHeader('Content-Type', 'text/plain')
      //       res.end(files.join(','))
      //     })
      //   }
      // })
      // #endregion
    })

    server.listen(this.conf.port, this.conf.host, () => {
      const addr = `http://${this.conf.host}:${this.conf.port}`
      console.info(`Server start at ${chalk.green(addr)}`)
      openUrl(addr)
    })
  }
}

module.exports = Server


