### GraphQl Queries
Queries can be declared without graphql document type declaration:
```
{
  XXX {
    __typename
    id
    ...
  }
}
```
To include query parameters, developer must include query name
and it's parameters in document type declaration(tipically the first line) and afterwards assign those parameters to query:
```

query XXX($xxx: 'value', ...) {
  XXX(xxx: $xxx, ...) {
    __typename
    id
    ...
  }
}
```
