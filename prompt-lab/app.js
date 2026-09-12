const commandText=`📐 앵글·시점|/droneview|드론 항공샷
📐 앵글·시점|/aerialview|높은 고도에서 내려다본 뷰
📐 앵글·시점|/topdown|수직 부감 구도
📐 앵글·시점|/lowangle|아래에서 올려 찍은 극적 앵글
📐 앵글·시점|/highangle|위에서 내려 찍은 앵글
📐 앵글·시점|/sideview|측면 프로필
📐 앵글·시점|/closeup|클로즈업
📐 앵글·시점|/extremecloseup|초근접 클로즈업
📐 앵글·시점|/wideangle|넓은 화각
📐 앵글·시점|/fisheye|어안 렌즈 왜곡
📐 앵글·시점|/overtheshoulder|어깨 너머 시점
📐 앵글·시점|/birdseyeview|머리 바로 위에서 내려다본 장면
📐 앵글·시점|/wormseyeview|바닥에서 올려다본 극단 시점
🌧 날씨·계절|/fog|안개 낀 분위기
🌧 날씨·계절|/mist|옅은 물안개
🌧 날씨·계절|/rainynight|비 오는 밤
🌧 날씨·계절|/rain|빗줄기와 젖은 거리
🌧 날씨·계절|/storm|폭풍우·번개
🌧 날씨·계절|/snow|눈 내리는 겨울
💡 시간대·조명|/sunset|노을
💡 시간대·조명|/sunrise|새벽 일출빛
💡 시간대·조명|/goldenhour|해 질 녘 황금빛
💡 시간대·조명|/bluehour|푸른 새벽·황혼
💡 시간대·조명|/moonlight|달빛
💡 시간대·조명|/neonlights|네온 조명
💡 시간대·조명|/cyberpunk|네온 가득한 미래도시
💡 시간대·조명|/darkmoody|어둡고 무거운 무드
💡 시간대·조명|/softlighting|부드럽게 퍼지는 조명
💡 시간대·조명|/dramaticlighting|강한 명암 대비
💡 시간대·조명|/rimlight|피사체 테두리에 빛
💡 시간대·조명|/backlight|역광
💡 시간대·조명|/volumetriclight|공기 중 빛줄기
💡 시간대·조명|/godrays|쏟아지는 햇살 줄기
📸 카메라·렌즈·필터|/cinematic|영화 같은 조명·구도·무드
📸 카메라·렌즈·필터|/filmgrain|필름 그레인 질감
📸 카메라·렌즈·필터|/anamorphic|와이드 시네마 렌즈룩
📸 카메라·렌즈·필터|/bokeh|배경 빛망울
📸 카메라·렌즈·필터|/shallowdepth|얕은 심도(배경 흐림)
📸 카메라·렌즈·필터|/motionblur|움직임 잔상
📸 카메라·렌즈·필터|/longexposure|장노출 빛 궤적
📸 카메라·렌즈·필터|/sepia|세피아 빛바랜 톤
📸 카메라·렌즈·필터|/blackandwhite|흑백 사진
📸 카메라·렌즈·필터|/pastel|파스텔 톤
👗 스타일·감성|/vintage|클래식 빈티지(50년대 감성)
👗 스타일·감성|/retro|레트로 감성(70~80년대)
👗 스타일·감성|/oldmoney|클래식 상류층 무드
👗 스타일·감성|/luxury|프리미엄 럭셔리
👗 스타일·감성|/minimalist|미니멀 구성
👗 스타일·감성|/editorial|매거진 화보 사진
👗 스타일·감성|/fashion|하이패션 화보
👗 스타일·감성|/streetstyle|스트리트 패션 감성
👗 스타일·감성|/magazinecover|잡지 표지 레이아웃
👗 스타일·감성|/polaroid|폴라로이드 즉석사진(흰 테두리)
👗 스타일·감성|/disposablecamera|일회용 카메라 감성
👗 스타일·감성|/35mmfilm|35mm 필름 사진
👗 스타일·감성|/instantphoto|즉석 카메라 느낌
🏞 배경·장소|/underwater|수중 장면
🏞 배경·장소|/desert|사막
🏞 배경·장소|/mountains|산맥
🏞 배경·장소|/beach|해변
🏞 배경·장소|/cityscape|도시 풍경
🏞 배경·장소|/nightcity|밤 도시
🏞 배경·장소|/graffiti|그래피티 가득한 거리
🎬 테마·장르|/futuristic|미래적 디자인
🎬 테마·장르|/postapocalyptic|폐허가 된 세계
🎬 테마·장르|/fantasy|판타지 세계
🎬 테마·장르|/scifi|SF 세계관
🎬 테마·장르|/medieval|중세 시대
🎬 테마·장르|/samurai|사무라이 시대극
🎬 테마·장르|/detective|추리·형사물 무드
🎬 테마·장르|/steampunk|스팀펑크 세계관
🎬 테마·장르|/vaporwave|베이퍼웨이브(80s 네온 보라) 감성
🎨 아트 스타일|/anime|일본 애니 스타일
🎨 아트 스타일|/comicbook|만화책 일러스트
🎨 아트 스타일|/cartoon|카툰 일러스트
🎨 아트 스타일|/caricature|캐리커처(과장 만화)
🎨 아트 스타일|/oilpainting|유화
🎨 아트 스타일|/watercolor|수채화
🎨 아트 스타일|/sketch|손그림 스케치
🎨 아트 스타일|/lineart|선화 일러스트
🎨 아트 스타일|/popart|팝아트(만화 광고풍)
🎨 아트 스타일|/pixelart|도트 픽셀 아트
🎨 아트 스타일|/lowpoly|로우폴리 3D
🎨 아트 스타일|/voxel|복셀(블록) 3D
🎨 아트 스타일|/claystyle|클레이(점토) 스타일
🎨 아트 스타일|/isometric|아이소메트릭(쿼터뷰)
🎨 아트 스타일|/miniature|미니어처 디오라마
🎨 아트 스타일|/papercraft|종이공예 스타일
🎨 아트 스타일|/embroidery|자수 질감
🎨 아트 스타일|/mosaic|모자이크 타일화
🎨 아트 스타일|/glassart|유리 공예 질감
🎨 아트 스타일|/blueprint|설계도(청사진) 스타일
✨ 특수효과|/holographic|홀로그램 효과
✨ 특수효과|/doubleexposure|이중노출 합성
✨ 특수효과|/silhouette|역광 실루엣
✨ 특수효과|/reflection|반사 구성
✨ 특수효과|/mirror|거울 구도
✨ 특수효과|/smoke|연기 효과 (담배 연기로 그려질 수 있음)
✨ 특수효과|/glitch|디지털 글리치
✨ 특수효과|/dreamcore|몽환적 초현실
📐 앵글·시점|/dutchangle|기울어진 역동적 구도
📐 앵글·시점|/pointofview|1인칭 시점
📐 앵글·시점|/symmetrical|좌우 대칭 중심 구도
📐 앵글·시점|/ruleofthirds|삼분할 법칙 구도
📐 앵글·시점|/leadinglines|시선을 이끄는 선형 구도
📐 앵글·시점|/negative-space|문구를 넣기 좋은 넓은 여백
📐 앵글·시점|/macro|미세 질감이 보이는 접사
📸 카메라·렌즈·필터|/telephoto|망원 렌즈의 압축감
📸 카메라·렌즈·필터|/tiltshift|미니어처 같은 틸트시프트
📸 카메라·렌즈·필터|/hdr|명암 영역의 세부 묘사 강화
📸 카메라·렌즈·필터|/kodakportra|따뜻하고 자연스러운 필름 색감
📸 카메라·렌즈·필터|/cinestill800t|네온이 강조된 야간 필름룩
💡 시간대·조명|/studio-lighting|정교한 스튜디오 조명
💡 시간대·조명|/rembrandt-lighting|얼굴 입체감을 살리는 조명
💡 시간대·조명|/chiaroscuro|회화적인 강한 명암
💡 시간대·조명|/natural-light|부드러운 자연광
💡 시간대·조명|/highkey|밝고 깨끗한 저대비 조명
💡 시간대·조명|/lowkey|어둡고 극적인 고대비 조명
🎨 아트 스타일|/gouache|선명한 과슈화
🎨 아트 스타일|/charcoal|거친 목탄 드로잉
🎨 아트 스타일|/inkwash|먹의 농담을 살린 수묵화
🎨 아트 스타일|/risograph|제한색 리소그래프
🎨 아트 스타일|/woodcut|강한 선의 목판화
🎨 아트 스타일|/3drender|정교한 3D 렌더링
🎨 아트 스타일|/productrender|재질이 정확한 상업 제품 렌더
🧱 재질·질감|/matte|차분한 무광 재질
🧱 재질·질감|/glossy|선명한 유광 재질
🧱 재질·질감|/metallic|금속 반사와 표면 질감
🧱 재질·질감|/translucent|빛이 통과하는 반투명 재질
🧱 재질·질감|/iridescent|각도에 따라 변하는 오팔광
🧱 재질·질감|/papertexture|종이결이 살아 있는 표면
👤 인물·표현|/candid|연출하지 않은 자연스러운 순간
👤 인물·표현|/portrait|얼굴과 표정 중심 인물사진
👤 인물·표현|/fullbody|머리부터 발끝까지 전신 구도
👤 인물·표현|/dynamicpose|움직임이 느껴지는 자세
👤 인물·표현|/subtleexpression|과장되지 않은 섬세한 표정
👤 인물·표현|/diversegroup|연령과 배경이 다양한 사람들
🧩 구성·출력|/triptych|세 장으로 이어지는 3분할
🧩 구성·출력|/flatlay|오브젝트를 정돈한 탑뷰
🧩 구성·출력|/seamlesspattern|경계 없이 반복되는 패턴
🧩 구성·출력|/transparentbackground|투명 배경의 독립 오브젝트
🧩 구성·출력|/text-safe-area|제목을 넣을 빈 공간
🧩 구성·출력|/ultradetailed|작은 요소까지 선명한 묘사
🧩 구성·출력|/photorealistic|사진 같은 빛·재질·비례
🧩 구성·출력|/consistent-character|장면마다 동일 인물 유지
🧩 구성·출력|/brand-consistent|브랜드 색과 분위기 유지
✨ 특수효과|/particles|공기 중 미세 입자
✨ 특수효과|/lensflare|자연스러운 렌즈 광선
✨ 특수효과|/lightleak|필름 빛샘 효과`;
const commands=commandText.split('\n').map((x,i)=>{const [category,command,ko]=x.split('|');return{id:i+1,category,command,ko}});

