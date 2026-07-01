import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import FAQSection from '../components/FAQSection';
import ComingSoonPopup from '../components/ComingSoonPopup';



type PlanFeature = string | { main: string; sub: string };

const plans: { name: string; duration: string; price: string; features: PlanFeature[]; uses: string[]; popular?: boolean }[] = [
  {
    name: 'Lite',
    duration: '15초 내외',
    price: '₩490,000',
    features: ['기획안 제공 (맞춤형 디자인)', '3~5개 장면 구성', 'AI 나레이션 포함', '자막 포함', '배경음악(BGM) 포함', '수정 2회', { main: 'AI 이미지 3장 (15만원 상당)', sub: '기본 수정 이미지 당 2회 (총 6회)' }],
    uses: ['인스타그램 릴스', '유튜브 쇼츠', '틱톡 콘텐츠', '이벤트 홍보', '제품 티저 영상'],
  },
  {
    name: 'Standard',
    duration: '30초 내외',
    price: '₩790,000',
    features: ['기획안 제공 (맞춤형 디자인)', '5~10개 장면 구성', 'AI 나레이션 포함', '자막 포함', '배경음악(BGM) 포함', '수정 3회', { main: 'AI 이미지 3장 (15만원 상당)', sub: '기본 수정 이미지 당 2회 (총 6회)' }],
    uses: ['브랜드 소개', '제품 소개', '서비스 홍보', '홈페이지 메인 영상', 'SNS 광고 콘텐츠'],
    popular: true,
  },
  {
    name: 'Signature',
    duration: '1분 내외',
    price: '₩1,500,000',
    features: ['기획안 제공 (맞춤형 디자인)', '스토리보드 제공', '10개 이상 장면 구성', 'AI 나레이션 포함', '자막 포함', '배경음악(BGM) 포함', '수정 4회', { main: 'AI 이미지 3장 (15만원 상당)', sub: '기본 수정 이미지 당 2회 (총 6회)' }],
    uses: ['브랜드 필름', '캠페인 영상', '프리미엄 광고 콘텐츠', '기업 및 기관 홍보 영상'],
  },
];

const faqItems = [
  { question: '제작 기간은 얼마나 걸리나요?', answer: '프로젝트 규모에 따라 다르지만, 일반적으로 상담 후 7~14일 내에 최종 납품이 가능합니다. 긴급 프로젝트는 별도 협의 가능합니다.' },
  { question: '수정은 몇 회 가능한가요?', answer: '옵션 별로 기본 2회, 3회, 4회의 수정이 포함되어 있습니다. 추가 수정이 필요한 경우 유상으로 진행됩니다.' },
  { question: '저작권은 어떻게 되나요?', answer: '최종 납품 후 모든 저작권은 의뢰인에게 이전됩니다. 2차 활용 등에 자유롭게 사용할 수 있습니다.' },
];

function PlanModal({ plan, onClose }: { plan: typeof plans[0]; onClose: () => void }) {
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

  return (
    <div className="modal-overlay fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full p-8 md:p-10 shadow-2xl relative max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center z-10">
          <X className="w-5 h-5" />
        </button>
        <div className="text-center mb-6">
          <h3 className="text-h3 mb-1">{plan.name}</h3>
          <p className="text-sm text-[#8A8A8A]">{plan.duration}</p>
          <p className="text-3xl font-bold mt-3">{plan.price}</p>
        </div>

        <div className="border-t border-[#E5E5E5] pt-6 mb-6">
          <p className="text-sm font-semibold text-[#1A1A1A] mb-4">포함 내용</p>
          <ul className="space-y-3">
            {plan.features.map((f, idx) => {
              if (typeof f === 'object') {
                return (
                  <li key={idx}>
                    <div className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-[#1A1A1A] flex-shrink-0" />
                      <span className="text-sm text-[#1A1A1A]">{f.main}</span>
                    </div>
                    <p className="text-xs text-[#8A8A8A] ml-7 mt-1">{f.sub}</p>
                  </li>
                );
              }
              return (
                <li key={f} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#1A1A1A] flex-shrink-0" />
                  <span className="text-sm text-[#1A1A1A]">{f}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mb-8">
          <p className="text-sm font-semibold text-[#1A1A1A] mb-3">추천 용도</p>
          <div className="flex flex-wrap gap-2">
            {plan.uses.map((u) => (
              <span key={u} className="px-3 py-1.5 bg-[#F5F5F5] rounded-full text-xs text-[#8A8A8A]">{u}</span>
            ))}
          </div>
        </div>

        {plan.name.toLowerCase() === 'lite' ? (
          <a href="https://www.latpeed.com/products/5sVWs" target="_blank" rel="noopener noreferrer" onClick={onClose} className="block w-full py-4 bg-[#1A1A1A] text-white text-center font-semibold rounded-full">
            문의하기
          </a>
        ) : plan.name.toLowerCase() === 'standard' ? (
          <a href="https://www.latpeed.com/products/VMKDl" target="_blank" rel="noopener noreferrer" onClick={onClose} className="block w-full py-4 bg-[#1A1A1A] text-white text-center font-semibold rounded-full">
            문의하기
          </a>
        ) : (
          <button onClick={() => setShowComingSoon(true)} className="block w-full py-4 bg-[#1A1A1A] text-white text-center font-semibold rounded-full cursor-pointer">
            문의하기
          </button>
        )}
      </div>
    </div>
  );
}

export default function Production() {
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="pt-28 md:pt-40 pb-20 md:pb-28 bg-white text-center">
        <div className="content-max-width">
          <h1 className="text-h1 mb-5 animate-fade-up">
            브랜드가 효율적으로<br />더 많은 돈을 벌 수 있도록.
          </h1>
        </div>
      </section>

      {/* Portfolio */}
      <section className="section-padding bg-[#F5F5F5]">
        <div className="content-max-width">
          <div className="mb-12">
            <h2 className="text-h2">제작 포트폴리오</h2>
          </div>
          <div className="text-center py-20">
            <p className="text-lg text-[#8A8A8A]">준비 중입니다.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding bg-white">
        <div className="content-max-width">
          <div className="text-center mb-12">
            <h2 className="text-h2">제작 비용</h2>
            <p className="text-body text-[#8A8A8A] mt-3">각 옵션을 클릭해 자세한 내용을 확인하세요</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">
            {plans.map((plan) => (
              <button
                key={plan.name}
                onClick={() => setSelectedPlan(plan)}
                className={`text-left bg-white border border-[#E5E5E5] rounded-2xl p-8 md:p-10 h-full flex flex-col hover:scale-105 transition-transform duration-300 cursor-pointer group relative ${plan.popular ? 'ring-2 ring-[#1A1A1A]' : ''}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#1A1A1A] text-white text-xs font-semibold rounded-full">인기</span>
                )}
                <div className="text-center flex-1 flex flex-col items-center justify-center">
                  <h4 className="text-xl font-semibold mb-2">{plan.name}</h4>
                  <p className="text-sm text-[#8A8A8A] mb-4">{plan.duration}</p>
                  <span className="text-3xl font-bold">{plan.price}</span>
                </div>
                <span className="text-sm font-medium text-[#8A8A8A] group-hover:text-[#1A1A1A] transition-colors text-center mt-6">
                  자세히 보기 &rarr;
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedPlan && <PlanModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />}

      <FAQSection title="자주 묻는 질문" items={faqItems} />
    </main>
  );
}
