'use client';

import Link from 'next/link';

import { ROUTES } from '@/shared/config/routes';
import { Post } from '@/shared/types';

interface Props extends Post {
  ref: ((target: HTMLLIElement | null) => void) | null;
}

export default function PostItem({ ref, id, title, content, author, createdAt }: Props) {
  return (
    <li ref={ref} className="block rounded-lg border p-4 transition-colors hover:bg-slate-50">
      <Link href={ROUTES.postDetail(id)} prefetch>
        <div className="space-y-2">
          <h3 className="text-xl font-medium">{title}</h3>
          <p className="line-clamp-2 text-slate-600">{content}</p>
          <div className="flex justify-between text-sm text-slate-500">
            <span>{author}</span>
            <time>{createdAt}</time>
          </div>
        </div>
      </Link>
    </li>
  );
}
