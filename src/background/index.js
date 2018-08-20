/* global chrome */
import { Info } from 'utils';

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: Object.values(Info).map(info => {
          return new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostSuffix: info.host }
          });
        }),
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});
