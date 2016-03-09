var muxrpc     = require('muxrpc')
var pull       = require('pull-stream')
var ws         = require('pull-ws-server')
var Serializer = require('pull-serializer')

module.exports = function (opts) {
  // create rpc object
  var ssb = muxrpc(MANIFEST, false, serialize)()

  // setup rpc stream over websockets
  var protocol = (window.location.protocol == 'https:') ? 'wss:' : 'ws:'
  var stream = ws.connect(protocol+'//'+(window.location.hostname)+':7999', opts)
  pull(stream, ssb.createStream(), stream)
  return ssb
}

function serialize (stream) {
  return Serializer(stream, JSON, {split: '\n\n'})
}

var MANIFEST = {
  "auth": "async",
  "address": "async",
  "manifest": "async",
  "get": "async",
  "createFeedStream": "source",
  "createLogStream": "source",
  "messagesByType": "source",
  "createHistoryStream": "source",
  "createUserStream": "source",
  "links": "source",
  "relatedMessages": "async",
  "add": "async",
  "publish": "async",
  "getAddress": "async",
  "getLatest": "async",
  "latest": "source",
  "latestSequence": "async",
  "whoami": "async",
  "usage": "async",
  "gossip": {
    "peers": "async",
//    "add": "async",
    "connect": "async",
    "changes": "source"
  },
  "friends": {
    "all": "async",
    "hops": "async",
    "createFriendStream": "source",
    "get": "async"
  },
  "replicate": {
    "changes": "source"
  },
  "blobs": {
    "get": "source",
    "has": "async",
    "add": "sink",
    "rm": "async",
    "ls": "source",
    "want": "async",
    "wants": "async",
    "changes": "source"
  },
  // "invite": {
  //   "create": "async",
  //   "accept": "async",
  //   "use": "async"
  // },
  "block": {
    "isBlocked": "async"
  },
  "private": {
    "publish": "async",
    "unbox": "async"
  }
}