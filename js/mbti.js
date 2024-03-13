const startButton = document.querySelector('.btn-start');
const introSection = document.querySelector('.intro');
const questionSection = document.querySelector('.question');
const questionWrap = document.querySelector('.question__wrap');
const questionEl = document.querySelector('.question__title');
const answerEl = document.querySelectorAll('.question__btn_wrap>button');
const answerAEl = document.querySelector('.question__btn-a');
const answerBEl = document.querySelector('.question__btn-b');
const resultSection = document.querySelector('.result');
const boxSection = document.querySelector('.box');
let questionNumber = 0;

// 시작하기
startButton.addEventListener('click', () => {
  toStartTest();
});

const toStartTest = () => {
  setQuestionView(0);
  sectionFade(introSection, questionSection);
};

// 화면전환 효과 주기
const sectionFade = (hideBox, showBox) => {
  hideBox.classList.add('fadeOut');
  window.setTimeout(() => {
    hideBox.style.display = 'none';
    showBox.classList.add('fadeIn');
  }, 500);
};

const sectionFadeOut = (hideBox) => {
  if (hideBox.classList.contains('fadeIn')){
    hideBox.classList.remove('fadeIn')
  }
  hideBox.classList.add('fadeOut');
};

const sectionFadeIn = (showBox) => {  
  if (showBox.classList.contains('fadeOut')){
    showBox.classList.remove('fadeOut')
  }
  showBox.classList.add('fadeIn');
};

// 질문 화면 내용 넣기
const setQuestionView = (num) => {
  questionEl.innerHTML = questionList[num].question;
  answerAEl.innerHTML = questionList[num].answer[0];
  answerBEl.innerHTML = questionList[num].answer[1];
};

// 프로그레스바
const setProgress = (num) => {
  const progressBar = document.querySelector('.question__progress_bar');
  progressBar[0].style.width = `${(100 / questionList.length) * num}%`;
};

const toClickAnswer = (num) => {
  answerEl.forEach((el, index) => {
    el.addEventListener('click', () => {
      questionList[num].userAnswer = index;
    });
  });
};

const toWriteAnswer = (num, index) => {
  questionList[num].userAnswer = index;
};

answerEl.forEach((el, index) => {
  el.addEventListener('click', () => {
    toWriteAnswer(questionNumber, index);

    if (questionNumber < 11) {
      sectionFadeOut(questionWrap);
      setTimeout(() => {
        questionNumber++;
        setQuestionView(questionNumber);  
        sectionFadeIn(questionWrap);
      }, 500);
    } else if (questionNumber >= 11) {
      sectionFade(questionSection, resultSection);
      countPoint(questionList)
    }
  });
});

const countPoint = (array) => {
  let eiResult = 0;
  let nsResult = 0;
  let tfResult = 0;
  let pjResult = 0;
  let result = []; // string으로 변경
  
  array.filter ((x) => {
    if (x.type === 'ei' && x.userAnswer) eiResult++;
    if (x.type === 'ns' && x.userAnswer) nsResult++;
    if (x.type === 'tf' && x.userAnswer) tfResult++;
    if (x.type === 'pj' && x.userAnswer) pjResult++;
  })

  eiResult > 1 ? result+='e' : result+='i'
  nsResult > 1 ? result+='n' : result+='s'
  tfResult > 1 ? result+='t' : result+='f'
  pjResult > 1 ? result+='p' : result+='j'

  // return result;
  showResult(result)
};

const showResult = (result) => {
  const resultThumb = document.querySelector('.result__thumb');
  const resultTitle = document.querySelector('.result__title');
  const resultBox = document.querySelectorAll('.result__box');
  const resultFooterBox = document.querySelectorAll('.result__footer_box');

  resultList.forEach((el, index) => {
    if ( el.type === result ) {
      resultTitle.innerHTML = el.title;
      resultBox[0].innerHTML = addResultDescription(el.likeDescription);
      resultBox[1].innerHTML = addResultDescription(el.hateDescription);
      resultBox[2].innerHTML = addResultDescription(el.character);
      resultFooterBox[0].innerHTML = el.bestType;
      resultFooterBox[1].innerHTML = el.worstType;
    }
  })
}

const addResultDescription = (text) => {
  let listTagArray = [];
  for (let i = 0; i < text.length; i++){
    let listTag = `<li class="result__lst">${text}</li>`
    listTagArray.push(listTag);
  }
  let tagToString = listTagArray.join('')
  return tagToString;
}


