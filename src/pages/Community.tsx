import { useState, useEffect } from 'react';
import { Check, X, CheckCircle } from 'lucide-react';
import ComingSoonPopup from '../components/ComingSoonPopup';

const benefits = [
  { num: '01', title: '트렌드 큐레이션', desc: '매주 주목해야 할 AI 툴, 업데이트, 바이럴 콘텐츠를 빠르게 공유합니다.' },
  { num: '02', title: '프롬프트 템플릿', desc: '바로 활용할 수 있는 프롬프트 템플릿을 공유합니다.' },
  { num: '03', title: '제작 노하우', desc: '실무에서 사용하는 제작 워크플로우와 노하우를 공유합니다.' },
  { num: '04', title: '레퍼런스 아카이브', desc: '콘텐츠 제작에 참고할 수 있는 국내외 레퍼런스를 공유합니다.' },
  { num: '05', title: 'Q&A', desc: '콘텐츠 제작 과정에서 생기는 궁금증을 자유롭게 질문할 수 있습니다.' },
  { num: '06', title: '챌린지 미션', desc: '주간 제작 미션을 통해 꾸준히 콘텐츠를 만들며 성장할 수 있습니다.' },
  { num: '07', title: '네트워킹', desc: '다양한 분야의 AI 콘텐츠 제작자들과 교류하고 협업할 수 있습니다.' },
  { num: '08', title: 'AI 툴 할인 정보', desc: 'AI 툴 할인, 프로모션 관련 정보를 빠르게 전달합니다.' },
];

const previewContents = [
  {
    category: 'AI 툴',
    title: '힉스필드, 포토샵 & 다빈치 리졸브 지원 시작',
    preview: `1. 힉스필드, 포토샵 & 다빈치 리졸브 지원 시작

이제 힉스필드에서 포토샵과 다빈치 리졸브 연동을 지원합니다.

이제 웬만한 툴 안에서 기존에는 생성만 하고 다른 툴로 넘어가야 했다면, 이제는 실제 작업 환경에서 훨씬 자연스럽게 활용할 수 있게 된 것 같습니다.

사용 방법은 따로 영상으로 정리해 드리겠습니다.

아래 링크 클릭하시면 됩니다.

2. 콘텐츠 3개로 100만 팔로워를 만든 계정

thekumarmethod라는 계정이 요즘 뜹니다.

콘텐츠 3개로 100만 팔로워를 찍었는데, 단순 조회수보다 비즈니스 관점에서 참고할 부분이 많은 거 같아요.

특히 서비스, 강의, 컨설팅, 마케팅처럼 무형 상품을 판매하시는 분들이 따라서 만들어보시면 좋은 콘텐츠인 것 같습니다.

만드는 방법은 아래 PDF에 정리해 드리겠습니다.

3. GPT 5.6 곧 출시 예정

GPT 5.6 관련 이야기가 조금씩 나오고 있습니다.

특히 이미지 생성 품질에서 변화가 크다는 이야기가 있어서 개인적으로 기대하고 있는 업데이트 중 하나입니다.

아직 공개 전이라 확실한 내용은 없지만, 업데이트되면 바로 테스트해보고 결과 공유드리겠습니다.

생각보다 차이가 크면 프롬프트 작성 방식도 일부 바뀔 수 있을 것 같네요.

업데이트되는 대로 다시 정리해서 올리겠습니다.`
  },
  {
    category: '챌린지',
    title: '이번 주 챌린지 미션',
    preview: `본인이 판매하고 있는 상품 또는 서비스의 광고 포스터 만들어보기

조건
• AI만 활용해 제작할 것 (편집 및 후작업 금지)
• 한 줄 광고 카피를 포함할 것
• 9:16, 3:4, 1:1 비율로 각각 제작할 것

완성된 포스터는 사용한 프롬프트와 함께 댓글로 공유해 주세요.

좋았던 점과 개선하면 좋을 부분을 피드백해 드리겠습니다.`
  },
  {
    category: 'Q&A',
    title: '화장품 제형 표현이 진짜 어렵네요..',
    preview: `Q. 화장품 광고 이미지를 만들고 있는데 제형 표현이 생각보다 잘 안됩니다. 크림이나 세럼의 질감을 더 현실적으로 표현하려면 어떻게 해야 하나요?

A. 제형이 잘 안 나오는 경우에는 단순히 "cream texture" 같은 키워드만 넣기보다, 제형의 질감과 빛 표현을 조금 더 구체적으로 설명해주시면 좋습니다!

예를 들어 크림이라면 아래 키워드를 한 번 넣어보세요.

Prompt
luxury skincare cream, smooth glossy texture, rich creamy consistency, soft peaks, silky surface, subtle reflections, premium cosmetic advertising, studio lighting, macro photography, ultra detailed texture, beauty campaign, high-end commercial photography

이 키워드들이 들어가면 크림의 점도나 반사광이 훨씬 자연스럽게 표현되는 경우가 많습니다.

세럼을 만들고 계신다면 아래 프롬프트도 추천드립니다.

Prompt
transparent serum texture, crystal clear liquid, glossy droplets, light reflections, liquid glass effect, premium skincare advertising, macro shot, ultra realistic, luxury beauty campaign

그리고 개인적으로는 "macro photography"를 꼭 넣어보시면 좋을 것 같아요. 제형 표현은 제품 자처보다 촬영 방식의 영향을 더 많이 받는 경우가 많거든요.

추가로 "studio lighting", "subtle reflections", "ultra detailed texture" 같은 키워드도 함께 넣어보세요. 이 조합이 생각보다 효과가 좋아서 뷰티케어 광고 작업할 때 자주 사용하는 편입니다.

한 번 해보시고 또 물어봐주세요!`
  },
  {
    category: '사례',
    title: '릴스 2천만 뷰 터지면 일어나는 일',
    preview: `최근에 올린 영상 하나가 바이럴이 되면서 2천만 뷰가 나왔습니다.
(이제 좀 잠잠해져서 하루에 10만뷰씩 오르고 있네요)

영상 하나로 팔로워가 8천 명 정도 늘었는데, 대부분 해외 팔로워였습니다. 처음에는 이게 좋은 건지 아닌지 조금 애매했습니다. 지금도 애매하긴 합니다.

국내 대상 비즈니스를 하고 있는데 해외 팔로워만 늘어나면 의미가 없으니까요.

그런데 막상 국내외로 제작 문의나 광고·협업 제안은 전월 대비 5배 이상 늘었습니다.

아마 바이럴 영상을 통해 계정에 들어오고, 기존 콘텐츠를 둘러본 뒤 연락하는 경우가 많아진 것 같습니다.

그래서 요즘은 글로벌 콘텐츠를 조회수 콘텐츠보다는 "유입 콘텐츠"에 가깝게 보고 있습니다.

영상 하나가 계속 새로운 사람들을 계정으로 데려오고, 그 사람들이 기존 콘텐츠를 볼륨면서 문의나 협업으로 이어지는 구조가 제일 예쁜 거 같아요.

특히 AI 콘텐츠는 언어보다 비주얼의 영향력이 큰 편이라 글로벌로 도달하기도 상대적으로 쉽고요.

그래서 여러분들도 판매하고 있는 실제 상품이나 서비스가 있다면, 한 번쯤 글로벌 타겟 콘텐츠를 섞어보는 것도 괜찮다고 생각합니다.

저도 아직 실험 중이지만, 좀 더 테스트 해보고 업데이트 드리겠습니다.

(영어 공부 열심히 해야겠네요ㅋㅋ)`
  },
];

