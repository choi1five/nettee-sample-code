import { DATE_FORMAT, formatDate } from '@nettee-sample/utils/date';

import { Comment } from '@/shared/types';

export const commentAdapter = {
  toBase(comment: Comment) {
    return {
      ...comment,
      createdAt: formatDate(comment.createdAt, DATE_FORMAT.WITH_TIME),
    };
  },
};
