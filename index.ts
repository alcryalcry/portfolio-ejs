import express, { Request, Response } from 'express';
import path from 'path'
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, 'static')))
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.get('/', (req: Request, res: Response) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running on port ${PORT}...`);
});
