'use strict'

exports.wait = async function wait (milliseconds = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds)
  })
}
