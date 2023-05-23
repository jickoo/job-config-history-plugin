function controlButtons() {
  if (location.pathname.endsWith('configure')) {
    const buttons = document.querySelectorAll("#bottom-sticker button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('disabled', 'true');
    }
    const reasonComment = document.getElementsByName("_.changeReasonComment");
    if (reasonComment.length > 0) {
      reasonComment[0].value = "";
    }

    let counter = 0;
    const checkInterval = setInterval(() => {
      counter++;
      if (counter > 1200) {
        // 10 minutes stop interval
        clearInterval(checkInterval);
      }

      if (reasonComment.length > 0) {
        const commitMessage = reasonComment[0].value;
        if (commitMessage.length > 0) {
          for (let i = 0; i < buttons.length; i++) {
            buttons[i].removeAttribute('disabled');
          }
        } else {
          for (let i = 0; i < buttons.length; i++) {
            buttons[i].setAttribute('disabled', 'true');
          }
        }
      }
    }, 500)
  }
}

const loadingInterval = setInterval(() => {
  const button = document.querySelector("#bottom-sticker button");

  if (button != null) {
    clearInterval(loadingInterval);
    controlButtons();
  }
}, 100);
