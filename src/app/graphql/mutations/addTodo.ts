import gql from 'graphql-tag';

export const addTodoMutation = gql`
  mutation addTodo($title: String, $author: String, $description: String) {
    addTodo(title: $title, author: $author, description: $description) {
      id
      title
      author
      description
      comments {
        id
        title
        author
        description
      }
    }
  }
`;
