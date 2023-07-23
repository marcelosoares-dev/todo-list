// Seleção de elementos do DOM
const todoForm = document.querySelector("#todo-form"); // Formulário para adicionar novos todos
const todoInput = document.querySelector("#todo-input"); // Campo de entrada para o texto do todo
const todoList = document.querySelector("#todo-list"); // Div que conterá a lista de todos
const editForm = document.querySelector("#edit-form"); // Formulário para editar um todo existente
const editInput = document.querySelector("#edit-input"); // Campo de entrada para o texto do todo a ser editado
const cancelEditBtn = document.querySelector("#cancel-edit-btn"); // Botão para cancelar a edição do todo
const searchInput = document.querySelector("#search-input"); // Campo de busca para filtrar todos
const eraseBtn = document.querySelector("#erase-button"); // Botão para limpar a busca
const filterBtn = document.querySelector("#filter-select"); // Dropdown para selecionar o filtro

let oldInputValue = ""; // Variável para armazenar o valor antigo do todo antes de editar

// Função para criar e salvar um novo todo
const saveTodo = (text, done = 0, save = 1) => {
  const todo = document.createElement("div"); // Cria uma div para representar o todo
  todo.classList.add("todo"); // Adiciona a classe "todo" à div

  const todoTitle = document.createElement("h3"); // Cria um elemento h3 para o título do todo
  todoTitle.innerText = text; // Define o texto do título como o texto informado
  todo.appendChild(todoTitle); // Adiciona o título à div do todo

  const doneBtn = document.createElement("button"); // Cria um botão para marcar o todo como concluído
  doneBtn.classList.add("finish-todo"); // Adiciona a classe "finish-todo" ao botão
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'; // Define o ícone do botão como um ícone de check
  todo.appendChild(doneBtn); // Adiciona o botão à div do todo

  const editBtn = document.createElement("button"); // Cria um botão para editar o todo
  editBtn.classList.add("edit-todo"); // Adiciona a classe "edit-todo" ao botão
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'; // Define o ícone do botão como um ícone de caneta
  todo.appendChild(editBtn); // Adiciona o botão à div do todo

  const deleteBtn = document.createElement("button"); // Cria um botão para remover o todo
  deleteBtn.classList.add("remove-todo"); // Adiciona a classe "remove-todo" ao botão
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'; // Define o ícone do botão como um ícone de X
  todo.appendChild(deleteBtn); // Adiciona o botão à div do todo

  // Utilizando dados da localStorage
  if (done) {
    todo.classList.add("done"); // Se o todo já estiver concluído, adiciona a classe "done" à div do todo
  }

  if (save) {
    saveTodoLocalStorage({ text, done }); // Salva o novo todo na localStorage (função definida posteriormente)
  }

  todoList.appendChild(todo); // Adiciona a div do todo à lista de todos

  todoInput.value = ""; // Limpa o campo de entrada do novo todo
  todoInput.focus(); // Dá foco novamente ao campo de entrada para facilitar a inserção de novos todos
};

// Função para exibir/ocultar formulários de edição e adição de todos
const toggleForms = () => {
  editForm.classList.toggle("hide"); // Alterna a classe "hide" no formulário de edição
  todoForm.classList.toggle("hide"); // Alterna a classe "hide" no formulário de adição de novos todos
  todoList.classList.toggle("hide"); // Alterna a classe "hide" na lista de todos
};

// Função para atualizar o texto de um todo existente
const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo"); // Seleciona todos os elementos com a classe "todo"

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3"); // Seleciona o título do todo atual

    if (todoTitle.innerText === oldInputValue) {
      // Se o título do todo for igual ao valor antigo (ou seja, se é o todo que estamos editando)
      todoTitle.innerText = text; // Atualiza o texto do título com o novo texto informado

      updateTodoLocalStorage(oldInputValue, text);
    }
  });
};

// Função para filtrar os todos com base na busca realizada
const filterTodos = (search, filterValue) => {
  const todos = document.querySelectorAll(".todo"); // Seleciona todos os elementos com a classe "todo"

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3").innerText.toLowerCase(); // Obtém o texto do título em letras minúsculas
    const normalizedSearch = search.toLowerCase(); // Normaliza o texto de busca em letras minúsculas

    todo.style.display = "flex"; // Exibe o todo por padrão

    const isDone = todo.classList.contains("done");

    if (
      filterValue === "all" ||
      (filterValue === "done" && isDone) ||
      (filterValue === "todo" && !isDone)
    ) {
      // Verifica se o filtro selecionado corresponde ao status de conclusão do todo
      if (!todoTitle.includes(normalizedSearch)) {
        // Se o texto de busca não estiver contido no título do todo
        todo.style.display = "none"; // Oculta o todo
      }
    } else {
      // Caso o filtro não corresponda ao status de conclusão do todo, oculta o todo
      todo.style.display = "none";
    }
  });
};

// Eventos