const questionList = [
  {
    type: 'ei',
    question: '오랜만에 만난 친구와 놀던 중에, 친구의 친구가 같이 놀자고 연락이 온다면?',
    answer: ['안될게 뭐 있어?! 빨리 오라고 해!', '으응…?(싫어 불편해 안된다고 해)'],
    userAnswer: '',
  },
  {
    type: 'ns',
    question: '독감에 걸려서 체온이 40도가 넘어갔을 때 드는 생각은?',
    answer: [
      '나 이러다 죽는 거 아닌가... 아직 해보고 싶은거 많은데... 다들 슬퍼하겠지..?',
      '와 40도네.. 어쩐지 너무 아프더라',
    ],
    userAnswer: '',
  },
  {
    type: 'tf',
    question: '친구가 눈물을 글썽이며 힘들다고 말했을 때 나는...',
    answer: [
      '왜그래? 뭐때문에 힘든거야? 라며 힘들어하는 이유를 묻는다.',
      '5초 만에 감정 이입 완료... 같이 슬퍼진다.',
    ],
    userAnswer: '',
  },
  {
    type: 'pj',
    question: '한참 집에서 영화를 보고 있는데 친구가 갑자기 놀러 왔을 때 나는?',
    answer: [
      '친구가 말도 없이 놀러 온 상황 자체가 재밌고 짜릿하다',
      '영화가 중간에 끊겨서 짜증난다',
    ],
    userAnswer: '',
  },
  {
    type: 'ei',
    question: '데이트 중 길에서 연인의 친구를 마주친다면 나는..',
    answer: ['자연스럽게 웃으며 대한다', '무생물이 되어 조용히 있는다'],
    userAnswer: '',
  },
  {
    type: 'ns',
    question: '좀비 영화를 봤다! 내용을 궁금해 하는 친구에게 나는...',
    answer: [
      '주인공 사람들 살리겠다고 혼자 좀비랑 싸우는데 진짜 멋지더라 소름돋았어..',
      '주인공이 좀비 바이러스가 퍼진 세상에서 살아남는 영화야~',
    ],
    userAnswer: '',
  },
  {
    type: 'tf',
    question:
      '너 별로 열심히 준비 안 한 것 같은데 시험잘봤네? 멋있다! 라는 말을 들었을 때 나는?',
    answer: [
      '열심히 안 했다니..? 어떻게 그런 심한 말을??',
      '다른 사람들 눈에는 내가 덜 노력하고도 점수 잘 나오는 똑똑한 사람으로 보이겠군!',
    ],
    userAnswer: '',
  },
  {
    type: 'pj',
    question: '해외여행 계획을 짜게 된 나는...',
    answer: [
      '비행기 표만 끊어두고 계획의 80%가 끝난다고 생각한다.',
      '할 거면 제대로! 일별로 세부 일정을 정리한다',
    ],
    userAnswer: '',
  },
  {
    type: 'ei',
    question: '우울할 때 집에 있으면 나는',
    answer: ['더 우울해진다', '우울함이 해소되어 사라진다'],
    userAnswer: '',
  },
  {
    type: 'ns',
    question: '과제의 기한을 놓쳤을 때 드는 생각은?',
    answer: ['하.. 난 왜 이리 게으르지?', '아오... 점수 깎이겠네...'],
    userAnswer: '',
  },
  {
    type: 'tf',
    question: '친구가 갑자기 [난 네가 너무좋아!] 라고 했을 때 드는 생각은?',
    answer: ['속으로 나한테 뭐 잘못했나 생각듬', '속으로 뿌듯하고 감동받음'],
    userAnswer: '',
  },
  {
    type: 'pj',
    question: '썸 타는 중에 연인이 집에 놀러 온다고 했을 때 나는?',
    answer: [
      '눈에 보이는 곳만 급하게 치워둔다',
      '쓰레기통 비우기, 침구 정리, 화장실 청소 등 모든 공간을 청소한다.',
    ],
    userAnswer: '',
  },
];