const works=[
['검색·조사','최신 동향 조사','[주제]의 최근 1년 핵심 동향을 조사해줘. 공식기관·원문·통계·학술자료를 우선하고, 발표일과 실제 사건일을 구분해 핵심 변화 5개, 시사점 3개, 출처 링크로 정리해줘.','주제·기간·지역·출처 우선순위를 지정'],
['검색·조사','비교 조사','[대안 A]와 [대안 B]를 [평가기준 5개]로 비교해줘. 최신 공식자료를 확인하고 표, 장단점, 추천 조건, 의사결정 체크리스트로 정리해줘.','비교 기준과 사용 상황을 먼저 제시'],
['검색·조사','팩트 검증','다음 주장 각각을 사실·부분 사실·근거 부족·오류로 판정해줘: [주장]. 1차 출처를 우선하여 근거, 불확실성, 바로잡은 문장을 제시해줘.','검증할 문장을 번호로 구분'],
['검색·조사','시장 조사','[시장/산업]의 규모, 성장률, 고객 변화, 주요 기업, 규제, 기회를 조사해줘. 데이터 기준연도와 단위를 통일하고 국내·글로벌을 구분해줘.','대상 시장의 범위를 좁게 정의'],
['글쓰기','블로그 글','[주제]로 [타깃 독자] 대상 1,800자 블로그 글을 써줘. 검색 의도를 반영한 제목, 도입 화두, 소제목 3개, 사례, 실행 팁, 결론, FAQ 3개를 포함해줘.','독자와 원하는 행동을 명시'],
['글쓰기','뉴스 기사','[자료]를 바탕으로 과장 없이 1,800자 기사로 작성해줘. 제목·부제·리드문·소제목 3개·핵심 수치·현장 시사점을 포함하고 사실과 해석을 구분해줘.','원자료와 기사 톤을 제공'],
['글쓰기','SNS 게시글','[주제]를 [플랫폼]용 300자로 작성해줘. 첫 문장은 시선을 끌되 낚시성 표현은 피하고, 핵심 메시지·개인 인사이트·CTA·해시태그 5개를 포함해줘.','플랫폼별 글자 수와 말투 지정'],
['글쓰기','문장 다듬기','다음 글의 의미와 필자의 개성을 유지하면서 중복·군더더기·어색한 번역투를 줄여줘. 수정본과 주요 수정 이유 5개를 제시해줘: [원문]','보존할 표현과 피할 말투를 명시'],
['책쓰기','도서 기획','[주제] 실용서의 기획안을 만들어줘. 핵심 독자, 독자의 문제, 차별적 약속, 경쟁도서 대비, 제목·부제 5안, 3부 12장 목차, 장별 효익을 제시해줘.','독자의 변화와 저자 강점을 제공'],
['책쓰기','장 초안','[책 전체 맥락]에서 [장 제목] 초안을 [분량]으로 써줘. 문제 제기→핵심 개념→사례→실행 도구→장 요약 순서로 구성하고 저자의 경험이 들어갈 자리는 표시해줘.','앞뒤 장과 중복되지 않게 맥락 제공'],
['책쓰기','목차 검토','다음 목차를 독자 여정·논리 흐름·중복·실행성·시장성 기준으로 10점 만점 평가하고, 삭제·통합·이동·추가 제안과 개선 목차를 제시해줘: [목차]','타깃 독자와 도서 포지션 포함'],
['책쓰기','원고 QA','다음 원고를 논리, 반복, 문체 일관성, 근거, 사례, AI식 상투어 관점에서 냉정하게 검토해줘. 문제 문장, 이유, 수정안을 표로 제시해줘: [원고]','표절·인용·출처도 별도 점검'],
['보고서','컨설팅 보고서','[기업/기관]의 [과제] 보고서를 작성해줘. 현황, 핵심문제, 원인, 분석근거, 대안, 우선순위, 90일 실행계획, KPI, 리스크 순으로 구성해줘.','수치·인터뷰·현장자료를 입력'],
['보고서','분석 보고서','[데이터/자료]를 분석해 핵심 발견 5개, 원인 가설, 반대 근거, 시사점, 권고안을 작성해줘. 사실·추정·제안을 명확히 구분해줘.','분석 기준과 의사결정 목적 제시'],
['보고서','1페이지 요약','[긴 문서]를 의사결정자용 1페이지로 요약해줘. 결론 먼저, 핵심 수치, 쟁점, 선택지, 권고안, 즉시 결정할 사항을 포함해줘.','보고받는 사람과 결정사항 명시'],
['보고서','성과 보고','[사업명]의 목표 대비 성과를 정리해줘. 정량·정성 성과, 미달 원인, 사례, 예산 대비 효과, 개선과제, 다음 단계로 구성해줘.','목표값과 실적값을 함께 제공'],
['강의자료','강의 구성','[대상]을 위한 [주제] [시간] 강의안을 설계해줘. 학습목표 3개, 전체 흐름, 시간 배분, 핵심 개념, 사례, 질문, 실습, 마무리를 포함해줘.','대상 수준과 수업 방식을 명시'],
['강의자료','슬라이드 기획','[강의 주제]를 16:9 슬라이드 [장수]장으로 기획해줘. 장별 제목, 한 문장 핵심 메시지, 근거, 시각화 방식, 강사 설명 포인트를 표로 작성해줘.','한 장에 메시지 하나 원칙'],
['강의자료','실습 설계','[학습목표]를 달성할 30분 실습을 설계해줘. 준비물, 단계, 참가자 산출물, 진행 멘트, 예상 질문, 평가 기준, 대안 활동을 포함해줘.','개인/팀 실습 여부와 도구 명시'],
['강의자료','퀴즈 제작','[교육 내용]에서 이해도 확인 객관식 10문항을 만들어줘. 정답과 해설, 오답이 틀린 이유, 난이도를 포함하고 암기보다 적용을 평가해줘.','학습목표별 문항 수를 지정'],
['기획서','사업기획서','[사업 아이디어]를 문제·고객·해결책·차별성·시장·수익모델·실행계획·예산·KPI·리스크 구조로 기획해줘. 확인이 필요한 가정은 별도 표시해줘.','심사기준과 분량을 제공'],
['기획서','국비공모 기획','[공모사업]에 맞춰 지역문제, 정책 적합성, 대상, 세부사업, 추진체계, 예산, 성과지표, 지속가능성, 위험관리 구조를 설계해줘.','공고문 원문과 지역자료 필수'],
['기획서','마케팅 기획','[제품/서비스]의 [목표] 달성을 위한 마케팅 기획안을 작성해줘. 시장·고객·경쟁, 포지셔닝, 퍼널, 채널, 콘텐츠, 일정, 예산, KPI를 연결해줘.','기간·예산·현재 채널 입력'],
['기획서','행사 기획','[행사명]을 [대상] [인원] 규모로 기획해줘. 목적, 콘셉트, 프로그램, 동선, 인력, 홍보, 예산, 안전, 만족도 조사, 일정표를 포함해줘.','장소·시간·필수 프로그램 명시'],
['이미지','이미지 생성','[주제]를 [용도]에 맞는 이미지로 만들어줘. 피사체, 배경, 구도, 조명, 색감, 스타일, 화면비, 텍스트 안전영역, 제외 요소를 반영해줘.','치트키 2~4개를 조합'],
['이미지','이미지 수정','첨부 이미지에서 [바꿀 요소]만 [수정 내용]으로 변경하고, 인물·구도·색감·배경 등 [유지 요소]는 그대로 유지해줘.','변경과 유지 항목을 분리'],
['이미지','썸네일','[콘텐츠 제목]의 핵심 갈등과 결과가 한눈에 보이는 [비율] 썸네일을 만들어줘. 큰 제목 안전영역과 선명한 주 피사체를 확보해줘.','텍스트는 후편집 권장'],
['이미지','제품 이미지','[제품]의 실제 형태와 재질을 정확히 유지한 [용도] 제품 사진을 만들어줘. 배경, 조명, 촬영각도, 사용 상황을 구체적으로 반영해줘.','참조 사진과 금지 변형을 제공'],
['영상','숏폼 영상 기획','[주제] 30초 세로형 숏폼을 기획해줘. 0~3초 훅, 장면별 시간·화면·자막·내레이션·전환·효과음, CTA, 이미지/영상 생성 프롬프트를 포함해줘.','플랫폼과 타깃을 지정'],
['영상','모션그래픽','[메시지]를 전달하는 [길이] 모션그래픽 콘티를 만들어줘. 타임코드별 타이포, 도형, 이미지, 카메라 움직임, 전환, BGM 분위기를 표로 정리해줘.','텍스트 분량을 화면당 1문장 이하로'],
['영상','인터뷰 영상','[인터뷰 주제] 영상의 질문 10개, 예상 답변 흐름, B-roll 목록, 오프닝·클로징 멘트, 3분 편집 구성을 만들어줘.','인터뷰이 역할과 시청자 입력'],
['영상','영상 생성 프롬프트','[장면]이 [시작 상태]에서 [종료 상태]로 변화하는 [길이] 영상. 카메라 움직임, 피사체 행동, 환경 변화, 조명, 속도, 화면비, 금지 왜곡을 명시해줘.','한 클립에 핵심 동작 하나'],
['인포그래픽','에디토리얼','[복잡한 주제]를 초보자가 이해할 수 있는 세로형 인포그래픽으로 기획해줘. 핵심 질문, 데이터 3개, 흐름도, 비교, 결론, 출처 영역을 구성해줘.','정확한 문구와 수치는 후편집'],
['인포그래픽','프로세스','[업무/서비스]의 [시작]부터 [결과]까지 5단계 프로세스를 아이콘·화살표·짧은 설명으로 보여주는 인포그래픽을 설계해줘.','단계별 동사와 산출물 명시'],
['인포그래픽','비교표','[대안 A/B/C]를 [기준 5개]로 비교하는 인포그래픽을 설계해줘. 차이와 추천 대상을 색상으로 구분하되 과장하지 말아줘.','동일 기준과 단위를 사용'],
['인포그래픽','데이터 시각화','[데이터]에서 핵심 메시지 1개를 정하고 적절한 차트 유형, 강조 수치, 주석, 출처, 오해 방지 문구를 포함한 시각화안을 제시해줘.','원자료·단위·기간을 제공']
].map((x,i)=>({id:i+1,category:x[0],title:x[1],prompt:x[2],tip:x[3]}));

