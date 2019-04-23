import gql from 'graphql-tag';

export const todoUpdatedSubscription = gql`
  subscription todoUpdated($id: ID!){
    todoUpdated(id: $id) {
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
