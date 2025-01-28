import { DATE_FORMAT, formatDate } from '@nettee-sample/utils/date';

import { Comment } from '@/types';

import CommentForm from './comment-form';

interface Props {
  postId: string;
  comments: Comment[];
}

export default function CommentSection({ postId, comments }: Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="rounded-lg border p-4">
            <p className="mb-2 text-slate-600">{comment.content}</p>
            <div className="flex justify-between text-sm text-slate-500">
              <span>{comment.author}</span>
              <time>{formatDate(comment.createdAt, DATE_FORMAT.WITH_TIME)}</time>
            </div>
          </div>
        ))}
        {comments.length === 0 && <div className="py-4 text-center text-slate-500">첫 댓글을 작성해보세요.</div>}
      </div>
      <CommentForm postId={postId} />
    </div>
  );
}
