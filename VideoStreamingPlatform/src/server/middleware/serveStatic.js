import { static as serveStatic } from 'express';

const thirtyMinutes = 30 * 60 * 1000;

export default () =>
  serveStatic('build/client/', {
    maxAge: thirtyMinutes,
    setHeaders: (res, path) => {
      const pattern = /.*serviceworker\.js/;
      const swFile = pattern.test(path);
      if (swFile) {
        res.setHeader('Cache-Control', 'public, max-age=0');
      }
    }
  });
