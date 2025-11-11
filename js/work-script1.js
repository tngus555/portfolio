// 1. Banner 섹션을 위한 전역 변수 및 데이터

let currentIndex = 0;
let totalCards = 0;
let bnCards; // DOM 요소를 저장할 변수 (DOMContentLoaded에서 할당)
let currentRotation = 0; // big-waterdrop의 현재 회전 각도 (0도에서 시작)

const contents = [
  {
    title: "YOSIGO",
    tag: "#Graphic",
    description:
      "Yosigo 사진전. 푸른 물결 속에서 잠시 쉬어가는 시간, 요시고 사진전에서 만나는 휴식의 순간을 표현했습니다.",
    period: "3 Hours",
    tools: ["Ps", "Ai"],
    images: {
      image1: "./img/bnr-yosigo (2).png",
      image2: "./img/bnr-yosigo (1).png",
      image3: "./img/bnr-yosigo.png",
    },
  },
  {
    title: "BURGERKING",
    tag: "#Graphic",
    description:
      "화끈한 멕시코의 매운 맛을 느낄 수 있는 텍사스 칠리 와퍼 베너입니다",
    period: "3 Hours",
    tools: ["Ai", "Ps"],
    images: {
      image1: "./img/bnr-burgerking (2).png",
      image2: "./img/bnr-burgerking (3).png",
      image3: "./img/bnr-burgerking.png",
    },
  },
  {
    title: "PETHROOM",
    tag: "#Graphic",
    description:
      "고양이를 가족처럼 생각하는 마음을 담아, 우리 아이에게도 안전한 Pethroom 모래를 소개하는 이벤트 배너입니다.",
    period: "3 Hours",
    tools: ["Figma", "Ps"],
    images: {
      image1: "./img/bnr-pethroom (2).png",
      image2: "./img/bnr-pethroom (1).png",
      image3: "./img/bnr-pethroom.png",
    },
  },
  {
    title: "서울강남치과",
    tag: "#Graphic",
    description:
      "누런 치아를 환한 화이트 치아로 변화시켜주는 '화이트 스마일 프로젝트' 이벤트 배너입니다. 혜택 정보를 강조하고, 간편 상담을 자연스럽게 유도할 수 있도록 디자인했습니다.",
    period: "3 Hours",
    tools: ["InD", "Ps"],
    images: {
      image1: "./img/bnr-dental (2).png",
      image2: "./img/bnr-dental (3).png",
      image3: "./img/bnr-dental.png",
    },
  },
  {
    title: "KOREAN AIR",
    tag: "#Graphic",
    description:
      "얼리버드 고객에게 다양한 혜택을 제공하는 항공권 이벤트 배너입니다. 티켓 디자인을 활용해 여행을 떠나고 싶은 설렘을 담았습니다.",
    period: "3 Hours",
    tools: ["Ai", "Ps"],
    images: {
      image1: "./img/bnr-korean-air (3).png",
      image2: "./img/bnr-korean-air (2).png",
      image3: "./img/bnr-korean-air.png",
    },
  },
  {
    title: "RNU UP",
    tag: "#Graphic",
    description:
      "Running Crew 모집을 위한 배너 디자인입니다. 푸른 잔디와 역동적인 러닝 모델을 통해 활기차고 건강한 이미지를 강조했습니다.",
    period: "3 Hours",
    tools: ["AE", "Ps"],
    images: {
      image1: "./img/bnr-running (3).png",
      image2: "./img/bnr-running (1).png",
      image3: "./img/bnr-running.png",
    },
  },
  {
    title: "SKULLPIG",
    tag: "#Graphic",
    description:
      "독창적인 일러스트레이션으로 브랜드 스토리를 표현한 프로젝트입니다.",
    period: "3 Hours",
    tools: ["Ai", "Ps"],
    images: {
      image1: "./img/skullpig-banner (1).png",
      image2: "./img/skullpig-banner (2).png",
      image3: "./img/skullpig-banner (3).png",
    },
  },
  {
    title: "OFD & STARBUCKS Ver.1",
    tag: "#Graphic",
    description: "OLD FERRY DONUT & STARBUCKS |",
    period: "3 Hours",
    tools: ["Ps", "Lr"],
    images: {
      image1: "./img/bnr-old (2).png",
      image2: "./img/bnr-old (1).png",
      image3: "./img/bnr-old.png",
    },
  },
  {
    title: "OFD & STARBUCKS Ver.2",
    tag: "#Graphic",
    description: "여름의 청량함과 빈티지한 감성을 함께 표현한 디자인입니다.",
    period: "3 Hours",
    tools: ["Ai", "InD"],
    images: {
      image1: "./img/bnr-old-ferry (2).png",
      image2: "./img/bnr-old-ferry (1).png",
      image3: "./img/bnr-old-ferry.png",
    },
  },
  {
    title: "BASKIN ROBBINS",
    tag: "#Graphic",
    description:
      "많은 사람들의 최애였던 '엄마는 외계인'에 한층 더 진한 초콜릿 풍미를 더해, 새로운 느낌으로 재해석했습니다.",
    period: "3 Hours",
    tools: ["Ai", "Ps"],
    images: {
      image1: "./img/bnr-br (2).png",
      image2: "./img/bnr-br (1).png",
      image3: "./img/bnr-br.png",
    },
  },
];

