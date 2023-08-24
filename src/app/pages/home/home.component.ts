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

  posts!: IPost;

  ngOnInit() {
    this.getPost();
  }

  getPost(): any {
    this.Svc.getPosts().subscribe((data) => console.log(data));
  }
}
