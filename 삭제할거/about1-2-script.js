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

  const scrollBtn = document.querySelector(".scroll-down-btn");
  const nextSection = document.querySelector(".about3");

  scrollBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const startY = window.pageYOffset;
    const targetY = nextSection.getBoundingClientRect().top + startY;
    const distance = targetY - startY;
    const duration = 1200; // ← 스크롤 시간 (밀리초) → 느리게 하려면 1500~2000으로 조정 가능
    let startTime = null;

    function smoothScroll(currentTime) {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeInOutCubic 가속/감속 곡선
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startY + distance * ease);

      if (elapsed < duration) requestAnimationFrame(smoothScroll);
    }

    requestAnimationFrame(smoothScroll);
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
  // work-script1.js: 파일 끝에 추가

  // SVG Path 드로잉 애니메이션 초기화 함수
  function initSvgLineDrawing() {
    const path = document.getElementById("drawing-path");

    if (path) {
      // 1. Path의 총 길이를 계산합니다.
      const pathLength = path.getTotalLength();

      // 2. CSS 변수 '--path-length'를 설정합니다. (Modern Approach)
      // path.style.setProperty('--path-length', pathLength + 'px');

      // 3. 또는 CSS에서 설정한 pathLength를 덮어씁니다. (Legacy/Simple Approach)
      // pathLength를 stroke-dasharray와 stroke-dashoffset에 모두 적용하여 선을 감춥니다.
      path.style.strokeDasharray = pathLength;
      path.style.strokeDashoffset = pathLength;

      // 이 시점에서 path에 설정된 CSS 애니메이션(dashDraw)이 pathLength 값을 기준으로 시작됩니다.
    }
  }

  // DOM 콘텐츠가 모두 로드된 후 실행 (필요한 경우)
  window.addEventListener("load", initSvgLineDrawing);
  // 만약 다른 DOMContentLoaded 이벤트 안에 있다면, 그 안에 함수를 호출해도 됩니다.
  // document.addEventListener('DOMContentLoaded', initSvgLineDrawing);
});
