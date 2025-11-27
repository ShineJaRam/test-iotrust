# IoTrust Frontend Homework - Discovery 페이지 구현

D'CENT 모바일 앱의 Discovery 메인 화면을 구현한 프로젝트입니다.

## 🚀 기술 스택

### Core
- **Next.js 16.0.5** - React 프레임워크 (App Router)
- **React 19.2.0** - UI 라이브러리
- **TypeScript 5** - 타입 안정성

### 상태 관리
- **Zustand 5.0.8** - 전역 상태 관리 (모달, 바텀시트, 검색)
- **@tanstack/react-query 5.90.11** - 서버 상태 관리 및 캐싱

### 스타일링
- **Tailwind CSS 4** - 유틸리티 기반 CSS 프레임워크
- **PostCSS** - CSS 전처리

### 데이터 페칭 & API
- **Axios 1.13.2** - HTTP 클라이언트
- **Next.js API Routes** - Mock API 서버

### UI 컴포넌트 & 라이브러리
- **Swiper 12.0.3** - 배너 슬라이드
- **Vaul 1.1.2** - 바텀시트 (React 19 호환)
- **react-device-detect 2.2.3** - 디바이스 감지 (iOS/Android)

### 다국어
- **next-intl 4.5.5** - i18n 지원 (한국어/영어)

### 개발 도구
- **ESLint 9** - 코드 품질 관리
- **@tanstack/react-query-devtools** - React Query 디버깅

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
│   └── globals.css            # 전역 스타일 (폰트 시스템)
├── src/
│   ├── api/                   # API 클라이언트
│   │   ├── banners.ts
│   │   ├── favorites.ts
│   │   └── dapps.ts
│   ├── components/            # React 컴포넌트
│   │   ├── Banner.tsx         # 배너 슬라이드
│   │   ├── Favorites.tsx      # 즐겨찾기 리스트
│   │   ├── VirtualDAppList.tsx # DApp 무한 스크롤 리스트
│   │   ├── SearchBar.tsx      # 검색 입력
│   │   ├── DAppBottomSheet.tsx # DApp 상세 바텀시트
│   │   ├── Modal.tsx          # 확인 모달
│   │   └── DAppSkeleton.tsx   # 로딩 스켈레톤
│   ├── hooks/                 # Custom Hooks
│   │   ├── useBanners.ts      # 배너 데이터 페칭
│   │   ├── useFavorites.ts    # 즐겨찾기 데이터 페칭
│   │   └── useDAppList.ts     # DApp 무한 스크롤
│   ├── store/                 # Zustand 전역 상태
│   │   ├── modalStore.ts      # 모달 상태
│   │   ├── bottomSheetStore.ts # 바텀시트 상태
│   │   └── searchStore.ts     # 검색 상태
│   ├── lib/                   # 유틸리티
│   │   ├── axios.ts           # Axios 인스턴스
│   │   └── queryClient.ts     # React Query 설정
│   ├── providers/             # Context Providers
│   │   └── QueryProvider.tsx  # React Query Provider
│   ├── data/                  # Mock 데이터 (타입 정의)
│   │   ├── banners.ts
│   │   ├── favorites.ts
│   │   └── dapps.ts
│   └── i18n/                  # 다국어 설정
│       ├── routing.ts
│       └── request.ts
├── messages/                  # 다국어 메시지
│   ├── en.json
│   └── ko.json
└── public/images/             # 정적 이미지 파일

```

## 🛠 설치 및 실행

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# 환경 구분 (development | staging | production)
NEXT_PUBLIC_ENV=development

# API Base URL (실제 백엔드 URL로 변경 가능)
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api

# Mock 데이터 사용 여부
NEXT_PUBLIC_USE_MOCK=true
```

### 3. 개발 서버 실행

```bash
# Development 환경
pnpm dev

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

# 일반 빌드 (기본값)
pnpm build
```

### 5. 프로덕션 실행

```bash
pnpm start
```

## 🎯 구현된 주요 기능

### 1. 배너 슬라이드 ✅
- Swiper 라이브러리를 활용한 자동 슬라이드
- 슬라이드 인디케이터 (현재 페이지/전체 페이지)
- CTA 버튼 클릭 시 외부 링크 이동
- 다국어 지원 (한국어/영어 이미지 및 텍스트)
- 첫 번째 배너 우선 로딩 (LCP 최적화)
- API에서 데이터 페칭 (`/api/banners`)

### 2. 즐겨찾기 리스트 ✅
- 즐겨찾기 목록 표시
- 삭제 버튼 클릭 시 확인 모달 표시
- 모달 확인 후 삭제 및 UI 업데이트
- 즐겨찾기 클릭 시 해당 서비스로 이동
- API에서 데이터 페칭 (`/api/favorites`)
- React Query Mutation으로 삭제 처리

### 3. 서비스 리스트 (DApp) ✅
#### 필터링 조건
- **언어**: 한국어/영어 환경에 따라 표시
- **플랫폼**: iOS/Android에 따라 표시
- **빌드 환경**: dev/stage/prod에 따라 표시
- 조건 조합에 따른 동적 필터링

#### 무한 스크롤 + 성능 최적화
- React Query `useInfiniteQuery`로 페이지네이션
- 전체 페이지 스크롤 기반 무한 스크롤
- 20개씩 자동 로드
- 1,200개 Mock 데이터 생성 (성능 테스트)
- 스켈레톤 UI 로딩 상태 표시

#### 검색 및 필터링
- 실시간 검색 (300ms debounce)
- 이름, 설명(한글/영문), 네트워크로 검색
- 검색어 하이라이트 표시
- 검색 결과 개수 표시
- Clear 버튼으로 검색 초기화

