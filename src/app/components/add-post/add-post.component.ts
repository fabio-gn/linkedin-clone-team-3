import { ServiceService } from 'src/app/service.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { IProfile } from 'src/app/interfaces/profile';
import { IPost } from 'src/app/interfaces/ipost';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostService } from 'src/app/post.service';
import { IComment } from 'src/app/interfaces/icomment';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent {
  @Output() newPost = new EventEmitter<IPost>();

  constructor(
    private srv: ServiceService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private postSvc: PostService
  ) {}

  profilo!: IProfile;
  posts!: IPost[];
  form!: FormGroup;

  ngOnInit() {
    this.srv.getMe().subscribe((profilo) => (this.profilo = profilo));
    this.postSvc.getPosts().subscribe((posts) => (this.posts = posts));
    this.form = this.fb.group({
      text: '',
    });
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  posta() {
    this.postSvc.createPost(this.form.value).subscribe((res) => {
      this.modalService.dismissAll();
      this.newPost.emit(res);
      this.form.reset();
    });
  }
}
