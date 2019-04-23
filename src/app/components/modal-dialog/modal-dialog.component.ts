import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit {

  active = false; // current display state

  @Input() heading: string;

  constructor() { }

  ngOnInit() {
  }

  toggle(state?: boolean): boolean {
    if (typeof state !== undefined) {
      return this.active = state;
    }

    return this.active = !this.active;
  }
}
