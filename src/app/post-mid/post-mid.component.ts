import { CommentService } from './../comment.service';
import { Component, Input, OnInit } from '@angular/core';
import { IPost } from '../interfaces/ipost';
import { ServiceService } from '../service.service';
import { IProfile } from '../interfaces/profile';
import { IComment } from '../interfaces/icomment';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-mid',
  templateUrl: './post-mid.component.html',
  styleUrls: ['./post-mid.component.scss'],
})
export class PostMidComponent implements OnInit {
  @Input() post!: IPost;
  editedText: string = '';
  posts: IPost[] = [];
  isComment: boolean = false;
  postId!: string;
  comments!: IComment[];
  currentUserId!: string;

  constructor(
    private postService: PostService,
    private commentsvc: CommentService,
    private svcSvc: ServiceService
  ) { }

  profilo!: IProfile;

  ngOnInit() {
    this.svcSvc.getMe().subscribe((profile) => {
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

  editPost(postId: string) {
    // Set the editedText property to the current text of the post
    this.editedText = this.post.text;
  }

  savePost(postId: string, editedText: string) {
    // Send a request to your server to update the post's text in your database
    this.postService.updatePost(this.post._id, { text: this.editedText }).subscribe((data) => {
      console.log(data);
    });
  }
}
