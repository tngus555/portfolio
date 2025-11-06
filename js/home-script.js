document.addEventListener("DOMContentLoaded", () => {
  // anchored-pointer의 위치
  const gnbBtn = document.querySelectorAll(".gnb-btn");
  let selectedBtn = document.querySelector(".selected");

  const setAnchorOnSelected = () => {
    if (selectedBtn) {
      selectedBtn.style.anchorName = "--selected";
    }
  };

  setAnchorOnSelected();

  // button click handlers
  gnbBtn.forEach((button) => {
    button.addEventListener("click", () => {
      if (selectedBtn) {
        selectedBtn.classList.remove("selected");
        selectedBtn.style.anchorName = "";
      }
      selectedBtn = button;
      selectedBtn.classList.add("selected");
      setAnchorOnSelected();
    });

    // Hover and focus
    const handleInteractionStart = () => {
      if (button !== selectedBtn) {
        if (selectedBtn) {
          selectedBtn.style.anchorName = "";
        }

        button.style.anchorName = "--selected";
      }
    };

    button.addEventListener("mouseenter", handleInteractionStart);
    button.addEventListener("focus", handleInteractionStart);

    // Blur action
    const handleInteractionEnd = () => {
      if (button !== selectedBtn) {
        button.style.anchorName = "";
        setAnchorOnSelected();
      }
    };

    button.addEventListener("mouseleave", handleInteractionEnd);
    button.addEventListener("blur", handleInteractionEnd);
  });

  // nav hover시 이미지 변경
  const gnbLinks = document.querySelectorAll(".gnb-top a");

  gnbLinks.forEach((link) => {
    const hoverImg = link.dataset.hover;

    link.addEventListener("mouseenter", () => {
      // 가상 요소 대신 inline background 이미지 적용
      link.style.color = "transparent"; // 글씨 숨기
      link.style.backgroundImage = `url(${hoverImg})`;
      link.style.backgroundSize = "contain";
      link.style.backgroundRepeat = "no-repeat";
      link.style.backgroundPosition = "center";
    });

    link.addEventListener("mouseleave", () => {
      link.style.color = ""; // 글씨 복원
      link.style.backgroundImage = ""; // 이미지 제거
    });
  });

  // 마우스 커셔
  const wave = document.querySelector(".wave");
  document.addEventListener("mousemove", (e) => {
    wave.style.left = `${e.clientX}px`;
    wave.style.top = `${e.clientY}px`;
  });
});