const extraGroups={
'전략기획':['중장기 전략','신사업 발굴','의사결정 안건','실행 로드맵'],'마케팅':['STP 전략','고객여정','퍼널 설계','콘텐츠 캘린더'],'브랜딩':['브랜드 전략','네이밍','슬로건','메시지 체계'],'컨설팅':['기업진단','인터뷰 분석','문제구조화','최종 제언'],'창업·BM':['사업모델','MVP 설계','수익모델','투자 피치'],'영업':['제안 영업','상담 스크립트','제안서 구조','실적 분석'],'정책·행정':['정책개발','국비공모','보도자료','민원 분석'],'교육·워크숍':['교육과정','워크숍','강사 스크립트','평가도구'],'연구·R&D':['연구기획','기술동향','사업계획서','성과활용'],'데이터·분석':['데이터 탐색','설문 분석','KPI 대시보드','예측 시나리오'],'조직·HR':['직무설계','채용공고','면접질문','성과면담'],'재무·사업성':['손익구조','예산편성','투자타당성','가격전략'],'운영·PM':['프로젝트 계획','회의 운영','업무 프로세스','리스크 관리'],'AI·AX':['업무 자동화','AI 활용 진단','에이전트 설계','AI 거버넌스'],'로컬·관광':['상권진단','관광상품','생활인구','전통시장 콘텐츠']};
Object.entries(extraGroups).forEach(([category,titles])=>titles.forEach(title=>works.push({id:works.length+1,category,title,prompt:`당신은 ${category} 분야의 실전 전문가이자 컨설턴트입니다.\n\n[목표]\n${title} 과제를 대상 조직의 상황에 맞게 완성해 주세요.\n\n[입력자료]\n- 대상/조직: [입력]\n- 현재 상황과 문제: [입력]\n- 목표와 기간: [입력]\n- 예산·인력·보유자료: [입력]\n- 반드시 반영할 조건: [입력]\n\n[수행 원칙]\n1. 확인된 사실과 추가 확인이 필요한 가정을 구분합니다.\n2. 현상→원인→대안→우선순위→실행을 연결합니다.\n3. 효과·실행가능성·긴급성으로 대안을 평가합니다.\n4. 일반론보다 이 대상에 맞는 구체적인 사례와 행동을 제시합니다.\n\n[산출물]\n핵심 진단, 세부 분석, 대안 비교, 권고안, 단계별 실행계획, KPI, 리스크를 표와 함께 작성하세요. 마지막에 즉시 실행할 3가지와 추가 확인 질문 5개를 제시하세요.`,tip:'[입력]을 채우고 관련 파일·데이터를 첨부하면 정확도가 높아짐'})));

