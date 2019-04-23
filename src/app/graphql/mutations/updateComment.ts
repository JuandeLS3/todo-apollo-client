import gql from 'graphql-tag';

export const updateComment = gql`
  mutation updateComment($todoId: ID!, $id: ID!, $title: String, $author: String, $description: String) {
    updateComment(todoId: $todoId, id: $id, title: $title, author: $author, description: $description) {
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
