import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import ComingSoonPopup from '../components/ComingSoonPopup';

const audiences = ['기업', '마케터', '개발자', '크리에이터', '광고대행사'];

const methods = [
  {
    key: 'online',
    name: '노딸깍 라이브 클래스',
    descLine1: '기수제로 함께 배우는',
    descLine2: '노딸깍 시그니처 클래스',
    tags: ['4주 커리큘럼', '입문/초보자 추천', '기수별 커뮤니티 운영'],
    detail: {
      title: '온라인 클래스',
      content: 'AI 콘텐츠 제작부터 계정 운영, 레퍼런스 조사, 수익화까지 실무 중심으로 학습하는 4주 과정입니다. 매주 2회 라이브 수업과 과제를 통해 실제 결과물을 만들어 나갑니다.',
      features: ['콘텐츠 기획 및 아이데이션', '레퍼런스 조사 방법', '자동화 툴 세팅', 'AI 이미지 제작', 'AI 영상 제작', '개인 브랜딩 구축', '수익화 전략 설계'],
      batches: [
        { label: '1기', status: 'closed' as const },
        { label: '2기', status: 'closed' as const },
        { label: '3기', status: 'closed' as const },
        { label: '4기', status: 'open' as const },
      ],
      buttonText: '4기 지원하기',
    },
  },
  {
    key: 'consulting',
    name: '1:1 컨설팅',
    descLine1: '원하는 목표 달성을 위한',
    descLine2: '1:1 맞춤형 코칭',
    tags: ['4주 맞춤형 커리큘럼', 'AI 제작 워크플로우 구축', '1개월 후속 컨설팅'],
    detail: {
      title: '1:1 컨설팅',
      content: '노딸깍 라이브 클래스의 프리미엄 1:1 버전입니다. 그룹 수업의 모든 커리큘럼을 개인 맞춤형으로 진행하며, 실력 진단부터 제작 피드백, 워크플로우 설계까지 전 과정을 밀착 지원합니다.',
      features: ['온라인 클래스 전체 커리큘럼 제공', '콘텐츠 및 계정 진단', '레퍼런스 분석 및 전략 수립', '제작 프로세스 최적화', '수익화 로드맵 설계'],
      batches: [
        { label: '3월', status: 'closed' as const },
        { label: '4월', status: 'closed' as const },
        { label: '5월', status: 'closed' as const },
        { label: '6월', status: 'closed' as const },
        { label: '7월', status: 'open' as const },
      ],
      buttonText: '1:1 컨설팅 지원하기',
    },
  },
  {
    key: 'enterprise',
    name: '기업 출강',
    descLine1: '회사로 직접 찾아가는',
    descLine2: '기업 맞춤형 AI 교육',
    tags: ['맞춤형 커리큘럼', '실무 프로젝트 기반 교육', '사내 AI 활용 프로세스 구축'],
    detail: {
      title: '기업 출강 교육',
      content: '기업의 업무 환경과 목표에 맞춰 설계하는 맞춤형 AI 교육 프로그램입니다. 실무 기반 프로젝트 예제를 통해 실제 업무에 적용할 수 있는 AI 활용 역량을 구축합니다. 실무 중심의 교육과 프로젝트 실습을 통해 AI를 업무에 효과적으로 적용할 수 있도록 지원합니다.',
      features: ['맞춤형 커리큘럼 설계', '실무 기반 프로젝트 예제 연습', 'AI 콘텐츠 제작 프로세스 최적화', '1개월 후속 컨설팅'],
      batches: [
        { label: '상시', status: 'open' as const },
      ],
      buttonText: '교육 문의하기',
    },
  },
];