// 2. Main Content Slider Data (전역 변수로 선언)
const sliderData = [
  {
    title: "1. STEINWAY",
    badges: ["리디자인", "웹디자인"],
    description:
      "170년 이상 이어온 장인정신과 역사적 가치가 담긴 스타인웨이. 조금 더 깔끔한 디자인으로 웹 리디자인을 하였습니다.",
    meta: "팀 프로젝트 작업 | <strong>디자인 100%</strong>",
    tools: ["icon-photoshop.png", "icon-illustrator.png", "icon-figma.png"],
    image: "./img/STEINWAY-img.png",
    designUrl:
      "https://www.figma.com/proto/aVQ8y63tvFasKHyTu8TV1a/steinway-%EB%A6%AC%EB%94%94%EC%9E%90%EC%9D%B8-%EA%B9%80%EC%88%98%ED%98%84?page-id=178%3A3605&node-id=178-4871&p=f&viewport=-66%2C187%2C0.06&t=kBo2sRRXSOWR0yKg-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=178%3A5091",
    processImage: "./img/STEINWAY-process.png",
  },
  {
    title: "2. 상식팡",
    badges: ["앱 디자인"],
    description:
      "상식이 자라면 세상도 자란다. 상식을 키우는 앱 프로젝트입니다.",
    meta: "팀 프로젝트 작업 | <strong>참여도 25%</strong>",
    tools: ["icon-photoshop.png", "icon-figma.png"],
    image: "./img/CommonSense-img.png",
    designUrl:
      "https://www.figma.com/proto/W7huWOILzdJJiea27cL26r/%EC%83%81%EC%8B%9D%ED%8C%A1-%EA%B9%80%EC%88%98%ED%98%84?page-id=0%3A1&node-id=1-7312&p=f&viewport=-139%2C14789%2C0.16&t=SsByHEkKsoFY0gRg-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A7312&show-proto-sidebar=1",
    processImage: "./img/CommonSense-process.png",
  },
  {
    title: "3. BASKIN ROBBINS",
    badges: ["리디자인", "웹디자인"],
    description:
      "귀여운 일러스트와 상큼한 컬러감의 배스킨라빈스 리디자인 프로젝트입니다.",
    meta: "개인 작업 | <strong>디자인 100%</strong>",
    tools: ["icon-photoshop.png", "icon-figma.png"],
    image: "./img/Samsung-Galaxy Tab.png",
    designUrl: "https://example.com/branding",
    processImage: "./img/branding-process.png",
  },
  {
    title: "4. MOBILE APP",
    badges: ["모바일", "앱디자인", "프로토타입"],
    description:
      "직관적인 인터페이스와 사용자 친화적인 모바일 앱 디자인입니다.",
    meta: "개인작업 | <strong>디자인 100%</strong>",
    tools: ["icon-figma.png"],
    image: "./img/Samsung-Galaxy Tab.png",
    designUrl: "https://example.com/mobileapp",
    processImage: "./img/mobile-process.png",
  },
  {
    title: "5. EDITORIAL",
    badges: ["에디토리얼", "출판", "레이아웃"],
    description:
      "가독성과 심미성을 모두 갖춘 에디토리얼 디자인 프로젝트입니다.",
    meta: "팀작업 | <strong>디자인 60%</strong>",
    tools: ["icon-photoshop.png", "icon-illustrator.png"],
    image: "./img/Samsung-Galaxy Tab.png",
    designUrl: "https://example.com/editorial",
    processImage: "./img/editorial-process.png",
  },
  {
    title: "6. FASHION DESIGN",
    badges: ["패션 디자인"],
    description: "패션 디자인 프로젝트입니다.",
    meta: "개인 작업 | <strong>디자인 100%</strong>",
    tools: ["icon-photoshop.png", "icon-illustrator.png"],
    image: "./img/Samsung-Galaxy Tab.png",
    designUrl: "https://example.com/branding",
    processImage: "./img/branding-process.png",
  },
];

