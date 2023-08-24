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
    this.Svc.getPosts().subscribe(
      (data) => ((this.posts = data), console.log(data))
    );
  }

  postPost(post: IPost) {
    this.Svc.createPost(post).subscribe((data) => console.log(data));
  }
}
