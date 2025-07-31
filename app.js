const express = require('express')
const router = require('./routers/router')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})