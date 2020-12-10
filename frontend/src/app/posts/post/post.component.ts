import {Component, EventEmitter, Output, OnInit, Inject} from '@angular/core';
import { NgForm } from "@angular/forms";
import { PostService } from 'src/app/post.service';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData{
    message: string;
    name: string;
}

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostPageComponent implements OnInit{

    user = this.authService.user;
    userName = this.authService.getName();
    posts: any[];
    selectedPostId: string;
    message: string;
    postCreated = new EventEmitter<Post>();

    constructor(private authService: AuthService, private PostsService: PostsService, private postService: PostService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) {}

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
              console.log(params);
            }
        )

        this.postService.getPost().subscribe((posts: any[]) => {
            this.posts = posts.reverse();
        })

    }

    deletePostClick(id: string) {
        this.postService.deletePost(this.selectedPostId, id).subscribe((res: any) => {
            console.log(res);
        })

    }

    openDialog(): void {
        let dialogRef = this.dialog.open(CreatePostDialog, {
            height: '600px',
            width: '800px',
            restoreFocus: false,
            data: {message: this.message, name: this.userName}
          });

          dialogRef.afterClosed().subscribe(result => {
              console.log(result);
              this.message = result;
              
          });
    }


    
}

@Component({
    selector: 'app-create-post-dialog',
    templateUrl: './create-post-dialog.component.html',
    styleUrls: ['./create-post-dialog.component.css']
})
export class CreatePostDialog {
    enteredTitle = "";
    enteredContent = "";
    postCreated = new EventEmitter<Post>();

    constructor(public postsService: PostsService, private postService: PostService, private router: Router,
        public dialogRef: MatDialogRef<CreatePostDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
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
        });
    }
    
}