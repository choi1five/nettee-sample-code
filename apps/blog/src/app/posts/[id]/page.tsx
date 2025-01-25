import { Button } from '@nettee-sample/ui/components/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { commentAPI, postAPI } from '@/lib/api';
import { ROUTES } from '@/lib/constants/routes';

import CommentSection from './_components/comment-section';
import DeletePostModal from './_components/delete-post-modal';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function PostDetail({ params }: Props) {
  try {
    const { id } = await params;
    const [post, comments] = await Promise.all([postAPI.get(id), commentAPI.getAll(id)]);
    console.log('comment 새로 요청했어!');

    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <div className="space-x-2">
              <Button variant="outline" asChild>
                <Link href={ROUTES.editPost(post.id)}>수정</Link>
              </Button>
              <DeletePostModal postId={id} />
            </div>
          </div>
          <div className="flex justify-between text-sm text-slate-500">
            <span>{post.author}</span>
            <time>{new Date(post.createdAt).toLocaleString()}</time>
          </div>
          <p className="whitespace-pre-wrap text-slate-600">{post.content}</p>
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-semibold">댓글</h2>
          <CommentSection postId={id} comments={comments} />
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
