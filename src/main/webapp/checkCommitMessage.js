function controlButtons() {
  if (location.pathname.endsWith('configure')) {
    // 저장을 위해서 커밋 메세지를 작성하라는 문구를 보여줄 Element
    const infoCommentElement = document.createElement("span");
    const infoTextNode = document.createTextNode("저장을 위해선 Job config history change message 에 메세지를 작성해주세요 !!!");
    infoCommentElement.appendChild(infoTextNode);
    infoCommentElement.setAttribute("id", "info-comment");

    document.querySelector("#bottom-sticker .bottom-sticker-inner").prepend(infoCommentElement);

    // 저장, 적용 버튼 제어 일단 미노출 처리
    const buttons = document.querySelectorAll("#bottom-sticker button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('disabled', 'true');
      buttons[i].style.display = "none";
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
          infoCommentElement.style.display = "none";
          for (let i = 0; i < buttons.length; i++) {
            buttons[i].removeAttribute('disabled');
            buttons[i].style.display = "block";
          }
        } else {
          infoCommentElement.style.display = "block";
          for (let i = 0; i < buttons.length; i++) {
            buttons[i].setAttribute('disabled', 'true');
            buttons[i].style.display = "none";
          }
        }
      }
    }, 500)
  }
}

// 언제 버튼이 화면에 노출되는지 알 수 없어서 interval로 버튼 노출 타이밍 체크하여 버튼 컨트롤 시작
const loadingInterval = setInterval(() => {
  const button = document.querySelector("#bottom-sticker button");

  if (button != null) {
    clearInterval(loadingInterval);
    controlButtons();
  }
}, 100);
