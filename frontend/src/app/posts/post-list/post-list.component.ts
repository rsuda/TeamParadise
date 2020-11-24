import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { PostService } from 'src/app/post.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{
    posts: any[];
    private postsSub: Subscription;
    selectedPostId: string;

    constructor(private PostsService: PostsService, private postService: PostService, private route: ActivatedRoute, private router: Router) {}

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
            this.router.navigate(['/posts']);
            console.log(res);
        })

    }
    
}