const practicalPrompts=[["검색·조사","경쟁사 디지털 채널 감사","[우리 회사/제품]과 경쟁사 [3곳]의 홈페이지·블로그·SNS·쇼핑몰을 최근 [기간] 기준으로 조사하세요. 채널별 타깃, 핵심 메시지, 콘텐츠 유형, 게시 빈도, 전환 장치, 고객 반응, 검색 노출을 동일 기준으로 비교하고 강점·빈틈·모방 금지 요소를 구분하세요. 마지막에 30일 실행 콘텐츠 10개와 KPI를 제시하고 사실에는 출처와 확인일을 표시하세요.","경쟁사 URL과 우리 고객·제품 정보를 함께 입력"],["검색·조사","정책·지원사업 탐색","[기업/기관/지역]이 신청할 수 있는 [분야] 지원사업을 [기간·지역] 조건으로 찾아주세요. 신청자격, 지원규모, 자부담, 마감일, 필수서류, 평가기준, 중복수혜 제한을 공식 공고문 기준으로 비교하고 적합도 근거, 준비 일정, 탈락 위험을 정리하세요. 종료된 사업은 별도 표시하세요.","사업자 유형·업력·지역·매출을 기재"],["글쓰기","AEO·GEO 검색형 포스팅","[주제]를 검색하는 [독자]가 실제로 묻는 질문을 중심으로 1,800~2,200자 글을 작성하세요. 첫 문단에서 답을 요약하고 질문형 소제목 4개, 경험·사례, 단계별 방법, 비교표, 주의점, FAQ 5개를 포함하세요. 정의·수치·최신 사실에는 출처를 연결하고 제목 5개와 메타 설명도 제시하세요.","검색 의도와 게시 채널을 명시"],["글쓰기","대표자 기고문","[주제]에 대한 [대표자/전문가]의 기고문을 [분량]으로 작성하세요. 현장의 문제를 여는 화두, 필자의 실제 경험, 통념에 대한 반론, 근거, 실행 제안 순으로 구성하세요. 말투 샘플을 참고하되 복제하지 말고 AI식 상투어와 과도한 나열을 제거하세요.","경력·사례·기존 글 샘플을 제공"],["책쓰기","장별 원고 심층 집필","도서 [제목]의 [장 제목]을 [핵심 독자]용 실용서 원고로 집필하세요. 독자 장면, 핵심 개념, 실제 사례, 실행 프레임, 체크리스트, 다음 장 연결 순으로 구성하고 전체 목차와 중복을 피하세요. 인용과 통계는 확인 가능한 것만 쓰고 사실확인 목록을 작성하세요.","전체 목차와 저자 경험을 제공"],["책쓰기","원고 냉정한 편집 리뷰","첨부 원고를 출판기획자·분야 전문가·핵심 독자 관점에서 평가하세요. 콘셉트, 문제 해결력, 차별성, 사례, 논리, 반복, 문체, 사실성, AI 개입 인상을 10점 척도로 평가하고 삭제·통합·확장할 부분과 우선 수정 10개를 제시하세요.","평가 페이지와 예상 독자를 명시"],["보고서","경영진 의사결정 보고서","[안건]에 대해 결론과 요청 결정사항을 먼저 제시하고 현황 수치, 원인, 대안 3개, 비용·효과·기간·위험 비교, 권고안, 책임자와 마일스톤을 구성하세요. 데이터가 없는 부분은 가정으로 표시하고 결론이 달라지는 임계조건을 제시하세요.","의사결정자·대안·예산 한도를 입력"],["보고서","현장 컨설팅 결과보고서","[수진기업]의 [과제] 결과보고서를 신청 배경, 현황, 당면문제, 진단방법, 회차별 실행, 변화 전후, KPI, 미해결 과제, 향후 90일 과제로 작성하세요. 제공 기록만 사용하고 수행하지 않은 내용을 성과처럼 쓰지 마세요.","상담일지·KPI·증빙을 첨부"],["강의자료","완성형 강의 슬라이드 설계","[대상] 대상 [주제] [시간] 강의를 [장수]장으로 설계하세요. 학습목표에서 역산해 도입-개념-사례-실습-정리 흐름을 만들고 장별 제목, 핵심 메시지, 근거, 시각화, 강사 설명, 전환 질문을 표로 작성하세요. 한 장 한 메시지 원칙과 총 시간을 검증하세요.","대상 수준·시간·템플릿을 제공"],["강의자료","강사용 진행 대본","첨부 슬라이드 [범위]의 장별 예상 시간, 오프닝 멘트, 핵심 설명, 쉬운 비유, 현장 사례, 청중 질문, 다음 장 연결 멘트를 작성하세요. 화면 문구를 그대로 읽지 말고 총 시간이 [시간]을 넘지 않게 계산하세요.","실제 슬라이드와 청중 정보를 첨부"],["기획서","평가표 역산 사업계획서","첨부 [공고문·평가표]에서 평가항목, 배점, 필수요건, 실격조건, 증빙을 체크리스트로 만든 뒤 [사업 아이템]을 항목별로 대응시켜 문제, 고객검증, 해결책, 차별성, 시장성, 실행역량, 예산, KPI, 리스크를 작성하세요. 근거가 없으면 추가 자료 요청으로 남기세요.","공고문·평가표·보유 증빙을 첨부"],["기획서","국비공모 실행형 기획","[공모명]에 제출할 [지역/기관] 사업을 기획하세요. 정책목표와 지역문제를 연결하고 수혜대상, 세부사업별 투입-활동-산출-성과, 추진체계, 예산, KPI 산식, 운영비·자부담, 종료 후 지속운영 방안을 작성하세요. 심사위원 반론 7개와 보완 논리도 제시하세요.","공고문·지역통계·운영주체 자료 필수"],["마케팅","90일 고객획득 실행계획","[제품/서비스]의 [목표고객] 신규고객 [목표수] 확보를 위한 90일 계획을 작성하세요. 현재 채널·예산·전환율을 진단하고 퍼널별 메시지, 콘텐츠, 채널, 담당자, 주간 일정, 예산, KPI와 중단 기준을 표로 만드세요.","현재 수치와 월 예산을 입력"],["마케팅","SNS 월간 콘텐츠 캘린더","[브랜드]가 [플랫폼]에서 [목표]를 달성할 4주 캘린더를 만드세요. 고객 질문·실패·비교·사례·비하인드·CTA를 배치하고 게시물별 훅, 내용, 형식, 이미지/영상 프롬프트, 캡션, CTA, 측정지표를 작성하세요.","브랜드 톤·소재·게시 횟수를 입력"],["영업","B2B 맞춤 제안서","[제안 대상 기업]의 현안과 구매 기준을 분석한 뒤 [우리 솔루션] 제안서를 작성하세요. 고객 문제, 현행 비용, 제안 가치, 적용 범위, 차별성, 도입 절차, 예상효과 산식, 가격 옵션, 리스크 대응, 다음 행동 순으로 구성하세요. 미확인 정보는 가정으로 표시하세요.","고객사 정보·실적·가격을 제공"],["데이터·분석","설문 의사결정 분석","첨부 설문데이터의 표본, 결측, 이상치, 주요 분포, 집단 차이, 상관과 인과의 구분, 자유응답 주제를 분석하세요. 발견마다 표본수와 수치를 표시하고 적합한 차트, 분석 한계, 후속 행동을 제시하세요.","데이터·문항지·결정 목적을 첨부"],["재무·사업성","손익분기·민감도 분석","[사업]의 초기투자, 고정비, 변동비, 가격, 판매량 가정을 표로 정리하고 월별 손익·현금흐름·손익분기점을 계산하세요. 낙관·기준·비관 시나리오와 가격·판매량·원가 민감도, 자금 부족 시점을 제시하세요.","비용·판매가·회수 조건을 제공"],["AI·AX","업무 자동화 후보 발굴","[부서] 업무를 빈도·시간·반복성·오류위험·민감도·판단 난이도로 평가해 자동화, AI 보조, 사람 유지로 분류하세요. 우선 후보 5개의 현재/개선 프로세스, 필요 도구·데이터, 절감시간, 위험통제, 4주 실증계획을 작성하세요.","업무목록·시간·사용 시스템을 입력"],["로컬·관광","전통시장 90일 활성화","[시장명]의 고객·상인·공간·상품·채널 자료로 문제를 구조화하세요. 재방문과 매출을 만드는 핵점포, 동선, 공동상품, 콘텐츠, 조직, 관광 연계 과제를 효과·난이도·주체로 우선순위화하고 30·60·90일 실행표와 측정법을 작성하세요.","상권데이터·현장관찰·인터뷰 제공"],["영상","30초 숏폼 완성 패키지","[주제] 30초 세로형 영상을 0~2초 훅, 3~20초 장면 4개, 21~27초 인사이트, 28~30초 CTA로 설계하세요. 타임코드별 화면·행동·자막·내레이션·전환·효과음·BGM과 장면별 생성 프롬프트, 썸네일 문구를 포함하세요.","한 영상에 메시지와 행동 하나"],["인포그래픽","컨설팅 분석 슬라이드","[분석 주제]를 16:9 한 장으로 설계하세요. 상단 결론형 메시지 1~2줄, 본문에 이를 입증하는 차트·비교·프로세스, 하단에 실행 시사점 3개를 배치하세요. 수치·단위·출처·기준일을 표시하고 장식보다 논리 위계를 우선하세요.","한 장에 하나의 주장만 배치"]].map((x,i)=>({id:works.length+i+1,category:x[0],title:x[1],prompt:x[2],tip:x[3]}));
works.push(...practicalPrompts);
const recipes=[
['SNS','인스타그램 피드','신제품 [제품명]을 중앙에 배치한 프리미엄 제품 사진. 깨끗한 배경, 브랜드 컬러 포인트, 여백 있는 구성, 정사각형 1:1 /editorial /softlighting /minimalist','제품명·브랜드 컬러·핵심 효익을 구체화'],
['SNS','세로형 숏폼 썸네일','[주제]를 상징하는 강렬한 장면, 중앙 피사체, 큰 제목을 넣을 안전 여백, 높은 대비, 9:16 /cinematic /dramaticlighting','이미지 속 글자는 최소화하고 후편집 권장'],
['SNS','카드뉴스 표지','[주제]를 한눈에 이해시키는 에디토리얼 인포그래픽 표지, 단순한 아이콘과 명확한 시각 위계, 4:5 /editorial /minimalist','표지 제목 영역을 비워 달라고 명시'],
['블로그','대표 이미지','[핵심 키워드]를 시각화한 전문적인 온라인 기사 대표 이미지, 신뢰감 있는 블루 톤, 3:2 /editorial /softlighting','제목 삽입은 생성 후 디자인 도구에서 처리'],
['광고','배너 광고','[제품명]의 [핵심 편익]이 즉시 드러나는 광고 비주얼, 오른쪽에 카피 여백, 선명한 제품 초점, 16:9 /softlighting /minimalist','CTA 버튼 공간을 명시'],
['쇼핑몰','상품 상세 메인','흰 배경 위 [제품명] 정면 제품 사진, 소재와 질감이 선명한 스튜디오 조명, 그림자 최소화 /closeup /softlighting /minimalist','제품 형태·색상·구성품을 정확히 기입'],
['쇼핑몰','사용 장면','[대상 고객]이 [장소]에서 [제품명]을 자연스럽게 사용하는 현실적인 라이프스타일 사진 /editorial /goldenhour','인물 연령·상황·행동을 구체화'],
['브랜딩','브랜드 무드보드','[브랜드 가치 3개]를 표현하는 색상·재질·공간·오브젝트 무드보드, 정돈된 그리드 /editorial /minimalist','원하는 색상 코드와 금지 요소 포함'],
['브랜딩','퍼스널 브랜딩','[직업] 전문가의 신뢰감 있는 프로필 사진, 단정한 의상, 자연스러운 표정, 현대적 사무공간 /editorial /softlighting /shallowdepth','실제 인물 사용 시 참조 이미지와 수정 범위 명시'],
['지역·관광','관광지 홍보','[지역명]의 [명소]를 가장 매력적인 계절과 시간대에 담은 여행 매거진 사진 /wideangle /goldenhour /editorial','실재 장소의 특징 보존 요청'],
['지역·관광','전통시장','[시장명]에서 상인과 고객이 교류하는 따뜻하고 활기찬 순간 /35mmfilm /goldenhour /editorial','실제 상호·얼굴을 임의 생성하지 않도록 지시'],
['교육','강의 표지','[강의 주제]의 핵심 개념을 3개 시각 요소로 표현한 교육용 표지, 밝은 배경, 16:9 /editorial /minimalist','글자 없는 배경 이미지 권장'],
['교육','개념 설명','[복잡한 개념]의 흐름을 단계별로 보여주는 교육용 인포그래픽, 화살표와 구획, 색상 3개 이하 /isometric /minimalist','정확한 문구는 별도 입력'],
['보고서','컨설팅 표지','[산업·주제]를 상징하는 절제된 비즈니스 비주얼, 화이트와 딥블루, 넓은 여백, 16:9 /editorial /minimalist','회사 로고 영역 확보'],
['프레젠테이션','배경 비주얼','[핵심 메시지]를 은유하는 단순하고 고급스러운 장면, 왼쪽 텍스트 여백, 16:9 /cinematic /minimalist','본문을 방해하지 않는 낮은 복잡도'],
['출판','책 표지','[책 주제]를 하나의 강력한 상징으로 표현한 비즈니스 도서 표지용 비주얼, 세로 2:3 /editorial /dramaticlighting','제목·저자명은 후편집 권장'],
['행사','포스터 배경','[행사명]의 에너지와 대상을 표현하는 역동적 배경, 중앙 제목 공간, 세로형 /cinematic /volumetriclight','일시·장소 정보 공간 확보'],
['공공정책','정책 홍보','[정책 대상]이 [정책 혜택]을 체감하는 현실적 장면, 과장 없는 공공 캠페인 사진 /editorial /softlighting','다양성·접근성·사실성 명시'],
['R&D','기술 개념','[기술명]의 입력-처리-출력 구조를 미래적이면서 명확하게 보여주는 기술 일러스트 /blueprint /futuristic','오해 가능한 임의 숫자 제외'],
['스타트업','서비스 콘셉트','[타깃 고객]이 [문제]를 [서비스]로 해결하는 전후 장면, 간결한 2분할 /editorial /minimalist','문제와 해결 장면의 차이를 명시'],
['음식','메뉴 홍보','[메뉴명]의 신선한 재료와 질감이 돋보이는 근접 음식 사진 /closeup /softlighting /shallowdepth','과도한 보정·비현실적 재료 배제'],
['패션','룩북','[의상 콘셉트]를 입은 모델의 전신 패션 화보, [장소], 자연스러운 포즈 /fashion /editorial /35mmfilm','의상 소재·실루엣·컬러 구체화'],
['부동산','공간 홍보','[공간 유형]의 실제 크기와 동선이 잘 보이는 밝은 실내 사진 /wideangle /softlighting','과도한 광각 왜곡 배제'],
['채용','기업문화','다양한 구성원이 [업무 상황]에서 협업하는 자연스러운 오피스 장면 /editorial /softlighting','연출된 악수보다 실제 행동 묘사'],
['썸네일','유튜브','[주제]의 결과와 긴장감을 한 장면으로 보여주는 강한 표정과 대비, 16:9 /closeup /dramaticlighting','과장은 콘텐츠 수준에 맞춤'],
['스토리텔링','전후 비교','[변화 주제]의 이전과 이후를 동일한 시점의 2분할 장면으로 비교 /sideview /cinematic','좌우 조건을 정확히 고정'],
['아이디어','초현실 콘셉트','[일상 소재]와 [뜻밖의 소재]가 자연스럽게 결합된 초현실적 장면 /dreamcore /doubleexposure','브랜드 메시지와 연결'],
['아이콘','서비스 아이콘','[기능명]을 표현하는 단순한 3D 아이콘, 동일한 카메라 각도와 조명, 투명 배경 /isometric /claystyle','세트 제작 시 스타일 고정'],
['캐릭터','브랜드 마스코트','[브랜드 성격]을 표현하는 [동물·사물] 캐릭터, 단순한 실루엣, 정면 기본 포즈 /cartoon /minimalist','저작권 캐릭터와 다르게 요청'],
['배경','화상회의 배경','정돈된 [업종] 사무공간, 중앙 인물 영역은 비우고 좌우에 브랜드 요소, 16:9 /softlighting /minimalist','텍스트·로고는 후편집 권장']
].map((x,i)=>({id:i+1,category:x[0],title:x[1],prompt:x[2],tip:x[3]}));

