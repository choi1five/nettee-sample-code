import { Comment, CreateCommentDTO } from '@/types';

import { httpClient } from './http-client';

const commentAPI = {
  getAll(postId: string) {
    return httpClient.get<Comment[]>(`/posts/${postId}/comments`, { next: { revalidate: 10000 } });
  },

  create(postId: string, data: CreateCommentDTO) {
    return httpClient.post<Comment, CreateCommentDTO>(`/posts/${postId}/comments`, data);
  },
};

export default commentAPI;
