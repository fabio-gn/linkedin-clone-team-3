import { Component, Input } from '@angular/core';
import { IPost } from '../interfaces/ipost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-mid',
  templateUrl: './post-mid.component.html',
  styleUrls: ['./post-mid.component.scss']
})
export class PostMidComponent {
  @Input() post!: IPost;
  newText: string = '';
  posts: IPost[] = [];

  constructor(private postService: PostService) { }

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

}