const planningPrompts=[["아이디어기획","문제 발견형 아이디어","[관찰한 현상]에서 고객·주민·조직이 반복해서 겪는 불편을 구체적인 문제로 정의하세요. 문제의 대상, 발생 상황, 빈도, 현재 대안의 한계, 해결하지 않을 때의 손실을 구분하고 현장 확인 질문 10개를 제시하세요. 그 다음 해결 아이디어 5개를 효과·실행난이도·차별성·검증비용으로 평가해 상위 2개의 2주 실험안을 작성하세요.","현장 관찰·인터뷰·민원·검색어를 입력"],["아이디어기획","아이디어 발산·수렴","[주제]에 대해 서로 다른 고객군과 사용 상황을 조합해 아이디어 20개를 발산하세요. 유사 아이디어를 묶고 새로움·고객가치·실현가능성·수익/공익성 기준으로 점수화하되 점수 근거를 적으세요. 상위 아이디어는 고객 가설, 핵심 기능, 금지할 범위, 첫 검증 질문으로 구체화하세요.","발산 대상과 평가 기준의 우선순위를 지정"],["아이디어기획","아이디어 검증 실험","[아이디어]가 [고객]의 문제를 실제로 해결하는지 14일 안에 검증할 실험을 설계하세요. 검증 가설, 최소 제공물, 모집 방법, 질문·관찰 항목, 성공 기준, 중단 기준, 비용, 결과 해석 방법을 작성하세요. ‘좋아 보인다’와 실제 행동·지불 의향을 구분하세요.","목표 고객·가용 예산·접근 가능한 채널을 제공"],["창업기획","창업 BM 설계","[창업 아이템]의 고객 세그먼트, 문제, 가치제안, 해결책, 채널, 수익원, 비용구조, 핵심자원·활동·파트너를 설계하세요. 각 요소의 근거와 검증 전 가정을 구분하고, 첫 고객을 확보할 경로와 90일 실행계획, 손익분기 가정까지 연결하세요.","창업자 역량·자원·지역·예산·희망 고객 입력"],["창업기획","MVP·시장검증 계획","[서비스]의 핵심 가설을 가장 적은 기능으로 검증하는 MVP를 정의하세요. 반드시 필요한 기능과 나중 기능을 분리하고 고객 여정, 프로토타입, 모집·사용·측정 절차, 인터뷰 질문, 전환·재사용 KPI, 다음 의사결정 기준을 작성하세요.","개발 가능 기간과 사용 가능한 도구를 입력"],["창업기획","투자·정책자금 피치","[스타트업]의 투자자/정책자금 심사 관점 피치 구조를 작성하세요. 문제의 긴급성, 고객 증거, 솔루션, 시장 규모 산정 근거, 경쟁 대비 차별성, 수익모델, 실행팀, 성과, 자금 사용계획, 회수·지속 가능성을 10장 내외로 구성하고 예상 질문과 답변을 제시하세요.","실적·고객 증빙·필요자금·자금용도를 제공"],["창업기획","가격·수익모델 설계","[제품/서비스]의 고객이 지불하는 가치와 원가·운영비를 분석해 가격 옵션 3개를 설계하세요. 경쟁가격 단순 복사를 피하고 단위경제성, 할인·번들·구독 조건, 채널 수수료, 환불·회수 위험, 가격 테스트 방법을 계산 가능한 가정과 함께 제시하세요.","원가·판매가·고객당 이용량·채널 수수료 입력"],["정책기획","지역상권 활성화 정책","[지역/상권]의 유동인구·매출·공실·업종·방문 목적·상인조직 자료를 바탕으로 문제를 구조화하세요. 단순 행사보다 체류·재방문·매출로 이어지는 정책목표와 대상, 핵심사업, 상인·지자체·민간 역할, 예산, KPI 산식, 30·60·90일 실행계획을 설계하세요. 기존사업과 중복·사각지대도 검토하세요.","상권분석·현장 인터뷰·기존사업 자료를 첨부"],["정책기획","전통시장 경쟁력 강화","[전통시장]의 고객 유형, 핵점포, 상품구색, 가격·서비스, 동선, 주차·접근성, 온라인 노출, 상인회 운영현황을 진단하세요. 고객이 방문하고 다시 찾는 이유를 만드는 핵심 과제 5개를 선정하고 공동상품·디지털 전환·상인교육·관광연계·시설개선의 우선순위와 사업비·성과지표를 제시하세요.","시장 현황과 상인·고객 의견을 함께 입력"],["정책기획","소상공인 지원정책","[지역] 소상공인의 성장단계별 애로를 창업·생존·성장·전환/폐업으로 구분하세요. 대상별 정책수요와 기존 지원사업의 도달률·중복·누락을 분석하고 금융·교육·판로·디지털·상권·돌봄을 연결한 정책패키지와 신청·선정·성과관리 프로세스를 설계하세요.","지역 통계·지원사업 목록·예산 제약을 제공"],["정책기획","골목형상점가 지정·육성","[골목]의 지정 요건과 상인조직 역량, 점포 밀도, 공동체 활동, 고객 유입, 시설·주차 여건을 확인하는 진단표를 만드세요. 지정 이후 운영비·사업기획·상인 참여·성과관리의 위험을 분석하고 1년 육성 로드맵, 주체별 역할, KPI와 탈락/전환 기준을 제시하세요.","관련 법령·지정 현황·상인회 자료를 첨부"],["정책기획","지역관광·생활인구","[지역]의 관광자원과 생활인구 유입 목적을 연결한 정책을 설계하세요. 당일 방문을 체류·재방문·지역소비로 전환하는 여정, 주민·상인·관광사업자 역할, 계절·우천 대안, 교통·안전·접근성, 운영수익과 성과지표를 제시하고 유사사업과 차별성을 설명하세요.","실재 자원·거리·운영시간·수용인원 입력"],["정책기획","국비공모 대응 기획","첨부 [공고문·평가표]의 평가항목·배점·필수요건·실격조건을 먼저 표로 정리하세요. [지역/기관] 사업을 정책필요성, 현장문제, 대상, 세부사업, 추진체계, 예산, KPI, 지속가능성, 위험관리로 구성하고 각 문장이 어떤 평가항목과 증빙에 대응하는지 표시하세요. 확인되지 않은 수치는 가정으로 남기세요.","공고문 원문·지역통계·보유 증빙을 첨부"],["사업기획","신규 사업 타당성","[사업 아이디어]의 정책·시장·고객·기술·운영·재무 타당성을 동일 기준으로 검토하세요. 핵심 가정과 반대 근거, 대안 사업, 예상 비용·편익, 실행 역량, 법·규제 위험, 단계별 의사결정 기준을 제시하고 추진·보류·중단 결론을 근거와 함께 추천하세요.","의사결정자·기간·예산·대체안 입력"],["사업기획","실행 로드맵·KPI","[사업]을 준비-시범-확대-정착 단계로 나누고 단계별 목표, 세부 과업, 담당 주체, 선행조건, 일정, 예산, 산출물, 성과지표와 데이터 수집 방법을 작성하세요. 목표 미달 시 원인별 수정행동과 다음 단계 진입 기준을 포함하세요.","현재 단계·종료일·담당자·가용자원을 입력"],["사업기획","협업·추진체계","[사업]에 참여할 지자체·기관·기업·주민·전문가의 역할을 RACI 방식으로 정리하세요. 의사결정권, 예산·데이터 책임, 회의체, 갈등·지연 대응, 보고·승인 흐름, 개인정보·저작권 관리와 성과 공유 기준을 설계하세요.","참여기관·기존 협약·의사결정 구조를 제공"],["사업기획","예산·성과계획","[사업]의 활동별 소요비용을 인건비·제작·홍보·시설·운영·외주·예비비로 구분해 산정 논리를 제시하세요. 예산-활동-산출-성과 연결표와 정량·정성 KPI, 증빙자료, 월별 집행·점검 계획을 작성하고 과대계상·누락·중복·운영비 지속 부담을 검토하세요.","예산 상한·단가 기준·자부담·운영기간 입력"],["사업기획","리스크·시나리오","[사업]의 정책변경·예산삭감·수요부족·일정지연·인력공백·민원·안전·개인정보·저작권 위험을 식별하고 발생가능성·영향도·탐지지표로 평가하세요. 예방·대응·복구 책임과 기준·낙관·비관 시나리오별 전환 기준을 작성하세요.","사업 규모·민감 데이터·필수 일정 제공"],["사업기획","제안서 한 장 요약","[사업]을 의사결정자용 한 장으로 요약하세요. 왜 지금 필요한지, 누구의 문제인지, 무엇을 어떻게 할지, 비용과 기대성과, 추진주체, 결정 요청사항을 결론형 문장과 표로 구성하세요. 원문에 없는 성과나 수치는 만들지 말고 빈칸을 표시하세요.","제안서 원문과 반드시 남길 수치를 제공"],["정책기획","주민참여 정책 워크숍","[지역문제]를 주민·상인·공무원이 함께 해결하는 2시간 워크숍을 설계하세요. 참여자 모집, 문제정의, 아이디어 발산, 평가기준, 팀별 기획, 발표·투표, 후속 실행과 피드백까지 시간표·진행멘트·워크시트·결과물·갈등 대응을 포함하세요.","참여자 수·장소·정책 범위·결정권한 입력"]].map((x,i)=>({id:i+1,category:x[0],title:x[1],prompt:x[2],tip:x[3]}));
const selected=new Set(); let category='전체',workCategory='전체',recipeCategory='전체';
const uniq=(arr,key)=>['전체',...new Set(arr.map(x=>x[key]))];
const el=id=>document.getElementById(id); const norm=s=>s.toLowerCase().replace(/\s/g,'');
function filters(id,items,key,setter){el(id).innerHTML=uniq(items,key).map((x,i)=>`<button class="chip ${i===0?'active':''}" data-value="${x}">${x}</button>`).join('');el(id).onclick=e=>{const b=e.target.closest('.chip');if(!b)return;el(id).querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));b.classList.add('active');setter(b.dataset.value)}}
function renderCommands(){const q=norm(el('commandSearch').value);const data=commands.filter(x=>(category==='전체'||x.category===category)&&norm(x.command+x.ko).includes(q));el('commandGrid').innerHTML=data.map(x=>`<button class="key-card ${selected.has(x.command)?'selected':''}" data-command="${x.command}"><span class="check">✓</span><code>${x.command}</code><b>${x.ko}</b><small>${x.category}</small></button>`).join('');el('commandEmpty').style.display=data.length?'none':'block';const vals=[...selected];el('comboBar').classList.toggle('empty',!vals.length);el('comboBar').querySelector('span').textContent=vals.length?vals.join(' '):'선택한 치트키가 없습니다.';el('comboCount').textContent=vals.length;if(el('commandResult'))el('commandResult').textContent=`${data.length}개 표시 · 전체 ${commands.length}개`}
function card(x){return `<article class="prompt-card"><div class="meta"><span class="badge">${x.category}</span><span>#${String(x.id).padStart(2,'0')}</span></div><h3>${x.title}</h3><div class="text">${x.prompt}</div><p class="tip">활용 포인트 · ${x.tip}</p><button class="copy" data-copy="${x.prompt.replaceAll('"','&quot;')}">프롬프트 복사</button></article>`}
function renderList(data,cat,qid,gid,eid){const q=norm(el(qid).value);const filtered=data.filter(x=>(cat==='전체'||x.category===cat)&&norm(x.category+x.title+x.prompt+x.tip).includes(q));el(gid).innerHTML=filtered.map(card).join('');el(eid).style.display=filtered.length?'none':'block';const rid=gid==='workGrid'?'workResult':'recipeResult';if(el(rid))el(rid).textContent=`${filtered.length}개 표시 · 전체 ${data.length}개`}
async function copyText(t){await navigator.clipboard.writeText(t);el('toast').classList.add('show');setTimeout(()=>el('toast').classList.remove('show'),1400)}
filters('categoryFilters',commands,'category',v=>{category=v;renderCommands()});filters('workFilters',works,'category',v=>{workCategory=v;renderList(works,workCategory,'workSearch','workGrid','workEmpty')});filters('recipeFilters',recipes,'category',v=>{recipeCategory=v;renderList(recipes,recipeCategory,'recipeSearch','recipeGrid','recipeEmpty')});
el('commandSearch').oninput=renderCommands;el('workSearch').oninput=()=>renderList(works,workCategory,'workSearch','workGrid','workEmpty');el('recipeSearch').oninput=()=>renderList(recipes,recipeCategory,'recipeSearch','recipeGrid','recipeEmpty');
el('commandGrid').onclick=e=>{const b=e.target.closest('.key-card');if(!b)return;selected.has(b.dataset.command)?selected.delete(b.dataset.command):selected.add(b.dataset.command);renderCommands()};
el('clearCombo').onclick=()=>{selected.clear();renderCommands()};el('copyCombo').onclick=()=>selected.size&&copyText([...selected].join(' '));
document.body.addEventListener('click',e=>{const b=e.target.closest('[data-copy]');if(b)copyText(b.dataset.copy)});
const viewTitles={home:"멘토K 프롬프트랩",commands:"이미지 치트키",work:"업무 프롬프트",planning:"기획 프롬프트",recipes:"이미지 활용",imageGuide:"GPT Image 2.5",astra:"Astra 활용",website:"웹사이트",app:"앱 구축",shop:"쇼핑몰·자사몰",builder:"프롬프트 설계",guide:"초보자 가이드"};
function activateView(name,scrollTop){
  const target=el(name==="home"?"homeView":name+"View");
  if(!target)return;
  const isHome=name==="home";
  document.querySelectorAll(".workspace,#homeView").forEach(x=>x.classList.add("hidden"));
  document.querySelectorAll(".home-only").forEach(x=>x.classList.toggle("hidden",!isHome));
  target.classList.remove("hidden");
  document.querySelectorAll(".nav").forEach(x=>x.classList.toggle("active",x.dataset.view===name));
  document.body.classList.toggle("detail-mode",!isHome);
  document.title=name==="home"?"멘토K 프롬프트랩":(viewTitles[name]||"멘토K 프롬프트랩")+" · 멘토K 프롬프트랩";
  if(scrollTop!==false) window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelector("nav").addEventListener("click",e=>{const b=e.target.closest("button.nav[data-view]");if(b)activateView(b.dataset.view,true)});
const homeLink=document.querySelector(".brand-home-link");
if(homeLink)homeLink.addEventListener("click",e=>{e.preventDefault();activateView("home",true);history.replaceState(null,"","#homeView")});
activateView("home",false);
const presets={
report:['의사결정에 필요한 현황 진단과 90일 실행계획이 포함된 보고서 작성','해당 산업의 경영컨설턴트','기관장 또는 경영진','현재 문제와 추진 배경','현황자료, 통계, 인터뷰, 기존 보고서','표 중심 보고서','A4 10쪽 내외','결론 중심의 명료한 문체','요약, 현황, 문제, 원인, 대안 비교, 권고안, 실행계획, KPI, 리스크','근거 없는 수치, 일반론, 중복','사실·추정·제안 구분, 출처·기준일·계산 검증'],
plan:['평가기준을 충족하고 실행 가능한 사업기획서 작성','사업기획 및 공모사업 전문가','심사위원과 사업 책임자','해결할 문제와 추진 조직의 여건','공고문, 평가표, 고객·지역 데이터, 예산 기준','구조화된 문서','제출 양식 준수','근거 중심의 설득력 있는 문체','필요성, 대상, 목표, 세부사업, 체계, 일정, 예산, KPI, 지속가능성','평가항목 누락, 확인되지 않은 성과','평가항목 대응, 성과논리 연결, 예산 합계 검증'],
lecture:['초보자가 이해하고 실습할 수 있는 강의자료 설계','성인교육 전문 교수설계자','해당 주제를 처음 배우는 실무자','대상 수준, 강의시간, 수업 방식','교안, 사례, 참고자료, 템플릿','슬라이드 장별 기획','16:9 슬라이드 30장','쉽고 전문적인 강의 문체','학습목표, 장별 메시지, 근거, 사례, 시각화, 강사 포인트, 실습','과도한 텍스트, 중복, 출처 없는 수치','한 장 한 메시지, 총 시간과 가독성 검증'],
article:['검색 독자의 질문에 답하는 전문 콘텐츠 작성','전문 기자이자 콘텐츠 전략가','문제를 검색하는 실무자','검색 의도와 게시 채널','핵심 사실, 현장 경험, 공식 출처','구조화된 문서','1,800~2,200자','사례 중심의 자연스러운 평서체','제목, 답변형 도입, 질문형 소제목, 사례, 실행법, FAQ, 메타설명','상투어, 키워드 반복, 과장, 가짜 인용','최신 사실과 1차 출처 확인, 중복 제거'],
image:['매체와 메시지에 맞는 고품질 이미지 제작','아트디렉터이자 상업 사진가','목표 고객','게시 채널, 감정, 브랜드 맥락','참조 이미지, 피사체, 브랜드 색상','이미지 생성 프롬프트','한글 프롬프트와 영문 키워드','구체적이고 시각적인 묘사','피사체, 행동, 배경, 구도, 카메라, 조명, 색감, 비율, 안전영역','불필요한 글자, 왜곡, 임의 로고','유지·변경 분리, 실제 특징과 화면비 검증'],
video:['첫 2초 몰입과 CTA가 있는 짧은 영상 설계','숏폼 영상 감독','모바일 목표 시청자','플랫폼, 길이, 메시지, 행동','원고, 참조 이미지, 브랜드 소재','스크립트·콘티','30초, 9:16','빠르고 명료한 톤','타임코드별 화면, 동작, 자막, 내레이션, 전환, 음향, 생성 프롬프트','장면당 여러 동작, 작은 자막, 깜빡임','한 장면 한 동작, 자막 15자, 시간 합계 검증']};
const ids=['bGoal','bRole','bAudience','bContext','bInput','bFormat','bLength','bTone','bOutput','bExclude','bRules'];
el('builderPresets').onclick=e=>{const b=e.target.closest('button[data-preset]');if(!b)return;ids.forEach((id,i)=>el(id).value=presets[b.dataset.preset][i]);el('builderPresets').querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));el('buildStatus').textContent='예시 입력 완료 · 내 상황에 맞게 수정하세요.'};
const bv=id=>el(id).value.trim();
el('buildPrompt').onclick=()=>{if(!bv('bGoal')){el('bGoal').focus();el('buildStatus').textContent='최종 목표를 먼저 입력하세요.';return}const level=bv('bLevel');const detail=level==='초급 안내형'?'전문용어를 풀어 쓰고 단계별 예시를 포함하세요.':level==='실무 적용형'?'현황→원인→대안→우선순위→실행을 연결하고 담당 행동을 구체화하세요.':level==='전문가 분석형'?'가설·반대근거·대안·민감도·리스크와 결론이 달라지는 조건을 검토하세요.':'자료 확인부터 조사·분석·초안·검증·최종본까지 자율 수행하되 결과를 크게 바꾸는 정보만 질문하세요.';const o=(id,f)=>bv(id)||f;el('builtPrompt').textContent=`당신은 ${o('bRole','이 과제의 실전 전문가이자 컨설턴트')}입니다. 다음 과제를 바로 사용할 수 있는 최종 산출물 수준으로 완성하세요.\n\n[최종 목표]\n${bv('bGoal')}\n\n[독자·사용자]\n${o('bAudience','실제 사용자를 추정하고 명시하세요.')}\n\n[배경·현재 상황]\n${o('bContext','핵심 배경이 부족하면 결론을 바꾸는 질문만 하세요.')}\n\n[입력자료·근거]\n${o('bInput','자료가 없는 부분은 가정으로 표시하세요.')}\n\n[결과물 조건]\n- 형식: ${o('bFormat','구조화된 문서')}\n- 분량: ${o('bLength','목적에 적합한 분량')}\n- 문체: ${o('bTone','명료하고 전문적인 문체')}\n- 반드시 포함: ${o('bOutput','결론, 근거, 실행방법, 점검기준')}\n\n[금지·제외]\n${o('bExclude','근거 없는 단정, 중복, 추상적 일반론')}\n\n[수행 절차]\n1. 목표·독자·자료와 누락 조건을 확인하세요.\n2. 사실·해석·가정·제안을 구분하세요.\n3. ${detail}\n4. 초안을 목표 적합성·근거성·구체성·실행성·형식 준수로 자체 검토하세요.\n5. 검토를 반영한 최종본과 추가 확인사항을 제시하세요.\n\n[품질·검증]\n${o('bRules','사실·수치·고유명사·출처·계산·누락·중복을 점검하세요.')}\n\n결론부터 쓰고 일반론 대신 이 상황에 맞는 근거, 예시, 담당 행동과 판단 기준을 제시하세요.`;el('buildStatus').textContent='완성형 프롬프트가 생성되었습니다.'};
el('clearBuilder').onclick=()=>{document.querySelectorAll('#builderView input,#builderView textarea').forEach(x=>x.value='');el('bFormat').selectedIndex=0;el('bLevel').selectedIndex=1;el('builtPrompt').textContent='항목을 입력하거나 위의 용도별 예시를 선택하세요.';el('buildStatus').textContent='필수 입력: 최종 목표'};
el('copyBuilt').onclick=()=>el('builtPrompt').textContent.startsWith('당신은')&&copyText(el('builtPrompt').textContent);
el('commandStat').textContent=commands.length;el('workStat').textContent=works.length+recipes.length;
renderCommands();renderList(works,workCategory,'workSearch','workGrid','workEmpty');renderList(recipes,recipeCategory,'recipeSearch','recipeGrid','recipeEmpty');

