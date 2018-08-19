/* global chrome */
import lscache from 'store';

/**
 * Retrieve multiple values for a series of keys
 * @param {Array<string>} keys - Requested storage key(s)
 * @param {function} accessor - Callback to retrieve a single key
 * @return {Object} All requested values
 */
const getMultipleValues = (keys, accessor) => {
  return keys.reduce(
    (map, key) => ({
      ...map,
      [key]: accessor(key)
    }),
    {}
  );
};

/**
 * Retrieve a value from Chrome or local storage based on env
 * @param {string|Array<string>|Object} keys - Requested storage key(s)
 * @param {function} cb - Callback with values
 * @return {undefined}
 */
const get = (keys, cb) => {
  if (process.env.NODE_ENV === 'production') {
    chrome.storage.sync.get(keys, cb);
  } else {
    let results;
    if (typeof keys === 'string') {
      results = { [keys]: lscache.get(keys) };
    } else if (Array.isArray(keys)) {
      results = getMultipleValues(keys, key => lscache.get(key));
    } else if (typeof keys === 'object') {
      results = getMultipleValues(Object.keys(keys), key => lscache.get(key) || keys[key]);
    } else {
      throw new Error('Invalid storage key');
    }
    cb(results);
  }
};

/**
 * Store values in Chrome or local storage based on env
 * @param {Object} items - Requested key/value pairs to stroe
 * @param {function} cb - Confirmation callback
 * @return {undefined}
 */
const set = (items, cb) => {
  if (process.env.NODE_ENV === 'production') {
    chrome.storage.sync.set(items, cb);
  } else {
    Object.keys(items).forEach(key => {
      lscache.set(key, items[key]);
    });
    cb();
  }
};

export default {
  get,
  set
};
