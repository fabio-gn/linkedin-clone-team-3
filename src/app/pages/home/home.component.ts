import { IPost } from 'src/app/interfaces/ipost';
import { PostService } from './../../post.service';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private Svc: PostService) { }

  posts: IPost[] = [];
  newPost!: IPost;
  offset = 0;
  limit = 6;

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    this.Svc.getPosts().subscribe((data) => {
      this.posts.push(...data)
    })
    this.offset += this.limit;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight
    const body = document.body
    const html = document.documentElement
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
    const windowBottom = windowHeight + window.pageYOffset

    if (windowBottom >= docHeight - 100) {
      this.getPost()
    }
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
