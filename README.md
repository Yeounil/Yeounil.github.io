# yeounil.github.io

정승일 개인 포트폴리오 사이트 — [https://yeounil.github.io/](https://yeounil.github.io/)

## Stack

- [Astro 5](https://astro.build/) — SSG
- TypeScript (strict)
- Plain CSS (Tailwind 사용 안 함)
- [Pretendard Variable](https://github.com/orioncactus/pretendard) (CDN)
- GitHub Actions → GitHub Pages

## 디자인 원칙

A2 — Less is More. 콘텐츠가 99%, 디자인이 1%.

- 5색 (라이트 배경 #FAFAF7, 텍스트 #1A1A1A, 링크 #0F4C81, visited #6A2A8C, muted #666)
- 단일 폰트 + 시스템 모노
- 사이즈 5개 (14 / 17 / 22 / 28 / 38)
- max-width 640px, 1열 prose
- 카드 0개, 모션 0, border-radius 0

## 개발

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
npm run preview  # 빌드 결과 로컬 확인
```

## 배포

`main` 또는 `master` 브랜치에 push하면 GitHub Actions가 빌드 후 GitHub Pages에 자동 배포.
