### GraphQl Migrations
As well as queries, mutations can have parameters, the only real difference is that the declaration must start with `mutation` graphql document type:
```
mutation XXX($xxx: 'value', ...) {
  XXX(xxx: $xxx, ...) {
    __typename
    id
    ...
  }
}
```