const results = [
  { title: '콘텐츠 제작 시간 50% 단축', desc: '교육 수강생들은 평균적으로 콘텐츠 제작 시간을 약 50% 단축했습니다.' },
  { title: '콘텐츠 제작비 최대 70% 절감', desc: '촬영, 디자인, 영상 제작에 드는 비용을 줄여 콘텐츠 제작비를 최대 70%까지 절감할 수 있습니다.' },
  { title: '교육 당일부터 콘텐츠 제작', desc: '교육 당일부터 AI를 활용해 이미지와 영상을 직접 제작하고 실무에 바로 활용할 수 있습니다.' },
  { title: '최소 5배 많은 콘텐츠 제작', desc: '같은 시간과 예산으로 기존에 최소 5배 많은 콘텐츠를 제작하고 빠르게 테스트할 수 있습니다.' },
  { title: '팀 전체가 AI 콘텐츠 제작', desc: '특정 담당자에게 의존하지 않고 팀원 모두가 AI를 활용해 콘텐츠를 제작할 수 있습니다.' },
  { title: '교육 이후에도 자체 제작 가능', desc: '교육 종료 후에도 별도의 도움 없이 사내에서 AI 콘텐츠를 직접 기획하고 제작할 수 있습니다.' },
];

const avatarColors = ['#FF4444', '#FF8C00', '#FFD700', '#32CD32', '#4169E1', '#8A2BE2', '#FF1493', '#00CED1', '#FF6347', '#9370DB'];

const lastNames = ['김', '이', '박', '최', '정', '윤', '장', '한', '강', '조'];
const firstEnds = ['연', '준', '혁', '민', '수', '경', '희', '동', '태', '우'];

const testimonials = [
  { quote: '교육을 받고 우리 팀도 AI 콘텐츠를 독자적으로 만들 수 있게 되었습니다. 실무 중심의 커리큘럼이 가장 큰 장점입니다.', nameIdx: 0, role: '콘텐츠 팀장 / IT 기업' },
  { quote: '마케팅 팀에 AI 교육을 의뢰했는데, 모든 팀원이 만족했습니다. 이제 우리팀도 최소 50%의 콘텐츠를 자체 제작합니다.', nameIdx: 1, role: '마케팅 디렉터 / F&B 브랜드' },
  { quote: '1:1 컨설팅을 받으며 제 포트폴리오의 큰 반전이 있었습니다. 노딸깍 님의 피드백이 제 콘텐츠 방향성을 바꾸었어요.', nameIdx: 2, role: '프리랜서 크리에이터' },
  { quote: 'AI 이미지 제작이 처음에는 막막했는데, 교육 후에는 하루에 10장씩 만듭니다. 정말 실무에 최적화된 교육이에요.', nameIdx: 3, role: 'SNS 마케터 / 뷰티 브랜드' },
  { quote: '기업 출강 교육 후 팀 전체의 콘텐츠 퀄리티가 확연히 올랐습니다. 외주 의존이 70%나 줄었어요.', nameIdx: 4, role: '브랜드 매니저 / 패션 기업' },
  { quote: '온라인 강의라도 라이브 세션이 있어서 질문도 바로 하고, 녹화본으로 복습까지 가능해서 정말 좋았습니다.', nameIdx: 5, role: '개인 크리에이터' },
  { quote: '디자인 비전공자도 쉽게 따라할 수 있는 커리큘럼이었습니다. 이제 AI로 제품 소개 영상까지 직접 만듭니다.', nameIdx: 6, role: '스타트업 대표' },
  { quote: '교육을 받은 지 3개월, 이미 200만원이 넘는 외주 비용을 절감했습니다. 교육비가 순식간에 회수됐어요.', nameIdx: 7, role: '마케팅 팀장 / 교육 기업' },
  { quote: '프롬프트 템플릿이 정말 유용합니다. 매일 쓰는 템플릿 20개가 넘게 생겼고 콘텐츠 제작 시간이 반으로 줄었어요.', nameIdx: 8, role: '광고대행사 AE' },
  { quote: '오프라인 워크숍에서의 실습이 인상적이었습니다. 직접 핸즈온하며 배우니까 이핏도가 완전히 달라요.', nameIdx: 9, role: 'UX 디자이너 / IT 기업' },
];

const pricingPlans = [
  { key: 'online', name: '노딸깍 라이브 클래스', price: '₩790,000', features: ['4주 커리큘럼', 'AI 콘텐츠 제작 실전 교육', '기수별 커뮤니티 운영'], buttonText: '신청하기' },
  { key: 'consulting', name: '1:1 컨설팅', price: '₩1,200,000', features: ['4주 맞춤 커리큘럼', 'AI 제작 워크플로우 구축', '1개월 후속 컨설팅'], buttonText: '신청하기' },
  { key: 'enterprise', name: '기업 출강', price: '별도 문의', features: ['맞춤형 커리큘럼', '실무 프로젝트 기반 교육', '사내 AI 활용 프로세스 구축'], buttonText: '문의하기' },
];

