import { IComment } from 'src/app/interfaces/icomment';
import { IPost } from './../../interfaces/ipost';
import { PostService } from './../../post.service';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private Svc: PostService) {}

  allPosts: IPost[] = [];
  posts: IPost[] = [];
  newPost!: IPost;
  offset = 10;
  limit = 20;

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    this.Svc.getPosts().subscribe((data) => {
      this.allPosts = data.reverse();
      this.posts = this.allPosts.slice(0, 10);
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    console.log(docHeight);

    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight - 100) {
      this.posts.push(...this.allPosts.slice(this.offset, this.limit));
      this.offset += 10;
      this.limit += 10;
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

  deletePost(postId: Partial<IPost>) {
    this.Svc.deletePost(postId).subscribe(() => {
      this.getPost();
    });
  }

  takeNewPost(post: IPost) {
    this.posts.unshift(post);
  }

  updatedPosts(post: IPost){
    this.posts = this.posts.filter(el => el._id !== post._id)
    console.log(post)
  }
}
