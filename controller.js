// The Data

let toDos = [];

let retrievedData = JSON.parse(localStorage.getItem("toDosArray"));

if (!retrievedData) {
  toDos = [
    { value: "code", isCompleted: false },
    { value: "paly", isCompleted: true },
    { value: "sleep", isCompleted: false },
  ];
} else {
  toDos = retrievedData;
}

// Counter

const reLoadCounter = () => {
  const counterArray = toDos.filter((todo) => {
    return todo.isCompleted == false;
  });
  $("#counter").html(counterArray.length);
};

// Render ToDos Functionality

const renderToDos = () => {
  $(".list").html("");
  toDos.forEach((todo, index) => {
    $(".list").append(`<li class="listItem" id="listItem${index}">
    <span id="todo${index}" class="${
      todo.isCompleted ? "completedItem" : "unCompletedItem"
    }" onclick="completeToDo(${index}); return false">${todo["value"]}</span>
    <span class="options">
    <a class="editItem" onclick="editToDo(${index})">Edit</a>
    <a class="removeItem" onclick="removeToDo(${index})">Remove</a>
    </span>
    </li>`);
  });
  reLoadCounter();
  localStorage.setItem("toDosArray", JSON.stringify(toDos));
};

renderToDos();

// Add ToDo Functionality

const addToDo = () => {
  const inputValue = $("#todoInput").val();
  if (inputValue.length && inputValue.trim().length) {
    toDos.push({
      value: inputValue,
      isCompleted: false,
    });
  }
  $("#todoInput").val("");
  renderToDos();
};

// Remove ToDo Functionality

const removeToDo = (todoIndex) => {
  toDos = toDos.filter((todo, index) => {
    if (todoIndex !== index) {
      return todo;
    }
  });
  renderToDos();
};

// Edit ToDo Functionality

const editToDo = (todoIndex) => {
  toDos.forEach((todo, index) => {
    if (todoIndex === index) {
      $(`#listItem${index}`).html(`<input id="todoEditInput" type="text">`);
      $("#todoEditInput").on("blur", () => {
        todo.value = $("#todoEditInput").val();
        renderToDos();
      });
    }
  });
};

// Complete ToDo Functionality

const completeToDo = (todoIndex) => {
  toDos.forEach((todo, index) => {
    if (todoIndex === index) {
      if (todo.isCompleted == false) {
        todo.isCompleted = true;
        renderToDos();
      } else {
        todo.isCompleted = false;
        renderToDos();
      }
    }
  });
};

// Clear All ToDos Functionality

const clearAllToDos = () => {
  toDos.length = 0;
  renderToDos();
};

// Clear All Completed ToDos Functionality

const clearAllCompletedToDos = () => {
  toDos = toDos.filter((todo) => {
    return !todo.isCompleted;
  });
  renderToDos();
};

// Event Listeners

$("#addButton").click(addToDo);
$("#clearList").click(clearAllToDos);
$("#clearCompleted").click(clearAllCompletedToDos);
