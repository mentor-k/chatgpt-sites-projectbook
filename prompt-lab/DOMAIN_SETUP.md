# aiwith.kr 연결 체크리스트

## hosting.kr DNS

호스팅.kr DNS 관리에서 다음 레코드를 등록합니다.

- `@` A `185.199.108.153`
- `@` A `185.199.109.153`
- `@` A `185.199.110.153`
- `@` A `185.199.111.153`
- `www` CNAME `mentor-k.github.io`

기존에 같은 이름의 A·CNAME·리다이렉트 레코드가 있으면 충돌 여부를 먼저 확인합니다. DNS 전파는 환경에 따라 최대 24~48시간이 걸릴 수 있습니다.

## GitHub Pages

저장소 Settings → Pages → Custom domain에 `aiwith.kr`을 입력하고 저장한 뒤 `Enforce HTTPS`를 켭니다. 현재 저장소의 Prompt Lab은 `/prompt-lab/` 경로에 있으므로, 도메인 루트에서 바로 서비스하려면 Pages publishing source를 Prompt Lab 산출물로 배포하거나 루트 진입 페이지에서 `/prompt-lab/`으로 연결하는 배포 방식을 선택해야 합니다. 이 저장소의 기존 루트 강의 사이트를 덮어쓰지 않도록 자동으로 변경하지 않았습니다.

## 검증

1. `dig aiwith.kr A`와 `dig www.aiwith.kr CNAME`으로 DNS를 확인합니다.
2. `https://aiwith.kr/`와 `https://aiwith.kr/prompt-lab/`에서 HTTPS·canonical·sitemap 응답을 확인합니다.
3. Google Search Console에서 도메인 속성을 등록하고 `https://aiwith.kr/sitemap.xml`을 제출합니다.

AdSense 승인 후 발급받은 실제 publisher ID를 사용해 `ads.txt`와 광고 코드를 연결합니다. ID를 알 수 없는 상태에서 임의의 값을 넣지 마세요.
