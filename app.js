
// MODEL: todo list and updating todo list
var todoList = {
    todos: [],
    addTodo: function(todoText) {
      this.todos.push(
        {
          todoText: todoText, // no 'this' needed, as it refers to method param
          completed: false
        }
      );
    },
    changeTodo: function(position, todoText) {
      this.todos[position].todoText = todoText;
    },
    deleteTodo: function(position) {
      this.todos.splice(position, 1);
    },
    toggleCompleted: function(position) {
      var todo = this.todos[position];
      todo.completed = !todo.completed;
    },
    toggleAll: function() {
      var totalTodos = this.todos.length;
      var completedTodos = 0;
      // get number of completed todos
      this.todos.forEach(
        function(todo) {
          if (todo.completed === true) {
            completedTodos++;
          }
        }
      );
      // if all todos are completed, toggle them all to false
      // otherwise, toggle them all to true
      this.todos.forEach(
        function(todo) {
          if (completedTodos === totalTodos) {
            todo.completed = false;
          } else {
            todo.completed = true;
          }
        }
      );
    } // end toggleAll method
};

// CONTROLLER: connecting ui to todo list object
var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value); // gets value of input
    addTodoTextInput.value = ''; // clears value after entry
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(
      changeTodoPositionInput.valueAsNumber, // casts input as number
      changeTodoTextInput.value
    );
    changeTodoTextInput.value = '';
    changeTodoPositionInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
};

// VIEW: shows what the todo list looks like
var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = ''; // clears list before new items are added
    todoList.todos.forEach(
      function(todo, position) {
        var todoLi = document.createElement('li');
        var todoTextWithCompletion = '';
        if (todo.completed === true) {
          todoTextWithCompletion = '(x) ' + todo.todoText;
        } else {
          todoTextWithCompletion = '( ) ' + todo.todoText;
        }
        todoLi.id = position;
        todoLi.textContent = todoTextWithCompletion; // injects todo text with completion data
        todoLi.appendChild(this.createDeleteButton());
        todosUl.appendChild(todoLi);
      }, this
    );
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  // EVENT DELEGATION: set listener on enclosing parent element, rather than each child
  //
  // listens on the unordered list for a click
  // on click, it grabs the element clicked
  // if it's a delete button, it looks for the id, and passes that to the delete method on the handler
  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function(event) {
      // get element that was clicked on
      var elementClicked = event.target;
      //check if elementClicked is a delete button
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id)); // casts as number
      }
    });
  }
};

view.setUpEventListeners();
