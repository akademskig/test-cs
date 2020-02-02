const serve = require('koa-static-server')
const Koa = require('koa')
const app = new Koa()

const PORT = process.env.PORT || 5000
app.use(serve({ rootDir: 'dist/spa', rootPath: '/' }))
// app.use(serve(path.join(__dirname, 'dist')))
app.listen(PORT, (res, err) => {
  if (err) {
    console.error('ERROR', err)
  } else {
    console.log(`Listening on ${PORT}`)
  }
})
