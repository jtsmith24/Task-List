var todoList = {
  todos: [],
  
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  
  changeTodo: function(position, newTodoText) {
    this.todos[position].todoText = newTodoText;
  },
  
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  
  toggleAll: function() {
    //If everything is true, make everything false
    var completedTodos = 0;
    var totalTodos = this.todos.length;
    
    this.todos.forEach(function(todo) {
      if(todo.completed === true) {
        completedTodos++;
      }
    });
   
    this.todos.forEach(function(todo) {
      if(completedTodos === totalTodos) {
        todo.completed = false;
      }
      else {
        todo.completed = true;
      }
    });
  },
  
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  }
};

var handlers = {
  addTodo: function() {
    //Gives us DOM element which is why we need .value below
    var addTodoTextInput = document.getElementById("addTodoTextInput");
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = "";
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
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

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    var todoWithCompletedIndicator = '';
    todosUl.innerHTML = '';
   
    todoList.todos.forEach(function(todo, position) {
      var todoLi = document.createElement('li');
        if(todo.completed === true) {
          //display with (x)
          todoWithCompletedIndicator = '(x) ' + todo.todoText;
        }
        else {
          //display with ()
          todoWithCompletedIndicator = '() ' + todo.todoText;
        }
        
        todoLi.id = position;
        todoLi.textContent = todoWithCompletedIndicator;
        todoLi.appendChild(this.createDeleteButton());
        todosUl.appendChild(todoLi);
    }, this);
  
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    
    return deleteButton;
  },
  
  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul');

    todosUl.addEventListener('click', function (event) {
     
      var elementClicked = event.target;
      
      if(elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
      
      
    });
  }
};

view.setUpEventListeners();

//Event delegation - listening for the event on a single element.
//All child elements events are handled to the parent element.
