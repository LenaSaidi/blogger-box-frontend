import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../data/post';
import { PostCreateInput } from '../data/post';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PostService {
  private apiUrl = `${environment.apiUrl}/v1/posts`;

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  create(post: PostCreateInput): Observable<Post> {
    const params = new HttpParams()
      .set('title', post.title)
      .set('content', post.content)
      .set('categoryId', post.categoryId);
    return this.http.post<Post>(this.apiUrl, null, { params });
  }
}