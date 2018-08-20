export const Types = {
  UNDERDOG: 'underdog',
  VETTERY: 'vettery'
};

export const Info = {
  [Types.UNDERDOG]: {
    favicon: 'https://underdog.io/static/favicons/favicon.ico',
    host: 'underdog.io',
    label: 'underdog.io'
  },
  [Types.VETTERY]: {
    favicon: 'https://www.vettery.com/favicon.ico',
    host: 'vettery.com',
    label: 'Vettery'
  }
};

if (process.env.NODE_ENV === 'development') {
  const favicon = require('assets/images/favicon-32x32.png');
  Types.LOCALHOST = 'localhost';
  Info[Types.LOCALHOST] = {
    favicon,
    label: 'localhost',
    host: 'localhost'
  };
}
