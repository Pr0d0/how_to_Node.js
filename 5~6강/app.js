const express = require('express');
const path = require('path');
// const app = express();
// app.set('port', process.env.PORT || 3000);
// app.get('/', (req, res) => {
//   // res.send('Hello, Express');
//   res.sendFile(path.join(__dirname, '/index.html')); // 클라이언트에게 index.html의 경로 전송.
// });

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();
const indexRouter = require('./routes');
const userRouter = require('./routes/user');

const app = express();
app.set('port', process.env.PORT || 3000);


app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
  // res.status(404).send('Not Found');
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// app.use((req, res, next) => {
//   console.log('모든 요청에 다 실행됩니다.');
//   next();
// });
// app.get('/', (req, res, next) => {
//   console.log('GET / 요청에서만 실행됩니다.');
//   next();
// }, (req, res) => {
//   throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
// });

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
  // console.error(err);
  // res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
