# 실전 홈페이지 프로젝트북

Project·Work·Sites로 기획부터 공개까지 실습하는 4시간 강의용 홈페이지입니다.

## 구성

- `index.html`: 강의 홈페이지와 70장 인터랙티브 슬라이드
- `slides.html`: 가로 6 : 세로 4 전체 슬라이드 보기·인쇄 화면
- `styles.css`: 노트북 우선 반응형 UI 및 인쇄 스타일
- `app.js`: 70장 탐색·진도 저장·발표 화면·Project·Work·Sites 안내
- `assets/slides/`: 첨부 강의안 기준 웹용 슬라이드 이미지 70장
- `assets/AI_홈페이지_웹서비스_강의안_최종70장.pdf`: 수강생 다운로드용 원본 PDF
- `prompt-lab/`: 멘토K 프롬프트랩(실전 프롬프트 검색·복사 사이트)

## PDF 저장

자료실 또는 첫 화면의 `전체 슬라이드 PDF 다운로드` 버튼을 누르면 원본 70장 PDF가 바로 저장됩니다. `전체 보기`에서는 모든 슬라이드를 검토하고 인쇄할 수 있습니다.

강사 표기: 엠아이넥스트 김용한

## GitHub Pages 배포

이 저장소는 정적 홈페이지이므로 별도 빌드 없이 GitHub Pages에서 실행할 수 있습니다.

1. 저장소 루트에 모든 파일을 업로드합니다.
2. 기본 브랜치를 `main`으로 설정합니다.
3. 저장소의 `Settings → Pages → Build and deployment`에서 `Deploy from a branch`를 선택합니다.
4. Branch를 `main`, 폴더를 `/(root)`로 저장합니다.
5. Custom domain에 `aiwith.kr`을 입력하고 인증서 발급 후 `Enforce HTTPS`를 켭니다.

현재 루트 `CNAME`에 `aiwith.kr`이 등록되어 있습니다.

- 공개 루트: [https://aiwith.kr/](https://aiwith.kr/)
- 프롬프트랩: [https://aiwith.kr/prompt-lab/](https://aiwith.kr/prompt-lab/)
- GitHub Pages 기본 주소: [https://mentor-k.github.io/chatgpt-sites-projectbook/](https://mentor-k.github.io/chatgpt-sites-projectbook/)

DNS가 전파된 뒤에도 HTTPS 인증서 발급에는 수 분에서 최대 24시간이 걸릴 수 있습니다. `prompt-lab/DOMAIN_SETUP.md`에 hosting.kr 레코드와 검증 절차를 정리했습니다.
