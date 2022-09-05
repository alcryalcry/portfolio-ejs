import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.render('index.ejs');
});

router.get('*', (req: Request, res: Response) => {
  res.render('error.ejs');
});

export default router;
