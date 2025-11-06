document.addEventListener("DOMContentLoaded", () => {
  // --- 기존 네비게이션 및 마우스 커서 로직 ---

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

  // project-card 슬라이더 로직
  const cards = document.querySelectorAll(".project-card");

  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      cards.forEach((c) => c.classList.remove("active", "prev", "shrink"));

      card.classList.add("active"); // 클릭된 카드 (819px)
      if (index > 0) cards[index - 1].classList.add("prev"); // 바로 이전 카드 (450px)

      // 나머지 카드는 shrink
      cards.forEach((c, i) => {
        if (i !== index && i !== index - 1) c.classList.add("shrink");
      });
    });
  });

  // --- 새 섹션 내비게이션 로직 ---
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      navItems.forEach((nav) => nav.classList.remove("active"));

      this.classList.add("active");
    });
  });
  // 클릭 시 부드러운 스크롤
  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("data-target");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // banner- Swiper 설정
  const bnCards = document.querySelectorAll(".card");
  const totalCards = bnCards.length;
  let currentIndex = 0;

  const contents = [
    {
      title: "YOSIGO",
      tag: "#Graphic",
      description:
        "Yosigo 사진전. 푸른 물결 속에서 잠시 쉬어가는 시간, 요시고 사진전에서 만나는 휴식의 순간을 표현했습니다.",
      period: "3 Hours",
      tools: ["Ps", "Ai"],
    },
    {
      title: "PROJECT 02",
      tag: "#Branding",
      description:
        "브랜드 아이덴티티 구축을 위한 종합 디자인 프로젝트입니다. 기업의 비전과 가치를 시각적으로 표현했습니다.",
      period: "2 Weeks",
      tools: ["Ai", "Ps"],
    },
    {
      title: "PROJECT 03",
      tag: "#Web Design",
      description:
        "사용자 중심의 웹 인터페이스 디자인 프로젝트입니다. 직관적인 UX와 아름다운 UI를 조화롭게 구현했습니다.",
      period: "1 Month",
      tools: ["Figma", "Ps"],
    },
    {
      title: "PROJECT 04",
      tag: "#Editorial",
      description:
        "에디토리얼 디자인을 통해 콘텐츠의 가독성과 심미성을 동시에 추구한 프로젝트입니다.",
      period: "1 Week",
      tools: ["InD", "Ps"],
    },
    {
      title: "PROJECT 05",
      tag: "#Package",
      description:
        "제품의 가치를 극대화하는 패키지 디자인 프로젝트입니다. 친환경적이고 실용적인 디자인을 추구했습니다.",
      period: "10 Days",
      tools: ["Ai", "Ps"],
    },
    {
      title: "PROJECT 06",
      tag: "#Motion",
      description:
        "다이나믹한 움직임으로 스토리를 전달하는 모션 그래픽 프로젝트입니다.",
      period: "2 Weeks",
      tools: ["AE", "Ps"],
    },
    {
      title: "PROJECT 07",
      tag: "#Illustration",
      description:
        "독창적인 일러스트레이션으로 브랜드 스토리를 표현한 프로젝트입니다.",
      period: "5 Days",
      tools: ["Ai", "Ps"],
    },
    {
      title: "PROJECT 08",
      tag: "#Photography",
      description:
        "감각적인 비주얼로 제품의 매력을 극대화한 사진 촬영 프로젝트입니다.",
      period: "1 Day",
      tools: ["Ps", "Lr"],
    },
    {
      title: "PROJECT 09",
      tag: "#Print",
      description:
        "인쇄 매체를 위한 고품질 디자인 작업입니다. 색감과 질감을 세심하게 고려했습니다.",
      period: "1 Week",
      tools: ["Ai", "InD"],
    },
    {
      title: "PROJECT 10",
      tag: "#Exhibition",
      description:
        "전시 공간을 위한 통합 디자인 프로젝트입니다. 관람객의 경험을 최우선으로 고려했습니다.",
      period: "3 Weeks",
      tools: ["Ai", "Ps"],
    },
  ];

  function updateCarousel() {
    bnCards.forEach((card, index) => {
      card.classList.remove("active");

      const position = (index - currentIndex + totalCards) % totalCards;
      const angle = (360 / totalCards) * position;
      const distance = 600;

      let scale, zIndex, opacity, rotateY;

      if (position === 0) {
        scale = 1;
        zIndex = 100;
        opacity = 1;
        rotateY = 0;
        card.classList.add("active");
      } else if (position === 1) {
        scale = 0.85;
        zIndex = 50;
        opacity = 0.8;
        rotateY = -25;
      } else if (position === totalCards - 1) {
        scale = 0.85;
        zIndex = 50;
        opacity = 0.8;
        rotateY = 25;
      } else if (position === 2) {
        scale = 0.7;
        zIndex = 25;
        opacity = 0.5;
        rotateY = -35;
      } else if (position === totalCards - 2) {
        scale = 0.7;
        zIndex = 25;
        opacity = 0.5;
        rotateY = 35;
      } else {
        scale = 0.6;
        zIndex = 1;
        opacity = 0.3;
        rotateY = position < totalCards / 2 ? -45 : 45;
      }

      const rad = (angle * Math.PI) / 180;
      const x = Math.sin(rad) * distance;
      const z = Math.cos(rad) * distance - distance;

      card.style.transform = `
          translate(-50%, -50%)
          translate3d(${x}px, 0, ${z}px)
          rotateY(${rotateY}deg)
          scale(${scale})
        `;
      card.style.zIndex = zIndex;
      card.style.opacity = opacity;
    });
  }

  function rotate(direction) {
    currentIndex = (currentIndex - direction + totalCards) % totalCards;
    updateCarousel();
  }

  function openOverlay(event, index) {
    event.stopPropagation();
    const overlay = document.getElementById("overlay");
    const content = contents[index];

    document.getElementById("overlayTitle").textContent = content.title;

    const tagElement = document.querySelector(".overlay-tag");
    tagElement.textContent = content.tag;

    document.getElementById("overlayDescription").textContent =
      content.description;
    document.getElementById("overlayPeriod").textContent = content.period;

    const toolsContainer = document.getElementById("overlayTools");
    toolsContainer.innerHTML = "";
    content.tools.forEach((tool) => {
      const toolIcon = document.createElement("div");
      toolIcon.className = "overlay-tool-icon";
      toolIcon.textContent = tool;
      toolsContainer.appendChild(toolIcon);
    });

    overlay.classList.add("active");
  }

  function closeOverlay(event) {
    if (!event || event.target.id === "overlay") {
      document.getElementById("overlay").classList.remove("active");
    }
  }

  updateCarousel();

  let startX = 0;
  const carousel = document.getElementById("carousel");

  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      rotate(diff > 0 ? 1 : -1);
    }
  });
});
