# raw dog raw log

This is a small test app for ssb-web-server.

## Building

Clone the repo, then run:

```
npm run build
```

Or, if you're going to do some development:

```
npm run watch
```

Next, link the cloned directory to your ssb www folder:

```
ln -s ~/rawdog ~/.ssb/www/rawdog
```

And open the app at `http://localhost:7778/rawdog/`.

## Publishing

To publish the app, run:

```
npm run commit
```

This will put the bundled app into your blobstore, and emit the hash-id.
You can then open the bundled app at `http://localhost:7778/{hashid}`.

To publish the app, post a message including the hash.
