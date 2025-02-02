'use client';

import { Comment } from '@/shared/types';

type Props = Comment;

export default function CommentItem({ id, content, author, createdAt }: Props) {
  return (
    <li key={id} className="rounded-lg border p-4">
      <p className="mb-2 text-slate-600">{content}</p>
      <div className="flex justify-between text-sm text-slate-500">
        <span>{author}</span>
        <time>{createdAt}</time>
      </div>
    </li>
  );
}
