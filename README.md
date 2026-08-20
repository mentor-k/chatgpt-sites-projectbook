# 실전 홈페이지 프로젝트북

ChatGPT Sites로 누구나 쉽게 홈페이지 만들기 강의용 홈페이지 프로토타입입니다.

## 구성

- `index.html`: 강의 홈페이지와 인터랙티브 장별 슬라이드
- `slides.html`: 가로 6 : 세로 4 프레젠테이션형 전체 슬라이드 인쇄/PDF 저장 화면
- `styles.css`: 노트북 우선 반응형 UI 및 인쇄 스타일
- `app.js`: 7개 부·41개 장 콘텐츠, 진도 저장, Project·Work·Sites 안내

## PDF 저장

자료실 또는 첫 화면의 `전체 슬라이드 PDF 저장` 버튼을 누르면 전체 슬라이드 인쇄 화면이 열립니다. 브라우저 인쇄 창에서 `PDF로 저장`을 선택하면 가로 6 : 세로 4 비율의 슬라이드 PDF로 저장할 수 있습니다.

강사 표기: 엠아이넥스트 김용한

## GitHub Pages 배포

이 저장소는 정적 홈페이지이므로 별도 빌드 없이 GitHub Pages에서 실행할 수 있습니다.

1. 저장소 루트에 모든 파일을 업로드합니다.
2. 기본 브랜치를 `main`으로 설정합니다.
3. 저장소의 `Settings → Pages → Source`를 `GitHub Actions`로 선택합니다.
4. `Deploy lecture MVP to GitHub Pages` 작업이 완료되면 배포 주소를 엽니다.

예상 주소: `https://mentor-k.github.io/-K-/`
