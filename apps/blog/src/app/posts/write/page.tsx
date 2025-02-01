import WritePostForm from '@/features/post/write-post/write-post.ui';

export const dynamic = 'force-static';

export default function WritePage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">새 게시글 작성</h1>
      <WritePostForm />
    </div>
  );
}
