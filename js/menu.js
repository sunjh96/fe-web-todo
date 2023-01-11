//menu 열기
const open = (e) => {
  if (e.target.id === "hamburger-btn")
    document.querySelector(".menu-wrapper").classList.add("sidebar-show");
};
//menu닫기
const close = (e) => {
  if (e.target.id == "menu-close-btn")
    document.querySelector(".menu-wrapper").classList.remove("sidebar-show");
};
//item등록
document.addEventListener("click", (e) => {
  open(e);
  close(e);
});
