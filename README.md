# IoTrust Frontend Homework - Discovery 페이지 구현

D'CENT 모바일 앱의 Discovery 메인 화면을 구현한 프로젝트입니다.

## 📋 목차

- [기술 스택](#-기술-스택)
- [프로젝트 구조](#-프로젝트-구조)
- [설치 및 실행](#-설치-및-실행)
- [구현된 기능](#-구현된-기능)
- [아키텍처](#-아키텍처)
- [환경 설정](#-환경-설정)
- [AI 도구 사용](#-ai-도구-사용)

## 🚀 기술 스택

### Core

- **Next.js 16.0.5** - React 프레임워크 (App Router)
- **React 19.2.0** - UI 라이브러리
- **TypeScript 5** - 타입 안정성

### 상태 관리

- **Zustand 5.0.8** - 전역 UI 상태 (모달, 바텀시트, 검색)
- **@tanstack/react-query 5.90.11** - 서버 상태 관리 및 캐싱

### 스타일링

- **Tailwind CSS 4** - 유틸리티 기반 CSS
- **classnames 2.5.1** - 조건부 클래스 관리

### 데이터 페칭 & API

- **Axios 1.13.2** - HTTP 클라이언트
- **Next.js API Routes** - Mock API 서버

### UI 라이브러리

- **Swiper 12.0.3** - 배너 슬라이드
- **Vaul 1.1.2** - 바텀시트 (React 19 호환)
- **react-device-detect 2.2.3** - 디바이스 감지
- **react-error-boundary 6.0.0** - 에러 처리

### 다국어

- **next-intl 4.5.5** - i18n 지원 (한국어/영어)

### 개발 도구

- **ESLint 9** - 코드 품질
- **cross-env 10.1.0** - 크로스 플랫폼 환경 변수

### 테스트

- **Vitest 4.0.14** - 단위/통합 테스트
- **@testing-library/react 16.3.0** - React 컴포넌트 테스트
- **Playwright 1.57.0** - E2E 테스트

## 📦 프로젝트 구조

```
test-iotrust/
├── app/
│   ├── [locale]/              # 다국어 라우팅
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   └── page.tsx           # 메인 페이지
│   ├── api/                   # Mock API 엔드포인트
│   │   ├── banners/           # 배너 API
│   │   ├── favorites/         # 즐겨찾기 API
│   │   └── dapps/             # DApp 리스트 API
│   └── globals.css            # 전역 스타일
├── src/
│   ├── components/            # 아토믹 디자인 패턴
│   │   ├── atoms/             # 기본 컴포넌트
│   │   │   ├── icons/         # 아이콘 시스템
│   │   │   ├── LoadingIndicator.tsx
│   │   │   └── DAppSkeleton.tsx
│   │   ├── molecules/         # 조합 컴포넌트
│   │   │   ├── SearchBar.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── DAppBottomSheet.tsx
│   │   │   ├── DAppItem.tsx
│   │   │   ├── DAppListState.tsx
│   │   │   ├── ErrorFallback.tsx
│   │   │   └── ErrorBoundaryWrapper.tsx
│   │   └── organisms/         # 복잡한 UI 섹션
│   │       ├── Banner.tsx
│   │       ├── Favorites.tsx
│   │       └── VirtualDAppList.tsx
│   ├── api/                   # API 클라이언트
│   ├── hooks/                 # Custom Hooks
│   ├── store/                 # Zustand 전역 상태
│   ├── lib/                   # 유틸리티
│   ├── config/                # 환경 설정
│   ├── constants/             # 상수 정의
│   ├── data/                  # 타입 정의
│   ├── providers/             # Context Providers
│   ├── utils/                 # 유틸 함수
│   ├── styles/                # CSS 스타일
│   └── i18n/                  # 다국어 설정
├── messages/                  # 다국어 메시지
│   ├── en.json
│   └── ko.json
└── public/images/             # 정적 이미지
```

## 🛠 설치 및 실행

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하세요:

```env
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_USE_MOCK=true
```

### 3. 개발 서버 실행

```bash
# Development 환경 (Mock API)
pnpm dev
pnpm dev:dev

# Staging 환경
pnpm dev:stage

# Production 환경
pnpm dev:prod
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 4. 빌드

```bash
# Development 빌드
pnpm build:dev

# Staging 빌드
pnpm build:stage

# Production 빌드
pnpm build:prod
```

### 5. 프로덕션 실행

```bash
pnpm start
```

### 6. 테스트 실행

```bash
# 단위/통합 테스트 (Vitest)
pnpm test              # Watch 모드
pnpm test --run        # 1회 실행
pnpm test:ui           # UI 모드
pnpm test:coverage     # 커버리지

# E2E 테스트 (Playwright)
pnpm test:e2e          # E2E 테스트 실행
pnpm test:e2e:ui       # UI 모드
pnpm test:e2e:debug    # 디버그 모드
```

## 🎯 구현된 기능

### 1. 배너 슬라이드 ✅

- Swiper 라이브러리 활용 자동 슬라이드
- 슬라이드 인디케이터 (현재/전체 페이지)
- CTA 버튼 클릭 시 외부 링크 이동
- 다국어 지원 (한국어/영어)
- 첫 번째 배너 우선 로딩 (LCP 최적화)
- API 데이터 페칭 (`/api/banners`)

### 2. 즐겨찾기 리스트 ✅

- 즐겨찾기 목록 표시
- 삭제 버튼 클릭 시 확인 모달
- 모달 확인 후 삭제 및 UI 업데이트
- 즐겨찾기 클릭 시 서비스 이동
- React Query Mutation으로 삭제 처리
- 스켈레톤 로딩 상태

### 3. 서비스 리스트 (DApp) ✅

#### 필터링 조건

- **언어**: 한국어/영어 환경에 따라 다른 DApp 표시
- **플랫폼**: iOS/Android에 따라 다른 DApp 표시
- **빌드 환경**: dev/stage/prod에 따라 다른 DApp 표시
- 조건 조합에 따른 동적 필터링

#### 무한 스크롤 + 성능 최적화

- React Query `useInfiniteQuery`로 페이지네이션
- 전체 페이지 스크롤 기반 무한 스크롤
- 20개씩 자동 로드
- 1,200개 Mock 데이터
- 스켈레톤 UI 로딩 상태

#### 검색 및 필터링

- 실시간 검색
- 이름, 설명(한글/영문), 네트워크로 검색
- 검색어 하이라이트 표시
- 검색 결과 개수 표시
- Clear 버튼으로 초기화

### 4. 이미지 최적화 ✅

- Next.js Image 컴포넌트 사용
- **Lazy Loading**: viewport 진입 시 로드
- **WebP/AVIF 자동 변환**: 브라우저 지원 시 자동 적용
- **Fallback**: 미지원 브라우저는 PNG/JPG 사용
- 반응형 이미지 크기 최적화
- 1년 캐싱 설정

### 5. 다국어 지원 ✅

- next-intl 활용 i18n
- 한국어/영어 지원
- URL 기반 언어 전환 (`/ko`, `/en`)
- 모든 컴포넌트 다국어 지원

## 🏗 아키텍처

### 아토믹 디자인 패턴

컴포넌트를 **Atoms → Molecules → Organisms** 계층으로 구조화:

#### ⚛️ Atoms (11개)

가장 작은 UI 단위

- `Icon` (Alert, Search, Close, ChevronRight, Trash, Spinner)
- `LoadingIndicator` (Banner, List, Page)
- `Skeleton` (DApp, Favorite)

#### 🧪 Molecules (8개)

Atoms를 조합한 기능 단위

- `SearchBar` - 검색 입력
- `Modal` - 확인 다이얼로그
- `DAppBottomSheet` - DApp 상세
- `DAppItem` - DApp 리스트 아이템
- `DAppListState` - 리스트 상태 (Loading, Error, Empty)
- `ErrorFallback` - 에러 UI
- `ErrorBoundaryWrapper` - 에러 처리

#### 🦠 Organisms (3개)

복잡한 UI 섹션

- `Banner` - 배너 슬라이더
- `Favorites` - 즐겨찾기 목록
- `VirtualDAppList` - DApp 무한 스크롤 리스트

### 상태 관리 분리

#### 전역 UI 상태 (Zustand)

```typescript
modalStore; // 확인 모달 상태
bottomSheetStore; // DApp 상세 바텀시트
searchStore; // 검색어 (제거됨 - 로컬 상태로 변경)
```

#### 서버 상태 (React Query)

```typescript
useBanners(); // 배너 데이터 (캐시: 10분)
useFavorites(); // 즐겨찾기 데이터 (캐시: 5분)
useDAppList(); // DApp 무한 스크롤 (캐시: 5분)
```

#### 지역 상태 (useState)

```typescript
currentSlide; // Swiper 현재 슬라이드
searchQuery; // 검색 입력 (debounce)
```

### 백엔드 API 구조

#### Mock API (Development)

```
GET  /api/banners          # 배너 목록
GET  /api/favorites        # 즐겨찾기 목록
DELETE /api/favorites?id=1 # 즐겨찾기 삭제
GET  /api/dapps            # DApp 목록 (페이지네이션)
  ?page=1&pageSize=20&locale=ko&env=development
```

## 🌐 환경 설정

### 지원 환경

| 환경            | Mock 데이터 | API Base URL                    | 용도      |
| --------------- | ----------- | ------------------------------- | --------- |
| **Development** | ✅ 사용     | `http://localhost:3000/api`     | 로컬 개발 |
| **Staging**     | ❌ 실제 API | `https://api-stage.iotrust.com` | 테스트    |
| **Production**  | ❌ 실제 API | `https://api.iotrust.com`       | 운영      |

### 환경 변수

`.env.local` 파일 생성:

```env
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_USE_MOCK=true
```

### 환경별 실행 명령어

```bash
# 개발
pnpm dev          # 로컬 (Mock)
pnpm dev:dev      # Development
pnpm dev:stage    # Staging
pnpm dev:prod     # Production

# 빌드
pnpm build:dev    # Development 빌드
pnpm build:stage  # Staging 빌드
pnpm build:prod   # Production 빌드
```

## 🎯 주요 기능 상세

### 배너 슬라이드

- ✅ 자동 슬라이드 (5초 간격)
- ✅ 슬라이드 인디케이터
- ✅ CTA 버튼
- ✅ 다국어 이미지/텍스트
- ✅ 로딩 스켈레톤

### 즐겨찾기

- ✅ 목록 표시
- ✅ 삭제 기능 (모달 확인)
- ✅ 클릭 시 외부 링크 이동
- ✅ 로딩 스켈레톤

### DApp 리스트

- ✅ 무한 스크롤 (1,200개 데이터)
- ✅ 실시간 검색 (이름, 설명, 네트워크)
- ✅ 검색어 하이라이트
- ✅ 언어별 필터링 (한국어/영어)
- ✅ 플랫폼별 필터링 (iOS/Android)
- ✅ 환경별 필터링 (dev/stage/prod)
- ✅ 스켈레톤 로딩
- ✅ 바텀시트 상세 보기

## 🤖 AI 도구 사용

### 사용한 도구

**Cursor AI (Claude Sonnet 4.5)**

### 활용 방식

#### 1. 아키텍처 설계

```
"Next.js 16 + React 19 + TypeScript로 Discovery 페이지 구현"
"아토믹 디자인 패턴으로 컴포넌트 구조화"
"전역/지역 상태 관리 분리 설계"
```

#### 2. 기능 구현

```
"무한 스크롤 + 검색 기능이 있는 DApp 리스트 구현"
"React Query로 서버 상태, Zustand로 UI 상태 관리"
"다국어 지원 및 환경별 필터링 구현"
```

#### 3. 최적화

```
"이미지 최적화 (WebP, Lazy Loading)"
"검색 debounce 및 성능 최적화"
"1000개 이상 데이터 무한 스크롤 성능 테스트"
```

#### 4. 리팩토링

```
"react-error-boundary 라이브러리로 에러 처리 개선"
"아이콘 시스템 구축 (classnames 활용)"
"로딩 인디케이터 컴포넌트 시스템화"
"로케일 상수화 및 타입 안정성 개선"
```

#### 5. 테스트 코드 작성

```
"Vitest + Playwright 도입 및 설정"
"useDebounce Hook 단위 테스트 작성"
"searchFilter 유틸 함수 테스트 작성"
"SearchBar 컴포넌트 테스트 작성"
"검색, 무한 스크롤, DApp 상세 E2E 테스트 작성"
```

## 🧪 테스트

### 테스트 구조

```
test/
├── unit/                    # Vitest 단위 테스트
│   ├── components/
│   │   └── SearchBar.test.tsx
│   ├── hooks/
│   │   └── useDebounce.test.ts
│   └── utils/
│       └── searchFilter.test.ts
└── e2e/                     # Playwright E2E 테스트
    ├── search.spec.ts
    ├── infinite-scroll.spec.ts
    └── dapp-detail.spec.ts
```

## 🚧 제한 시간 내 구현하지 못한 부분

**없음** - 모든 필수 요구사항 구현 완료

## 💡 보완하고 싶은 점

1. **테스트 코드 확장**

   - 더 많은 컴포넌트 단위 테스트 (Banner, Favorites, DAppItem 등)
   - API 모킹 테스트 (MSW 활용)
   - 접근성 테스트 (axe-core)

2. **개발 도구**

   - Storybook 컴포넌트 문서화
   - Chromatic 비주얼 회귀 테스트
   - Husky + lint-staged (pre-commit hooks)
   - Conventional Commits 적용

3. **Analytics**

   - Google Analytics 4 또는 Mixpanel 연동
   - 사용자 행동 추적 (검색, 클릭, 스크롤 깊이)
   - 에러 모니터링 (Sentry)

## 👤 작성자

지원자: 임수현  
작성일: 2025-11-27  
소요 시간: 약 5시간
