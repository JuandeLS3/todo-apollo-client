import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { TodosQuery } from '../graphql/queries/todos';
import { Observable } from 'rxjs';
import { Todo } from '../types/todo';
import { map } from 'rxjs/operators';
import { GetTodoQuery } from '../graphql/queries/get-todo';

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
        query: TodosQuery
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
        variables: { id: id } // add variables to query
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
}