function MethodModal({ method, onClose }: { method: typeof methods[0]; onClose: () => void }) {
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handleEsc); };
  }, [onClose]);

  if (showComingSoon) {
    return <ComingSoonPopup onClose={() => { setShowComingSoon(false); onClose(); }} />;
  }

  const isConsulting = method.detail.title === '1:1 컨설팅';

  return (
    <div className="modal-overlay fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full p-8 md:p-10 shadow-2xl relative max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center z-10">
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-h3 mb-4">{method.detail.title}</h3>
        <p className="text-body-sm text-[#8A8A8A] mb-6 leading-relaxed">{method.detail.content}</p>

        {/* 기수/월 정보 배지 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {method.detail.batches.map((batch) => (
            <span
              key={batch.label}
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
                batch.status === 'open'
                  ? 'bg-[#1A1A1A] text-white'
                  : 'bg-[#E5E5E5] text-[#8A8A8A] line-through'
              }`}
            >
              {batch.label} {batch.status === 'open' ? '모집 중' : '마감'}
            </span>
          ))}
        </div>

        {/* 교육/컨설팅 내용 */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-[#1A1A1A] mb-3">{isConsulting ? '컨설팅 내용' : '교육 내용'}</p>
          <div className="space-y-3">
            {method.detail.features.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#1A1A1A] flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-sm text-[#1A1A1A]">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {method.key === 'online' ? (
          <a href="https://www.latpeed.com/products/hcl18" target="_blank" rel="noopener noreferrer" onClick={onClose} className="block w-full py-4 bg-[#1A1A1A] text-white text-center font-semibold rounded-full">
            {method.detail.buttonText}
          </a>
        ) : method.key === 'consulting' ? (
          <a href="https://www.latpeed.com/products/vbuTb" target="_blank" rel="noopener noreferrer" onClick={onClose} className="block w-full py-4 bg-[#1A1A1A] text-white text-center font-semibold rounded-full">
            {method.detail.buttonText}
          </a>
        ) : method.key === 'enterprise' ? (
          <a href="https://www.latpeed.com/products/GBpLE" target="_blank" rel="noopener noreferrer" onClick={onClose} className="block w-full py-4 bg-[#1A1A1A] text-white text-center font-semibold rounded-full">
            {method.detail.buttonText}
          </a>
        ) : (
          <button onClick={() => setShowComingSoon(true)} className="block w-full py-4 bg-[#1A1A1A] text-white text-center font-semibold rounded-full cursor-pointer">
            {method.detail.buttonText}
          </button>
        )}
      </div>
    </div>
  );
}

