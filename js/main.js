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

  async function getText() {
    return data.texts[Math.floor(Math.random() * data.texts.length)];
  }

  function setupCopy() {
    clipboard = new Clipboard(".copiable");

    clipboard.on("success", () => notificationBar.show("Copied to Clipboard!", 3000));
  }

  function setupReferences() {
    references.description = $("#name .desc");
  }

  return {
    async setText() {
      references.description.addClass("out");
      await sleep(2010);
      let text = await getText();
      references.description.text(text);
      references.description.removeClass("out");

      console.log("[main] set text to", text);
    },

    intervalText() {
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
