const { Application } = require('spectron')
const assert = require('assert')
const path = require('path')

describe('Electron', function () {
  this.timeout(10000)

  describe('application launch', function () {
    beforeEach(function () {
      this.app = new Application({
        path: path.join(__dirname, '../twitch-clone-darwin-x64/twitch-clone.app/Contents/MacOS/twitch-clone')
      })
      return this.app.start()
    })

    afterEach(function () {
      if (this.app && this.app.isRunning()) {
        return this.app.stop()
      }
    })

    it('shows an initial window', function () {
      return this.app.client.getWindowCount()
        .then(count => assert.equal(count, 1))
    })
  })
})
