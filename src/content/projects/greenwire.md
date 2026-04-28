---
title: GreenWire
year: "2025"
role: 2인 협업 · ICT 공모전 출품 · Backend 전담
summary: AI 금융 뉴스 분석·추천 플랫폼. FastAPI + Supabase + Pinecone 멀티 스토리지, Claude/GPT-5 기반 분석 파이프라인.
headlineMetric: "2025 충청권 ICT 이노베이션 스퀘어 멘토링 — 아이디어상 수상"
stack:
  - Python
  - FastAPI
  - Supabase (PostgreSQL)
  - Pinecone
  - GPT-5
  - Claude Sonnet 4.5
  - Event Registry
githubBackend: https://github.com/Yeounil/Green_wire_backend
githubFrontend: https://github.com/Yeounil/green_wire
order: 4
---

## Problem

기존 금융 뉴스 서비스에 4가지 한계가 있었다.

1. **데이터 다양성 부재** — 인터넷 크롤링 기반은 출처가 한정적
2. **분석 부재** — 단순 헤드라인 노출, 어떤 종목에 어떻게 영향을 주는지는 사용자가 직접 추론
3. **세션·토큰 관리 미흡** — 프론트엔드에서 JWT를 그대로 노출하는 구현이 흔했음
4. **로그인 UI 답답** — 아이디·비밀번호·이메일 일일이 입력하는 구식 흐름

이걸 한 번에 풀어보자가 출발점이었다.

## Approach

### 4개 파이프라인 분리

뉴스 처리를 단일 흐름이 아니라 4개 독립 파이프라인으로 나눠서 실패 격리와 재시도 단순화.

- **수집** — Event Registry로 Reuters · Bloomberg · WSJ 등 6개 소스, 6시간 주기 자동
- **AI 분석** — GPT-5로 주가 영향도(0.0~1.0) 자동 평가
- **번역** — Claude Sonnet 4.5 기반 금융 용어 최적화 한글 번역
- **임베딩** — 1,536차원 벡터화

### 멀티 스토리지

용도별 DB 분리.

- **Supabase (PostgreSQL)** — 사용자, 뉴스 메타, AI 분석 이력
- **Pinecone** — 벡터 검색 (1,302개 종목 지표 벡터화, 유사 종목 검색)

### 인증 — 백엔드 중심

JWT 토큰을 백엔드에서 관리하고 API로 스코프를 받게 만들었다. 프론트엔드는 토큰을 직접 다루지 않는다 — XSS로 토큰이 새는 흔한 실수를 구조적으로 차단.

Google · Kakao OAuth 2.0 통합으로 가입·로그인 마찰 최소화.

## Result

- 2025 충청권 ICT 이노베이션 스퀘어 개발역량 강화 멘토링 — **아이디어상 수상**
- Microsoft AI 교육 최종 프로젝트 — 우수상 (Inred — 본 프로젝트 전신)
- 1,302개 종목 지표 벡터화 + 100개 미국 주식 일별 가격 5년치 수집

## Insight

이 작업을 하기 위해서 신경써야 할 부분들이 정말 많았다. 1, 2, 3, 4 항목들을 우선순위 정하고 시작하는 것에 정말 시간을 썼고, 1인 개발로 혼자 모든 컴포넌트를 총괄하고 진행하는 것이 쉽지 않았다.

프로젝트를 완성도 있게 보이는 것도 중요했지만, 결국 멘토링 자리에서 청중들에게 프레젠테이션 하는 것에 가장 노력을 기울였다. 기능 100%보다 "이 시스템이 왜 이렇게 생겼나"를 30분 안에 납득시키는 것이 더 중요했다.

이 시점에서 Backend ↔ Frontend API 설계를 하면서 REST API 설계를 깊이 파악할 수 있었다.

## Links

- Backend: <https://github.com/Yeounil/Green_wire_backend>
- Frontend: <https://github.com/Yeounil/green_wire>
