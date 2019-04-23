import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from '../types/todo';
import { TodosQuery } from '../graphql/queries/todos';
import { GetTodoQuery } from '../graphql/queries/get-todo';
import { addTodoMutation } from '../graphql/mutations/addTodo';
import { addCommentMutation } from '../graphql/mutations/addComment';
import { updateTodoMutation } from '../graphql/mutations/updateTodo';
import { updateCommentMutation } from '../graphql/mutations/updateComment';
import { todoUpdatedSubscription } from '../graphql/subscriptions/todoUpdated';

/**
 * This Service contains all backend requests for our application
 *
 * @export
 * @class GraphqlService
 */
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
          // Deconstruct response and extract desired output value
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
        variables: { id: id },
        fetchPolicy: 'no-cache'
      })
      // Get Observable output
      .valueChanges
      // Transform output value
      .pipe(
        map(res => {
          // Deconstruct response and extract desired output value
          const { data: { getTodo: output } } = res;
          return output;
        })
      );
  }

  /**
   * Create new entry of Todo type
   *
   * @param {string} title
   * @param {string} author
   * @param {string} description
   * @returns {Observable<Todo>}
   * @memberof GraphqlService
   */
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
        },
        fetchPolicy: 'no-cache'
      })
      // Transform output value
      .pipe(
        map(res => {
          // Deconstruct response and extract desired output value
          const { data: { addTodo: output } } = res;
          return output;
        })
      );
  }

  /**
   * Update existing entry of Todo type
   *
   * @param {number} id: existing Todo ID
   * @param {string} title
   * @param {string} author
   * @param {string} description
   * @returns {Observable<Todo>}
   * @memberof GraphqlService
   */
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
        },
        fetchPolicy: 'no-cache'
      })
      // Transform output value
      .pipe(
        map(res => {
          // Deconstruct response and extract desired output value
          const { data: { updateTodo: output } } = res;
          return output;
        })
      );
  }

  /**
   * Create new entry of Comment type
   *
   * @param {number} todoId
   * @param {string} title
   * @param {string} author
   * @param {string} description
   * @returns {Observable<Todo>}
   * @memberof GraphqlService
   */
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
        },
        fetchPolicy: 'no-cache'
      })
      // Transform output value
      .pipe(
        map(res => {
          // Deconstruct response and extract desired output value
          const { data: { addComment: output } } = res;
          return output;
        })
      );
  }

  /**
   * Update existing entry of Comment type
   *
   * @param {number} todoId: existing Todo ID
   * @param {number} id: existing Comment ID
   * @param {string} title
   * @param {string} author
   * @param {string} description
   * @returns {Observable<Todo>}
   * @memberof GraphqlService
   */
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
        },
        fetchPolicy: 'no-cache'
      })
      // Transform output value
      .pipe(
        map(res => {
          // Deconstruct response and extract desired output value
          const { data: { updateComment: output } } = res;
          return output;
        })
      );
  }

  /**
   * Subscribe to existing Todo object changes
   *
   * @param {number} id
   * @returns {Observable<Todo>}
   * @memberof GraphqlService
   */
  todoUpdated(id: number): Observable<Todo> {
    return this.apollo
      .subscribe({
        query: todoUpdatedSubscription,
        variables: { id: id },
        fetchPolicy: 'no-cache'
      })
      // Transform output value
      .pipe(
        map(res => {
          // Deconstruct response and extract desired output value
          const { data: { todoUpdated: output } } = res;
          return output;
        })
      );
  }
}
