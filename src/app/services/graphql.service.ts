import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { TodosQuery } from '../graphql/queries/todos';
import { Observable } from 'rxjs';
import { Todo } from '../types/todo';
import { map } from 'rxjs/operators';
import { GetTodoQuery } from '../graphql/queries/get-todo';
import { addTodo as  addTodoMutation } from '../graphql/mutations/addTodo';
import { addComment as addCommentMutation } from '../graphql/mutations/addComment';
import { updateTodo as updateTodoMutation } from '../graphql/mutations/updateTodo';
import { updateComment as updateCommentMutation } from '../graphql/mutations/updateComment';

@Injectable()
export class GraphqlService {

  constructor(
    private apollo: Apollo
  ) { }

  /**
   * Fetch all Todo object from backend
   *
   * @readonly
   * @type {Observable<Todo[]>}
   * @memberof GraphqlService
   */
  get todos(): Observable<Todo[]> {
    return this.apollo
      .watchQuery<any>({
        query: TodosQuery,
        fetchPolicy: 'no-cache'
      })
      // Get Observable output
      .valueChanges
      // Transform output value
      .pipe(
        map(res => {
          const { data: { todos: output } } = res;
          return output;
        })
      );
  }

  /**
   * Find Todo object by it's ID attribute
   *
   * @param {number} id: Todo object ID
   * @returns
   * @memberof GraphqlService
   */
  getTodo(id: number): Observable<Todo> {
    return this.apollo
      .watchQuery<any>({
        query: GetTodoQuery,
        variables: { id: id }, // add variables to query
        fetchPolicy: 'no-cache'
      })
      // Get Observable output
      .valueChanges
      // Transform output value
      .pipe(
        map(res => {
          const { data: { getTodo: output } } = res;
          return output;
        })
      );
  }

  addTodo(
    title: string,
    author: string,
    description: string
  ): Observable<Todo> {
    return this.apollo
      .mutate({
        mutation: addTodoMutation,
        variables: {
          title,
          author,
          description,
        }
      })
      // Transform output value
      .pipe(
        map(res => {
          const { data: { addTodo: output } } = res;
          return output;
        })
      );
  }

  updateTodo(
    id: number,
    title: string,
    author: string,
    description: string
  ): Observable<Todo> {
    return this.apollo
      .mutate({
        mutation: updateTodoMutation,
        variables: {
          id,
          title,
          author,
          description,
        }
      })
      // Transform output value
      .pipe(
        map(res => {
          const { data: { updateTodo: output } } = res;
          return output;
        })
      );
  }

  addComment(
    todoId: number,
    title: string,
    author: string,
    description: string
  ): Observable<Todo> {
    return this.apollo
      .mutate({
        mutation: addCommentMutation,
        variables: {
          todoId,
          title,
          author,
          description,
        }
      })
      // Transform output value
      .pipe(
        map(res => {
          const { data: { addComment: output } } = res;
          return output;
        })
      );
  }

  updateComment(
    todoId: number,
    id: number,
    title: string,
    author: string,
    description: string
  ): Observable<Todo> {
    return this.apollo
      .mutate({
        mutation: updateCommentMutation,
        variables: {
          id,
          todoId,
          title,
          author,
          description,
        }
      })
      // Transform output value
      .pipe(
        map(res => {
          const { data: { updateComment: output } } = res;
          return output;
        })
      );
  }
}
