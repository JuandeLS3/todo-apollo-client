import gql from 'graphql-tag';

export const GetTodoQuery = gql`
query getTodo($id: ID!) {
  getTodo(id: $id) {
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
