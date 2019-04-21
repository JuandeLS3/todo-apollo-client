import gql from 'graphql-tag';

export const TodosQuery = gql`
  {
    todos {
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
