function waitForElement(selector) {
  return new Promise((resolve) => {
    var total = 0;
    const interval = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(interval);
        resolve(element);
      }
      //Something is wrong, eject to prevent performance issues
      if (total > 120) {
        clearInterval(interval);
        throw "C20 rolled a natural 1: Page timeout";
      }
      total = total + 1;
    }, 500);
  });
}
