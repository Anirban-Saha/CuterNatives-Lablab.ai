const sign_in_btn = document.querySelector("#try-again");
const sign_up_btn = document.querySelector(".btn-solid");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("response-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("response-mode");
});