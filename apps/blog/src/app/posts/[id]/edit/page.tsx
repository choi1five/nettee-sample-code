import { notFound } from 'next/navigation';

import EditPostForm from '@/features/post/edit-post/edit-post.ui';
import { postAPI } from '@/shared/api';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPage({ params }: Props) {
  try {
    const { id } = await params;
    const post = await postAPI.get(id);
    return (
      <div>
        <h1 className="mb-6 text-3xl font-bold">새 게시글 작성</h1>
        <EditPostForm post={post} />
      </div>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
