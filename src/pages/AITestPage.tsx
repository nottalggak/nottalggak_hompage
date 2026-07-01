import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, RotateCcw } from 'lucide-react';

const questions = [
  {
    question: 'AI 이미지를 만들 때 원하는 결과가 한 번에 나오지 않는다면 보통 어떻게 하시나요?',
    options: [
      { text: '다시 생성 버튼을 누릅니다.', score: 0 },
      { text: '프롬프트 문장만 조금 수정합니다.', score: 1 },
      { text: '프롬프트와 레퍼런스를 함께 수정합니다.', score: 2 },
      { text: '프롬프트, 모델, 비율, 스타일, 시드값 등을 함께 변경합니다.', score: 3 },
    ],
  },
  {
    question: 'AI 영상 10초를 만들 때 보통 몇 번 정도 생성하시나요?',
    options: [
      { text: '1~2번', score: 0 },
      { text: '3~5번', score: 1 },
      { text: '10번 이상', score: 2 },
      { text: '만족할 때까지 수십 번 생성합니다.', score: 3 },
    ],
  },
  {
    question: '아래 AI 툴 중 실제로 사용해본 것이 가장 많은 조합은?',
    options: [
      { text: 'ChatGPT', score: 0 },
      { text: 'ChatGPT + 이미지 AI', score: 1 },
      { text: 'ChatGPT + 이미지 AI + 영상 AI', score: 2 },
      { text: '목적에 따라 4개 이상의 AI 툴을 조합합니다.', score: 3 },
    ],
  },
  {
    question: '프롬프트를 작성할 때 가장 많이 사용하는 방식은?',
    options: [
      { text: '한 줄 정도 입력합니다.', score: 0 },
      { text: '문단 형태로 작성합니다.', score: 1 },
      { text: '친거라, 조명, 스타일 등을 나눠 작성합니다.', score: 2 },
      { text: '상황에 따라 구조를 직접 설계합니다.', score: 3 },
    ],
  },
  {
    question: 'AI 이미지 제작 후 가장 많이 하는 작업은?',
    options: [
      { text: '그대로 사용합니다.', score: 0 },
      { text: '업스케일만 합니다.', score: 1 },
      { text: '부분 수정(Inpaint/Replace)합니다.', score: 2 },
      { text: '여러 장을 합성하거나 후보정합니다.', score: 3 },
    ],
  },
  {
    question: 'AI 영상을 만들 때 가장 시간을 많이 쓰는 단계는?',
    options: [
      { text: '아이디어', score: 0 },
      { text: '이미지 생성', score: 1 },
      { text: '영상 생성', score: 2 },
      { text: '후반 편집', score: 3 },
    ],
  },
  {
    question: 'AI로 만든 콘텐츠 중 가장 높은 조회수는 어느 정도였나요?',
    options: [
      { text: '아직 게시해본 적 없습니다.', score: 0 },
      { text: '1만 회 미만', score: 1 },
      { text: '1만 ~ 10만 회', score: 2 },
      { text: '10만 회 이상', score: 3 },
    ],
  },
  {
    question: 'AI 콘텐츠로 수익을 만들어본 경험이 있으신가요?',
    options: [
      { text: '아직 없습니다.', score: 0 },
      { text: '외주·프리랜서 프로젝트를 진행해봤습니다.', score: 1 },
      { text: '광고·협찬 등으로 수익을 창출해봤습니다.', score: 3 },
    ],
  },
];

type LevelResult = {
  level: string;
  emoji: string;
  percent: number;
  nextGap: string;
  strengths: string[];
  weaknesses: string[];
  diagnosis: string;
  nextGoal: string;
};

