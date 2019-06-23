const Server = require('./app')

const argv = require('yargs')
  .usage('anydoor [option]')
  .option('port', {
    alias: 'p',
    describe: 'this is port',
    default: 3000
  })
  .option('hostname', {
    alias: 'h',
    describe: 'this is hostname',
    default: '127.0.0.1'
  })
  .option('root', {
    alias: 'd',
    describe: 'this is root path',
    default: process.cwd()
  })
  // .demandOption(['run', 'path'], 'Please provide both run and path arguments to work with this tool')
  .version()
  .alias('v', 'version')
  .help()
  .argv


  const server = new Server(argv)
  server.start()
