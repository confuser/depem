var glob = require('glob')
  , detective = require('detective')
  , fs = require('fs')
  , unique = require('lodash.uniq')
  , asyncConcat = require('async.concat')
  , isCoreModule = require('is-builtin-module')
  , options =
    { ignore:
      [ 'node_modules/**'
      , 'test/**'
      , 'tests/**'
      , 'coverage/**'
      ]
    , realpath: true
    }

module.exports = function (cwd, callback) {
  options.cwd = cwd

  glob('**/*.js', options, function (error, files) {
    if (error) return callback(error)

    asyncConcat(files, function (file, cb) {
      fs.readFile(file, 'utf8', function (error, contents) {
        if (error) return cb(error)

        cb(null, detective(contents))
      })
    }, function (error, requires) {
      if (error) return callback(error)

      requires = unique(requires).filter(function (name) {
        return !isCoreModule(name) && name.indexOf('.') !== 0 && name.indexOf('/') !== 0
      })

      callback(null, requires)
    })
  })
}
