import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GraphqlService } from 'src/app/services/graphql.service';
import { Todo } from 'src/app/types/todo';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent implements OnInit {

  todo: Todo; // Current "todo" object

  @ViewChild("updateTodoModalDialog") todoDialog: ModalDialogComponent;
  @ViewChild("addCommentModalDialog") commentDialog: ModalDialogComponent;

  updateTodoFormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    description: new FormControl()
  });

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
    });
  }

  private setTodo(todo): void {
    // Set local Object
    this.todo = todo;

    // Fill Todo Update form with values by creating object of type {[<fieldName>]: <value>}
    const fields = Object.keys(this.updateTodoFormGroup.controls);
    const values = fields.reduce((acc, cur) => {
      acc[cur] = this.todo[cur];
      return acc;
    }, {});

    // update form with resultant object values
    this.updateTodoFormGroup.setValue(values);
  }

  todoFormSubmit(): void {
    const { title, author, description } = this.updateTodoFormGroup.value;

    this.graphqlService.updateTodo(
      this.todo.id, title, author, description
    ).subscribe(
      todo => {
        this.todo = todo;
        this.updateTodoFormGroup.reset();
        this.todoDialog.toggle();
      },
      err => {
        console.error(err);
      }
    );
  }

  commentFormSubmit(): void {
    const { title, author, description } = this.addCommentFormGroup.value;

    this.graphqlService.addComment(
      this.todo.id, title, author, description
    ).subscribe(
      todo => {
        this.todo = todo;
        this.addCommentFormGroup.reset();
        this.commentDialog.toggle();
      },
      err => {
        console.error(err);
      }
    );
  }
}
