---
title: DTW 기반 K-Medoids 병렬화
year: "2025"
role: 병렬처리 프로그래밍 · 팀장
summary: OpenMP Wavefront 병렬화로 보행자 궤적 군집화 가속. 10× 데이터셋에서 5.51× speedup, 암달의 법칙 이론치 초과.
headlineMetric: "8 threads · 10× 데이터셋에서 DTW 5.51× / K-Medoids 5.13× speedup (암달 이론치 4.71× 초과)"
stack:
  - C++
  - OpenMP
github: https://github.com/Yeounil/dtw-wavefront-parallel
order: 3
---

## Problem

보행자 궤적 데이터를 군집화하려면 길이가 다른 시계열 간 거리를 측정해야 하고, 그 표준 도구가 **DTW(Dynamic Time Warping)**. 그런데 DTW DP는 셀 간 의존성이 위·왼쪽·좌상 세 방향에 걸려 있어 단순 분할 병렬화가 불가능하다.

규모가 커지면 비용이 폭발한다.

```
보행자 P명 × 시계열 길이 N, M
  거리 행렬: O(P² · N · M)
  보행자 400명 → 79,800쌍 × DTW 한 번
```

직렬 처리로는 10× 데이터셋에서 100초 넘게 걸리는 상황. 코어가 8개 있는데 활용을 못 하는 게 답답했다.

## Approach

### Wavefront 병렬화

DP 격자에서 의존성 관계를 다시 보면, **반대각선(i+j=k) 위의 셀들은 서로 독립**이다. 같은 반대각선 위 셀들을 병렬로 채우고, 다음 반대각선으로 넘어간다.

```
의존성: cell(i, j) ← cell(i-1, j), cell(i, j-1), cell(i-1, j-1)

반대각선 k=2 셀들은 모두 k=1 셀들에만 의존
→ k 단위로 wavefront sync 후 병렬 진행
```

이론 복잡도: O(n·m) → O(n+m)이 P개 프로세서 가정에서 가능.

### 스케줄링 분리

작업 성질에 따라 OpenMP 스케줄링을 다르게 가져갔다.

- **DTW 안쪽 wavefront** — `schedule(static)`. 각 반대각선 길이가 예측 가능, 균등 분배가 효율적
- **거리 행렬 외곽 루프** — `schedule(dynamic, 4)`. 보행자 쌍마다 DTW 비용이 다르므로 동적 분배가 부하 균형에 유리
- **K-Medoids 후보 탐색** — `schedule(dynamic)`. 후보별 평가 비용 변동이 큼

### 크로스 플랫폼 I/O

Windows: `CreateFileMapping`, Linux: `mmap`로 큰 데이터셋 메모리 매핑 처리.

## Result

| 규모 | Serial | 4-Thread | 8-Thread |
|------|--------|----------|----------|
| 1× | 11.79ms | 1.61× | 1.93× |
| 5× | 5,966ms | **3.08×** | **4.18×** |
| 10× | 104,573ms | 2.71× | **5.51×** |

8 threads · 10× 데이터셋에서 DTW 5.51× / K-Medoids 5.13× speedup. **암달의 법칙 이론치(4.71×) 초과 달성** — 기존 수치는 병렬화 가능 비율을 90%로 계산한 값인데, 실제로는 데이터 사이즈가 커질수록 병렬 처리 가능 구간 비율이 증가했기 때문.

## Insight

4-thread 환경에서 비선형 성능 저하가 보였다. 단순히 "8개 중 4개만 쓰면 절반 빠르겠지"가 아니라, **메모리 대역폭 병목 + wavefront 단계별 병렬성 비대칭**이 겹쳐서 일어나는 현상이라고 진단했다.

또 Scale 20× 이상에서는 시리얼 누적 cost가 overflow하는 한계를 발견. 이 경계에서는 단순 wavefront로 안 되고, 블록 단위 분해 + 다중 스트림이 필요하다는 게 다음 시도 방향이다.

병렬화는 "코어 수만큼 빨라진다"가 절대 아니다. 알고리즘 의존성 구조 + 메모리 액세스 패턴 + 캐시 지역성이 결합해서 결정되는 복합 문제고, 그걸 직접 측정·진단하는 경험이 가장 큰 수확이었다.

## Links

- GitHub: <https://github.com/Yeounil/dtw-wavefront-parallel>
- Result_Report: [PDF (18p, 0.88 MB)](/[Pesla]Report.pdf)
