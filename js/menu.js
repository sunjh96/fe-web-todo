//menu 열기
const open = () => {
  document.querySelector(".menu-wrapper").classList.add("sidebarshow");
};
//menu닫기
const close = () => {
  document.querySelector(".menu-wrapper").classList.remove("sidebarshow");
};
//item등록
document.getElementById("menuCloseBtn").addEventListener("click", close);
document.getElementById("hamburgerBtn").addEventListener("click", open);
