'use client';

import { Alert, AlertDescription } from '@nettee-sample/ui/components/alert';
import { Button } from '@nettee-sample/ui/components/button';
import { Input } from '@nettee-sample/ui/components/input';
import { Textarea } from '@nettee-sample/ui/components/textarea';
import { useRouter } from 'next/navigation';
import { useActionState, useRef } from 'react';

import { Post } from '@/shared/types';

import { editPost } from './edit-post.action';

interface Props {
  post: Post;
}

export default function EditPostForm({ post }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(editPost, null);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <input name="id" value={post.id} hidden readOnly />
      <div className="space-y-2">
        <Input defaultValue={post.title} name="title" placeholder="제목을 입력하세요" required />
      </div>
      <div className="space-y-2">
        <Textarea
          className="min-h-[300px] resize-none"
          defaultValue={post.content}
          name="content"
          placeholder="내용을 입력하세요"
          required
        />
      </div>

      <div className="space-y-2">
        <Input defaultValue={post.author} name="author" placeholder="작성자" required />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          취소
        </Button>
        <Button disabled={isPending} type="submit">
          {isPending ? '수정 중...' : '수정 완료'}
        </Button>
      </div>
      {state?.error && (
        <Alert variant="destructive">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
