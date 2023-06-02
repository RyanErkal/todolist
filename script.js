class todo {
	constructor(title, description, priority, notes, checklist) {
		this.title = title;
		this.description = description;
		this.priority = priority;
		this.notes = notes;
		this.checklist = checklist;
	}
	newTodo(title, description, priority, notes, checklist) {
		this.title = title;
		this.description = description;
		this.priority = priority;
		this.notes = notes;
		this.checklist = checklist;
	}
	setTitle(title) {
		this.title = title;
	}
	setDescription(description) {
		this.description = description;
	}
	setPriority(priority) {
		this.priority = priority;
	}
	setNotes(notes) {
		this.notes = notes;
	}
	setChecklist(checklist) {
		this.checklist = checklist;
	}
	getTitle() {
		return this.title;
	}
	getDescription() {
		return this.description;
	}
	getPriority() {
		return this.priority;
	}
	getNotes() {
		return this.notes;
	}
	getChecklist() {
		return this.checklist;
	}
}

class todoList {
	constructor() {
		this.list = [];
	}
	add(todo) {
		this.list.push(todo);
	}
	remove(todo) {
		this.list = this.list.filter((item) => item !== todo);
	}
	edit(todo, newTodo) {
		this.list = this.list.map((item) => {
			if (item === todo) {
				return newTodo;
			}
			return item;
		});
	}
	get() {
		return this.list;
	}
}

class project {
	constructor(title, description) {
		this.title = title;
		this.description = description;
	}
	newProject(title, description) {
		this.title = title;
		this.description = description;
	}
	setTitle(title) {
		this.title = title;
	}
	setDescription(description) {
		this.description = description;
	}
	getTitle() {
		return this.title;
	}
	getDescription() {
		return this.description;
	}
}

class projectList {
	constructor() {
		this.list = [];
	}
	add(project) {
		this.list.push(project);
	}
	remove(project) {
		this.list = this.list.filter((item) => item !== project);
	}
	edit(project, newProject) {
		this.list = this.list.map((item) => {
			if (item === project) {
				return newProject;
			}
			return item;
		});
	}
	get() {
		return this.list;
	}
}

todoList = new todoList();
projectList = new projectList();

function newTodo() {
	let title = document.getElementById("title").value;
	let description = document.getElementById("description").value;
	let priority = document.getElementById("priority").value;
	let notes = document.getElementById("notes").value;
	let checklist = document.getElementById("checklist").value;
	console.log(title, description, priority, notes, checklist);
	title = new todo(title, description, priority, notes, checklist);
	console.log(title);
	todoList.add(title);
	console.log(todoList);
	updateTodoList();
	closeOverlay();
	toggleDarken();
}

function updateTodoList() {
	let todoListDiv = document.querySelector(".todolist");
	todoListDiv.innerHTML = "";
	todoList.get().forEach((todo) => {
		todoListDiv.innerHTML += `
			<div class="todo">
				<h3>${todo.title}</h3>
				<button>+</button>
			</div>
		`;
	});
}

function newProject() {
	let title = document.getElementById("title").value;
	let description = document.getElementById("description").value;
	title = new project(title, description);
	projectList.add(title);
	console.log(projectList);
	updateProjectList();
	closeOverlay();
	toggleDarken();
}

function updateProjectList() {
	let projectListDiv = document.querySelector(".projectlist");
	projectListDiv.innerHTML = "";
	projectList.get().forEach((project) => {
		projectListDiv.innerHTML += `
			<div class="project">
				<h3>${project.title}</h3>
			</div>
		`;
	});
}

// function toggleOverlay() {
// 	darkenBackground();
// 	newTodoOverlay();
// }

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape") {
		if (document.querySelector(".overlay").classList.contains("active")) {
			closeOverlay();
			toggleDarken();
		}
	}
});

function closeOverlay() {
	let overlayDiv = document.querySelector(".overlay");
	overlayDiv.classList.remove("active");
	overlayDiv.innerHTML = ``;
}

