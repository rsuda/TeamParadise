import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private webReqService: WebRequestService) { }

  createPost(title: string, content: string) {
    // We want to send a web request to create a post
    return this.webReqService.post('posts', { title, content });
  }

  getPost() {
    return this.webReqService.get('posts');
  }

  deletePost(id: string, postId: string) {
    return this.webReqService.delete(`posts/${postId}`);
  }
}
