var getDeps = require('./lib/get-deps')
  , exec = require('child_process').exec

getDeps(process.cwd(), function (error, requires) {
  if (error) return handleError(error)

  var cmd = 'npm i --save ' + requires.join(' ')

  console.log('Executing "' + cmd + '"')

  setTimeout(function () {
    exec(cmd).stderr.pipe(process.stderr)
  }, 1000)
})

function handleError(error) {
  console.error(error)
  process.exit(1)
}
