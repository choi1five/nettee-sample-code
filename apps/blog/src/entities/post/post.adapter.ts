import { DATE_FORMAT, formatDate } from '@nettee-sample/utils/date';

import { Post } from '@/shared/types';

export const postAdapter = {
  toList(post: Post) {
    return {
      ...post,
      createdAt: formatDate(post.createdAt),
    };
  },
  toDetail(post: Post) {
    return {
      ...post,
      createdAt: formatDate(post.createdAt, DATE_FORMAT.WITH_TIME),
    };
  },
};
