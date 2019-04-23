### GraphQl Subscriptions
As well as queries, subscriptions can have parameters, the only difference is that the declaration must start with `subscription` graphql document type:
```
subscription XXX($xxx: 'value', ...) {
  XXX(xxx: $xxx, ...) {
    __typename
    id
    ...
  }
}
```
