let Main = (function() {
  let data;
  let clipboard;
  let notificationBar;
  let references = {};


  async function asyncGetJSON(url) {
    return new Promise(resolve => {
      $.getJSON(url, resolve);
    });
  }

  async function loadData() {
    return await asyncGetJSON("assets/data.json");
  }


  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function getText(...exclude) {
    let texts = data.texts.slice();

    for (var i = 0; i < exclude.length; i++) {
      let index = texts.indexOf(exclude[i]);

      if (index > -1) {
        texts.splice(index, 1);
      }
    }

    return texts[Math.floor(Math.random() * texts.length)];
  }

  function setupCopy() {
    clipboard = new Clipboard(".copiable");

    clipboard.on("success", e => notificationBar.show(e.trigger.getAttribute("data-oncopy-text") || "Copied to Clipboard!", 3000));
  }

  function setupReferences() {
    references.description = $("#name .desc");
  }

  return {
    async setText() {
      references.description.addClass("out");
      await sleep(2010);
      let text = await getText(references.description.text);
      references.description.text(text);
      references.description.removeClass("out");

      console.log("[main] set text to", text);
    },

    async intervalText() {
      let text = await getText();
      references.description.text(text);
      setInterval(this.setText, data.settings.newTextDelay);
    },

    async setup() {
      notificationBar = new NotificationBar();
      data = await loadData();

      setupReferences();
      setupCopy();

      this.intervalText();

      console.log("[main] all setup");
    },

    showNotification(text, delay) {
      notificationBar.show(text, delay);
    }
  };
})();

$(document).ready(() => Main.setup());
