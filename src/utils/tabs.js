/* global chrome */

/**
 * Retrieve the currently active tab
 * @param {function} cb - Callback with the active tab
 * @return {undefined}
 */
const getCurrentTab = cb => {
  chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
    cb(tabs[0]);
  });
};

export default {
  getCurrentTab
};
