import { IComment } from 'src/app/interfaces/icomment';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPost } from '../interfaces/ipost';
import { IProfile } from '../interfaces/profile';
import { ServiceService } from '../service.service';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() comment!: IComment;
  @Input() post!: IPost;
  editedComment:string = ''
  isEditing:boolean = false

  @Output() updatedComment = new EventEmitter<IComment>();

  constructor(
    private srv: ServiceService,
    private cmt: CommentService
  ){
    this.srv.me.asObservable().subscribe((me) => {
      this.profilo = me;
    });
  }

  profilo!:IProfile

  save(id:string, comment:string){
    let updatedComment: Partial<IComment> = {
      comment: comment
    }
    this.cmt.putComment(id, updatedComment).subscribe((comment) => {
      console.log(comment)
      this.comment = comment
      this.isEditing = false
    })
  }

  editComment(postId: string) {
    this.editedComment = this.comment.comment;
    this.isEditing = true;
  }

  deleteComment(comment:IComment){
    this.cmt.deleteComment(comment).subscribe(() => {
      this.updatedComment.emit(comment)
    })
  }
}
