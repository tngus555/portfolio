document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("background-video");
  const skipButton = document.getElementById("skip-button");

  // 이동할 페이지의 URL을 정의합니다.
  // 실제 프로젝트에 맞게 경로를 수정하세요.
  const DESTINATION_URL = "./home.html";

  /**
   * 페이지 이동 함수
   */
  const navigateToNextPage = () => {
    // JavaScript를 사용하여 현재 페이지를 새 URL로 변경합니다.
    window.location.href = DESTINATION_URL;
  };

  // 1. 동영상 재생이 완료되면 다른 페이지로 이동
  video.addEventListener("ended", () => {
    // 비디오 재생이 완전히 끝나면 페이지 이동 함수 호출
    navigateToNextPage();
  });

  // 2. 'Skip' 버튼 클릭 시 다른 페이지로 이동
  skipButton.addEventListener("click", () => {
    // 비디오를 정지하고
    video.pause();
    // 페이지 이동 함수 호출
    navigateToNextPage();
  });

  // 마우스 커셔
  const wave = document.querySelector(".wave");
  document.addEventListener("mousemove", (e) => {
    wave.style.left = `${e.clientX}px`;
    wave.style.top = `${e.clientY}px`;
  });
});