function TestimonialMarquee() {
  const doubled = [...testimonials, ...testimonials];
  return (
    <section className="py-20 md:py-24 bg-white overflow-hidden">
      <div className="content-max-width mb-12">
        <h2 className="text-h1 text-center">수강생 후기</h2>
      </div>
      <div className="relative w-full overflow-hidden">
        <div className="logo-track-left flex gap-6">
          {doubled.map((item, idx) => {
            const ln = lastNames[item.nameIdx % lastNames.length];
            const fe = firstEnds[item.nameIdx % firstEnds.length];
            const displayName = `${ln}O${fe}`;
            const color = avatarColors[item.nameIdx % avatarColors.length];
            return (
              <div key={idx} className="flex-shrink-0 w-[340px] md:w-[400px] bg-[#F5F5F5] rounded-2xl p-8 flex flex-col">
                <p className="text-body-sm text-[#1A1A1A] leading-relaxed mb-8 whitespace-normal flex-1">{item.quote}</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-12 h-12 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  <div>
                    <p className="text-sm font-semibold">{displayName}</p>
                    <p className="text-xs text-[#8A8A8A]">{item.role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Education() {
  const [selectedMethod, setSelectedMethod] = useState<typeof methods[0] | null>(null);
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="pt-28 md:pt-40 pb-20 md:pb-28 bg-white text-center overflow-hidden">
        <div className="content-max-width">
          <h1 className="text-h1 mb-5 animate-fade-up">
            이제는 외주 말고,<br />직접 AI로 콘텐츠를 만들 때.
          </h1>
        </div>
      </section>

      {/* Target Audience */}
      <section className="section-padding bg-[#F5F5F5]">
        <div className="content-max-width">
          <div className="text-center mb-16">
            <h2 className="text-h2">이런 분들에게 추천합니다</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {audiences.map((label) => (
              <div key={label} className="bg-white rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300 cursor-default">
                <p className="font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Methods */}
      <section className="section-padding bg-white">
        <div className="content-max-width">
          <div className="text-center mb-16">
            <h2 className="text-h2">교육 방식</h2>
            <p className="text-body text-[#8A8A8A] mt-3">각 방식을 클릭해 자세한 내용을 확인하세요</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {methods.map((method) => (
              <button key={method.name} onClick={() => setSelectedMethod(method)}
                className="text-left border border-[#E5E5E5] rounded-2xl p-8 md:p-10 h-full bg-white hover:scale-105 transition-transform duration-300 cursor-pointer group flex flex-col">
                <h3 className="text-xl font-semibold mb-3">{method.name}</h3>
                <p className="text-body-sm text-[#8A8A8A] mb-5 mt-2">{method.descLine1}<br />{method.descLine2}</p>
                <div className="flex flex-col gap-2 mb-5">
                  {method.tags.map((tag) => (
                    <span key={tag} className="self-start px-3 py-1 bg-[#F5F5F5] rounded-full text-xs text-[#8A8A8A]">{tag}</span>
                  ))}
                </div>
                <span className="text-sm font-medium text-[#8A8A8A] group-hover:text-[#1A1A1A] transition-colors mt-auto">자세히 보기 &rarr;</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedMethod && <MethodModal method={selectedMethod} onClose={() => setSelectedMethod(null)} />}
      {showComingSoon && <ComingSoonPopup onClose={() => setShowComingSoon(false)} />}

      {/* Results */}
      <section className="section-padding bg-[#F5F5F5]">
        <div className="content-max-width">
          <div className="text-center mb-12">
            <h2 className="text-h2">교육 후 달라지는 것</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {results.map((result, idx) => (
              <div key={result.title} className="bg-white rounded-2xl p-10 text-center hover:scale-105 transition-transform duration-300">
                <span className="text-5xl font-bold text-[#E5E5E5] mb-4 block">0{idx + 1}</span>
                <h3 className="text-lg font-semibold mb-2">{result.title}</h3>
                <p className="text-body-sm text-[#8A8A8A]">{result.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialMarquee />

      {/* Pricing - 3 boxes */}
      <section className="section-padding bg-white">
        <div className="content-max-width">
          <div className="text-center mb-16">
            <h2 className="text-h2">교육 비용</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div key={plan.name} className="border border-[#E5E5E5] rounded-2xl p-8 md:p-10 h-full flex flex-col bg-white hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-semibold mb-3">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                </div>
                <div className="border-t border-[#E5E5E5] pt-5 mb-6 flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm text-[#8A8A8A]">
                        <Check className="w-4 h-4 text-[#1A1A1A] flex-shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                </div>
                {plan.key === 'online' ? (
                  <a href="https://www.latpeed.com/products/hcl18" target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-[#1A1A1A] text-white text-center font-semibold rounded-full">{plan.buttonText}</a>
                ) : plan.key === 'consulting' ? (
                  <a href="https://www.latpeed.com/products/vbuTb" target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-[#1A1A1A] text-white text-center font-semibold rounded-full">{plan.buttonText}</a>
                ) : plan.key === 'enterprise' ? (
                  <a href="https://www.latpeed.com/products/GBpLE" target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-[#1A1A1A] text-white text-center font-semibold rounded-full">{plan.buttonText}</a>
                ) : (
                  <button onClick={() => setShowComingSoon(true)} className="block w-full py-3 bg-[#1A1A1A] text-white text-center font-semibold rounded-full cursor-pointer">{plan.buttonText}</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