filters('planningFilters',planningPrompts,'category',v=>{planningCategory=v;renderList(planningPrompts,planningCategory,'planningSearch','planningGrid','planningEmpty')});
let planningCategory='전체';
if(el('planningSearch'))el('planningSearch').oninput=()=>renderList(planningPrompts,planningCategory,'planningSearch','planningGrid','planningEmpty');
if(el('planningGrid'))renderList(planningPrompts,planningCategory,'planningSearch','planningGrid','planningEmpty');


/* Prompt Lab administrator dashboard */
(() => {
  const ADMIN_PIN_HASH = "e45870b5e5716bad459290561eaedf47972c65c9cb3d4f50762f46bf45e8f898";
  const USAGE_KEY = "promptLabUsageV1";
  const SESSION_KEY = "promptLabAdminSessionUntil";
  const ADMIN_SESSION_MS = 8 * 60 * 60 * 1000;
  const typeNames = { visits: "접속", copies: "복사", searches: "검색", download: "다운로드" };

  function emptyUsage() {
    return { visits: 0, copies: 0, searches: 0, events: [] };
  }
  function readUsage() {
    try {
      const saved = JSON.parse(localStorage.getItem(USAGE_KEY) || "null");
      return saved && typeof saved === "object" ? Object.assign(emptyUsage(), saved) : emptyUsage();
    } catch (_) {
      return emptyUsage();
    }
  }
  function saveUsage(value) {
    try { localStorage.setItem(USAGE_KEY, JSON.stringify(value)); } catch (_) {}
  }
  function hasAdminSession() {
    try {
      const until = Number(localStorage.getItem(SESSION_KEY) || 0);
      if (until > Date.now()) return true;
      localStorage.removeItem(SESSION_KEY);
    } catch (_) {}
    return false;
  }
  function setAdminSession(value) {
    try {
      if (value) localStorage.setItem(SESSION_KEY, String(Date.now() + ADMIN_SESSION_MS));
      else localStorage.removeItem(SESSION_KEY);
    } catch (_) {}
  }
  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }
  function formatTime(value) {
    try {
      return new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
    } catch (_) {
      return "-";
    }
  }
  function recordUsage(type, label) {
    const usage = readUsage();
    if (Object.prototype.hasOwnProperty.call(usage, type) && typeof usage[type] === "number") usage[type] += 1;
    usage.events = Array.isArray(usage.events) ? usage.events : [];
    usage.events.unshift({ type: type, label: String(label || "사용").slice(0, 80), at: new Date().toISOString() });
    usage.events = usage.events.slice(0, 80);
    saveUsage(usage);
    if (hasAdminSession()) renderUsage();
  }
  function renderUsage() {
    const usage = readUsage();
    if (el("statVisits")) el("statVisits").textContent = usage.visits || 0;
    if (el("statCopies")) el("statCopies").textContent = usage.copies || 0;
    if (el("statSearches")) el("statSearches").textContent = usage.searches || 0;
    if (el("statLast")) el("statLast").textContent = usage.events && usage.events.length ? formatTime(usage.events[0].at) : "-";
    const log = el("usageLog");
    if (!log) return;
    const events = Array.isArray(usage.events) ? usage.events.slice(0, 24) : [];
    log.innerHTML = events.length ? events.map(function (item) {
      return "<p><b>" + escapeHtml(typeNames[item.type] || item.type) + "</b> · " + escapeHtml(item.label) + "<br><small>" + escapeHtml(formatTime(item.at)) + "</small></p>";
    }).join("") : "<p>아직 사용 기록이 없습니다.</p>";
  }
  async function verifyAdminPin(pin) {
    if (!window.crypto || !window.crypto.subtle || !window.TextEncoder) return false;
    const digest = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(pin));
    const hex = Array.from(new Uint8Array(digest)).map(function (byte) { return byte.toString(16).padStart(2, "0"); }).join("");
    return hex === ADMIN_PIN_HASH;
  }
  async function renderDevLog() {
    const log = el("devLog");
    if (!log) return;
    log.innerHTML = "<p>GitHub 수정 기록을 불러오는 중…</p>";
    try {
      const response = await fetch("https://api.github.com/repos/mentor-k/chatgpt-sites-projectbook/commits?path=prompt-lab&per_page=12", { headers: { Accept: "application/vnd.github+json" } });
      if (!response.ok) throw new Error("GitHub API " + response.status);
      const commits = await response.json();
      log.innerHTML = commits.length ? commits.map(function (commit) {
        const title = commit.commit && commit.commit.message ? commit.commit.message.split("\n")[0] : "수정 기록";
        const date = commit.commit && commit.commit.author && commit.commit.author.date ? commit.commit.author.date : "";
        const author = commit.author && commit.author.login ? commit.author.login : (commit.commit && commit.commit.author ? commit.commit.author.name : "GitHub");
        return "<p><b>" + escapeHtml(title) + "</b><br><small>" + escapeHtml(formatTime(date)) + " · " + escapeHtml(author) + "</small></p>";
      }).join("") : "<p>표시할 수정 기록이 없습니다.</p>";
    } catch (_) {
      log.innerHTML = "<p>기록을 불러오지 못했습니다. 잠시 후 새로고침해 주세요.</p>";
    }
  }
  function setAdminState(unlocked) {
    const gate = el("adminGate");
    const panel = el("adminPanel");
    if (!gate || !panel) return;
    gate.classList.toggle("hidden", unlocked);
    panel.classList.toggle("hidden", !unlocked);
    setAdminSession(unlocked);
    if (unlocked) {
      renderUsage();
      renderDevLog();
    }
  }
  function openAdmin() {
    if (hasAdminSession()) setAdminState(true);
    else {
      setAdminState(false);
      if (el("adminPin")) el("adminPin").focus();
    }
  }

  recordUsage("visits", "페이지 접속");

  ["commandSearch", "workSearch", "recipeSearch", "planningSearch"].forEach(function (id) {
    const input = el(id);
    if (!input) return;
    let timer = null;
    input.addEventListener("input", function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        const query = input.value.trim();
        if (query) recordUsage("searches", query);
      }, 700);
    });
  });

  document.body.addEventListener("click", function (event) {
    const button = event.target.closest("[data-copy],#copyCombo,#copyBuilt");
    if (!button) return;
    if (button.id === "copyCombo" && (!selected || !selected.size)) return;
    if (button.id === "copyBuilt" && (!el("builtPrompt") || !el("builtPrompt").textContent.startsWith("당신은"))) return;
    const label = button.id === "copyCombo" ? "치트키 조합" : (button.id === "copyBuilt" ? "설계 결과" : "프롬프트");
    recordUsage("copies", label);
  });

  const adminLogin = el("adminLogin");
  const adminPin = el("adminPin");
  if (adminLogin && adminPin) {
    adminLogin.addEventListener("click", async function () {
      const pin = adminPin.value.trim();
      const message = el("adminMessage");
      if (!pin) {
        if (message) message.textContent = "PIN을 입력하세요.";
        adminPin.focus();
        return;
      }
      adminLogin.disabled = true;
      adminLogin.textContent = "확인 중…";
      try {
        if (await verifyAdminPin(pin)) {
          adminPin.value = "";
          if (message) message.textContent = "";
          setAdminState(true);
        } else if (message) {
          message.textContent = "PIN이 올바르지 않습니다.";
        }
      } catch (_) {
        if (message) message.textContent = "인증을 처리하지 못했습니다. HTTPS에서 다시 시도해 주세요.";
      } finally {
        adminLogin.disabled = false;
        adminLogin.textContent = "인증";
      }
    });
    adminPin.addEventListener("keydown", function (event) {
      if (event.key === "Enter") adminLogin.click();
    });
  }
  if (el("downloadExcel")) {
    el("downloadExcel").addEventListener("click", function () {
      const link = document.createElement("a");
      link.href = "prompt-lab.xlsx";
      link.download = "prompt-lab.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();
      recordUsage("download", "엑셀");
    });
  }
  if (el("refreshAdmin")) el("refreshAdmin").addEventListener("click", function () { renderUsage(); renderDevLog(); });
  if (el("adminLogout")) el("adminLogout").addEventListener("click", function () { setAdminState(false); if (el("adminPin")) el("adminPin").focus(); });
  const adminNav = document.querySelector('button.nav[data-view="admin"]');
  if (adminNav) adminNav.addEventListener("click", openAdmin);
  if (hasAdminSession()) setAdminState(true);
})();

