---
title: GreenWire_AI
year: "2025~"
role: 1인 개발 · 단독 확장
summary: Multi-Agent Ensemble 자동매매 시스템. PyTorch 기반 4개 전문 에이전트 + Attention MetaAgent로 한국·미국 시장 동시 운용.
headlineMetric: "2년 누적 백테스트 +181% / MDD 32% (S&P 500 +70% / MDD 25% 대비 알파 +111%p)"
stack:
  - Python
  - PyTorch (LSTM/TabNet/MLP/Attention)
  - FastAPI
  - KIS Open API
  - Docker
  - APScheduler
github: https://github.com/Yeounil/GreenWire_AI
order: 1
---

## Problem

GreenWire(공모전 출품작)는 뉴스 분석·추천까지만 다뤘다. 멘토링 종료 후 직접 점검해보니 한 가지 핵심 한계가 보였다 — **정량 검증의 부재**. AI가 "이 뉴스가 호재 같다"고 말해도, 그래서 얼마나 사고 얼마나 팔아야 하는지, 그 결정이 통계적으로 근거 있는지 답할 수 없었다.

추천 시스템에서 실거래·검증 시스템으로 단독 확장하기로 결정.

## Approach

### Multi-Agent Ensemble

4개 전문 에이전트가 서로 다른 신호 도메인을 독립적으로 본다.

- **TechAgent (LSTM)** — 가격·거래량 시계열 기반 기술적 분석
- **FundaAgent (TabNet)** — PER · PBR · ROE 등 재무 지표
- **MacroAgent (MLP)** — VIX · DXY · M2 · Yield 등 매크로
- **FlowAgent (LSTM)** — 기관·외국인 수급 + 감정 분석

각 에이전트는 short / medium / long **3 horizon**으로 점수를 출력한다. **MetaAgent (Attention MLP)** 가 4개 에이전트의 신뢰도를 동적으로 가중평균해서 최종 신호를 만든다.

### Walk-Forward Training

테스트 시작일 이전 데이터로만 학습 — Look-Ahead Bias 차단. 모델 평가 자체에 미래 정보가 새지 않도록 학습 파이프라인 단계에서 강제.

### 자체 밸류에이션 + Regime Classifier

- **Proprietary PE-Multiple 밸류에이션** — Reality Dampener 적용으로 비현실적 가치평가 완화
- **Regime Classifier** — Bull / Bear / Sideways 분류, 신호 가중치 동적 조정

### 리스크 관리

- **HedgeManager** — Trailing Stop 25% / Max Loss 20% / Time Stop 120일 / Confidence Scaling
- **Macro Safety Gate** — VIX > 45 자동 매매 차단
- Stable / Growth 두 리스크 프로필 블렌딩

### 검증 환경

백테스트 환경 자체 구축. **600+ 단위 테스트**로 외부 API 완전 mock 처리 — CI 환경에서도 결정론적 재현.

## Result

- **2년 누적 +181% / MDD 32%** vs S&P 500 +70% / MDD 25% — 알파 +111%p
- 한국투자증권 KIS Open API 연동 → 본인 자산으로 실거래 운용 중
- Telegram 실시간 알림, APScheduler 24/7 데몬 (KR 15:45 · US 06:15 KST)
- Docker 단일 커맨드 배포

## Insight

리포팅 단계가 "더 좋은 가능성"을 만드는 작업이었다면, 이 후속 시스템은 **"실제 매수 판단에 쓸 만큼의 신뢰성"** 을 만드는 작업이었다. 특히 LLM이 어디까지 쓸 수 있고 어디서부터 LLM의 가치를 죽여야 하는지, 직관이 아니라 데이터로 풀어낸 구간이 가장 인상적인 시간이었다.

LLM 환각 통제, 밸류에이션 근거 강화, 리스크 검증 폭, 분석 깊이의 일관성, 코드 결합도 — 이 다섯 축을 분리해서 책임을 명확히 갈랐던 게 시스템 설계 측면에서 가장 큰 자산이 됐다.

## Links

- GitHub: <https://github.com/Yeounil/GreenWire_AI>
