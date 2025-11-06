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

  /* ====== BUBBLE 애니메이션 (GSAP) ====== */
  // 각 섹션의 bubble들을 선택하여 무작위로 떠다니게 함
  const sections = document.querySelectorAll("section");

  sections.forEach((sec) => {
    const wrap = sec.querySelector("[class^=bubble-wrap]");
    if (!wrap) return;

    const bubbles = wrap.querySelectorAll(".bubble");
    const bounds = wrap.getBoundingClientRect();
    const w = bounds.width;
    const h = bounds.height;

    // 초기 위치 랜덤 배치
    bubbles.forEach((b) => {
      const bw = b.offsetWidth || 150;
      const bh = b.offsetHeight || 150;
      const x = Math.random() * (w - bw);
      const y = Math.random() * (h - bh);
      gsap.set(b, { x, y });

      // 부드러운 무작위 루프 애니메이션
      const animateBubble = () => {
        const nx = Math.random() * (w - bw);
        const ny = Math.random() * (h - bh);
        const dur = 6 + Math.random() * 6;
        gsap.to(b, {
          x: nx,
          y: ny,
          duration: dur,
          ease: "sine.inOut",
          onComplete: animateBubble,
        });
      };

      animateBubble();

      // 마우스가 섹션 위에서 움직일 때 가까운 버블은 살짝 튕기게 함
      sec.addEventListener("mousemove", (e) => {
        const r = wrap.getBoundingClientRect();
        const mx = e.clientX - r.left;
        const my = e.clientY - r.top;
        const bx = (gsap.getProperty(b, "x") || 0) + bw / 2;
        const by = (gsap.getProperty(b, "y") || 0) + bh / 2;
        const dist = Math.hypot(bx - mx, by - my);
        const influence = 120; // 마우스 영향 범위
        if (dist < influence) {
          const angle = Math.atan2(by - my, bx - mx);
          const push = (influence - dist) / 2; // 튕김 세기
          const tx = bx + Math.cos(angle) * push - bw / 2;
          const ty = by + Math.sin(angle) * push - bh / 2;
          gsap.to(b, { x: tx, y: ty, duration: 0.4, ease: "power2.out" });
        }
      });

      // hover 시 확대/속도 변화
      b.addEventListener("mouseenter", () => {
        gsap.to(b, { scale: 1.06, duration: 0.3 });
      });
      b.addEventListener("mouseleave", () => {
        gsap.to(b, { scale: 1, duration: 0.4 });
      });
    });
  });
});
