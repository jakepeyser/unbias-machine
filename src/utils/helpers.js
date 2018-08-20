import { Info } from './constants';
import tabs from './tabs';

/**
 * Retrieve the type relative to the given URL
 * @param {function} url - URI
 * @return {string} Matching type
 */
const getTypeMatchingURL = url => {
  for (const type in Info) {
    if ({}.hasOwnProperty.call(Info, type)) {
      if (url.includes(Info[type].host)) {
        return type;
      }
    }
  }
};

/**
 * Retrieve the type relative to the current URL
 * @param {function} cb - Callback with the active tab
 * @return {undefined}
 */
const getCurrentType = cb => {
  if (process.env.NODE_ENV === 'development') {
    cb(getTypeMatchingURL(window.location.href));
  } else {
    tabs.getCurrentTab(tab => {
      cb(getTypeMatchingURL(tab.url));
    });
  }
};

export default {
  getCurrentType
};
