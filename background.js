chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ wordList: ["Crucial"] });
  chrome.storage.sync.set({ isEnabled: true });
});
