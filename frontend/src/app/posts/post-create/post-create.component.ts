import {Component, EventEmitter, Output} from '@angular/core';

import { NgForm } from "@angular/forms";
import { PostService } from 'src/app/post.service';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

    enteredTitle = "";
    enteredContent = "";
    postCreated = new EventEmitter<Post>();

    constructor(public postsService: PostsService, private postService: PostService) {}

    onAddPost(form: NgForm) {
        if (form.invalid) {
            return;
        }
        const post: Post = { 
            title: form.value.title, 
            content: form.value.content
        };
        this.postsService.addPost(form.value.title, form.value.content);
        this.postService.createPost(form.value.title, form.value.content).subscribe((response: any) => {
            console.log(response);
    })
    }
   /* createNewPost(title: string, content: string) {
        this.postService.createPost('heey','it works').subscribe((response: any) => {
            console.log(response);
        });
    }
    */
}