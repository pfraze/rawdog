# raw dog raw log

This is a small test app for developing ssb-web-server against.
It just spits out the ssb log stream in JSON.
(Very trivial.)

The more interesting things are its structure and package.json.
For instance, here are the package.json scripts:

```json
{
  "scripts": {
    "build": "browserify ./index.js --debug -o ./index.build.js",
    "watch": "watchify ./index.js --debug -o ./index.build.js",
    "build-commit": "browserify ./index.js -o ./index.build.js && html-inline -i ./index.html -o ./index.build.html",
    "commit": "npm run build-commit; cat ./index.build.html | sbot blobs.add"
  }
}
```

---

Obviously, `ws-client.js` should not be in this repo.
Also, it might be a good idea to factor out those package.json scripts into a CLI tool?
Or, we can put them in a boilerplate repo, for people to use as a starting point.