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
✨ 특수효과|/dreamcore|몽환적 초현실`;
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

const selected=new Set(); let category='전체',workCategory='전체',recipeCategory='전체';
const uniq=(arr,key)=>['전체',...new Set(arr.map(x=>x[key]))];
const el=id=>document.getElementById(id); const norm=s=>s.toLowerCase().replace(/\s/g,'');
function filters(id,items,key,setter){el(id).innerHTML=uniq(items,key).map((x,i)=>`<button class="chip ${i===0?'active':''}" data-value="${x}">${x}</button>`).join('');el(id).onclick=e=>{const b=e.target.closest('.chip');if(!b)return;el(id).querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));b.classList.add('active');setter(b.dataset.value)}}
function renderCommands(){const q=norm(el('commandSearch').value);const data=commands.filter(x=>(category==='전체'||x.category===category)&&norm(x.command+x.ko).includes(q));el('commandGrid').innerHTML=data.map(x=>`<button class="key-card ${selected.has(x.command)?'selected':''}" data-command="${x.command}"><span class="check">✓</span><code>${x.command}</code><b>${x.ko}</b><small>${x.category}</small></button>`).join('');el('commandEmpty').style.display=data.length?'none':'block';const vals=[...selected];el('comboBar').classList.toggle('empty',!vals.length);el('comboBar').querySelector('span').textContent=vals.length?vals.join(' '):'선택한 치트키가 없습니다.';el('comboCount').textContent=vals.length}
function card(x){return `<article class="prompt-card"><div class="meta"><span class="badge">${x.category}</span><span>#${String(x.id).padStart(2,'0')}</span></div><h3>${x.title}</h3><div class="text">${x.prompt}</div><p class="tip">활용 포인트 · ${x.tip}</p><button class="copy" data-copy="${x.prompt.replaceAll('"','&quot;')}">프롬프트 복사</button></article>`}
function renderList(data,cat,qid,gid,eid){const q=norm(el(qid).value);const filtered=data.filter(x=>(cat==='전체'||x.category===cat)&&norm(x.category+x.title+x.prompt+x.tip).includes(q));el(gid).innerHTML=filtered.map(card).join('');el(eid).style.display=filtered.length?'none':'block'}
async function copyText(t){await navigator.clipboard.writeText(t);el('toast').classList.add('show');setTimeout(()=>el('toast').classList.remove('show'),1400)}
filters('categoryFilters',commands,'category',v=>{category=v;renderCommands()});filters('workFilters',works,'category',v=>{workCategory=v;renderList(works,workCategory,'workSearch','workGrid','workEmpty')});filters('recipeFilters',recipes,'category',v=>{recipeCategory=v;renderList(recipes,recipeCategory,'recipeSearch','recipeGrid','recipeEmpty')});
el('commandSearch').oninput=renderCommands;el('workSearch').oninput=()=>renderList(works,workCategory,'workSearch','workGrid','workEmpty');el('recipeSearch').oninput=()=>renderList(recipes,recipeCategory,'recipeSearch','recipeGrid','recipeEmpty');
el('commandGrid').onclick=e=>{const b=e.target.closest('.key-card');if(!b)return;selected.has(b.dataset.command)?selected.delete(b.dataset.command):selected.add(b.dataset.command);renderCommands()};
el('clearCombo').onclick=()=>{selected.clear();renderCommands()};el('copyCombo').onclick=()=>selected.size&&copyText([...selected].join(' '));
document.body.addEventListener('click',e=>{const b=e.target.closest('[data-copy]');if(b)copyText(b.dataset.copy)});
document.querySelector('nav').onclick=e=>{const b=e.target.closest('.nav');if(!b)return;document.querySelectorAll('.nav').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelectorAll('.workspace').forEach(x=>x.classList.add('hidden'));el(b.dataset.view+'View').classList.remove('hidden')};
el('buildPrompt').onclick=()=>{const v=id=>el(id).value.trim()||'[입력 필요]';const level=v('bLevel');const detail=level==='초급'?'핵심 내용을 쉬운 말로 정리하세요.':level==='중급'?'현황→원인→대안→실행 순서로 분석하고 표로 요약하세요.':level==='고급'?'가설·반대근거·대안·우선순위·리스크를 검토하고 결론이 바뀌는 조건을 밝히세요.':'필요한 자료 확인부터 분석·초안·검증·최종 산출물 제작까지 완수하고, 결과를 크게 바꾸는 정보만 질문하세요.';el('builtPrompt').textContent=`당신은 이 과제의 실전 전문가이자 컨설턴트입니다.\n\n[목표]\n${v('bGoal')}\n\n[대상과 상황]\n${v('bContext')}\n\n[입력자료]\n${v('bInput')}\n\n[원하는 산출물]\n${v('bOutput')}\n\n[필수 조건]\n${v('bRules')}\n\n[수행 지침]\n${detail}\n사실·추정·제안을 구분하고, 일반론보다 이 상황에 맞는 구체적인 근거와 행동을 제시하세요. 완료 전 누락·중복·수치·출처·형식을 스스로 검수하세요.`};el('copyBuilt').onclick=()=>copyText(el('builtPrompt').textContent);
renderCommands();renderList(works,workCategory,'workSearch','workGrid','workEmpty');renderList(recipes,recipeCategory,'recipeSearch','recipeGrid','recipeEmpty');
