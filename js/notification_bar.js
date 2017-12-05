class NotificationBar {
  constructor() {
    this.elem = document.getElementById("notification_bar");
    this.notificationText = this.elem.getElementsByClassName("text")[0];
    this.notificationClose = this.elem.getElementsByClassName("close_notification")[0];

    this.notificationClose.addEventListener("click", function(that) {
      return function() {
        that.hide();
      };
    }(this));
  }

  hide() {
    this.elem.style.transform = "translateY(-100%)";
  }

  show(text, closeDelay) {
    this.notificationText.innerHTML = text;

    this.elem.style.transform = "translateY(-0%)";

    clearTimeout(this.lastTimeout);

    if (closeDelay) {
      this.lastTimeout = setTimeout(() => {
        this.hide();
      }, closeDelay);
    }
  }
}
