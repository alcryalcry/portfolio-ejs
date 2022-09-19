import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import sass from 'node-sass';
import sassMiddleware from 'node-sass-middleware';
import helmet from 'helmet';

import router from './router';

dotenv.config();

const app = express();

const PORT = Number(process.env.APP_PORT ?? 80);
const PRODUCTION = process.env.NODE_ENV === 'production';
const STATIC_PREFIX = PRODUCTION ? '../' : './';

if (PRODUCTION) {
  app.use(helmet());
}

if (PRODUCTION) {
  const outFilePath = path.resolve(__dirname, STATIC_PREFIX, 'static', 'main.css');

  sass.render({
    file: path.resolve(__dirname, STATIC_PREFIX, 'styles/main.scss'),
    outFile: outFilePath,
    outputStyle: 'compressed',
  }, (err, result) => {
    if (err) throw err;

    fs.writeFile(outFilePath, result.css, (e) => {
      if (e) {
        throw e;
      }
    });
  });
} else {
  app.use(
    sassMiddleware({
      src: path.resolve(__dirname, STATIC_PREFIX, 'styles'),
      dest: path.resolve(__dirname, STATIC_PREFIX, 'static'),
      outputStyle: 'compressed',
      debug: true,
    }),
  );
}

app.use(express.static(path.resolve(__dirname, STATIC_PREFIX, 'static')));
app.set('views', path.resolve(__dirname, STATIC_PREFIX, 'templates'));
app.set('view engine', 'ejs');

app.use('/', router);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running on ${PORT}...`);
});