const levelResults: Record<string, LevelResult> = {
  lv1: {
    level: 'AI 뉴비',
    emoji: '🥚',
    percent: 20,
    nextGap: '80%',
    strengths: ['AI에 대한 관심', '기본적인 AI 사용 경험'],
    weaknesses: ['결과물 제작 경험', 'AI 툴 활용 능력', '제작 워크플로우'],
    diagnosis: 'AI를 이제 막 시작한 단계입니다.\n기초를 탄탄히 익히면 가장 빠르게 성장할 수 있습니다.',
    nextGoal: '첫 번째 완성도 높은 AI 콘텐츠를 만들어보세요.',
  },
  lv2: {
    level: 'AI 탐험가',
    emoji: '⚡',
    percent: 52,
    nextGap: '48%',
    strengths: ['AI 이미지 제작', '다양한 AI 툴 경험'],
    weaknesses: ['제작 속도', '결과물의 완성도', '워크플로우'],
    diagnosis: 'AI는 활용하고 있지만 시행착오가 많은 단계입니다.\n실전 노하우를 익히면 훨씬 빠르게 원하는 결과를 만들 수 있습니다.',
    nextGoal: '제작 시간을 줄이고 결과물의 퀄리티를 높여보세요.',
  },
  lv3: {
    level: 'AI 크리에이터',
    emoji: '🚀',
    percent: 78,
    nextGap: '22%',
    strengths: ['AI 콘텐츠 제작', 'AI 영상 활용', '실전 제작 경험'],
    weaknesses: ['조회수 경험', '수익화 경험', '콘텐츠 확장'],
    diagnosis: '혼자서 AI 콘텐츠를 제작할 수 있는 수준입니다.\n이제는 제작보다 성과를 만드는 전략이 중요한 단계입니다.',
    nextGoal: 'AI 콘텐츠를 조회수와 수익으로 연결해보세요.',
  },
  lv4: {
    level: 'AI 마스터',
    emoji: '👑',
    percent: 100,
    nextGap: 'MAX LEVEL',
    strengths: ['AI 실무 활용', '콘텐츠 제작 능력', '워크플로우 설계', '프로젝트 운영 경험'],
    weaknesses: ['대규모 프로젝트 운영', '브랜드 확장'],
    diagnosis: '상위 수준의 AI 활용 능력을 갖추고 있습니다.\n이제는 더 큰 프로젝트와 비즈니스 성장이 핵심입니다.',
    nextGoal: 'AI를 활용해 더 큰 브랜드와 비즈니스를 만들어보세요.',
  },
};

function getLevelKey(totalScore: number): string {
  if (totalScore <= 6) return 'lv1';
  if (totalScore <= 14) return 'lv2';
  if (totalScore <= 20) return 'lv3';
  return 'lv4';
}

const serviceLinks = [
  { icon: '🎓', title: 'AI 라이브 클래스', desc: 'AI를 제대로 시작할 수 있도록 기초부터 실전 제작까지 체계적으로 배워보세요.', link: '/education', cta: '교육 둘러보기' },
  { icon: '🎬', title: 'AI 제작 대행', desc: '완성도 높은 AI 콘텐츠가 필요하다면 전문가의 결과물은 먼저 경험해보세요.', link: '/production', cta: '제작 대행 둘러보기' },
  { icon: '🤝', title: 'AI 커뮤니티', desc: '혼자 헤매지 않고 최신 AI 툴과 프롬프트를 꾸준히 받아보세요.', link: '/community', cta: '커뮤니티 둘러보기' },
];

