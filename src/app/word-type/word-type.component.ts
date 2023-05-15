import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-word-type',
  templateUrl: './word-type.component.html',
  styleUrls: ['./word-type.component.scss']
})
export class WordTypeComponent {
  @Input() wordTypes1!: string[];

  onSelectType(target: EventTarget | null) {
    if (target instanceof HTMLSelectElement) {
      const selectedValue = (target as HTMLSelectElement).value;
      // Rest of your logic using the selected value
    }
  }
}
