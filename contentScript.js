(function () {
  chrome.storage.sync.get(["isEnabled", "wordList"], (data) => {
    const isEnabled = data.isEnabled ?? true;
    const wordList = data.wordList ?? ["Crucial"];

    if (!isEnabled || wordList.length === 0) return;

    const context = document.body;
    const instance = new Mark(context);

    instance.mark(wordList, {
      separateWordSearch: false,
      accuracy: {
        value: "exactly",
        limiters: [",", ".", ":", ";", "¡", "!", "¿", "?", "—", "«", "»", "…"],
      },
      caseSensitive: false,
      done: function () {
        // Count occurrences of "Crucial"
        const marks = document.querySelectorAll("mark");
        let count = 0;
        marks.forEach((mark) => {
          if (mark.textContent.toLowerCase() === "crucial") {
            count++;
          }
        });
        chrome.storage.sync.set({ crucialCount: count });
      },
      each: function (element) {
        element.style.backgroundColor = "yellow";
        element.style.fontWeight = "bold";
      },
    });
  });
})();
