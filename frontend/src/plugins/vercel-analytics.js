import { inject } from '@vercel/analytics';

export default {
  install: (app) => {
    if (process.env.NODE_ENV === 'production') {
      inject();
    }
  }
}
