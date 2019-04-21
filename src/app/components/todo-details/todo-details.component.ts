import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GraphqlService } from 'src/app/services/graphql.service';
import { Todo } from 'src/app/types/todo';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent implements OnInit {

  todo: Todo; // Current "todo" object

  constructor(
    private route: ActivatedRoute,
    private grapqlService: GraphqlService
  ) { }

  /**
   * This method will be executed automatically on Component Init
   *
   * @memberof TodoDetailsComponent
   */
  ngOnInit() {
    // We are using current route snapshot to fetch "id" param
    const id = this.route.snapshot.params['id'];

    // Find "todo" by it's "id" using GraphqlService
    this.grapqlService.getTodo(id).subscribe(todo => {
      this.todo = todo;
    });
  }

}
