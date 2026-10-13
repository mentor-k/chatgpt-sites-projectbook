# 게시글 소셜 공유바

`site.js`는 컬럼, 공지사항, 카드뉴스 경로에서 로컬 공통 모듈 `sharebars.js`를 불러옵니다. 상세 콘텐츠가 있을 때만 `sharebars.css`와 공유바를 추가합니다. 목록의 컬럼 카드나 관리 화면에는 표시하지 않습니다.

- 컬럼: `article.column-reading`의 하단에 공유바를 붙입니다. 현재 게시글과 `scripts/publish-columns.mjs`로 생성할 미래 게시글 모두 같은 로더를 사용합니다.
- 카드뉴스: `.cardnews-detail-section`의 하단에 붙입니다. 중앙 콘텐츠 비동기 로딩과 재렌더링도 감지합니다. `/cardnews/view/?slug=…`는 해당 slug를 보존합니다.
- 공지사항: 현재 개별 상세 페이지가 없으므로 각 `.notice-grid > article.content-card`의 고유 ID를 포함하는 `/notices/#notice-…` 주소를 공유합니다. 새 공지는 명시적인 고정 ID를 권장하며, 없으면 제목 기반 ID를 자동 생성합니다.
- Facebook은 현재 글의 canonical URL, Threads는 제목과 URL을 각각 인코딩해 공유 작성 창을 엽니다. 방문자가 최종 게시를 결정합니다. 소셜 SDK나 추적 요청은 추가하지 않습니다.
- 링크 복사는 Clipboard API, 선택 영역 복사, 수동 복사 입력란 순으로 대체하며 실제 성공 여부를 안내합니다.
- 본문, canonical/OG 메타데이터, 접근 권한과 발행 일정은 변경하지 않습니다.

검증: `node --test scripts/*.test.mjs`, `node scripts/check-security.mjs`. 브라우저에서는 모바일 줄바꿈, 44px 터치 영역, 키보드 포커스, 복사 허용/거부, 동적 카드뉴스, 반복 초기화를 확인합니다.

공식 참고: https://developers.facebook.com/docs/plugins/share-button/ 및 https://developers.facebook.com/docs/threads/threads-web-intents/
