import { IPost } from 'src/app/interfaces/ipost';
import { PostService } from './../../post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private Svc: PostService) {}

  posts: IPost[] = [];
  newPost!: IPost;

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    this.Svc.getPosts().subscribe((data) => {
      let lastPost = data.sort();
      lastPost.slice(0, 30);
      this.posts = lastPost;
    });
  }

  postPost(post: IPost) {
    this.Svc.createPost(post).subscribe((data) => console.log(data));
  }

  updatePost(postId: string, text: string) {
    this.Svc.updatePost(postId, { text }).subscribe((updatedPost) => {
      this.getPost();
    });
  }

  deletePost(postId: string) {
    this.Svc.deletePost(postId).subscribe(() => {
      this.getPost();
    });
  }
}
