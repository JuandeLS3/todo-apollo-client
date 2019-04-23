import gql from 'graphql-tag';

export const addComment = gql`
  mutation addComment($todoId: ID!, $title: String, $author: String, $description: String) {
    addComment(todoId: $todoId, title: $title, author: $author, description: $description) {
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
