import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {
    this.selectedType = null; // Set selectedType to null in the constructor
  }

  ngOnInit() {
    this.fetchWordTypes();
  }

  fetchWordTypes() {
    this.http.get<WordType[]>('http://192.168.10.154:3000/api/word-types')
      .subscribe(
        (data) => {
          this.wordTypes = data;
          this.selectedType = null; // Set selectedType to null
        },
        (error) => {
          console.error('Error fetching word types:', error);
        }
      );
  }
  

  onSelectType() {
    if (this.selectedType && this.selectedType.ID !== 0) {
      this.fetchWordOptions();
    } else {
      this.selectedWords = [];
    }
  }

  fetchWordOptions() {
    if (this.selectedType) {
      this.http.get<any[]>(`http://192.168.10.154:3000/api/words/${this.selectedType}`)
        .subscribe(
          (data) => {
            this.selectedWords = data;
          },
          (error) => {
            console.error('Error fetching word options:', error);
          }
        );
    } else {
      this.selectedWords = [];
    }
  }

  addToSentence(word: string) {
    if (word) {
      this.sentence += word + ' ';
      this.selectedWord = '';

      const sentenceLength = this.sentence.replace(/\s/g, '').length;
      this.extraChars = sentenceLength - 27;

      const textField = document.getElementById('sentenceTextField') as HTMLInputElement;
      if (textField) {
        textField.style.setProperty('--extra-chars', this.extraChars.toString());
      }
    }
  }

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
  // Send the sentence to your API
  this.http.post('http://192.168.10.154:3000/api/sentence', { sentence: this.sentence })
    .subscribe(
      (response) => {
        console.log('Sentence saved successfully:', response);
        // Handle success behavior, such as displaying a success message
      },
      (error) => {
        console.error('Failed to save sentence:', error);
        // Handle error behavior, such as displaying an error message
      }
    );
}

importData() {
  this.http.get<string[]>('http://192.168.10.154:3000/api/getAllSentences')
    .subscribe(
      (sentences) => {
        this.importedSentences = sentences.join('\n');
      },
      (error) => {
        console.error('Error fetching sentences:', error);
      }
    );}
    clearTextarea() {
      this.importedSentences = ''; // Clear the textarea by setting its value to an empty string
    }
}
