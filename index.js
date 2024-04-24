const changeMoriningBtn = document.querySelector(".morning__btn");
const changeDarkBtn = document.querySelector(".dark__btn");

changeMoriningBtn.addEventListener("click", () => {
	document.body.classList.remove("dark");
});
changeDarkBtn.addEventListener("click", () => {
	document.body.classList.add("dark");
});
