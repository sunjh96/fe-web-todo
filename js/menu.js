//menu 열기
const open = () => {
  document.querySelector(".menuWrapper").classList.add("sidebarshow");
};
//menu닫기
const close = () => {
  document.querySelector(".menuWrapper").classList.remove("sidebarshow");
};
//item등록
document.getElementById("menuCloseBtn").addEventListener("click", close);
document.getElementById("hamburgerBtn").addEventListener("click", open);
