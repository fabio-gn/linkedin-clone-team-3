import { Component, Input } from '@angular/core';
import { IComment } from '../interfaces/icomment';
import { IPost } from '../interfaces/ipost';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() comment!: IComment;
  @Input() post!: IPost;
}
