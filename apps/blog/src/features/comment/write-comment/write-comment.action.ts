'use server';

import { revalidatePath } from 'next/cache';

import { commentAPI } from '@/shared/api';

export async function writeComment(_: unknown, formData: FormData) {
  const postId = formData.get('postId') as string;
  const content = formData.get('content') as string;
  const author = formData.get('author') as string;

  if (!content?.trim() || !author?.trim()) {
    return { error: '모든 필드를 입력해주세요.' };
  }

  try {
    await commentAPI.create(postId, { content, author });
    revalidatePath(`/posts/${postId}`);
  } catch (error) {
    console.error(error);
    return { error: '댓글 작성에 실패했습니다.' };
  }
}
