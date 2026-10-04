# AI위드스쿨 멘토K 컬럼 발행 규약

저장소 `mentor-k/chatgpt-sites-projectbook`, 브랜치 `main`, 공개 주소 `https://aiwith.kr/columns/`.
한국시간 오전 8시는 작성 시작 시각이다. 이미지 제작·원고 검수·GitHub Pages 배포 완료 후 공개된다. 웹페이지 방문이나 브라우저 임시저장에 의존하지 않는다.

## 매 실행 순서

1. GitHub 연결 도구로 최신 main과 이 규약, `columns/topics.json`, `columns/posts.json`, `scripts/publish-columns.mjs`, `scripts/build-security.mjs`를 읽고 최신 소스를 작업공간에 받는다. 이전 실행의 파일·SHA를 재사용하지 않는다.
2. 기록된 최신 글의 공개 URL·대표이미지와 해당 커밋의 GitHub Pages 배포 성공을 먼저 확인한다. 미공개면 새 주제로 넘어가지 않는다. 오늘(Asia/Seoul) 게시된 글이 있으면 중복 게시하지 않는다. posts에 없는 가장 작은 topicId 한 개를 선택한다. 검수 실패 시 그 주제를 다음 실행에 재시도한다. 30편 완료 시 이 일일 컬럼 예약만 일시정지하고 다른 예약은 유지한다.
3. topics의 audience·primaryKeyword·targetKeywords·problemKeywords·focus·program·programUrl·deliverables를 읽고 글의 독자와 구매 검토 질문을 정한다. 제목에는 타겟 키워드, 구체적인 문제상황 키워드, 핵심어를 자연스럽게 포함한다. 부제·2문장 핵심 답변·본문에도 독자의 같은 문제를 명확히 설명한다. 키워드 나열·기계적 반복·밀도 목표·확인되지 않은 검색량이나 순위 주장을 사용하지 않는다. 계획 제목은 집필 방향이며 같은 타겟·문제·핵심어를 유지하는 범위에서 더 명확하게 쓸 수 있다.
4. 김용한 박사(멘토K)의 전문적인 한국어 평서체로 본문 1,800~2,300자, 소제목 2~4개, 문제 원인→실행 기준→적용·검수 순서로 독립 집필한다. 실제 독자 질문·답변 2~4개와 실행 제안을 추가한다. 답변은 첫 문장에서 직접 답하고 이후 조건·방법·한계를 설명한다. 질문답변은 본문 글자수와 별도다. 기존 글을 재사용하지 않는다.
5. 개인 경험·강의 실적·고객 사례·성과 수치·기관 추천을 지어내지 않는다. 가상 예시는 가상이라고 표시한다. 최신 정책·통계·제품 기능은 공식 원문과 확인일을 검증해 실제 링크를 sources에 넣는다. 확인되지 않으면 삭제하거나 게시를 보류한다. 저작권·개인정보·과장 광고를 검수한다. 검색순위·AI 추천·교육효과·매출 상승을 보장하지 않는다.
6. 후보 제목과 특징 본문 문장 2개를 실제 웹 검색한다. 기존 AI위드스쿨 글 및 minext.kr, mentork.kr, rndlab.kr, gongmolab.kr, localnext.net 공개 글과 확인 가능한 범위에서 비교한다. 외부 원문의 제목·표현·사례·비유·소제목 전개를 따라 쓰거나 동의어만 바꿔 쓰지 않는다. 유사하면 다시 집필하며 해소하지 못하면 게시 보류한다. 장문 전재를 금지하고 필요한 짧은 인용은 실제 출처를 연결한다. originality에는 실제 검색어 3개 이상, checkedAt, 확인 범위와 제한을 기록한다. 검색 미발견을 무중복이나 법적 안전 보장으로 표현하지 않는다.
7. 아래 대표이미지 규약에 맞춰 해당 글의 이미지를 반드시 제작하고 실제 파일과 cover 정보를 준비한다. 이미지 제작·검수가 실패하면 원고를 비공개 작업 파일로 보존하고 공개 posts 추가를 보류한다. 로고·다른 글 이미지·이미지 URL만으로 대신하지 않는다.
8. CTA는 해당 대상의 문제, 관심 프로그램, 협의할 실습 산출물을 구체적으로 제시한다. 가격·무료 상담·예약 가능 일정·산출물 보장 등을 임의로 만들지 않는다. `cta.program`, `audience`, `programUrl`, `deliverables`는 topics를 기본으로 하며 text는 주제별로 작성한다. 문의는 `/consultation/?column=<slug>`, 관련 프로그램은 topics의 실제 내부 URL, 전화는 `010-3338-7110`을 사용한다. 생성기가 컬럼·프로그램을 문의 내용에 연결한다.
9. 검수 통과한 한 편만 아래 스키마로 posts에 추가한다. 정규 일일 발행에서는 기존 글을 수정·삭제하지 않는다. 사용자 요청으로 기존 글을 고칠 때만 원래 slug·topicId·publishedAt을 유지하고 updatedAt과 수정 검수 기록을 갱신한다.
10. `node scripts/publish-columns.mjs --check`, `node scripts/publish-columns.mjs`, `node --test scripts/publish-columns.test.mjs`를 실행한다. 이미지 파일 존재·실제 크기·타겟/문제 키워드·날짜·중복·CTA·질문답변 검증을 통과해야 한다. 원고 데이터·신규 이미지·생성된 상세/목록/홈페이지/계획표·사이트맵·RSS·기존 llms 문서의 컬럼 항목만 변경한다. 기존 생성기와 인증·보안·다른 기능을 임의로 수정하지 않는다.
11. GitHub 연결 도구의 blob/tree/commit/ref로 변경 파일만 한 커밋에 저장한다. 이미지 바이너리는 실제 파일의 base64로 create_blob(encoding=base64)에 저장한다. 최신 main을 부모로 삼고 force=false를 유지한다. 경합하면 최신 main과 posts를 다시 읽고 중복을 확인한다. 기존 관리자 인증 파일을 수정·재업로드하거나 인증정보를 추출해 로그인에 쓰지 않는다. 권한·보호 워크플로가 막히면 우회하지 않는다.
12. 원고·이미지 저장본을 재조회하고 GitHub Pages 성공 및 실제 공개 목록·상세·이미지·문의 링크를 확인한다. 메타 제목/설명/canonical, 글 이미지에 맞는 OG/X 및 BlogPosting 저자·날짜·이미지, 이미지 사이트맵과 RSS를 확인한다. 확인 전 성공으로 보고하지 않는다. 오류이면 다음 글로 넘어가지 않고 원고를 보존한다. 주제 번호·제목·공개 URL·검증 결과·남은 편수만 간단히 보고한다.

