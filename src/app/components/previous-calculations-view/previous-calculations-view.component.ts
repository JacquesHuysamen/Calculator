import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-previous-calculations-view',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './previous-calculations-view.component.html',
  styleUrl: './previous-calculations-view.component.scss'
})
export class PreviousCalculationsViewComponent {
  @Input()
  previousCalculations: string[] = []

  @Input()
  showBackButton = false;


  @Output()
  backButtonClicked = new EventEmitter<void>();
  backClicked() {
    this.backButtonClicked.next();
  }
}
