'use client';

import { useInfiniteScroll } from '@nettee-sample/hooks';
import { Spinner } from '@nettee-sample/ui/components/spinner';

import { postAPI } from '@/lib/api';
import { GetPostsResponse, Post } from '@/types';

import PostItem from './post-item';

interface Props {
  initialPosts: GetPostsResponse;
}

const PostList = ({ initialPosts }: Props) => {
  const {
    targetRef,
    items: posts,
    hasMore,
    isLoading,
  } = useInfiniteScroll<Post, HTMLLIElement>({
    initialData: initialPosts,
    fetchMore: postAPI.getCursor,
  });

  const checkLastItem = (idx: number) => posts.length - 1 === idx && hasMore;

  return (
    <>
      {posts.length !== 0 ? (
        <ul className="space-y-4">
          {posts.map((post, idx) => (
            <PostItem key={post.id} ref={checkLastItem(idx) ? targetRef : null} {...post} />
          ))}
        </ul>
      ) : (
        <div className="py-6 text-center text-slate-500">작성된 게시글이 없습니다.</div>
      )}
      {isLoading && (
        <div className="flex justify-center py-4">
          <Spinner height={40} width={40} />
        </div>
      )}
    </>
  );
};

export default PostList;
