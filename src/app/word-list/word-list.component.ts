import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss']
})
export class WordListComponent {
  @Input() wordTypes: string[] = [];

  getWordsByType(wordType: string): string[] {
    // Replace this with your actual implementation to fetch words by type
    return [];
  }

  addToSentence(word: string) {
    // Replace this with your actual implementation to add a word to the sentence
  }
}
