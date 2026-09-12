# Prompt Lab /prompt 경로

기존 AI 홈페이지는 https://aiwith.kr/에 그대로 유지하고 Prompt Lab은 https://aiwith.kr/prompt/에서 서비스합니다.

관리자 화면은 https://aiwith.kr/prompt/admin.html이며, 브라우저에서 PIN을 비교하지 않고 /api/admin/* 서버 인증 API와 HttpOnly·Secure 세션 쿠키를 사용합니다.

GitHub Pages는 정적 호스팅이므로 관리자 인증 API는 별도 서버리스 환경에 배포하고, API 주소를 window.PROMPTLAB_API_BASE로 설정해야 합니다. 엑셀 파일은 공개 저장소에 두지 않고 인증 API가 비공개 저장소에서 스트리밍해야 합니다.