if(el("webAppSearch")){el("webAppSearch").oninput=()=>{const q=norm(el("webAppSearch").value);const cards=[...document.querySelectorAll(".web-app-card")];let n=0;cards.forEach(card=>{const show=!q||norm(card.dataset.search||card.textContent).includes(q);card.style.display=show?"flex":"none";if(show)n++});if(el("webAppEmpty"))el("webAppEmpty").style.display=n?"none":"block"}}

["website","app"].forEach(function(kind){const input=el(kind+"Search"),grid=el(kind+"Grid"),empty=el(kind+"Empty");if(!input||!grid)return;input.oninput=function(){const q=norm(input.value),cards=[...grid.querySelectorAll(".build-card")];let n=0;cards.forEach(card=>{const show=!q||norm(card.dataset.search||card.textContent).includes(q);card.style.display=show?"flex":"none";if(show)n++});if(empty)empty.style.display=n?"none":"block"}});

["astra","shop"].forEach(function(kind){const input=el(kind+"Search"),grid=el(kind+"VideoGrid")||el(kind+"Grid"),empty=el(kind+"VideoEmpty")||el(kind+"Empty");if(!input||!grid)return;input.oninput=function(){const q=norm(input.value),cards=[...grid.querySelectorAll(".build-card")];let n=0;cards.forEach(card=>{const show=!q||norm(card.dataset.search||card.textContent).includes(q);card.style.display=show?"flex":"none";if(show)n++});if(empty)empty.style.display=n?"none":"block"}});


