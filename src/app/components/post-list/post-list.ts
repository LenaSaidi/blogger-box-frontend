import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../data/post';
import { PostService } from '../../services/post.service';

@Component({ 
  selector: 'app-post-list', 
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
  standalone: false,})

export class PostList implements OnInit {
  posts$!: Observable<Post[]>;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts();
  }
}