import { Component, Input } from '@angular/core';
import { IComment } from '../interfaces/icomment';
import { IPost } from '../interfaces/ipost';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() comment!: IComment;
  @Input() post!: IPost;
  comments: IComment[] = [];

  constructor(private commentService: CommentService) { }

  deleteComment(comment: string) {
    console.log('deleteComment called with comment:', comment);
    this.commentService.deleteComment(comment).subscribe(() => {
      // Remove the comment from an array of comments
      this.comments = this.comments.filter((c: IComment) => c.comment !== comment);
      // Display a message to the user
      alert('Comment deleted successfully!');
    });
  }
}
