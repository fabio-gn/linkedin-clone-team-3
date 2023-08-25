import { CommentService } from './../comment.service';
import { Component, Input, OnInit } from '@angular/core';
import { IPost } from '../interfaces/ipost';
import { ServiceService } from '../service.service';
import { IProfile } from '../interfaces/profile';
import { IComment } from '../interfaces/icomment';

@Component({
  selector: 'app-post-mid',
  templateUrl: './post-mid.component.html',
  styleUrls: ['./post-mid.component.scss'],
})
export class PostMidComponent implements OnInit {
  @Input() post!: IPost;
  comments!: IComment[];
  isComment: boolean = false;

  constructor(private svc: CommentService) {}

  ngOnInit() {}

  getComment(id: string) {
    this.svc
      .getComment(id)
      .subscribe((data) => ((this.comments = data), console.log(data)));
  }

  commentToggle() {
    this.isComment = !this.isComment;
    this.getComment(this.post._id);
  }
}