export default function AITestPage() {
  const [step, setStep] = useState<'start' | 'quiz' | 'result'>('start');
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);

  const startQuiz = () => {
    setStep('quiz');
    setCurrentQ(0);
    setScore(0);
  };

  const answer = (points: number) => {
    const newScore = score + points;
    setScore(newScore);
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setScore(newScore);
      setStep('result');
    }
  };

  const reset = () => {
    setStep('start');
    setCurrentQ(0);
    setScore(0);
  };

  if (step === 'start') {
    return (
      <main className="pt-16 min-h-screen bg-white">
        <div className="content-max-width max-w-2xl mx-auto pt-28 md:pt-40 pb-20 text-center">
          <span className="inline-block px-4 py-1.5 bg-[#F5F5F5] rounded-full text-sm text-[#8A8A8A] mb-6">8문항 · 2분 소요</span>
          <h1 className="text-h1 mb-5">AI 콘텐츠<br />레벨 테스트</h1>
          <p className="text-lg md:text-xl text-[#8A8A8A] mb-12 max-w-md mx-auto">
            나의 AI 콘텐츠 제작 역량은 어느 정도일까요?<br />
            간단한 테스트로 현재 레벨을 확인하고<br />
            맞춤형 서비스를 추천받아보세요.
          </p>
          <button onClick={startQuiz} className="inline-flex items-center px-10 py-4 bg-[#1A1A1A] text-white text-base font-semibold rounded-full">
            테스트 시작하기 <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </main>
    );
  }

  if (step === 'quiz') {
    const q = questions[currentQ];
    const progress = ((currentQ + 1) / questions.length) * 100;

    return (
      <main className="pt-16 min-h-screen bg-white">
        <div className="content-max-width max-w-2xl mx-auto pt-20 md:pt-28 pb-20">
          <div className="mb-10">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-[#8A8A8A]">질문 {currentQ + 1} / {questions.length}</span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-[#F5F5F5] rounded-full overflow-hidden">
              <div className="h-full bg-[#1A1A1A] rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-10 leading-snug">{q.question}</h2>

          <div className="space-y-4">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => answer(opt.score)}
                className="w-full text-left p-6 border border-[#E5E5E5] rounded-2xl hover:border-[#1A1A1A] hover:bg-[#FAFAFA] transition-all"
              >
                <span className="text-base">{opt.text}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  const result = levelResults[getLevelKey(score)];
  const progressBar = '█'.repeat(Math.round(result.percent / 10)) + '░'.repeat(10 - Math.round(result.percent / 10));

  return (
    <main className="pt-16 min-h-screen bg-white">
      <div className="content-max-width max-w-2xl mx-auto pt-20 md:pt-28 pb-20">

        {/* Result Header */}
        <div className="text-center mb-10">
          <p className="text-sm text-[#8A8A8A] mb-4">🏆 당신의 AI 레벨</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-2">{result.emoji} {result.level}</h2>
          <p className="text-lg text-[#8A8A8A] mb-6">(Lv.{getLevelKey(score).replace('lv', '')})</p>

          <div className="bg-[#F5F5F5] rounded-xl p-4 inline-block text-left font-mono text-sm">
            <p className="mb-1">{progressBar} {result.percent}%</p>
            <p className="text-[#8A8A8A]">다음 레벨까지 {result.nextGap}</p>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="bg-[#F5F5F5] rounded-2xl p-8 mb-4">
          <h3 className="text-lg font-semibold mb-4">🎯 현재 강점</h3>
          <ul className="space-y-2 mb-6">
            {result.strengths.map((s) => (
              <li key={s} className="flex items-center gap-2 text-sm text-[#1A1A1A]">
                <span>✔</span> {s}
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold mb-4">⚠ 현재 부족한 부분</h3>
          <ul className="space-y-2">
            {result.weaknesses.map((w) => (
              <li key={w} className="flex items-center gap-2 text-sm text-[#8A8A8A]">
                <span>•</span> {w}
              </li>
            ))}
          </ul>
        </div>

        {/* Diagnosis */}
        <div className="bg-[#F5F5F5] rounded-2xl p-8 mb-8">
          <h3 className="text-lg font-semibold mb-4">📝 진단</h3>
          <p className="text-sm text-[#1A1A1A] leading-relaxed mb-4 whitespace-pre-line">{result.diagnosis}</p>
          <h3 className="text-lg font-semibold mb-2">🎯 다음 목표</h3>
          <p className="text-sm text-[#555555]">{result.nextGoal}</p>
        </div>

        {/* Service Recommendations */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-6 text-center">🚀 추천 서비스</h3>
          <div className="space-y-4">
            {serviceLinks.map((svc) => (
              <Link
                key={svc.title}
                to={svc.link}
                className="block bg-[#F5F5F5] rounded-2xl p-6 hover:bg-[#EBEBEB] transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="text-base font-semibold mb-1">{svc.icon} {svc.title}</h4>
                    <p className="text-sm text-[#8A8A8A]">{svc.desc}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#8A8A8A] flex-shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Reset */}
        <div className="text-center">
          <button onClick={reset} className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#1A1A1A] font-semibold rounded-full border border-[#E5E5E5]">
            <RotateCcw className="w-4 h-4 mr-2" /> 다시 테스트하기
          </button>
        </div>
      </div>
    </main>
  );
}