/* Prompt Lab public notices and privacy-safe event counters */
(() => {
  const NOTICE_KEY = "promptLabNoticesV1";
  const USAGE_KEY = "promptLabUsageV1";
  const DEFAULT_NOTICES = [
    {id:"welcome-2026", title:"프롬프트랩 운영 안내", category:"운영", body:"검색·조합한 프롬프트는 결과를 그대로 믿기보다 사실·출처·저작권·개인정보를 최종 확인한 뒤 사용해 주세요.", date:"2026-09-01", pinned:true, published:true},
    {id:"workflow-update", title:"웹·앱·쇼핑몰 구축 메뉴 업데이트", category:"업데이트", body:"기획→구조설계→개발→검수→저장소→배포 단계별 실전 프롬프트를 추가했습니다.", date:"2026-08-28", pinned:false, published:true},
    {id:"image-astra", title:"GPT Image 2.5·Astra 활용 가이드 추가", category:"자료", body:"이미지 치트키, 모션그래픽, 숏폼·광고·상품영상 제작 프롬프트를 한글로 정리했습니다.", date:"2026-08-20", pinned:false, published:true}
  ];
  const esc = value => String(value == null ? "" : value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const read = () => {
    try {
      const raw = localStorage.getItem(NOTICE_KEY);
      if (raw !== null) { const saved = JSON.parse(raw); if (Array.isArray(saved)) return saved; }
    } catch (_) {}
    try { localStorage.setItem(NOTICE_KEY, JSON.stringify(DEFAULT_NOTICES)); } catch (_) {}
    return DEFAULT_NOTICES.slice();
  };
  const visible = () => read().filter(n => n && n.published !== false).sort((a,b) => Number(Boolean(b.pinned))-Number(Boolean(a.pinned)) || String(b.date||"").localeCompare(String(a.date||"")));
  const track = (type, label) => {
    try {
      const u = JSON.parse(localStorage.getItem(USAGE_KEY) || "{}");
      u[type] = Number(u[type] || 0) + 1;
      u.events = Array.isArray(u.events) ? u.events : [];
      u.events.unshift({type, label:String(label||"공지").slice(0,80), at:new Date().toISOString()});
      u.events = u.events.slice(0,80);
      localStorage.setItem(USAGE_KEY, JSON.stringify(u));
    } catch (_) {}
  };
  function render() {
    const root = document.getElementById("noticeList");
    if (!root) return;
    const items = visible().slice(0, 6);
    root.innerHTML = items.length ? items.map(n => `<article class="notice-item${n.pinned ? " pinned" : ""}" data-notice-id="${esc(n.id)}"><div class="notice-meta"><span class="badge">${esc(n.category || "공지")}</span><time datetime="${esc(n.date || "")}">${esc(n.date || "")}</time></div><h3>${esc(n.title)}</h3><p>${esc(n.body)}</p></article>`).join("") : "<p class=\"empty-state\">등록된 공지사항이 없습니다.</p>";
    track("notice_views", "공지 목록");
  }
  document.addEventListener("DOMContentLoaded", render);
  if (document.readyState !== "loading") render();
  document.addEventListener("click", e => {
    const item = e.target.closest(".notice-item");
    if (item) track("notice_clicks", item.querySelector("h3") ? item.querySelector("h3").textContent : "공지");
  });
  window.PromptLabNotices = { read, save: values => { localStorage.setItem(NOTICE_KEY, JSON.stringify(values)); render(); }, defaults: DEFAULT_NOTICES };
})();
