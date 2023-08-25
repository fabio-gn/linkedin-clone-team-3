import { CommentService } from './../comment.service';
import { Component, Input, OnInit } from '@angular/core';
import { IPost } from '../interfaces/ipost';
import { ServiceService } from '../service.service';
import { IProfile } from '../interfaces/profile';

@Component({
  selector: 'app-post-mid',
  templateUrl: './post-mid.component.html',
  styleUrls: ['./post-mid.component.scss'],
})
export class PostMidComponent implements OnInit {
  @Input() post!: IPost;
  isComment: boolean = false;

  postId!: string;

  constructor(private svc: CommentService, private svcSvc:ServiceService) {}
  
  profilo!: IProfile

  ngOnInit() {
    this.svcSvc.getMe().subscribe(profilo => this.profilo = profilo)
  }

  getComment() {
    this.postId = this.post._id;
    this.svc.getComment(this.postId).subscribe((data) => console.log(data));
  }

  commentToggle() {
    this.isComment = !this.isComment;
  }
}
