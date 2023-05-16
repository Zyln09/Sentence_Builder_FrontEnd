import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface WordType {
  ID: number;
  WordType: string;
}

@Injectable({
  providedIn: 'root'
})
export class SentenceBuilderService {
  private baseUrl = 'http://192.168.8.111:3000/api'; // Replace with your API base URL

  constructor(private http: HttpClient) { }

  fetchWordTypes(): Observable<WordType[]> {
    const url = `${this.baseUrl}/word-types`;
    return this.http.get<WordType[]>(url);
  }

  fetchWordOptions(wordType: string): Observable<string[]> {
    const url = `${this.baseUrl}/words/${wordType}`;
    return this.http.get<string[]>(url);
  }
  
  

  saveSentence(sentence: string): Observable<any> {
    const url = `${this.baseUrl}/sentence`;
    return this.http.post(url, { sentence });
  }

  getImportedSentences(): Observable<string[]> {
    const url = `${this.baseUrl}/getAllSentences`;
    return this.http.get<string[]>(url);
  }
}
