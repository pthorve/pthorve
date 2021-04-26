import express from 'express';
import { serveStatic, renderer } from './middleware';

const app = express();

if (typeof window === 'undefined') {
  global.window = {};
}

app.use(serveStatic());

app.use(renderer);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}/`);
});
