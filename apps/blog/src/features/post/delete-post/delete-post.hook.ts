import { useState } from 'react';

import { postAPI } from '@/shared/api';

export const useDeletePost = () => {
  const [isPending, setIsPending] = useState(false);

  const deletePost = async (postId: string) => {
    if (isPending) return;

    setIsPending(true);
    try {
      await postAPI.delete(postId);
    } catch (error) {
      console.error('Failed to delete post:', error);
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, deletePost };
};
