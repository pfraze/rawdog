var lastMsg = null
function fetchBatch() {
  console.log('fetching')

  var gt = lastMsg && lastMsg.timestamp
  pull(ssb.createLogStream({ limit: 1000, gt: gt }), pull.drain(function (msg) {
    // append to document
    var pre = document.createElement('pre')
    pre.innerText = pre.textContent = JSON.stringify(msg.value.content)
    document.body.appendChild(pre)

    // track most recent msg
    lastMsg = msg
  }, function () {
    // toss in a divider
    document.body.appendChild(document.createElement('hr'))
  }))
}

// fetch first batch
fetchBatch()

// fetch more at scroll-to-bottom
window.addEventListener('scroll', function () {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight)
    fetchBatch()
})

// test-button
testButton.addEventListener('click', function () {
  ssb.publish({ type: 'post', text: 'hello, world!' }, console.log.bind(console))
})