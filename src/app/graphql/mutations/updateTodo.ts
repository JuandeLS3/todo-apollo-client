import gql from 'graphql-tag';

export const updateTodoMutation = gql`
  mutation updateTodo($id: ID!, $title: String, $author: String, $description: String) {
    updateTodo(id: $id, title: $title, author: $author, description: $description) {
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
