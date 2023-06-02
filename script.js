class todo {
	constructor() {
		this.title = "";
		this.description = "";
		this.dueDate = "";
		this.priority = "";
		this.notes = "";
		this.checklist = [];
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
	constructor() {
		this.title = "";
		this.description = "";
		this.todoList = new todoList();
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

function newTodo() {
	const todo = new todo();
	toggleOverlay();
	todo.title = document.getElementById("title").value;
	todo.description = document.getElementById("description").value;
	todo.dueDate = document.getElementById("dueDate").value;
	todo.priority = document.getElementById("priority").value;
	todo.notes = document.getElementById("notes").value;
	todo.checklist = document.getElementById("checklist").value;
	todoList.add(todo);
	updateTodoList();
}

function updateTodoList() {
	let todoListDiv = document.querySelector(".todoList");
	todoListDiv.innerHTML = "";
	todoList.get().forEach((todo) => {
		todoListDiv.innerHTML += `
			<div class="todo">
				<h3>${todo.title}</h3>
				<p>${todo.description}</p>	
				<p>${todo.dueDate}</p>
				<p>${todo.priority}</p>
				<p>${todo.notes}</p>
				<p>${todo.checklist}</p>
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
			darkenBackground();
		}
	}
});

function closeOverlay() {
	let overlayDiv = document.querySelector(".overlay");
	overlayDiv.classList.remove("active");
	overlayDiv.innerHTML = ``;
}

function darkenBackground() {
	let main = document.querySelector("main");
	let header = document.querySelector("header");
	let footer = document.querySelector("footer");
	main.classList.toggle("darken");
	header.classList.toggle("darken");
	footer.classList.toggle("darken");
}

function newTodoOverlay() {
	darkenBackground();
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
			<label for="dueDate">Due Date</label>
			<input type="date" id="dueDate" name="dueDate" />
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
}

function newProjectOverlay() {
	darkenBackground();
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
}

document.getElementById("addTodo").addEventListener("click", () => {
	newTodoOverlay();
});

document.getElementById("editTodo").addEventListener("click", () => {
	const todo = new todo();
	todo.title = document.getElementById("title").value;
	todo.description = document.getElementById("description").value;
	todo.dueDate = document.getElementById("dueDate").value;
	todo.priority = document.getElementById("priority").value;
	todo.notes = document.getElementById("notes").value;
	todo.checklist = document.getElementById("checklist").value.split(",");
	todoList.edit(todo);
});

document.getElementById("removeTodo").addEventListener("click", () => {
	const todo = new todo();
	todo.title = document.getElementById("title").value;
	todo.description = document.getElementById("description").value;
	todo.dueDate = document.getElementById("dueDate").value;
	todo.priority = document.getElementById("priority").value;
	todo.notes = document.getElementById("notes").value;
	todo.checklist = document.getElementById("checklist").value.split(",");
	todoList.remove(todo);
});

document.getElementById("newProject").addEventListener("click", () => {
	newProjectOverlay();
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
