'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@nettee-sample/ui/components/alert-dialog';
import { Button } from '@nettee-sample/ui/components/button';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/shared/config/routes';

import { useDeletePost } from './delete-post.hook';

interface Props {
  postId: string;
}

export default function DeletePostModal({ postId }: Props) {
  const { deletePost, isPending } = useDeletePost();
  const router = useRouter();

  const handleDelete = async () => {
    await deletePost(postId);
    router.push(ROUTES.home());
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">삭제</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>게시글 삭제</AlertDialogTitle>
          <AlertDialogDescription>이 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isPending}
            onClick={handleDelete}>
            {isPending ? '삭제 중...' : '삭제'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
