'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { postAPI } from '@/shared/api';
import { ROUTES } from '@/shared/config/routes';
import { Post } from '@/shared/types';

export async function writePost(state: unknown, formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const author = formData.get('author') as string;

  if (!title?.trim() || !content?.trim() || !author?.trim()) {
    return { error: '모든 필드를 입력해주세요.' };
  }

  let post: Post;

  try {
    post = await postAPI.create({ title, content, author });
    revalidatePath(ROUTES.home());
  } catch (error) {
    console.error(error);
    return { error: '게시글 작성에 실패했습니다.' };
  }

  redirect(ROUTES.postDetail(post.id));
}
