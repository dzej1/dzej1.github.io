const tasksList = document.querySelector("#tasks");
const newTask = document.querySelector("#add-task");

const newTaskInput = newTask.querySelector("#new-task");
const addTaskButton = newTask.querySelector("#add-task-button");

let localStorageItems = localStorage.getItem("tasks");
let items = localStorageItems === null ? [] : JSON.parse(localStorageItems);

const renderItem = (item, index) => {
	let element = document.createElement("div");
	element.innerText = item[0];
	tasksList.innerHTML += `<div class="task-item" data-done=${item[1]} key=${index}><span>${element.innerHTML}</span><button class="task-done" title="hotovo">O</button><button class="delete-task-button" title="smazat">X</button></div>`;
};

const reRenderList = () => {
	if (items == false) {
		tasksList.innerHTML = "<h3>nechceš něco přidat? 😊</h3>";
	} else {
		items.sort((a, b) => a[1] - b[1]);
		tasksList.innerHTML = "";
		items.forEach((item, index) => {
			renderItem(item, index);
		});
	}

	let deleteTaskButtons = document.querySelectorAll(".delete-task-button");
	deleteTaskButtons.forEach((btn) =>
		btn.addEventListener("click", (e) => deleteTask(e))
	);

	let doneTaskButtons = document.querySelectorAll(".task-done");
	doneTaskButtons.forEach((btn) =>
		btn.addEventListener("click", (e) => markTaskAsDone(e))
	);
};

const pushToLocalStorage = () => {
	localStorage.removeItem("tasks");
	localStorage.setItem("tasks", JSON.stringify(items));
};

const addTask = (e) => {
	e.preventDefault();

	if (newTaskInput.value !== "") {
		items.push([newTaskInput.value, false]);

		pushToLocalStorage();
		reRenderList();
		newTask.reset();
	}
};

const getElement = (e) => e.path[1].attributes[2].value;

const markTaskAsDone = (e) => {
	let key = getElement(e);
	items[key] = [items[key][0], !items[key][1]];
	console.log(e, items[key]);
	pushToLocalStorage();
	reRenderList();
};

const deleteTask = (e) => {
	let key = getElement(e);
	items = items.filter((_, index) => index != key);
	pushToLocalStorage();
	reRenderList();
};

reRenderList();

addTaskButton.addEventListener("click", addTask);
newTask.addEventListener("onsumbit", addTask);
