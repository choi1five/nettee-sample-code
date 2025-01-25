import { Button } from '@nettee-sample/ui/components/button';
import Link from 'next/link';

import { postAPI } from '@/lib/api';
import { ROUTES } from '@/lib/constants/routes';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const posts = await postAPI.getAll();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">게시글 목록</h2>
        <Button asChild>
          <Link href={ROUTES.writePost()}>새 게시글 작성</Link>
        </Button>
      </div>
      <div className="space-y-4">
        {posts.map(({ id, title, content, author, createdAt }) => (
          <Link
            key={id}
            href={ROUTES.postDetail(id)}
            className="block rounded-lg border p-4 transition-colors hover:bg-slate-50"
            prefetch>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">{title}</h3>
              <p className="line-clamp-2 text-slate-600">{content}</p>
              <div className="flex justify-between text-sm text-slate-500">
                <span>{author}</span>
                <time>{new Date(createdAt).toLocaleDateString()}</time>
              </div>
            </div>
          </Link>
        ))}
        {posts.length === 0 && <div className="py-6 text-center text-slate-500">작성된 게시글이 없습니다.</div>}
      </div>
    </div>
  );
}
