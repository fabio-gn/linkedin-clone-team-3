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
  currentUserId!: string;
  isEditing = false;
  profilo!: IProfile;
  form!: FormGroup;


  constructor(
    private postService: PostService,
    private commentsvc: CommentService,
    private svcSvc: ServiceService,
    private fb: FormBuilder
  ) { }

  @Output() updatedPosts = new EventEmitter<any>()

  ngOnInit() {
    this.svcSvc.getMe().subscribe(profile => {
      this.currentUserId = profile._id; // Assegna il valore dell'ID dell'utente corrente alla proprietà currentUserId
    });
  }

  updatePost(postId: string, text: string) {
    console.log('updatePost called with postId:', postId, 'and text:', text);
    this.postService.updatePost(postId, { text }).subscribe((updatedPost) => {
      // Update the UI to display the new text of the post
      this.post.text = updatedPost.text;

      // Display a message to the user
      alert('Post updated successfully!');
    });
  }

  deletePost(postId: IPost) {
    console.log('deletePost called with postId:', postId);
    if (confirm("Sei sicuro di voler eliminare questa esperienza?")) {
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
    this.commentsvc.postComment(this.form.value).subscribe((res) => {
      this.comments.unshift(res);
      this.form.reset();
    });
  }

  editPost(postId: string) {
    // Set the editedText property to the current text of the post
    this.editedText = this.post.text;
    // Imposta la variabile isEditing su true
    this.isEditing = true;
  }

  savePost(postId: string, editedText: string) {
    // Send a request to your server to update the post's text in your database
    this.postService.updatePost(this.post._id, { text: this.editedText }).subscribe((data) => {
      console.log(data);
      // Imposta la variabile isEditing su false
      this.isEditing = false;
    });
  }
}
