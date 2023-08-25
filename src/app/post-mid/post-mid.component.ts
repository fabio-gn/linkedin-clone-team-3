import { CommentService } from './../comment.service';
import { Component, Input, OnInit } from '@angular/core';
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
  newText: string = '';
  newComment: string = '';
  posts: IPost[] = [];
  isComment: boolean = false;
  postId!: string;
  comments!: IComment[];
  currentUserId!: string; // Aggiungi qui la definizione della proprietà currentUserId
  profilo!: IProfile;
  form!: FormGroup;

  constructor(
    private postService: PostService,
    private commentsvc: CommentService,
    private svcSvc: ServiceService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.svcSvc.getMe().subscribe((profile) => {
      this.currentUserId = profile._id; // Assegna il valore dell'ID dell'utente corrente alla proprietà currentUserId
    });
    this.form = this.fb.group({
      comment: '',
      elementId: this.post._id,
      rate: 3,
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

  deletePost(postId: string) {
    console.log('deletePost called with postId:', postId);
    this.postService.deletePost(postId).subscribe(() => {
      // Remove the post from an array of posts
      this.posts = this.posts.filter((post: IPost) => post._id !== postId);
      // Display a message to the user
      alert('Post deleted successfully!');
    });
  }

  getComment(id: string) {
    this.commentsvc
      .getComment(id)
      .subscribe((data) => ((this.comments = data), console.log(data)));
  }

  commentToggle() {
    this.svcSvc.getMe().subscribe((profilo) => (this.profilo = profilo));
    this.isComment = !this.isComment;
    this.getComment(this.post._id);
  }

  addComment() {
    this.commentsvc
      .postComment(this.form.value)
      .subscribe((data) => console.log(data));
  }
}
