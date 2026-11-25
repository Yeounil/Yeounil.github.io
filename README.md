# yeounil.github.io

정승일 개인 포트폴리오 사이트 — [https://yeounil.github.io/](https://yeounil.github.io/)

## Stack

- [Astro 5](https://astro.build/) — SSG
- TypeScript (strict)
- Plain CSS (Tailwind 사용 안 함)
- [Pretendard Variable](https://github.com/orioncactus/pretendard) (CDN)
- GitHub Actions → GitHub Pages

## 디자인 원칙

- 검은 바탕에 구리빛 파형을 배치하고 산세리프와 이탤릭 세리프를 혼용
- 메인과 `/workspace/`에서 최근 작업 세 개를 카드로 탐색하고 전체 목록은 아카이브에서 확인
- 상세 페이지에는 Markdown에서 생성한 목차, 기술 스택, 본문을 배치
- 좁은 화면에서는 한 열로 전환하고 모션 감소 설정을 반영

## 개발

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
npm run preview  # 빌드 결과 로컬 확인
```

## 배포

`main` 또는 `master` 브랜치에 push하면 GitHub Actions가 빌드 후 GitHub Pages에 자동 배포.