// Evento de envio do formulário de adição de novos todos
todoForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Previne o comportamento padrão do formulário (não recarrega a página)

  const inputValue = todoInput.value; // Obtém o texto informado no campo de entrada

  if (inputValue) {
    // Se o campo de entrada não estiver vazio
    saveTodo(inputValue); // Chama a função para salvar o novo todo com o texto informado
  }
});

// Evento de clique em qualquer elemento do documento
document.addEventListener("click", (e) => {
  const targetEl = e.target; // Obtém o elemento em que ocorreu o clique
  const parentEl = targetEl.closest(".todo"); // Obtém o elemento pai mais próximo que tenha a classe "todo"
  let todoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    // Se o elemento pai existir e contiver um título de todo
    todoTitle = parentEl.querySelector("h3").innerText; // Obtém o texto do título do todo
  }

  if (targetEl.classList.contains("finish-todo")) {
    // Se o elemento clicado tiver a classe "finish-todo" (botão de marcação de conclusão)
    parentEl.classList.toggle("done"); // Alterna a classe "done" no elemento pai (marca/desmarca como concluído)
    updateTodoStatusLocalStorage(todoTitle); // Atualiza o status de conclusão do todo na localStorage
  }

  if (targetEl.classList.contains("remove-todo")) {
    // Se o elemento clicado tiver a classe "remove-todo" (botão de remoção)
    parentEl.remove(); // Remove o elemento pai (o todo) da lista de todos
    removeTodoLocalStorage(todoTitle); // Remove o todo da localStorage
  }

  if (targetEl.classList.contains("edit-todo")) {
    // Se o elemento clicado tiver a classe "edit-todo" (botão de edição)
    toggleForms(); // Alterna a exibição dos formulários de edição e adição de todos
    editInput.value = todoTitle; // Preenche o campo de edição com o texto do todo atual
    oldInputValue = todoTitle; // Armazena o valor antigo do todo para uso posterior na edição
  }
});

// Evento de clique no botão "Cancelar" do formulário de edição
cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Previne o comportamento padrão do botão (não recarrega a página)
  toggleForms(); // Alterna a exibição dos formulários de edição e adição de todos
});

// Evento de envio do formulário de edição de todos
editForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Previne o comportamento padrão do formulário (não recarrega a página)

  const editInputValue = editInput.value; // Obtém o texto informado no campo de edição

  if (editInputValue) {
    // Se o campo de edição não estiver vazio
    updateTodo(editInputValue); // Chama a função para atualizar o texto do todo
  }

  toggleForms(); // Alterna a exibição dos formulários de edição e adição de todos
});

// Evento de digitação no campo de busca
searchInput.addEventListener("keyup", (e) => {
  const search = e.target.value; // Obtém o texto digitado na busca
  const filterValue = filterBtn.value; // Obtém o valor da opção selecionada no dropdown de filtro
  filterTodos(search, filterValue); // Chama a função para filtrar os todos com base na busca e no filtro selecionado
});

// Evento de clique no botão "Limpar Busca"
eraseBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Previne o comportamento padrão do botão (não recarrega a página)

  searchInput.value = ""; // Limpa o campo de busca
  searchInput.dispatchEvent(new Event("keyup")); // Dispara o evento de digitação no campo de busca para refletir a limpeza
});

// Evento de mudança na opção selecionada no dropdown de filtro
filterBtn.addEventListener("change", (e) => {
  const filterValue = e.target.value; // Obtém o valor da opção selecionada no dropdown
  const search = searchInput.value; // Obtém o texto digitado na busca
  filterTodos(search, filterValue); // Chama a função para filtrar os todos com base na busca e no filtro selecionado
});

// Local Storage

// Função para obter os todos da localStorage
const getTodosLocalStorage = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || []; // Obtém os dados da localStorage ou retorna um array vazio se não houver nada

  return todos; // Retorna os dados dos todos obtidos da localStorage
};

const loadTodos = () => {
  const todos = getTodosLocalStorage();

  todos.forEach((todo) => {
    saveTodo(todo.text, todo.done, false);
  });
};

// Função para salvar um todo na localStorage
const saveTodoLocalStorage = (todo) => {
  const todos = getTodosLocalStorage(); // Obtém os todos existentes na localStorage

  todos.push(todo); // Adiciona o novo todo ao array de todos

  localStorage.setItem("todos", JSON.stringify(todos)); // Salva o array atualizado na localStorage
};

const removeTodoLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();

  const filteredTodos = todos.filter((todo) => todo.text !== todoText);

  localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

const updateTodoStatusLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();

  todos.map((todo) =>
    todo.text === todoText ? (todo.done = !todo.done) : todo
  );

  localStorage.setItem("todos", JSON.stringify(todos));
};

const updateTodoLocalStorage = (todoOldText, todoNewText) => {
  const todos = getTodosLocalStorage();

  todos.map((todo) =>
    todo.text === todoOldText ? (todo.text = todoNewText) : todo
  );

  localStorage.setItem("todos", JSON.stringify(todos));
};

loadTodos();