const membershipFeatures = [
  '트렌드 큐레이션',
  '프롬프트 템플릿 무제한 사용',
  '제작 노하우 공유',
  '레퍼런스 아카이브 엑세스',
  'Q&A',
  '챌린지 미션 참여',
  '멤버 전용 네트워킹',
  'AI 툴 할인 정보',
];

function PreviewModal({ content, onClose }: { content: typeof previewContents[0]; onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full p-8 md:p-10 shadow-2xl relative max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center z-10">
          <X className="w-5 h-5" />
        </button>
        <span className="inline-block px-3 py-1 bg-[#F5F5F5] rounded-full text-xs text-[#8A8A8A] mb-4">{content.category}</span>
        <h3 className="text-xl font-semibold mb-4">{content.title}</h3>
        <div className="space-y-1">
          {content.preview.split('\n').map((line, idx) => {
            const isNumbered = /^\s*(\d+\.|Q\.|A\.)/.test(line);
            return line.trim() ? (
              <p key={idx} className={`text-sm leading-relaxed ${isNumbered ? 'text-[#1A1A1A] font-semibold' : 'text-[#8A8A8A]'}`}>{line}</p>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}

/* ==================== 가입 신청 모달 ==================== */
function JoinModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handleEsc); };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full p-8 md:p-10 shadow-2xl relative max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center z-10">
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-[#1A1A1A] mx-auto mb-6" strokeWidth={1.5} />
            <h3 className="text-2xl font-bold mb-4">신청이 완료되었습니다</h3>
            <p className="text-body text-[#555555] mb-8 leading-relaxed">소중한 신청 감사합니다. 남겨주신 연락처로 검토 후 회신드리겠습니다.</p>
            <button onClick={onClose} className="inline-flex items-center justify-center px-6 py-3 bg-[#1A1A1A] text-white text-sm font-semibold rounded-full">
              닫기
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-h3 mb-6">커뮤니티 가입 신청</h3>
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <div>
                <label className="block text-sm font-medium mb-2">이름</label>
                <input type="text" required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="이름을 입력해주세요" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">이메일</label>
                <input type="email" required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="email@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">전화번호</label>
                <input type="tel" required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="010-0000-0000" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">현재 하고 있는 일</label>
                <input type="text" required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="예: 마케터, 디자이너, 프리랜서" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">가장 배우고 싶은 것</label>
                <textarea rows={3} required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none resize-none" placeholder="커뮤니티에서 가장 배우고 싶은 것을 적어주세요." />
              </div>

              {/* 개인정보 동의 */}
              <div className="border border-[#E5E5E5] rounded-xl p-5">
                <h4 className="text-sm font-semibold mb-3">개인정보 수집 및 이용 동의</h4>
                <p className="text-xs text-[#8A8A8A] mb-3">커뮤니티 가입 및 운영을 위해 아래와 같은 개인정보를 수집·이용합니다.</p>
                <div className="bg-[#F5F5F5] rounded-lg p-3 mb-3 space-y-1 text-xs text-[#8A8A8A]">
                  <p><strong className="text-[#1A1A1A]">수집 항목:</strong> 이름, 연락처, 이메일 주소</p>
                  <p><strong className="text-[#1A1A1A]">이용 목적:</strong> 가입 안내, 커뮤니티 운영, 공지 전달</p>
                  <p><strong className="text-[#1A1A1A]">보유 기간:</strong> 서비스 종료 후 1년</p>
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={privacyAgreed} onChange={(e) => setPrivacyAgreed(e.target.checked)} className="w-5 h-5 mt-0.5 rounded border-[#E5E5E5] accent-[#1A1A1A]" />
                  <span className="text-sm text-[#1A1A1A]">위 개인정보 수집 및 이용에 동의합니다. (필수)</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={!privacyAgreed}
                className={`w-full py-4 font-semibold rounded-full ${privacyAgreed ? 'bg-[#1A1A1A] text-white' : 'bg-[#E5E5E5] text-[#8A8A8A] cursor-not-allowed'}`}
              >
                확인
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function Community() {
  const [selectedPreview, setSelectedPreview] = useState<typeof previewContents[0] | null>(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="pt-28 md:pt-40 pb-20 md:pb-28 bg-white text-center overflow-hidden">
        <div className="content-max-width">
          <h1 className="text-h1 mb-5 animate-fade-up">
            혼자보단 함께가<br />더 빠르게 성장하니까.
          </h1>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-[#F5F5F5]">
        <div className="content-max-width">
          <div className="text-center mb-16">
            <h2 className="text-h2">커뮤니티에서 제공하는 것</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-2xl p-6 md:p-8 text-center">
                <span className="text-4xl font-bold text-[#E5E5E5] mb-4 block">{benefit.num}</span>
                <h3 className="text-base font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-[#8A8A8A]">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview */}
      <section className="section-padding bg-white">
        <div className="content-max-width">
          <div className="text-center mb-12">
            <h2 className="text-h2">커뮤니티 미리보기</h2>
            <p className="text-body text-[#8A8A8A] mt-3">각 카드를 클릭해 자세한 내용을 확인해보세요.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {previewContents.map((content) => (
              <button
                key={content.title}
                onClick={() => setSelectedPreview(content)}
                className="text-left border border-[#E5E5E5] rounded-xl p-6 hover:border-[#1A1A1A] hover:bg-[#FAFAFA] transition-all cursor-pointer"
              >
                <span className="inline-block px-3 py-1 bg-[#F5F5F5] rounded-full text-xs text-[#8A8A8A] mb-3">{content.category}</span>
                <h4 className="text-base font-semibold mb-2 line-clamp-1">{content.title}</h4>
                <p className="text-sm text-[#8A8A8A] line-clamp-2">{content.preview.split('\n')[0]}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedPreview && <PreviewModal content={selectedPreview} onClose={() => setSelectedPreview(null)} />}
      {showJoinModal && <JoinModal onClose={() => setShowJoinModal(false)} />}
      {showComingSoon && <ComingSoonPopup onClose={() => setShowComingSoon(false)} />}

      {/* Pricing */}
      <section className="section-padding bg-[#F5F5F5]">
        <div className="content-max-width">
          <div className="text-center mb-16">
            <h2 className="text-h2">노딸깍 멤버십</h2>
          </div>
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl p-10 md:p-12 text-center">
              <div className="mb-6">
                <span className="text-5xl md:text-6xl font-bold">₩11,000</span>
                <span className="text-lg text-[#8A8A8A] ml-1">/월</span>
              </div>
              <div className="border-t border-[#E5E5E5] pt-6 mb-8">
                <ul className="space-y-4 text-left">
                  {membershipFeatures.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-[#1A1A1A]">
                      <Check className="w-4 h-4 text-[#1A1A1A] flex-shrink-0" />{feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={() => setShowComingSoon(true)} className="block w-full py-4 bg-[#1A1A1A] text-white text-center font-semibold rounded-full cursor-pointer">
                커뮤니티 가입 신청
              </button>
              <p className="text-xs text-[#8A8A8A] mt-4">언제든 해지 가능.</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