// 4. Landing Page Detail Image Data (각 project-card의 detail 이미지 경로)
const landingPageDetailImages = [
  "./img/Lending-Page-EunyoungTteokbokki.png",
  "./img/lending-page-kuoca.png",
  "./img/landing-detail-3.jpg",
  "./img/landing-detail-4.jpg",
  "./img/landing-detail-5.jpg",
];

// 5. Landing Page Image Detail Overlay Functions
function openImageDetailOverlay(imagePath) {
  const overlay = document.getElementById("image-detail-overlay");
  const detailImage = document.getElementById("detail-image");

  if (overlay && detailImage) {
    detailImage.src = imagePath;
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeImageDetailOverlay() {
  const overlay = document.getElementById("image-detail-overlay");
  if (overlay) {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Water ripple effect variables
let waterEffect = null;
let displacementSprite = null;
let displacementFilter = null;
let pixiApp = null;
let currentSlide = 0;

// 3. Banner 캐러셀 함수 (전역 함수로 선언)
function updateCarousel() {
  if (!bnCards || totalCards === 0) return;

  bnCards.forEach((card, index) => {
    card.classList.remove("active");

    const position = (index - currentIndex + totalCards) % totalCards;
    const angle = (360 / totalCards) * position;
    const distance = 600;

    let scale, zIndex, opacity, rotateY;
    let offsetX = 0;

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
      offsetX = distance * 0.35;
    } else if (position === totalCards - 2) {
      scale = 0.7;
      zIndex = 25;
      opacity = 0.5;
      rotateY = 35;
      offsetX = distance * -0.35;
    } else {
      scale = 0.6;
      zIndex = 1;
      opacity = 0.3;
      rotateY = position < totalCards / 2 ? -45 : 45;
    }

    const rad = (angle * Math.PI) / 180;
    const x = Math.sin(rad) * distance + offsetX;
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

  const overlayImages = document.getElementById("overlayImages");
  overlayImages.innerHTML = `
    <div class="overlay-images-left">
      <div class="overlay-image-container image-1">
        <img src="${content.images.image1}" alt="Project Image 1" />
      </div>
      <div class="overlay-image-container image-2">
        <img src="${content.images.image2}" alt="Project Image 2" />
      </div>
    </div>
    <div class="overlay-images-right">
      <div class="overlay-image-container image-3">
        <img src="${content.images.image3}" alt="Project Image 3" />
      </div>
    </div>
  `;

  overlay.classList.add("active");
}

function closeOverlay(event) {
  if (!event || event.target.id === "overlay") {
    document.getElementById("overlay").classList.remove("active");
  }
}

// 4. Main Content Slider 함수
function updateSlide(index) {
  currentSlide = index;
  const data = sliderData[index];

  document.querySelector(".project-title").textContent = data.title;
  document.querySelector(".description").textContent = data.description;
  document.querySelector(".meta-info").innerHTML = data.meta;

  const badgesContainer = document.querySelector(".category-badges");
  badgesContainer.innerHTML = data.badges
    .map((badge, i) => `<div class="badge badge-${i + 1}">${badge}</div>`)
    .join("");

  const toolsContainer = document.querySelector(".tool-title");
  const toolHTML = data.tools
    .map((tool) => `<img src="./img/${tool}" alt="${tool}" />`)
    .join("");
  toolsContainer.innerHTML = `<p>Tool.</p><div class="tool-list">${toolHTML}</div>`;

  document.querySelectorAll("#slider-btn button").forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
  });

  updateTabletImage(data.image);
  attachOverlayButtonEvents();
}

function updateTabletImage(imageUrl) {
  const container = document.querySelector(".tablet-image-container");

  if (pixiApp) {
    try {
      container.removeChild(pixiApp.view);
      pixiApp.destroy(true, {
        children: true,
        texture: true,
        baseTexture: true,
      });
    } catch (e) {
      console.log("Cleanup error:", e);
    }
    pixiApp = null;
  }

  let existingImg = container.querySelector(".tablet-image");

  if (!existingImg) {
    existingImg = document.createElement("img");
    existingImg.className = "tablet-image";
    container.appendChild(existingImg);
  }

  existingImg.src = imageUrl;
  existingImg.style.display = "block";
  existingImg.style.width = "100%";
  existingImg.style.height = "100%";
  existingImg.style.objectFit = "contain";
}

function attachOverlayButtonEvents() {
  const designBtn = document.getElementById("design-btn");
  const processBtn = document.getElementById("process-btn");
  const processOverlay = document.getElementById("modal-process-concept");

  if (!designBtn || !processBtn) return;

  const newDesignBtn = designBtn.cloneNode(true);
  const newProcessBtn = processBtn.cloneNode(true);

  designBtn.parentNode.replaceChild(newDesignBtn, designBtn);
  processBtn.parentNode.replaceChild(newProcessBtn, processBtn);

  newDesignBtn.addEventListener("click", () => {
    const data = sliderData[currentSlide];
    window.open(data.designUrl, "_blank");
  });

  newProcessBtn.addEventListener("click", () => {
    const data = sliderData[currentSlide];
    const overlayContent = processOverlay.querySelector(".overlay-content");

    const existingImg = overlayContent.querySelector(
      ".process-image-container"
    );
    if (existingImg) {
      existingImg.remove();
    }

    const imageContainer = document.createElement("div");
    imageContainer.className = "process-image-container";

    const img = document.createElement("img");
    img.src = data.processImage;
    img.alt = "Process Image";
    img.style.width = "100%";
    img.style.height = "auto";

    imageContainer.appendChild(img);
    overlayContent.appendChild(imageContainer);

    toggleOverlay(processOverlay, true);
  });

  function toggleOverlay(overlay, isOpen) {
    if (isOpen) {
      overlay.classList.add("visible");
      document.body.style.overflow = "hidden";
    } else {
      overlay.classList.remove("visible");
      document.body.style.overflow = "";
    }
  }
}

// 5. DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  const processOverlay = document.getElementById("modal-process-concept");

  function toggleOverlay(overlay, isOpen) {
    if (isOpen) {
      overlay.classList.add("visible");
      document.body.style.overflow = "hidden";
    } else {
      overlay.classList.remove("visible");
      document.body.style.overflow = "";
    }
  }

  attachOverlayButtonEvents();

  document.querySelectorAll(".overlay-close-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const overlay = event.target.closest(".main-overlay, .overlay");
      if (overlay) {
        toggleOverlay(overlay, false);
      }
    });
  });

  document.querySelectorAll(".main-overlay, .overlay").forEach((overlay) => {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        toggleOverlay(overlay, false);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document
        .querySelectorAll(".main-overlay.visible, .overlay.active")
        .forEach((overlay) => {
          if (overlay.classList.contains("main-overlay")) {
            toggleOverlay(overlay, false);
          } else if (overlay.classList.contains("overlay")) {
            closeOverlay();
          }
        });
    }
  });

  const bigWaterdrop = document.querySelector(".big-waterdrop");

  document.querySelectorAll("#slider-btn button").forEach((button) => {
    button.addEventListener("click", () => {
      const slideIndex = parseInt(button.dataset.slide);
      updateSlide(slideIndex);

      if (bigWaterdrop) {
        currentRotation += 90;
        bigWaterdrop.style.transform = `rotate(${currentRotation}deg)`;
      }
    });
  });

  updateTabletImage(sliderData[0].image);

  const gnbBtn = document.querySelectorAll(".gnb-btn");
  let selectedBtn = document.querySelector(".selected");

  const setAnchorOnSelected = () => {
    if (selectedBtn) {
      selectedBtn.style.anchorName = "--selected";
    }
  };

  setAnchorOnSelected();

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

    const handleInteractionEnd = () => {
      if (button !== selectedBtn) {
        button.style.anchorName = "";
        setAnchorOnSelected();
      }
    };

    button.addEventListener("mouseleave", handleInteractionEnd);
    button.addEventListener("blur", handleInteractionEnd);
  });

  const gnbLinks = document.querySelectorAll(".gnb-top a");

  gnbLinks.forEach((link) => {
    const hoverImg = link.dataset.hover;

    link.addEventListener("mouseenter", () => {
      link.style.color = "transparent";
      link.style.backgroundImage = `url(${hoverImg})`;
      link.style.backgroundSize = "contain";
      link.style.backgroundRepeat = "no-repeat";
      link.style.backgroundPosition = "center";
    });

    link.addEventListener("mouseleave", () => {
      link.style.color = "";
      link.style.backgroundImage = "";
    });
  });

  const wave = document.querySelector(".wave");
  document.addEventListener("mousemove", (e) => {
    wave.style.left = `${e.clientX}px`;
    wave.style.top = `${e.clientY}px`;
  });

  const cards = document.querySelectorAll(".project-card");

  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      cards.forEach((c) => c.classList.remove("active", "prev", "shrink"));

      card.classList.add("active");
      let prevIndex = -1;

      if (index > 0) {
        cards[index - 1].classList.add("prev");
        prevIndex = index - 1;
      } else if (index === 0 && cards.length > 1) {
        cards[index + 1].classList.add("prev");
        prevIndex = index + 1;
      }

      cards.forEach((c, i) => {
        if (i !== index && i !== prevIndex) {
          c.classList.add("shrink");
        }
      });
    });
  });

  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      navItems.forEach((nav) => nav.classList.remove("active"));
      this.classList.add("active");

      const targetId = this.getAttribute("data-target");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  bnCards = document.querySelectorAll(".card");
  totalCards = bnCards.length;

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

  // 마우스 휠 이벤트 추가 - BANNER 섹션에서만 작동
  const bannerSection = document.querySelector(".banner");
  if (bannerSection) {
    bannerSection.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();

        if (e.deltaY > 0) {
          rotate(1);
        } else if (e.deltaY < 0) {
          rotate(-1);
        }
      },
      { passive: false }
    );
  }

  // 6. Landing Page Detail Button Event Listeners
  const imageOverlayCloseBtn = document.getElementById(
    "image-overlay-close-btn"
  );
  if (imageOverlayCloseBtn) {
    imageOverlayCloseBtn.addEventListener("click", closeImageDetailOverlay);
  }

  const imageDetailOverlay = document.getElementById("image-detail-overlay");
  if (imageDetailOverlay) {
    imageDetailOverlay.addEventListener("click", (event) => {
      if (event.target.id === "image-detail-overlay") {
        closeImageDetailOverlay();
      }
    });
  }

  const detailButtons = document.querySelectorAll(".project-card_btn");
  detailButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();

      const card = button.closest(".project-card");
      const index = parseInt(card.getAttribute("data-index"));

      if (index >= 1 && index <= landingPageDetailImages.length) {
        const imagePath = landingPageDetailImages[index - 1];
        openImageDetailOverlay(imagePath);
      } else {
        console.error(`Detail image not found for index: ${index}`);
      }
    });
  });
  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      navItems.forEach((nav) => nav.classList.remove("active"));
      this.classList.add("active");

      const targetId = this.getAttribute("data-target");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // 부드러운 스크롤을 위한 커스텀 함수
        const startPosition = window.pageYOffset;
        const targetPosition = targetElement.offsetTop;
        const distance = targetPosition - startPosition;
        const duration = 1200; // 1.2초 (더 느리게)
        let start = null;

        function animation(currentTime) {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const progress = Math.min(timeElapsed / duration, 1);

          // easeInOutCubic 이징 함수로 더 부드럽게
          const ease =
            progress < 0.5
              ? 4 * progress * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;

          window.scrollTo(0, startPosition + distance * ease);

          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        }

        requestAnimationFrame(animation);
      }
    });
  });
});
