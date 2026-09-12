# Prompt Lab 관리자 API 배포 안내

GitHub Pages는 정적 파일만 실행하므로 관리자 인증 API는 별도 서버리스·PHP 서버에 배포해야 합니다. 프론트엔드는 기본적으로 같은 도메인의 `/api`를 호출하며, 다른 호스트를 사용하면 `window.PROMPTLAB_API_BASE`를 설정합니다.

## 필수 보안 조건

- PIN은 환경변수 또는 서버 Secret으로만 보관하고 저장소에 기록하지 않습니다.
- 로그인 성공 시 HttpOnly·Secure·SameSite 세션 쿠키를 발급합니다.
- 로그인 실패 횟수 제한·속도 제한·Origin 검증을 적용합니다.
- 엑셀 파일은 공개 GitHub 저장소에 두지 않고 인증된 `GET /admin/export`에서만 스트리밍합니다.
- 공지·접속통계는 서버 DB 또는 KV에 저장합니다. 브라우저 localStorage를 관리자 데이터베이스로 사용하지 않습니다.

## API 계약

- `POST /admin/login` — JSON `{pin}`, 성공 시 세션 쿠키
- `GET /admin/session` — 현재 세션 확인
- `POST /admin/logout` — 세션 폐기
- `GET /admin/usage` — 접속·검색·복사·공지 통계
- `POST /events` — 개인정보 없는 집계 이벤트 수신
- `GET /admin/notices`, `POST /admin/notices` — 공지 조회·저장
- `GET /admin/commits` — 저장소 수정 기록 프록시
- `GET /admin/export` — 인증된 관리자에게만 XLSX 스트리밍

현재 `/prompt/admin.html`과 `/prompt/admin.js`는 위 API에만 의존하며, PIN 해시를 포함하지 않습니다. API가 연결되지 않으면 관리자 화면은 자동으로 잠깁니다.