const resultList = [
  {
    type: 'enfp',
    thumb: '../img/enfp.png',
    title: '수프리모',
    character: [
      '받은 게 있으면 배로 돌려주려고 함',
      '내가 하고 싶은 말을 하는 것에 거리낌이 없음',
      '좋아하는 사람 싫어하는 사람이 명확히 구분됨',
      '다방면으로 재능있지만 막 엄청 잘하진 않음',
    ],
    likeDescription: [
      '공감해주며 우쭈쭈 해주는 거 은근 좋아함',
      '재미가 인생의 원동력임',
      '솔직한게 최고',
      '꾸미는 것에 관심 많음',
    ],
    hateDescription: [
      '무지함',
      '반복되는 일상 못 버팀',
      '말이 안 통하는 인간',
      '가식 떠는게 눈에 보이면 별로',
    ],
    bestType: 'intj',
    worstType: 'istp',
  },
  {
    type: 'enfj',
    thumb: '../img/enfj.png',
    title: '알투라',
    character: [
      '이 세상에 믿을 사람은 오직 나 하나임',
      '남 일에 노관심',
      '내 일은 내 일 니 일은 니 일',
      '다소 까탈스러움',
    ],
    likeDescription: ['간단명료', '과정보다 결과', '깔끔한 해결책', '용건만'],
    hateDescription: [
      '피해를 받는 것도 주는 것도 싫음',
      '시간낭비',
      '내로남불',
      '이래라 저래라',
    ],
    bestType: 'infp',
    worstType: 'intj',
  },
  {
    type: 'entp',
    thumb: '../img/entp.png',
    title: '예가체프',
    character: [
      '일 크게 만들고 싫증나서 냅다 모른척 잘함',
      '친해질수록 말이 많아짐',
      '감정이 얼굴에 다 드러나는 편',
      '남얘기든 내얘기든 수다떠는게 너무 재밌음',
    ],
    likeDescription: [
      '모두가 나에게 관심을 가져줬으면 함',
      '친구들과 같이 보내는 시간',
      '어쩌다 무언가를 끝까지 해내면 엄청 뿌듯해함',
      '혼자 있는게 편함(근데 외로움을 많이 탐)',
    ],
    hateDescription: [
      '계산적인 사람은 좀',
      '막무가내 극혐',
      '배신에 예민함',
      '뭘 하든 간지가 나지 않으면 별로',
    ],
    bestType: 'infp',
    worstType: 'isfp',
  },
  {
    type: 'entj',
    thumb: '../img/entj.png',
    title: '브룬디',
    character: [
      '본인 스스로를 잘 알고 있음',
      '센스 좋고 눈치 빠름',
      '내가 상대방에게 맞추는게 편함',
      '핵인싸 되고 싶어함(진짜로)',
    ],
    likeDescription: [
      '칭찬은 날 춤추게 함',
      '개그코드 맞는 인간이면 다 좋음',
      '주변 사람들에게 신뢰받으면 행복함',
      '말을 예쁘게 하는 사람 좋음',
    ],
    hateDescription: [
      '직설적인 팩폭',
      '호의가 권리인 줄 아는 부류',
      '날 필요로 하지 않는 것 같은 느낌',
      '도움을 주지 못하는 피치 못할 상황',
    ],
    bestType: 'intp',
    worstType: 'isfj',
  },
  {
    type: 'estp',
    thumb: '../img/estp.png',
    title: '로부스타',
    character: [
      '오지랖으로는 어디가서 안 꿀림',
      '하고 싶다고 생각 들면 무조건 해야 됨',
      '어떤 문제가 생기면 미래의 나에게 맡김',
      '혼자 있으면 지로해서 뭘 하든 뭘 먹든 몸이 가만히 있지 못함.',
    ],
    likeDescription: [
      '서프라이즈 받는 거 좋아함',
      '새로운 트렌드에 민감한 스타일',
      '본인 생일 소중하게 생각함',
      '파티나 축제와 같은 명량한 분위기',
    ],
    hateDescription: [
      '어색한 침묵은 아주 큰 고통임',
      '아는 사람이 한 명도 없는 장소',
      '정해진 틀 안에 갇혀있으면 답답함',
      '똑같은 일상이 반복되는 것 만큼 지루한게 없음.',
    ],
    bestType: 'isfj',
    worstType: 'entj',
  },
  {
    type: 'estj',
    thumb: '../img/estj.png',
    title: '옐로우 버번',
    character: [
      '남의 마음을 어느정도 꿰뚤어봄',
      '나정도면 좋은 사람이지 라는 생각을 가지고 있음',
      '상처 받는 일 있어도 티 잘 못냄',
      '팔랑귀 보유',
    ],
    likeDescription: [
      '마음 맞는 사람과 함께 있는 시간',
      '다정다감한게 최고',
      '칭찬받으면 부끄러운척 하면서 엄청 좋아함',
      '새로운 사람들을 만나는 자리가 생기면 설렘',
    ],
    hateDescription: [
      '인간관계 틀어지는 상황',
      '민폐 끼치는 거 매우 싫어함',
      '가식 덩어리',
      '인신공격 극혐',
    ],
    bestType: 'istp',
    worstType: 'intp',
  },
  {
    type: 'esfp',
    thumb: '../img/esfp.png',
    title: '블루마운틴',
    character: [
      '걍 될 대로 되라 마인드',
      '가끔 근자감이 치솟을 때가 있음',
      '오늘 할 일을 내일로 미루지만 내일도 안 함',
      '하고 싶은 말이 보통 얼굴에 다 드러남',
    ],
    likeDescription: [
      '스릴러버',
      '승패 상관없이 내기하는 걸 좋아함',
      '머리 쓰는 일 보다 몸 쓰는 일',
      '그때그때 상황에 따라 대처하는 걸 즐김',
    ],
    hateDescription: [
      '외로운게 제일 싫음',
      '답답하게 우물쭈물 대고 있으면 화병남',
      '하고 싶은 거 못하면 스트레스 받지만 오래 가지 않음',
      '하나에만 집중하는',
    ],
    bestType: 'istj',
    worstType: 'intp',
  },
  {
    type: 'esfj',
    thumb: '../img/esfj.png',
    title: '예멘모카 마타리',
    character: [
      '사람들이 아는 내 성격이랑 혼자 있을 때랑 조금 다름',
      '누가 일을 못하고 있으면 답답해서 내가 2배로 다 해놓음',
      '공감 없는 위로 잘함',
      '일 못하면 나쁜 사람 일 잘하면 좋은 사람임',
    ],
    likeDescription: [
      '뭐든 확실하게 딱딱 떨어지는게 좋음',
      '본인 일 열심히 하는 사람에게 끌림',
      '어중간 한 것보단 모 아니면 도',
      '츤데레보다는 대놓고 표현해주는게 좋음',
    ],
    hateDescription: [
      '내 시간 방해받는 거 딱 질색',
      '일처리 못하는 인간',
      '싸우는거 싫어하지만 싸워서 지는 건 더 싫음',
      '무시받는 거 못 참음',
    ],
    bestType: 'isfp',
    worstType: 'intj',
  },
  {
    type: 'infp',
    thumb: '../img/infp.png',
    title: '버본',
    character: [
      '친할수록 해결방안 제시하고 안 친할수록 성의없는 위로함',
      '생각보다 감성적임',
      '나랑 맞는 사람인지 아닌지 금방 구별 가능',
      '자기애 출중함',
    ],
    likeDescription: [
      '즉흥 약속',
      '혼자 있는게 편하고 좋음',
      '꾸며낸 모습보다 솔직한 모습',
      '최소 노력 최대 이익을 선호함',
    ],
    hateDescription: [
      '집착, 간섭, 통제 3종 세트',
      '하려고 했는데 누가 시키면 하기 싫어짐',
      '집착하며 귀찮게 구는 거 딱 질색',
      '무논리 펼치는 사람 보면 화남',
    ],
    bestType: 'infp',
    worstType: 'estp',
  },
  {
    type: 'infj',
    thumb: '../img/infj.png',
    title: '안티구아',
    character: [
      '친구가 고민 상담하면 관심있는 척함',
      '사람에게 정붙이는데 시간 오래 걸림',
      '할땐 함 안할땐 안함',
      '나도 내가 이상한 거 같다는 생각을 종종 함',
    ],
    likeDescription: [
      '뭐든 순서대로',
      '솔직하게 말 해주는게 좋음',
      '누가 인정해주면 뿌듯함',
      '감성적인것 보다 이성적임',
    ],
    hateDescription: [
      '감정소비 극혐',
      '관심 없는 썰 듣고 있는 게 제일 힘듦',
      '억지 논리',
      '기차 화통을 삶아 먹은 듯한 목소리',
    ],
    bestType: 'entp',
    worstType: 'estj',
  },
  {
    type: 'intp',
    thumb: '../img/intp.png',
    title: '하와이안 코나',
    character: [
      '관종인데 막상 관심 주면 어쩔줄 모름',
      '시작할 때는 열정 충만한데 끝은 흐지부지',
      '멀티 안됨',
      '남이 날 어떻게 생각할지 고민함',
    ],
    likeDescription: [
      '나 자신',
      '나를 존중해주는 사람에게 끌림',
      '집에서 뒹굴뒹굴',
      '남에게 의지하기보단 혼자 해결하는게 속편함',
    ],
    hateDescription: [
      '혼자 있으면 편한데 외로운게 싫음',
      '민폐 끼치는 걸 정말 싫어함',
      '자기자랑 안 통함',
      '말과 행동에 모순이 있는 사람',
    ],
    bestType: 'entj',
    worstType: 'esfp',
  },
  {
    type: 'intj',
    thumb: '../img/intj.png',
    title: '하라',
    character: [
      '할 일 있음 미리미리 끝냄',
      '가끔씩 누구보다 튀고싶을 때가 있음',
      '표정관리 제일 잘함',
      '내가 호감 있어 하는 사람이 나에게 먼저 다가와 주길 바람',
    ],
    likeDescription: [
      '선한 영향력을 끼치는 사람',
      '티키타카 잘 맞으면 행복함',
      '생각 정리할 수 있는 시간이 꼭 필요함',
      '내 사람들과 감정 공유하는 것을 좋아함',
    ],
    hateDescription: [
      '친하지 않은 사람들과 있는 무의미한 시간',
      '근거없는 말',
      '잠이 안 올 정도의 잡생각',
      '오해받으면 그냥 못 넘김',
    ],
    bestType: 'enfp',
    worstType: 'estj',
  },
  {
    type: 'istp',
    thumb: '../img/istp.png',
    title: '케냐',
    character: [
      '사람 만나는거 좋은데 싫음',
      '칭찬 곱십으면서 혼자 뿌듯해함',
      '자존감 와르르',
      '한번 맡은 일은 끝까지 해야한다는 생각이 있음 근데 하다가 폰 만짐',
    ],
    likeDescription: [
      '첫 인상이 좋은 사람',
      '수동적인것 보다는 자동적인 것',
      '나보다는 상대가 편한게 좋음',
      '준비하는 건 귀찮지만 친구들 만나면 제일 신나있음',
    ],
    hateDescription: [
      '귀찮은 일',
      '거절 못하는 나 자신',
      '나에 대한 뒷담, 헛소문 극혐',
      '똥고집 싫어함(본인도 똥고집임)',
    ],
    bestType: 'esfj',
    worstType: 'enfp',
  },
  {
    type: 'istj',
    thumb: '../img/istj.png',
    title: '모모라',
    character: [
      '성격이 왔다갔다 해서 나도 내 성격을 잘 모름',
      '겉으론 티가 안나지만 온갖 생각 다 함',
      '남에게 싫은 소리 잘 못함',
      '웬만하면 다 OK',
    ],
    likeDescription: [
      '눈치 안 봐도 되는 환경',
      '자연스러운 관심',
      '대신 선택해주는 사람',
      '10주고 2 받아도 감동받음',
    ],
    hateDescription: [
      '인간관계 스트레스',
      '선 넘는 거 진짜 싫어함',
      '싫은 소리 들으면 자존감 낮아짐',
      '계획했던 일이 틀어지면 잠깐 머리 지끈거림',
    ],
    bestType: 'esfp',
    worstType: 'intp',
  },
  {
    type: 'isfp',
    thumb: '../img/isfp.png',
    title: '탄자니아',
    character: [
      '발등에 불 떨어지건 말건 신경 안 쓰다가 타들어갈때쯤 시작함(하면 또 잘함)',
      '내가 하고 싶은 일만 하고 싶음',
      '공감능력: 대략 21~24점',
      '호불호 확실함',
    ],
    likeDescription: [
      '저노력 고효율 사랑함',
      '워라밸',
      '뭐 하나에 꽂히면 질릴 때까지 함(이후에는 쳐다도 안 봄)',
      '혼자 놀고 먹는 걸 잘하며 즐김',
    ],
    hateDescription: [
      '허세 부리면 정 다 떨어짐',
      '사생활 결여',
      '무례한 사람 극혐',
      '같은 말 반복',
    ],
    bestType: 'estj',
    worstType: 'entp',
  },
  {
    type: 'isfj',
    thumb: '../img/isfj.png',
    title: '만델링',
    character: [
      '친한 사람일수록 직설적으로 표현함',
      '표정관리에 소질 없음',
      '은근 츤데레',
      '믿고 맡김 자주 당함',
    ],
    likeDescription: [
      '부담 없을 정도의 호의',
      '배울 점이 많은 사람에게 끌림',
      '뭐든지 깔끔한게 최고',
      '톡톡 튀는 것 보단 잔잔하게 좋음',
    ],
    hateDescription: [
      '내 일에 누가 지적이나 간섭하면 신경질 남',
      '내 얘길 하는 것도 싫고 남 얘길 들어주는 것도 별로',
      '협동, 협력, 팀플 같은 운명공동체',
      '어떻게든 되겠지 나중에 하자~',
    ],
    bestType: 'estp',
    worstType: 'entj',
  },
]