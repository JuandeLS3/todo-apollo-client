import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() todo;

  comments: Comment[] = [];

  constructor() { }

  ngOnInit() {
    // Set initial comments based on "todo" object
    if(this.todo && this.todo.comments) {
      this.comments = this.todo.comments;
    }
  }

}
