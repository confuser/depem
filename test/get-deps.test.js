var assert = require('assert')
  , rewire = require('rewire')
  , getDeps = rewire('../lib/get-deps')

describe('Get Dependencies', function () {

  it('should get dependencies', function (done) {
    getDeps(process.cwd(), function (error, requires) {
      if (error) return done(error)

      assert.deepEqual(requires
        , [ 'glob'
          , 'detective'
          , 'lodash.uniq'
          , 'async.concat'
          , 'is-builtin-module'
          ])

      done()
    })
  })

  it('should not find duplicates', function (done) {
    getDeps(process.cwd() + '/test/fixtures/duplicates', function (error, requires) {
      if (error) return done(error)

      assert.deepEqual(requires
        , [ 'async'
          ])

      done()
    })
  })

  it('should ignore relative and absolute requires', function (done) {
    getDeps(process.cwd() + '/test/fixtures/paths', function (error, requires) {
      if (error) return done(error)

      assert.deepEqual(requires, [])

      done()
    })
  })

  it('should handle glob errors', function (done) {
    getDeps.__with__(
    { glob: function (paths, opts, callback) {
        callback(new Error('TestGlobError'))
      }

    })(function () {
      getDeps(process.cwd(), function (error) {
        assert.equal(error.message, 'TestGlobError')

        done()
      })
    })
  })

  it('should handle fs errors', function (done) {
    getDeps.__with__(
    { glob: function (paths, opts, callback) {
        callback(null, [ process.cwd() + '/no-exist.js' ])
      }

    })(function () {
      getDeps(process.cwd(), function (error) {
        assert.equal(error.message.indexOf('ENOENT: no such file or directory'), 0)

        done()
      })
    })
  })
})
