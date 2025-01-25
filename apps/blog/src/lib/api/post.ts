import { CreatePostDTO, Post, UpdatePostDTO } from '@/types';

import { httpClient } from './http-client';

const postAPI = {
  getAll() {
    return httpClient.get<Post[]>('/posts');
  },

  get(postId: string) {
    return httpClient.get<Post>(`/posts/${postId}`);
  },

  create(data: CreatePostDTO) {
    return httpClient.post<Post, CreatePostDTO>('/posts', data);
  },

  update(postId: string, data: UpdatePostDTO) {
    return httpClient.put<Post, UpdatePostDTO>(`/posts/${postId}`, data);
  },

  delete(postId: string) {
    return httpClient.delete<{ message: string }>(`/posts/${postId}`);
  },
};

export default postAPI;
