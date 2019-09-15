const apidoc = require('apidoc')
const chokidar = require("chokidar")
var path = require("path")
var log = console.log.bind(console);
function createApidocs (options) {
  log(options.input[0])
  var input = path.resolve(process.cwd(), options.input[0])


  log("监听的文件是", input)
  var watcher = chokidar.watch(input, {
    ignored: /[\/\\]\./, persistent: true
  });


  watcher
    .on('change', function (path) {
      log('File', path, 'has been changed');
      apidoc.createDoc({
        src: options.input,
        dest: options.output,
      })
    })
    .on('ready', function () {
      log('Initial scan complete. Ready for changes.');
      apidoc.createDoc({
        src: options.input,
        dest: options.output,
      })
    })


}

module.exports = createApidocs