## 대표이미지 규약

- 기준 인물·그림체는 공개된 `/assets/columns/ai-training-outcomes.webp`를 직접 열어 확인한다. GitHub 원본 또는 공개 URL에서 파일을 받아 view_image로 확인한 뒤 이미지 생성 도구의 참고이미지로 사용한다.
- 얼굴, 짧은 검은 머리, 검은 안경, 네이비 재킷, 신뢰감 있는 일러스트 톤을 일관되게 유지한다. 네이비·코발트 블루·밝은 블루 계열로 AI위드스쿨 브랜드를 이어간다.
- 매번 topics의 `coverPose` 동작을 사용해 해당 타겟·문제를 반영한 배경을 새로 만든다. 기존 글과 같은 동작을 반복하지 않는다. 실제 촬영사진·실제 고객 성과·기관 인증으로 오인시키지 않는다.
- 한 장의 3:2 가로 대표이미지, 권장 1536×1024(또는 1500×1000), 최소 1200×800. 상단 `AI위드스쿨 · 멘토K 컬럼`, 타겟, 읽기 쉬운 짧은 제목, 내용 배경, `김용한 박사(멘토K) | aiwith.kr`을 담는다. 글자·얼굴·손·크롭을 시각 검수한다. 이미지 제목은 본문 제목의 정확한 축약이어야 한다.
- 실제 파일을 `/assets/columns/<slug>.webp` 또는 `.png`에 넣는다. WebP를 선호하며 파일 크기를 적절히 압축한다. 형식 변환 시 일러스트 내용을 바꾸지 않는다. 이미지의 실제 픽셀 크기를 확인하고 동일 값을 cover에 기록한다.
- `cover={src,width,height,alt,caption,pose,headline}`. alt는 그림을 설명하는 자연스러운 문장으로 작성한다. caption에는 생성 일러스트·가상 장면임을 표시한다. pose는 해당 topics.coverPose와 같아야 한다.
- 생성기가 홈페이지·목록·상세·OG/X·BlogPosting·이미지 사이트맵·RSS에 동일한 글별 이미지를 연결한다. 누락·파일 부재·크기 불일치·동작 중복은 게시 검증에서 거부된다.

## 게시 글 스키마

`posts.json`은 `{version:2,posts:[...]}` 구조다.

- `topicId`(1~30), `slug`(topics와 동일), `status`="published"
- `title`, `subtitle`, `summary`(직접 답하는 두 문장)
- `primaryKeyword`(topics와 동일), `targetKeywords`·`problemKeywords`(각 1~5개; topics 기준)
- `sections=[{heading,paragraphs:[문단 문자열]}]`, `takeaway`(선택)
- `faq=[{question,answer}]`(2~4개)
- `cover={src,width,height,alt,caption,pose,headline}`(필수)
- `cta={text,program,audience,programUrl,deliverables:[2개 이상]}`
- `hashtags`(6개), `sources=[{label,url}]`, `originality={checkedAt,queries:[3개 이상],note}`
- `publishedAt`(실제 게시 ISO 시각), `updatedAt`(신규는 같은 시각)

원고는 HTML을 입력하지 않고 안전하게 escape해 정적 HTML에 렌더링한다. 미래 시각·중복 주제·같은 한국 날짜 중복 게시를 거부한다. SEO·AEO·GEO 보완은 검색 가능한 HTML, 명확한 답변, 일치하는 메타데이터·구조화 정보, 실제 근거와 내부 링크를 중심으로 한다. 별도 AI 전용 태그·llms 파일·FAQ가 추천이나 리치 결과를 보장한다고 설명하지 않는다.

## 수동 글쓰기

`/admin/#writing`의 기존 인증을 유지한다. 브라우저 로컬 초안은 중앙 공개 게시나 예약 작업 입력이 아니다. 자동 발행은 GitHub의 공개 원고 데이터·이미지·정적 HTML을 사용한다.
