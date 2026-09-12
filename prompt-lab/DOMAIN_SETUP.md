# aiwith.kr 연결 체크리스트

## 현재 연결 구조

이 저장소는 기존 루트 강의 사이트와 `prompt-lab/` 프롬프트랩을 함께 서비스합니다.

- `https://aiwith.kr/` → 저장소 루트 강의 사이트
- `https://aiwith.kr/prompt-lab/` → 멘토K 프롬프트랩
- `https://www.aiwith.kr/` → `aiwith.kr`로 정규화(HTTPS)

GitHub Pages 사용자 지정 도메인 활성화를 위해 저장소 루트에 `CNAME` 파일(`aiwith.kr`)을 추가했습니다. `prompt-lab/CNAME`도 하위 경로 배포·분리 시 사용할 수 있도록 유지합니다.

## hosting.kr DNS

호스팅.kr DNS 관리에서 다음 레코드를 사용합니다.

- `@` A `185.199.108.153`
- `@` A `185.199.109.153`
- `@` A `185.199.110.153`
- `@` A `185.199.111.153`
- `www` CNAME `mentor-k.github.io`

공개 DNS 조회로 위 A 레코드 4개와 `www → mentor-k.github.io` CNAME이 확인되었습니다. AAAA 레코드는 없으며, 현재 네임서버는 `ns1~ns4.hosting.co.kr`입니다. 동일 호스트에 중복 A·CNAME·리다이렉트가 있으면 제거합니다.

## GitHub Pages

저장소 `Settings → Pages → Build and deployment`에서 다음을 확인합니다.

1. Source: `Deploy from a branch`
2. Branch: `main`
3. Folder: `/(root)`
4. Custom domain: `aiwith.kr`
5. `Enforce HTTPS`가 인증서 발급 후 활성화되는지 확인

루트 `CNAME` 파일을 커밋했으므로 Pages가 도메인을 감지하고 인증서를 발급합니다. 인증서 발급·전파에는 수 분에서 최대 24시간이 걸릴 수 있습니다. 발급 전에는 "Certificate verify failed: hostname mismatch" 또는 502가 보일 수 있습니다.

## 검증 명령

```bash
dig aiwith.kr A
dig www.aiwith.kr CNAME
curl -I https://aiwith.kr/
curl -I https://aiwith.kr/prompt-lab/
```

정상 상태는 `aiwith.kr` HTTPS 응답 200(또는 301 후 200), 인증서 SAN에 `aiwith.kr`이 포함된 상태입니다. Google Search Console에는 `https://aiwith.kr/sitemap.xml`을 제출합니다.

AdSense 승인 후 발급받은 실제 publisher ID를 사용해 `ads.txt`와 광고 코드를 연결합니다. ID를 알 수 없는 상태에서 임의의 값을 넣지 않습니다.
