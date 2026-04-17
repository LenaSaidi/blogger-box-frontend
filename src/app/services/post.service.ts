import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../data/post';
import { POSTS } from '../data/mock-posts';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return of(POSTS);
  }
}