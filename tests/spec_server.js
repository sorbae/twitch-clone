import { Application } from 'spectron'
import assert from 'assert'
import path from 'path'

describe('Electron', function () {
  this.timeout(10000)

  describe('application launch', function () {
    beforeEach(function () {
      this.app = new Application({
        path: path.join(__dirname, '..', 'node_modules', '.bin', 'electron'),
        args: [path.join(__dirname, '..')]
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
