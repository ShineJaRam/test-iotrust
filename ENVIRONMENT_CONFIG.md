# 환경 설정 문서

## 🌍 환경 구분

이 프로젝트는 3가지 환경을 지원합니다:

| 환경 | 설명 | Mock 데이터 | API Base URL |
|------|------|------------|--------------|
| **Development** | 개발 환경 | ✅ 사용 | `https://api-dev.iotrust.com` |
| **Staging** | 스테이징 환경 | ❌ 실제 API | `https://api-stage.iotrust.com` |
| **Production** | 프로덕션 환경 | ❌ 실제 API | `https://api.iotrust.com` |

## 📁 환경 변수 파일

### `.env.development`
```env
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_API_BASE_URL=https://api-dev.iotrust.com
NEXT_PUBLIC_USE_MOCK=true
```

### `.env.staging`
```env
NEXT_PUBLIC_ENV=staging
NEXT_PUBLIC_API_BASE_URL=https://api-stage.iotrust.com
NEXT_PUBLIC_USE_MOCK=false
```

### `.env.production`
```env
NEXT_PUBLIC_ENV=production
NEXT_PUBLIC_API_BASE_URL=https://api.iotrust.com
NEXT_PUBLIC_USE_MOCK=false
```

### `.env.local` (로컬 개발용)
```env
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_USE_MOCK=true
```

## 🔀 환경별 API 분기 로직

### 1. Mock 모드 (Development)
- `NEXT_PUBLIC_USE_MOCK=true` 설정
- Next.js API Routes 사용 (`/api/*`)
- 로컬에서 Mock 데이터 응답

```typescript
// src/lib/axios.ts
const getApiBaseUrl = () => {
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";
  
  if (useMock) {
    return "/api"; // Next.js API Routes
  }
  
  return process.env.NEXT_PUBLIC_API_BASE_URL; // 실제 백엔드
};
```

### 2. Real API 모드 (Staging/Production)
- `NEXT_PUBLIC_USE_MOCK=false` 설정
- 실제 백엔드 API 호출
- 환경별로 다른 Base URL 사용

## 📡 API 엔드포인트

### Mock API (Development)
```
GET  /api/banners          # 배너 목록
GET  /api/favorites        # 즐겨찾기 목록
DELETE /api/favorites?id=1 # 즐겨찾기 삭제
GET  /api/dapps            # DApp 목록 (페이지네이션)
```

### Real API (Staging/Production)
```
GET  {API_BASE_URL}/banners          # 배너 목록
GET  {API_BASE_URL}/favorites        # 즐겨찾기 목록
DELETE {API_BASE_URL}/favorites/{id} # 즐겨찾기 삭제
GET  {API_BASE_URL}/dapps            # DApp 목록
```

## 🚀 실행 방법

### 개발 서버

```bash
# Development (Mock)
pnpm dev:dev

# Staging (Real API)
pnpm dev:stage

# Production (Real API)
pnpm dev:prod

# 로컬 (Mock)
pnpm dev
```

### 빌드

```bash
# Development 빌드
pnpm build:dev

# Staging 빌드
pnpm build:stage

# Production 빌드
pnpm build:prod
```

## 🔧 환경 설정 확인

개발 환경에서는 콘솔에 현재 환경 정보가 출력됩니다:

```
🌍 Environment Configuration: {
  ENV: 'development',
  API_BASE_URL: 'http://localhost:3000/api',
  USE_MOCK: true
}
```

## 📦 Mock 데이터

### 제공되는 Mock 데이터

1. **배너 (3개)**
   - MAP Protocol 배너
   - D'CENT Wallet 배너
   - D'CENT Blog 배너

2. **즐겨찾기 (3개)**
   - OpenSea
   - MoonPay
   - Rarible

3. **DApp 리스트 (1,200개)**
   - GitHub 제공 데이터 (9개) 반복 생성
   - 언어/플랫폼/환경별 필터링 지원

### Mock 데이터 위치

```
app/api/
  ├── banners/route.ts    # 배너 Mock API
  ├── favorites/route.ts  # 즐겨찾기 Mock API
  └── dapps/route.ts      # DApp Mock API

src/data/
  ├── banners.ts          # 배너 타입 정의
  ├── favorites.ts        # 즐겨찾기 타입 정의
  └── dapps.ts            # DApp 타입 정의 + 원본 데이터
```

## 🎯 환경별 동작

### Development
- ✅ Mock API 사용
- ✅ React Query Devtools 활성화
- ✅ 모든 DApp 표시 (dev/stage 전용 포함)
- ✅ 네트워크 지연 시뮬레이션 (300-500ms)

### Staging
- ❌ Mock API 미사용
- ✅ 실제 백엔드 API 호출
- ⚠️ dev 전용 DApp 숨김
- ✅ stage 전용 DApp 표시

### Production
- ❌ Mock API 미사용
- ✅ 실제 백엔드 API 호출
- ❌ dev/stage 전용 DApp 숨김
- ✅ production DApp만 표시

## 🔐 보안

- 환경 변수는 `NEXT_PUBLIC_*` 접두사 사용
- 민감한 정보는 서버 환경 변수로 관리
- `.env.local`은 gitignore에 포함

## 📝 참고사항

1. **환경 변수 변경 시 서버 재시작 필요**
2. **빌드 시점에 환경 변수가 번들에 포함됨**
3. **클라이언트에서 접근 가능한 환경 변수만 `NEXT_PUBLIC_*` 사용**

