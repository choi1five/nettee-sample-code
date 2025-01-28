import { Button } from '@nettee-sample/ui/components/button';
import Link from 'next/link';

import { postAPI } from '@/lib/api';
import { ROUTES } from '@/lib/constants/routes';

import PostList from './_components/post-list';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const initialPosts = await postAPI.getCursor();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">게시글 목록</h2>
        <Button asChild>
          <Link href={ROUTES.writePost()}>새 게시글 작성</Link>
        </Button>
      </div>
      <PostList initialPosts={initialPosts} />
    </div>
  );
}