function toggleDarken() {
	let main = document.querySelector("main");
	let header = document.querySelector("header");
	let footer = document.querySelector("footer");
	main.classList.toggle("darken");
	header.classList.toggle("darken");
	footer.classList.toggle("darken");
}

function newTodoOverlay() {
	toggleDarken();
	let overlayDiv = document.querySelector(".overlay");
	overlayDiv.classList.toggle("active");
	overlayDiv.innerHTML = `
	<div class="overlay-content">
		<h3>New Todo</h3>
		<form>
			<label for="title">Title</label>
			<input type="text" id="title" name="title" />
			<label for="description">Description</label>
			<input type="text" id="description" name="description" />
			<label for="priority">Priority</label>
			<select id="priority" name="priority">
				<option value="low">Low</option>
				<option value="medium">Medium</option>
				<option value="high">High</option>
			</select>
			<label for="notes">Notes</label>
			<input type="text" id="notes" name="notes" />
			<label for="checklist">Checklist</label>
			<input type="text" id="checklist" name="checklist" />
			<button type="button" id="addTodo">Add Todo</button>
		</form>
	</div>
	`;
	document.getElementById("addTodo").addEventListener("click", () => {
		newTodo();
	});
}

function newProjectOverlay() {
	toggleDarken();
	let overlayDiv = document.querySelector(".overlay");
	overlayDiv.classList.toggle("active");
	overlayDiv.innerHTML = `
	<div class="overlay-content">
		<h3>New Project</h3>
		<form>
			<label for="title">Title</label>
			<input type="text" id="title" name="title" />
			<label for="description">Description</label>
			<input type="text" id="description" name="description" />
			<button type="button" id="addProject">Add Project</button>
		</form>
	</div>
	`;
	document.getElementById("addProject").addEventListener("click", () => {
		newProject();
	});
}

document.getElementById("newTodo").addEventListener("click", () => {
	newTodoOverlay();
});

document.getElementById("newProject").addEventListener("click", () => {
	newProjectOverlay();
});

document.getElementById("editTodo").addEventListener("click", () => {
	const todo = new todo();
	todo.title = document.getElementById("title").value;
	todo.description = document.getElementById("description").value;
	todo.priority = document.getElementById("priority").value;
	todo.notes = document.getElementById("notes").value;
	todo.checklist = document.getElementById("checklist").value.split(",");
	todoList.edit(todo);
});

document.getElementById("removeTodo").addEventListener("click", () => {
	const todo = new todo();
	todo.title = document.getElementById("title").value;
	todo.description = document.getElementById("description").value;
	todo.priority = document.getElementById("priority").value;
	todo.notes = document.getElementById("notes").value;
	todo.checklist = document.getElementById("checklist").value.split(",");
	todoList.remove(todo);
});

document.getElementById("editProject").addEventListener("click", () => {
	const project = new project();
	project.title = document.getElementById("title").value;
	projectList.edit(project);
});

document.getElementById("removeProject").addEventListener("click", () => {
	const project = new project();
	project.title = document.getElementById("title").value;
	projectList.remove(project);
});

// Tests
// const todoList = new todoList();
// const projectList = new projectList();
// const todo1 = new todo();
// todo1.title = "Todo 1";
// todo1.description = "Todo 1 description";
// todo1.dueDate = "2021-10-10";
// todo1.priority = "High";
// todo1.notes = "Todo 1 notes";
// todo1.checklist = ["Todo 1 checklist 1", "Todo 1 checklist 2"];
// const todo2 = new todo();
// todo2.title = "Todo 2";
// todo2.description = "Todo 2 description";
// todo2.dueDate = "2021-10-10";
// todo2.priority = "High";
// todo2.notes = "Todo 2 notes";
// todo2.checklist = ["Todo 2 checklist 1", "Todo 2 checklist 2"];
// const todo3 = new todo();
// todo3.title = "Todo 3";
// todo3.description = "Todo 3 description";
// todo3.dueDate = "2021-10-10";
// todo3.priority = "High";
// todo3.notes = "Todo 3 notes";
// todo3.checklist = ["Todo 3 checklist 1", "Todo 3 checklist 2"];
