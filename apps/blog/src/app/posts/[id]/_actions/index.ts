'use server';

import { revalidatePath } from 'next/cache';

import { commentAPI } from '@/lib/api';

export async function createComment(_: unknown, formData: FormData) {
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

// export async function createTestComment(postId: string) {
//   try {
//     await commentAPI.create(postId, { content: "test" + (Math.random() * 100).toString(), author: "test" });
//     revalidatePath(`/posts/${postId}`);
//   } catch (error) {
//     console.error(error);
//     return { error: "댓글 작성에 실패했습니다." };
//   }
// }
export async function createTestComment(formData: FormData) {
  console.log(123123, formData);
  const postId = formData.get('postId') as string;
  try {
    // await commentAPI.create(postId, { content: "test" + (Math.random() * 100).toString(), author: "test" });
    // revalidatePath(`/posts/${postId}`);
  } catch (error) {
    console.error(error);
    return { error: '댓글 작성에 실패했습니다.' };
  }
}
