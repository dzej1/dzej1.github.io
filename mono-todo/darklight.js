const rootElement = document.documentElement.classList;

const savetoLS = () => {
	localStorage.setItem("dark-mode", rootElement.value === "dark-mode");
};

rootElement.value =
	localStorage.getItem("dark-mode") === "true" ? "dark-mode" : "";

const changeMode = () => {
	rootElement.toggle("dark-mode");
	savetoLS();
};

const btn = document.querySelector("#dark-light-mode-switch");
btn.addEventListener("click", changeMode);
