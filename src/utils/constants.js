export const Types = {
  UNDERDOG: 'underdog'
};

export const Info = {
  [Types.UNDERDOG]: {
    label: 'underdog.io',
    host: 'underdog.io'
  }
};

if (process.env.NODE_ENV === 'development') {
  Types.LOCALHOST = 'localhost';
  Info[Types.LOCALHOST] = {
    label: 'localhost',
    host: 'localhost'
  };
}
