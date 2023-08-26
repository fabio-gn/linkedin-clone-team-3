import { CommentService } from './../comment.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPost } from '../interfaces/ipost';
import { ServiceService } from '../service.service';
import { IProfile } from '../interfaces/profile';
import { IComment } from '../interfaces/icomment';
import { PostService } from '../post.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-post-mid',
  templateUrl: './post-mid.component.html',
  styleUrls: ['./post-mid.component.scss'],
})
export class PostMidComponent implements OnInit {
  @Input() post!: IPost;
  editedText: string = '';
  @Output() addNewComment = new EventEmitter<IComment>();

  newText: string = '';
  newComment: string = '';
  posts: IPost[] = [];
  isComment: boolean = false;
  postId!: string;
  comments!: IComment[];

  isEditing = false;
  profilo!: IProfile;
  form!: FormGroup;


  constructor(
    private postService: PostService,
    private commentsvc: CommentService,
    private svcSvc: ServiceService,
    private fb: FormBuilder
  ) {
    this.svcSvc.me.asObservable().subscribe((me) => {
      this.profilo = me;
    });
  }

  @Output() updatedPosts = new EventEmitter<IPost>();

  ngOnInit() {
    this.form = this.fb.group({
      comment: '',
      elementId: this.post._id,
      rate: 3,
    });
  }

  updatePost(postId: string, editedText: string) {
    const updatedPost: Partial<IPost> = {
      text: editedText
    }
    this.postService.updatePost(postId, updatedPost).subscribe((updatedPost) => {
      this.post = updatedPost;
      alert('Post updated successfully!');
    })
  }

  deletePost(postId: IPost) {
    console.log('deletePost called with postId:', postId);
    if (confirm('Sei sicuro di voler eliminare questa esperienza?')) {
      this.postService.deletePost(postId).subscribe(() => {
        this.updatedPosts.emit(postId);
        alert('Post cancellato con successo!');
      });
    }
  }

  getComment(id: string) {
    this.commentsvc
      .getComment(id)
      .subscribe(
        (data) => ((this.comments = data.reverse()), console.log(data))
      );
  }

  commentToggle() {
    this.isComment = !this.isComment;
    this.getComment(this.post._id);
  }

  addComment() {
    // this.comments.unshift(this.form.value);
    console.log('funziona?');

    this.commentsvc.postComment(this.form.value).subscribe((res) => {
      this.comments.unshift(res);
      this.form.reset();
    });
  }

  editPost(postId: string) {
    this.editedText = this.post.text;
    this.isEditing = true;
  }

  savePost(postId: string, editedText: string) {
    const updatedPost: Partial<IPost> = {
      text: editedText,
    }

    this.postService.updatePost(postId, updatedPost).subscribe((data) => {
      data.user = this.post.user
      this.post = data;
      this.isEditing = false;
    });
  }

  updateComment(comment:IComment){
    this.comments = this.comments.filter(el => el._id !== comment._id)
  }

}