### 4. 이미지 최적화 ✅
- Next.js Image 컴포넌트 사용
- **Lazy Loading**: viewport 진입 시 로드
- **WebP/AVIF 자동 변환**: 브라우저 지원 시 자동 적용
- **Fallback**: 미지원 브라우저는 PNG/JPG 사용
- 반응형 이미지 크기 최적화
- 1년 캐싱 설정

### 5. 다국어 지원 ✅
- next-intl을 활용한 i18n
- 한국어/영어 지원
- URL 기반 언어 전환 (`/ko`, `/en`)
- 배너, 즐겨찾기, DApp 모두 다국어 지원

### 6. 백엔드 API 구조 ✅
#### API 엔드포인트
- `GET /api/banners` - 배너 목록 조회
- `GET /api/favorites` - 즐겨찾기 목록 조회
- `DELETE /api/favorites?id={id}` - 즐겨찾기 삭제
- `GET /api/dapps` - DApp 목록 조회 (페이지네이션)

#### 데이터 구조 설계
```typescript
// Banner
interface Banner {
  id: number;
  image_en?: string;
  image_ko?: string;
  description_en?: string;
  description_ko?: string;
  link_en: string;
  link_ko: string;
  button_en?: string;
  button_ko?: string;
  order: number;
  isActive: boolean;
}

// Favorite
interface Favorite {
  id: number;
  name: string;
  url: string;
  icon: string;
  order: number;
  createdAt: string;
}

// DApp
interface DApp {
  id: number;
  name: string;
  icon: string;
  url: string;
  description_en?: string;
  description_ko?: string;
  networks?: string[];
  showOnlyForIOS?: boolean;
  showOnlyForEnglish?: boolean;
  showOnlyForKorean?: boolean;
  showOnlyInDevStage?: boolean;
}
```

### 7. 상태 관리 분리 ✅
#### 전역 상태 (Zustand)
- `modalStore`: 확인 모달 상태
- `bottomSheetStore`: DApp 상세 바텀시트 상태
- `searchStore`: 검색어 전역 상태

#### 서버 상태 (React Query)
- 배너 데이터 (캐시: 10분)
- 즐겨찾기 데이터 (캐시: 5분)
- DApp 리스트 (캐시: 5분, 무한 스크롤)

#### 지역 상태 (useState)
- Swiper currentSlide
- SearchBar debounce 입력

### 8. UI/UX 디테일 ✅
- 일관된 폰트 시스템 (CSS 변수)
- 모바일 최적화 (max-width: 759px)
- 터치 친화적 버튼 크기
- 텍스트 오버플로우 방지 (truncate)
- 이미지 크기 제한 (레이아웃 깨짐 방지)
- 커스텀 컴포넌트 (기본 컴포넌트 미사용)
- 로딩 상태 (스켈레톤, 스피너)
- 에러 처리 (API 실패 시 안내)

## 🌐 환경별 설정

### Development
- Mock API 사용
- React Query Devtools 활성화
- 모든 DApp 표시 (dev/stage 전용 포함)

### Staging
- 외부 API 연결 가능
- 일부 DApp 숨김 (prod 전용 제외)

### Production
- 외부 API 연결
- dev/stage 전용 DApp 숨김
- 최적화된 빌드

## 📱 지원 환경

- **모바일**: iOS, Android
- **브라우저**: Chrome, Safari, Firefox (최신 버전)
- **화면 크기**: 최대 759px (모바일 최적화)

## 🎨 디자인 시스템

### 폰트 크기
- xs: 12px
- sm: 14px
- base: 16px
- lg: 18px
- xl: 20px
- 2xl: 24px

### 폰트 굵기
- normal: 400
- medium: 500
- semibold: 600
- bold: 700

### 간격
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 24px
- 2xl: 32px

## 🚧 제한 시간 내 구현하지 못한 부분

없음 - 모든 필수 요구사항 구현 완료

## 💡 보완하고 싶은 점

1. **E2E 테스트**: Playwright 또는 Cypress로 사용자 시나리오 테스트
2. **Unit 테스트**: Jest + React Testing Library로 컴포넌트 테스트
3. **에러 바운더리**: React Error Boundary 추가
4. **성능 모니터링**: Lighthouse CI, Web Vitals 측정
5. **접근성 개선**: ARIA 속성 추가, 키보드 네비게이션
6. **PWA**: Service Worker, Offline 지원
7. **Analytics**: 사용자 행동 추적
8. **Storybook**: 컴포넌트 문서화

## 🤖 AI 도구 사용

### 사용한 도구
- **Cursor AI** (Claude Sonnet 4.5)

### 사용 방법
1. 요구사항 분석 및 아키텍처 설계
2. 컴포넌트 구조 설계 및 코드 생성
3. API 구조 설계 및 Mock 데이터 생성
4. 타입 정의 및 인터페이스 설계
5. 스타일링 및 반응형 레이아웃
6. 성능 최적화 (이미지, 무한 스크롤)
7. 에러 처리 및 예외 상황 대응
8. README 작성 및 문서화

### 주요 프롬프트 예시
```
"Next.js 16 + React 19 + TypeScript로 Discovery 페이지 구현"
"무한 스크롤 + 검색 기능이 있는 DApp 리스트 구현"
"React Query로 서버 상태 관리, Zustand로 전역 상태 관리"
"다국어 지원 (next-intl) 및 환경별 필터링"
"이미지 최적화 (WebP, Lazy Loading)"
```

## 📄 라이선스

Private - IoTrust Frontend Homework

## 👤 작성자

지원자: [이름]
작성일: 2024-11-27
