import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SentenceBuilderService } from '../sentence-builder.service';

interface WordType {
  ID: number;
  WordType: string;
}

@Component({
  selector: 'app-sentence-builder',
  templateUrl: './sentence-builder.component.html',
  styleUrls: ['./sentence-builder.component.scss']
})
export class SentenceBuilderComponent implements OnInit {
  wordTypes: WordType[] = [];
  selectedType: WordType | null = null;
  selectedWords: string[] = [];
  selectedWord: string = '';
  sentence: string = '';
  extraChars: number = 0;
  importedSentences: string = '';

  constructor(private http: HttpClient, private sentenceBuilderService: SentenceBuilderService) {
    this.selectedType = null; // Set selectedType to null in the constructor
  }

  ngOnInit() {
    this.fetchWordTypes();
  }
  //Used to call service hit api to return word types
  fetchWordTypes() {
    this.sentenceBuilderService.fetchWordTypes()
      .subscribe(
        (data) => {
          this.wordTypes = data;
          this.selectedType = null; // Set selectedType to null
        },
        (error) => {
          alert('Unsuccessful due to an internal error or power outage');
        }
      );
  }
  
  
  //Used to call service to hit api to retrive words based on word type, this executes when the dropdownlist to select a word is selected
  onSelectType(event: any) {
    this.selectedType = event.target.value;
   // alert("Selected word type:" + this.selectedType);
    this.sentenceBuilderService.fetchWordOptions(event.target.value)
        .subscribe(
          (data) => {
            this.selectedWords = data;
          },
          (error) => {
            alert('Unsuccessful due to an internal error or power outage');
          }
        );
  }
  
  //used to add the selected word to previously selected word via the add button
  addToSentence(word: string) {
    if (word) {
      this.sentence += word + ' ';
      this.selectedWord = '';

      
  }}

  clearSentence() {
    this.sentence = '';
    this.extraChars = 0;
    this.selectedWord = '';
    this.selectedWords = [];
    this.selectedType = null;
  }

  getWidth(): string {
    if (this.sentence.length < 36) {
      return '200px';
    } else if (this.sentence.length >= 36 && this.sentence.length < 70) {
      return '400px';
    } else {
      return '600px';
    }
  }

  saveSentence() {
    this.sentenceBuilderService.saveSentence(this.sentence)
      .subscribe(
        (response) => {
          alert('Added successfully');
          // Handle success behavior, such as displaying a success message
        },
        (error) => {
          alert('Failed to save sentence due to an internal error or power outage');
          // Handle error behavior, such as displaying an error message
        }
      );
  }
  

  importData() {
    this.sentenceBuilderService.getImportedSentences()
      .subscribe(
        (sentences) => {
          this.importedSentences = sentences.join('\n');
        },
        (error) => {
          alert('Failed to display sentences due to an internal error or power outage');
        }
      );
  }

  clearTextarea() {
    this.importedSentences = ''; // Clear the textarea by setting its value to an empty string
  }
  
}
