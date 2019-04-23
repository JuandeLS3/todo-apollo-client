import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GraphqlService } from 'src/app/services/graphql.service';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/types/todo';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent implements OnInit, OnDestroy {

  todo: Todo; // Current Todo object
  todoSubscription: Subscription; // Subscription container

  // template element references
  @ViewChild("updateTodoModalDialog") todoDialog: ModalDialogComponent;
  @ViewChild("addCommentModalDialog") commentDialog: ModalDialogComponent;

  // Angular FromGroup object for UpdateTodo form declaration
  updateTodoFormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    description: new FormControl()
  });

  // Angular FromGroup object for AddComment form declaration
  addCommentFormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    description: new FormControl()
  });

  constructor(
    private route: ActivatedRoute,
    private graphqlService: GraphqlService,
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
    this.graphqlService.getTodo(id).subscribe(todo => {
      this.setTodo(todo);
      this.watchTodo(id);
    });
  }

  /**
   * This method will be executed automatically on Component destruction
   *
   * @memberof TodoDetailsComponent
   */
  ngOnDestroy() {
    // Remove subscription
    if (this.todoSubscription && !this.todoSubscription.closed) {
      this.todoSubscription.unsubscribe();
    }
  }

  /**
   * Store Todo object as local var and update related values
   *
   * @private
   * @param {Todo} todo
   * @memberof TodoDetailsComponent
   */
  private setTodo(todo: Todo): void {
    // Set local Object
    this.todo = todo;

    // Fill TodoUpdate Form with values
    const fields = Object.keys(this.updateTodoFormGroup.controls);
    const values = fields.reduce((acc, cur) => {
      acc[cur] = this.todo[cur];
      return acc;
    }, {});

    // update form with resultant object values
    this.updateTodoFormGroup.setValue(values);
  }

  /**
   * Start GraphQl subscription for Todo object changes
   *
   * @private
   * @param {number} id
   * @memberof TodoDetailsComponent
   */
  private watchTodo(id: number): void {
    this.todoSubscription = this.graphqlService.todoUpdated(id).subscribe(
      todo => {
        console.log('TodoUpdated Subscription result:', todo);
        this.setTodo(todo);
      },
      err => {
        console.error(err);
      }
    );
  }

  /**
   * UpdateTodo Form submit handler
   *
   * @memberof TodoDetailsComponent
   */
  todoFormSubmit(): void {
    // Deconstruct form value object into separated vars
    const { title, author, description } = this.updateTodoFormGroup.value;

    this.graphqlService.updateTodo(
      this.todo.id,
      title,
      author,
      description
    ).subscribe(
      todo => {
        console.log('UpdateTodo Mutation result:', todo);
        this.updateTodoFormGroup.reset(); // clean form
        this.todoDialog.toggle(); // close modal dialog
      },
      err => {
        console.error(err);
      }
    );
  }

  /**
   * AddComment Form submit handler
   *
   * @memberof TodoDetailsComponent
   */
  commentFormSubmit(): void {
    // Deconstruct form value object into separated vars
    const { title, author, description } = this.addCommentFormGroup.value;

    this.graphqlService.addComment(
      this.todo.id,
      title,
      author,
      description
    ).subscribe(
      todo => {
        console.log('AddComment Mutation result:', todo);
        this.addCommentFormGroup.reset(); // clean form
        this.commentDialog.toggle(); // close modal dialog
      },
      err => {
        console.error(err);
      }
    );
  }
}
