(function () {
  chrome.storage.sync.get(["isEnabled", "wordList"], (data) => {
    const isEnabled = data.isEnabled ?? true;
    const wordList = data.wordList ?? ["Crucial"];

    if (!isEnabled || wordList.length === 0) return;

    const context = document.body;
    const observerConfig = {
      childList: true,
      subtree: true,
      characterData: true,
    };

    let markInstance = new Mark(context);

    const highlightWords = () => {
      // Remove destaques anteriores
      markInstance.unmark({
        done: () => {
          // Aplicar destaques novamente
          markInstance.mark(wordList, {
            separateWordSearch: false,
            accuracy: {
              value: "complementary",
              limiters: [],
              
            },
            caseSensitive: false,
            each: function (element) {
              element.style.backgroundColor = "yellow";
              element.style.fontWeight = "bold";
            },
          });
        },
      });
    };

    // Função para debouncing
    function debounce(func, wait) {
      let timeout;
      return function (...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }

    // Função de destaque com debounce
    const debouncedHighlight = debounce(highlightWords, 500);

    // Destaque inicial
    highlightWords();

    // Configurar o MutationObserver para observar mudanças no DOM
    const observer = new MutationObserver((mutations, observer) => {
      debouncedHighlight();
    });

    observer.observe(context, observerConfig);
  });
})();
