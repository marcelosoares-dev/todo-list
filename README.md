# Sistema Todo List com JavaScript

O Sistema Todo List é uma aplicação web desenvolvida em JavaScript que permite aos usuários criar, editar, marcar como concluído e excluir tarefas a serem realizadas. A aplicação utiliza a manipulação do DOM (Document Object Model) para interagir com os elementos da página e a Web Storage API para armazenar os dados localmente no navegador.

## 📝 Funcionalidades

1. **Adicionar Tarefa:** O usuário pode adicionar uma nova tarefa à lista digitando o texto no campo de entrada e pressionando o botão <kbd>Adicionar</kbd>. A tarefa será criada e exibida na lista.

2. **Marcar como Concluído:** Cada tarefa possui um botão de conclusão representado por um ícone de check ✔️. Ao clicar neste botão, a tarefa é marcada como concluída, alterando seu estilo visual para indicar que foi realizada.

3. **Editar Tarefa:** É possível editar uma tarefa existente ao clicar no botão de edição, representado por um ícone de lápis ✏️. O sistema exibe um formulário de edição com o texto da tarefa, permitindo que o usuário faça alterações e salve a edição.

4. **Excluir Tarefa:** Cada tarefa possui um botão de exclusão, representado por um ícone de lixeira 🗑️. Ao clicar neste botão, a tarefa é removida da lista.

5. **Filtrar Tarefas:** O sistema oferece a possibilidade de filtrar as tarefas com base na busca realizada e no status de conclusão. O usuário pode digitar um termo na caixa de busca 🔍 para filtrar as tarefas cujo título contenha o texto digitado. Além disso, há um dropdown de filtro ▼ que permite selecionar entre "Todos", "Concluídos" ou "A Fazer", filtrando as tarefas de acordo com o status de conclusão.

## 💻 Estilos

O sistema possui um estilo simples e limpo, com uma imagem de fundo que se ajusta ao tamanho da tela. As tarefas são representadas por divs com bordas arredondadas e espaçamento adequado entre elas. Cada tarefa exibe o título no formato de um elemento h3. Os botões de ação (conclusão, edição e exclusão) possuem um estilo uniforme, com uma transição suave ao passar o cursor sobre eles.

## 💾 Armazenamento Local

Para garantir a persistência dos dados, o sistema utiliza a Web Storage API do navegador para armazenar as tarefas localmente. Quando uma nova tarefa é adicionada, editada ou marcada como concluída, os dados são salvos na localStorage. Quando a página é carregada novamente, as tarefas são carregadas a partir da localStorage e exibidas na lista.

## 📝 Instruções de Uso

1. Clone ou faça o download do repositório contendo os arquivos do Sistema Todo List.
2. Abra o arquivo index.html em um navegador web.
3. Digite o texto da tarefa no campo de entrada e clique no botão <kbd>Adicionar</kbd> para criar uma nova tarefa.
4. Clique no botão de conclusão (ícone de check ✔️) para marcar uma tarefa como concluída.
5. Clique no botão de edição (ícone de lápis ✏️) para editar o texto de uma tarefa existente.
6. Clique no botão de exclusão (ícone de lixeira 🗑️) para remover uma tarefa da lista.
7. Utilize a caixa de busca 🔍 para filtrar as tarefas pelo texto digitado.
8. Selecione uma opção no dropdown de filtro ▼ para exibir apenas tarefas concluídas ou a fazer.

## 🌐 Compatibilidade

O Sistema Todo List foi desenvolvido utilizando recursos modernos do JavaScript e CSS, portanto, é compatível com os navegadores mais recentes. É recomendado utilizar as versões mais atualizadas do Google Chrome, Mozilla Firefox, Microsoft Edge ou Safari para uma experiência completa e sem problemas.

## 🚀 Demonstração

Você pode conferir uma demonstração do Sistema Todo List [aqui](https://marcelosoares-dev.github.io/todo-list/).

## 📝 Contribuição

Sinta-se à vontade para contribuir com melhorias, correções de bugs ou novas funcionalidades no projeto. Basta criar um "Pull Request" com suas alterações.

## 📃 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para obter mais informações.
