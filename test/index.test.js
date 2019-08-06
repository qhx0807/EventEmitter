/* global test, expect */

const EventEmiter = require('../')
const ee = new EventEmiter()

let res = ''

function foo () {
  res = 'test'
}

test('emit a event test', () => {
  ee.on('test', foo)
  ee.emit('test')
  expect(res).toBe('test')
})

test('emit a event once', () => {
  ee.once('oncetest', foo)
  ee.emit('oncetest')
  expect(ee.events.oncetest).toBeUndefined()
})

test('off events', () => {
  ee.on('testoff', function () { })
  ee.off('testoff')
  expect(ee.events.testoff).toBeUndefined()
})

test('remove all events', () => {
  ee.removeAll()
  expect(ee.events.constructor).toBeUndefined()
})
