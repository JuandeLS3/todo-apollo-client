import gql from 'graphql-tag';

export const TodosQuery = gql`
  {
    comments {
      id
      title
      author
      description
    }
  }
`;
