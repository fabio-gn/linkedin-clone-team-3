import { Component } from '@angular/core';

@Component({
  selector: 'app-post-mid',
  templateUrl: './post-mid.component.html',
  styleUrls: ['./post-mid.component.scss']
})
export class PostMidComponent {
@Input() posts!: IPost

}
