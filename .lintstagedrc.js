export default {
  '(apps|packages)/**/*.{js,jsx,ts,tsx}': files => {
    // 각 파일이 속한 디렉토리에서 ESLint를 실행
    const filesWithDirs = files.map(file => {
      const dir = file.split('/').slice(0, -1).join('/');
      console.log(`cd ${dir} && pnpm eslint ${file} --fix`);
      return `cd ${dir} && pnpm eslint ${file} --fix`;
    });
    return filesWithDirs;
  },
  // 공통 Prettier 설정
  '**/*.{ts,tsx,js,jsx,json,md,mdx,css,html,yml,yaml,scss}': ['prettier --write'],
};
