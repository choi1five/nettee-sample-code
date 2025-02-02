import { Button } from '@nettee-sample/ui/components/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { commentAdapter } from '@/entities/comment/comment.adapter';
import { postAdapter } from '@/entities/post/post.adapter';
import DeletePostModal from '@/features/post/delete-post/delete-post.ui';
import { commentAPI, postAPI } from '@/shared/api';
import { ROUTES } from '@/shared/config/routes';
import CommentSection from '@/widgets/comment/comment-section.ui';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function PostDetail({ params }: Props) {
  try {
    const { id } = await params;
    const [{ title, id: postId, author, createdAt, content }, comments] = await Promise.all([
      postAPI.get(id).then(postAdapter.toDetail),
      commentAPI.getAll(id).then(comments => comments.map(commentAdapter.toBase)),
    ]);

    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="space-x-2">
              <Button variant="outline" asChild>
                <Link href={ROUTES.editPost(postId)}>수정</Link>
              </Button>
              <DeletePostModal postId={postId} />
            </div>
          </div>
          <div className="flex justify-between text-sm text-slate-500">
            <span>{author}</span>
            <time>{createdAt}</time>
          </div>
          <p className="whitespace-pre-wrap text-slate-600">{content}</p>
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-semibold">댓글</h2>
          <CommentSection comments={comments} postId={id} />
        </div>
        <div className="border-t pt-4">
          <Button variant="outline" asChild>
            <Link href={ROUTES.home()}>목록으로</Link>
          </Button>
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
