const startButton = document.querySelector('.btn-start');
const introSection = document.querySelector('.intro');
const questionSection = document.querySelector('.question');
const questionEl = document.querySelector('.question__title');
const answerEl = document.querySelectorAll('.question__btn_wrap>button');
const answerAEl = document.querySelector('.question__btn-a');
const answerBEl = document.querySelector('.question__btn-b');
const resultSection = document.querySelector('.result');
const boxSection = document.querySelector('.box');
let questionNumber = 0;

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
  }, 2200);
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

// 화면 질문 넣기
const setQuestionView = (num) => {
  questionEl.innerHTML = questionList[num].question;
  answerAEl.innerHTML = questionList[num].answer[0];
  answerBEl.innerHTML = questionList[num].answer[1];
  console.log(questionEl.innerHTML, answerAEl.innerHTML, answerBEl.innerHTML)
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

// 시작하기
startButton.addEventListener('click', () => {
  toStartTest();
});

answerEl.forEach((el, index) => {
  el.addEventListener('click', () => {
    sectionFadeOut(questionSection);
    toWriteAnswer(questionNumber, index);

    // 화면 생기게 하기
    setTimeout(() => {
      questionNumber++;
      // 질문 내용 변경하기
      setQuestionView(questionNumber);  
      sectionFadeIn(questionSection);
    }, 2100);
  });
});
