document.addEventListener("DOMContentLoaded", () => {
  const toggleExtension = document.getElementById("toggleExtension");
  const wordListTextarea = document.getElementById("wordList");
  const saveButton = document.getElementById("saveButton");
  const wordCountDiv = document.getElementById("wordCount");

  // Get 'isEnabled' status
  chrome.storage.sync.get("isEnabled", (data) => {
    toggleExtension.checked = data.isEnabled ?? true;
  });

  // Get 'wordList'
  chrome.storage.sync.get("wordList", (data) => {
    const wordList = data.wordList ?? ["Crucial"];
    wordListTextarea.value = wordList.join(", ");
  });

  // Toggle Extension
  toggleExtension.addEventListener("change", () => {
    chrome.storage.sync.set({ isEnabled: toggleExtension.checked }, () => {
      chrome.tabs.reload();
    });
  });

  // Save Word List
  saveButton.addEventListener("click", () => {
    const words = wordListTextarea.value
      .split(",")
      .map((word) => word.trim())
      .filter((word) => word);
    chrome.storage.sync.set({ wordList: words }, () => {
      chrome.tabs.reload();
    });
  });

  
});
