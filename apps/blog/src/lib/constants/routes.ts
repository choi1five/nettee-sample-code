export const ROUTES = {
  home: () => '/',
  writePost: () => '/posts/write',
  postDetail: (id: string) => `/posts/${id}`,
  editPost: (id: string) => `/posts/${id}/edit`,
} as const;
