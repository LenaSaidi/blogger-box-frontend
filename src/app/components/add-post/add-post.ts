import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from '../../data/category';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-post',
  standalone: false,
  templateUrl: './add-post.html',
  styleUrl: './add-post.css'
})
export class AddPost implements OnInit {

  postForm!: FormGroup;
  categories$!: Observable<Category[]>;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAll();

    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
      categoryId: ['', Validators.required],
      content: ['', [Validators.required, Validators.maxLength(2500)]]
    });
  }

  get title() { return this.postForm.get('title'); }
  get categoryId() { return this.postForm.get('categoryId'); }
  get content() { return this.postForm.get('content'); }

  onSubmit(): void {
    this.postForm.markAllAsTouched(); // ← ajoute cette ligne

    if (this.postForm.invalid) {
      this.Toast.fire({
        icon: 'error',
        title: 'Please review your post'
      });
      return;
    }

    this.postService.create(this.postForm.value).subscribe({
      next: () => {
        this.Toast.fire({
          icon: 'success',
          title: 'Post Submitted Successfully'
        }).then(() => {
          this.router.navigate(['/']);
        });
      },
      error: () => {
        this.Toast.fire({
          icon: 'error',
          title: 'An error occurred. Please try again.'
        });
      }
    });
  }
}