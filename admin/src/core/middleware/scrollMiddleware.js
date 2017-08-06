export const SCROLL = Symbol('scroll');

export const scrollMiddleware = () => next => (action) => {
  const scroll = action[SCROLL];

  if (scroll === 'top') {
    window.scrollTo(0, 0);
  }

  return next(action);
};
