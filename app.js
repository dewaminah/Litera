const express = require('express')
const router = require('./routers/router')
const session = require('express-session');
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(session({
  secret: 'literasecret',
  resave: false,
  saveUninitialized: false
}));

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})