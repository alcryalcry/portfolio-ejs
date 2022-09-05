import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import sassMiddleware from 'node-sass-middleware';
import helmet from 'helmet';
import router from './router';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(
  sassMiddleware({
    src: path.resolve(__dirname, 'src/scss'),
    dest: path.join(__dirname, 'static'),
    debug: true,
    outputStyle: 'compressed',
  })
);

app.use(express.static(path.resolve(__dirname, 'static')));
app.set('views', path.resolve(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(router);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running on port ${PORT}...`);
});
