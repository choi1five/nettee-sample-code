'use client';

import Link from 'next/link';

import { ROUTES } from '@/lib/constants/routes';
import { Post } from '@/types';

interface Props extends Post {
  ref: ((target: HTMLLIElement | null) => void) | null;
}

export default function PostItem({ ref, id, title, content, author, createdAt }: Props) {
  return (
    <li ref={ref}>
      <Link
        className="block rounded-lg border p-4 transition-colors hover:bg-slate-50"
        href={ROUTES.postDetail(id)}
        prefetch>
        <div className="space-y-2">
          <h3 className="text-xl font-medium">{title}</h3>
          <p className="line-clamp-2 text-slate-600">{content}</p>
          <div className="flex justify-between text-sm text-slate-500">
            <span>{author}</span>
            <time>{new Intl.DateTimeFormat('ko-KR').format(new Date(createdAt))}</time>
          </div>
        </div>
      </Link>
    </li>
  );
}
