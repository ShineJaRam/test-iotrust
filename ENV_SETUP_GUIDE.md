# 환경 변수 설정 가이드

## 📁 환경 변수 파일 구조

프로젝트는 3가지 환경을 지원합니다:

```
.env.development    # Development 환경
.env.staging        # Staging 환경
.env.production     # Production 환경
.env.local          # 로컬 개발용 (gitignore)
```

## 🚀 초기 설정

### 1. .gitignore 수정

다음 내용을 `.gitignore`에 추가하세요:

```gitignore
# 환경 변수 파일
.env.local
.env*.local

# 실제 환경 변수 파일은 커밋 (예제 파일만 제외)
!.env.development
!.env.staging
!.env.production
```

### 2. 환경 변수 파일 생성

각 환경별로 파일을 생성하세요:

#### `.env.development`

```env
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_API_BASE_URL=https://api-dev.iotrust.com
NEXT_PUBLIC_USE_MOCK=true
```

#### `.env.staging`

```env
NEXT_PUBLIC_ENV=staging
NEXT_PUBLIC_API_BASE_URL=https://api-stage.iotrust.com
NEXT_PUBLIC_USE_MOCK=false
```

#### `.env.production`

```env
NEXT_PUBLIC_ENV=production
NEXT_PUBLIC_API_BASE_URL=https://api.iotrust.com
NEXT_PUBLIC_USE_MOCK=false
```

#### `.env.local` (로컬 개발용)

```env
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_USE_MOCK=true
```

## 💻 사용 방법

### 개발 서버 실행

```bash
# Development 환경
pnpm dev:dev

# Staging 환경
pnpm dev:stage

# Production 환경
pnpm dev:prod

# 기본 (로컬)
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

### 환경 변수 자동 설정

```bash
# Development 환경 변수를 .env.local로 복사
pnpm env:setup dev

# Staging 환경 변수를 .env.local로 복사
pnpm env:setup stage

# Production 환경 변수를 .env.local로 복사
pnpm env:setup prod
```

## 🔧 Shell 스크립트 사용 (Unix/Mac)

### 개발 서버

```bash
# 실행 권한 부여
chmod +x scripts/dev.sh

# 환경별 실행
./scripts/dev.sh dev      # Development
./scripts/dev.sh stage    # Staging
./scripts/dev.sh prod     # Production
```

### 빌드

```bash
# 실행 권한 부여
chmod +x scripts/build.sh

# 환경별 빌드
./scripts/build.sh dev    # Development
./scripts/build.sh stage  # Staging
./scripts/build.sh prod   # Production
```

## 📝 환경 변수 설명

| 변수명                     | 설명                  | 예시                                   |
| -------------------------- | --------------------- | -------------------------------------- |
| `NEXT_PUBLIC_ENV`          | 환경 구분             | `development`, `staging`, `production` |
| `NEXT_PUBLIC_API_BASE_URL` | API 베이스 URL        | `https://api.iotrust.com`              |
| `NEXT_PUBLIC_USE_MOCK`     | Mock 데이터 사용 여부 | `true`, `false`                        |

## 🔒 보안 주의사항

1. **민감한 정보는 환경 변수에 저장하지 마세요**

   - API 키, 시크릿 등은 서버 환경 변수로 관리

2. **`.env.local`은 절대 커밋하지 마세요**

   - 개인 로컬 설정이 포함될 수 있습니다

3. **프로덕션 환경 변수는 신중하게 관리하세요**
   - CI/CD 파이프라인에서 주입하는 것을 권장

## 🐛 문제 해결

### 환경 변수가 적용되지 않을 때

1. 개발 서버 재시작

```bash
# Ctrl+C로 서버 종료 후
pnpm dev
```

2. `.next` 폴더 삭제 후 재빌드

```bash
rm -rf .next
pnpm build
```

3. 환경 변수 파일 확인

```bash
cat .env.local
```

### Windows에서 스크립트 실행 오류

Windows에서는 `cross-env`를 사용하는 npm 스크립트를 사용하세요:

```bash
pnpm dev:dev
pnpm build:stage
```

## 📚 참고 자료

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [cross-env](https://www.npmjs.com/package/cross-env)
