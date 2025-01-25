'use client';

import { Button } from '@nettee-sample/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@nettee-sample/ui/components/card';
import { Input } from '@nettee-sample/ui/components/input';
import { Textarea } from '@nettee-sample/ui/components/textarea';
import { useRef, useState } from 'react';

import { createComment, createTestComment } from '../_actions';

interface Props {
  postId: string;
}

export default function CommentForm({ postId }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [count, setCount] = useState(1);
  const handleClickPlusButton = () => {
    setCount(prev => prev + 1);
  };
  const handleAddCommentButton = async () => {
    const data = new FormData();
    data.append('postId', postId);
    await createTestComment(data);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg">댓글 작성</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          ref={formRef}
          action={async (formData: FormData) => {
            await createComment(null, formData);
            formRef.current?.reset();
          }}
          className="space-y-4">
          <input name="postId" value={postId} hidden readOnly />
          <Textarea name="content" placeholder="댓글을 입력하세요" required className="min-h-[100px] resize-none" />
          <div className="flex items-center gap-4">
            <Input name="author" placeholder="작성자" required className="max-w-[200px]" />
          </div>
          <Button className="w-24">댓글 달기</Button>
        </form>
        <Button type="button" className="w-24" onClick={handleAddCommentButton}>
          댓글 달기
        </Button>
        <Button className="w-24" onClick={handleClickPlusButton}>
          {count}
        </Button>
      </CardContent>
    </Card>
  );
}
