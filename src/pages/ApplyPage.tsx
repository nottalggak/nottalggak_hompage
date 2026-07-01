import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      {children}
    </div>
  );
}

function PillSelect({ options, selected, onSelect }: { options: string[]; selected: string; onSelect: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onSelect(opt)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium ${selected === opt ? 'bg-[#1A1A1A] text-white' : 'bg-[#F5F5F5] text-[#8A8A8A]'}`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

/* ==================== 제출 완료 화면 ==================== */
function SubmitSuccess({ title, subTitle, backLink, backText }: { title: string; subTitle: string; backLink: string; backText: string }) {
  return (
    <div className="bg-white rounded-2xl p-8 md:p-12 text-center">
      <CheckCircle className="w-16 h-16 text-[#1A1A1A] mx-auto mb-6" strokeWidth={1.5} />
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-body text-[#555555] mb-8 leading-relaxed">{subTitle}</p>
      <Link to={backLink} className="inline-flex items-center justify-center px-6 py-3 bg-[#1A1A1A] text-white text-sm font-semibold rounded-full">
        {backText}
      </Link>
    </div>
  );
}

/* ==================== 개인정보 동의 공통 컴포넌트 ==================== */
function PrivacyConsent({ agreed, onChange, purpose = '신청 및 운영' }: { agreed: boolean; onChange: (v: boolean) => void; purpose?: string }) {
  return (
    <div className="border border-[#E5E5E5] rounded-xl p-6">
      <h4 className="text-base font-semibold mb-4">개인정보 수집 및 이용 동의</h4>
      <p className="text-sm text-[#8A8A8A] mb-4">{purpose}을 위해 아래와 같은 개인정보를 수집·이용합니다.</p>
      <div className="bg-[#F5F5F5] rounded-lg p-4 mb-4 space-y-2 text-sm text-[#8A8A8A]">
        <p><strong className="text-[#1A1A1A]">수집 항목:</strong> 이름, 연락처, 이메일 주소, 신청서 응답 내용</p>
        <p><strong className="text-[#1A1A1A]">이용 목적:</strong> 신청 접수, 안내 및 공지 전달, 상담 및 회신</p>
        <p><strong className="text-[#1A1A1A]">보유 및 이용 기간:</strong> 서비스 종료 후 1년 또는 관련 법령에 따른 보관 기간까지</p>
      </div>
      <p className="text-sm text-[#8A8A8A] mb-4">수집된 개인정보는 위 목적 외에는 사용되지 않으며, 관련 법령에 따라 안전하게 관리됩니다.</p>
      <p className="text-sm text-[#1A1A1A] mb-4">※ 개인정보 수집 및 이용에 동의하지 않을 경우 신청이 불가능합니다.</p>
      <label className="flex items-start gap-3 cursor-pointer">
        <input type="checkbox" checked={agreed} onChange={(e) => onChange(e.target.checked)} className="w-5 h-5 mt-0.5 rounded border-[#E5E5E5] accent-[#1A1A1A]" />
        <span className="text-sm text-[#1A1A1A]">위 개인정보 수집 및 이용에 동의합니다. (필수)</span>
      </label>
    </div>
  );
}

/* ==================== 온라인 클래스 ==================== */
function OnlineClassForm() {
  const [submitted, setSubmitted] = useState(false);
  const [experience, setExperience] = useState('');
  const [revenue, setRevenue] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [guideConfirmed, setGuideConfirmed] = useState(false);

  if (submitted) {
    return <SubmitSuccess
      title="신청해주셔서 감사합니다"
      subTitle="작성해주신 내용을 검토한 후, 개별적으로 안내드리겠습니다."
      backLink="/education"
      backText="교육 페이지로 돌아가기"
    />;
  }

  return (
    <form className="bg-white rounded-2xl p-8 md:p-12 space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
      <FormField label="이름"><input type="text" required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="이름을 입력해주세요" /></FormField>
      <FormField label="연락처"><input type="tel" required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="010-0000-0000" /></FormField>
      <FormField label="이메일"><input type="email" required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="email@example.com" /></FormField>
      <FormField label="직업/직무"><input type="text" required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="예: 마케터, 디자이너, 크리에이터" /></FormField>
      <FormField label="운영 중인 SNS 링크"><input type="url" className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="없으면 없음이라고 적어주세요" /></FormField>
      <FormField label="AI 콘텐츠 제작 경험"><PillSelect options={['없음', '조금 있음', '있음']} selected={experience} onSelect={setExperience} /></FormField>
      <FormField label="AI 콘텐츠로 100만원 이상 매출 향상 경험"><PillSelect options={['없음', '있음']} selected={revenue} onSelect={setRevenue} /></FormField>
      <FormField label="지원 동기 & 확실하게 배우고 싶은 것">
        <textarea rows={4} required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none resize-none" placeholder="구체적인 답변일수록 원하는 내용을 더 많이, 더 깊게 배울 수 있습니다." />
      </FormField>

      <PrivacyConsent agreed={privacyAgreed} onChange={setPrivacyAgreed} purpose="수업 신청 및 운영" />

      <div className="border border-[#E5E5E5] rounded-xl p-6">
        <h4 className="text-base font-semibold mb-4">수업 안내사항</h4>
        <ul className="space-y-3 text-sm text-[#8A8A8A] mb-6">
          <li className="flex items-start gap-2"><span className="mt-0.5">&#8226;</span>수업은 주 2회 진행됩니다.</li>
          <li className="flex items-start gap-2"><span className="mt-0.5">&#8226;</span>화요일: 이론 교육 및 Q&A</li>
          <li className="flex items-start gap-2"><span className="mt-0.5">&#8226;</span>목요일: 실습 및 피드백</li>
          <li className="flex items-start gap-2"><span className="mt-0.5">&#8226;</span>수업 중 질문과 피드백에는 제한이 없습니다. 궁금한 점은 언제든지 자유롭게 질문해 주세요.</li>
          <li className="flex items-start gap-2"><span className="mt-0.5">&#8226;</span>모집 기간은 2026.06.22 ~ 2026.06.30입니다.</li>
          <li className="flex items-start gap-2"><span className="mt-0.5">&#8226;</span>첫 수업은 2026.07.07에 시작됩니다.</li>
          <li className="flex items-start gap-2"><span className="mt-0.5">&#8226;</span>수업 시작 전, 약 15분 내외의 개별 Zoom 미팅이 진행됩니다. 현재 상황과 목표, 배우고 싶은 내용을 함께 이야기하는 시간이며, 일정은 추후 안내드립니다.</li>
        </ul>
        <label className="flex items-start gap-3 cursor-pointer pt-4 border-t border-[#E5E5E5]">
          <input type="checkbox" checked={guideConfirmed} onChange={(e) => setGuideConfirmed(e.target.checked)} className="w-5 h-5 mt-0.5 rounded border-[#E5E5E5] accent-[#1A1A1A]" />
          <span className="text-sm text-[#1A1A1A]">위 수업 안내사항을 모두 확인했습니다. (필수)</span>
        </label>
      </div>

      <div className="pt-4">
        <p className="text-sm text-[#8A8A8A] mb-4 text-center">위 내용을 모두 확인하셨다면 아래 확인 버튼을 눌러 지원서를 제출해 주세요.</p>
        <button
          type="submit"
          disabled={!privacyAgreed || !guideConfirmed}
          className={`w-full py-4 font-semibold rounded-full ${privacyAgreed && guideConfirmed ? 'bg-[#1A1A1A] text-white' : 'bg-[#E5E5E5] text-[#8A8A8A] cursor-not-allowed'}`}
        >
          확인
        </button>
      </div>
    </form>
  );
}

/* ==================== 1:1 컨설팅 ==================== */
function ConsultingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [guideConfirmed, setGuideConfirmed] = useState(false);

  if (submitted) {
    return <SubmitSuccess
      title="신청해주셔서 감사합니다"
      subTitle="작성해주신 내용을 검토한 후, 개별적으로 안내드리겠습니다."
      backLink="/education"
      backText="교육 페이지로 돌아가기"
    />;
  }

  return (
    <form className="bg-white rounded-2xl p-8 md:p-12 space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
      <FormField label="이름"><input type="text" required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="이름을 입력해주세요" /></FormField>
      <FormField label="연락처"><input type="tel" required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="010-0000-0000" /></FormField>
      <FormField label="이메일"><input type="email" required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="email@example.com" /></FormField>
      <FormField label="현재 직업"><input type="text" required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="예: 프리랜서 크리에이터, 마케터" /></FormField>
      <FormField label="운영 중인 사업체"><input type="text" required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="사업체 이름 또는 개인 브랜드명" /></FormField>
      <FormField label="운영 중인 SNS 링크 (최대 3개)">
        <div className="space-y-3">
          <input type="url" required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="https://" />
          <input type="url" className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="https://" />
          <input type="url" className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="https://" />
        </div>
      </FormField>
      <FormField label="주요 고민 & 목표">
        <textarea rows={4} required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none resize-none" placeholder="구체적인 답변일수록 원하는 내용을 더 많이, 더 깊게 배울 수 있습니다." />
      </FormField>

      <PrivacyConsent agreed={privacyAgreed} onChange={setPrivacyAgreed} purpose="컨설팅 신청 및 운영" />

      <div className="border border-[#E5E5E5] rounded-xl p-6">
        <h4 className="text-base font-semibold mb-4">컨설팅 안내사항</h4>
        <ul className="space-y-3 text-sm text-[#8A8A8A] mb-6">
          <li className="flex items-start gap-2"><span className="mt-0.5">&#8226;</span>컨설팅은 1:1 맞춤형으로 진행됩니다.</li>
          <li className="flex items-start gap-2"><span className="mt-0.5">&#8226;</span>신청 후 개별 일정 조율을 통해 진행됩니다.</li>
          <li className="flex items-start gap-2"><span className="mt-0.5">&#8226;</span>컨설팅 시간 동안 질문에는 제한이 없습니다. 궁금한 점은 무엇이든 자유롭게 질문해 주세요.</li>
          <li className="flex items-start gap-2"><span className="mt-0.5">&#8226;</span>현재 상황, 목표, 보유 역량에 맞춰 맞춤형 피드백과 실행 전략을 제공합니다.</li>
          <li className="flex items-start gap-2"><span className="mt-0.5">&#8226;</span>AI 콘텐츠 제작, 이미지·영상 생성, 워크플로우 구축, 브랜딩 등 원하는 주제를 중심으로 진행할 수 있습니다.</li>
          <li className="flex items-start gap-2"><span className="mt-0.5">&#8226;</span>선발이 완료된 후 컨설팅 일정 및 진행 방식에 대한 상세 안내를 전달드립니다.</li>
          <li className="flex items-start gap-2"><span className="mt-0.5">&#8226;</span>컨설팅 시작 전, 현재 상황과 목표를 파악하기 위한 사전 자료를 요청드릴 수 있습니다.</li>
        </ul>
        <label className="flex items-start gap-3 cursor-pointer pt-4 border-t border-[#E5E5E5]">
          <input type="checkbox" checked={guideConfirmed} onChange={(e) => setGuideConfirmed(e.target.checked)} className="w-5 h-5 mt-0.5 rounded border-[#E5E5E5] accent-[#1A1A1A]" />
          <span className="text-sm text-[#1A1A1A]">위 컨설팅 안내사항을 모두 확인했습니다. (필수)</span>
        </label>
      </div>

      <div className="pt-4">
        <p className="text-sm text-[#8A8A8A] mb-4 text-center">위 내용을 모두 확인하셨다면 아래 확인 버튼을 눌러 지원서를 제출해 주세요.</p>
        <button
          type="submit"
          disabled={!privacyAgreed || !guideConfirmed}
          className={`w-full py-4 font-semibold rounded-full ${privacyAgreed && guideConfirmed ? 'bg-[#1A1A1A] text-white' : 'bg-[#E5E5E5] text-[#8A8A8A] cursor-not-allowed'}`}
        >
          확인
        </button>
      </div>
    </form>
  );
}

/* ==================== 기업 출강 ==================== */
function EnterpriseForm() {
  const [submitted, setSubmitted] = useState(false);
  const [headcount, setHeadcount] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [guideConfirmed, setGuideConfirmed] = useState(false);

  if (submitted) {
    return <SubmitSuccess
      title="문의해주셔서 감사합니다"
      subTitle="작성해주신 내용을 검토한 후, 개별적으로 안내드리겠습니다."
      backLink="/education"
      backText="교육 페이지로 돌아가기"
    />;
  }

  return (
    <form className="bg-white rounded-2xl p-8 md:p-12 space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
      <FormField label="회사명"><input type="text" required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="회사명을 입력해주세요" /></FormField>
      <FormField label="회사 홈페이지"><input type="url" required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="https://" /></FormField>
      <FormField label="담당자 이름"><input type="text" required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="담당자 이름을 입력해주세요" /></FormField>
      <FormField label="직책"><input type="text" required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="예: 팀장, 매니저, HR 담당자" /></FormField>
      <FormField label="연락처"><input type="tel" required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="010-0000-0000" /></FormField>
      <FormField label="이메일"><input type="email" required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="email@example.com" /></FormField>
      <FormField label="예상 참여 인원"><PillSelect options={['5명 이하', '6~10명', '11~20명', '20명 이상']} selected={headcount} onSelect={setHeadcount} /></FormField>
      <FormField label="희망 교육 내용 & 주제">
        <textarea rows={4} required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none resize-none" placeholder="원하시는 AI 콘텐츠 교육 내용과 팀의 현재 수준, 그리고 교육을 통해 달성하고 싶은 목표를 자세히 알려주세요." />
      </FormField>

      <PrivacyConsent agreed={privacyAgreed} onChange={setPrivacyAgreed} purpose="기업 출강 교육 신청" />

      <div className="border border-[#E5E5E5] rounded-xl p-6">
        <h4 className="text-base font-semibold mb-4">기업 출강 교육 안내사항</h4>
        <ul className="space-y-3 text-sm text-[#8A8A8A] mb-6">
          <li className="flex items-start gap-2"><span className="mt-0.5">&#8226;</span>교육은 기업 및 기관을 대상으로 진행되는 1회 오프라인 출강 교육입니다.</li>
          <li className="flex items-start gap-2"><span className="mt-0.5">&#8226;</span>교육 시간은 총 4시간으로 진행됩니다.</li>
          <li className="flex items-start gap-2"><span className="mt-0.5">&#8226;</span>교육 내용은 기업의 업무 환경과 목적에 맞춰 맞춤형으로 구성됩니다.</li>
          <li className="flex items-start gap-2"><span className="mt-0.5">&#8226;</span>교육 중 질문과 피드백에는 제한이 없습니다. 궁금한 점은 언제든지 자유롭게 질문해 주세요.</li>
          <li className="flex items-start gap-2"><span className="mt-0.5">&#8226;</span>교육 대상자의 직무와 AI 활용 수준에 맞춰 난이도를 조정하여 진행합니다.</li>
          <li className="flex items-start gap-2"><span className="mt-0.5">&#8226;</span>출강 확정 후 교육 일정, 준비 사항 등에 대한 상세 안내를 전달드립니다.</li>
          <li className="flex items-start gap-2"><span className="mt-0.5">&#8226;</span>교육 전 원활한 진행을 위해 현재 팀의 상황, 교육 목표, 기대 성과에 대한 사전 정보를 요청드릴 수 있습니다.</li>
        </ul>
        <label className="flex items-start gap-3 cursor-pointer pt-4 border-t border-[#E5E5E5]">
          <input type="checkbox" checked={guideConfirmed} onChange={(e) => setGuideConfirmed(e.target.checked)} className="w-5 h-5 mt-0.5 rounded border-[#E5E5E5] accent-[#1A1A1A]" />
          <span className="text-sm text-[#1A1A1A]">위 기업 출강 교육 안내사항을 모두 확인했습니다. (필수)</span>
        </label>
      </div>

      <div className="pt-4">
        <p className="text-sm text-[#8A8A8A] mb-4 text-center">위 내용을 모두 확인하셨다면 아래 확인 버튼을 눌러 지원서를 제출해 주세요.</p>
        <button
          type="submit"
          disabled={!privacyAgreed || !guideConfirmed}
          className={`w-full py-4 font-semibold rounded-full ${privacyAgreed && guideConfirmed ? 'bg-[#1A1A1A] text-white' : 'bg-[#E5E5E5] text-[#8A8A8A] cursor-not-allowed'}`}
        >
          확인
        </button>
      </div>
    </form>
  );
}

const pageData: Record<string, { title: string; subtitle: string; form: React.ReactNode }> = {
  online: {
    title: '노딸깍 라이브 클래스 지원',
    subtitle: '4기 모집 중 · 4주 커리큘럼 · ₩790,000',
    form: <OnlineClassForm />,
  },
  consulting: {
    title: '1:1 컨설팅 지원',
    subtitle: '7월 모집 중 · 4주 맞춤형 커리큘럼 · ₩1,500,000',
    form: <ConsultingForm />,
  },
  enterprise: {
    title: '기업 출강 문의',
    subtitle: '상시 모집 중 · 맞춤형 커리큘럼 · 별도 문의',
    form: <EnterpriseForm />,
  },
};

/* ==================== 제작 대행 신청 ==================== */
function ProductionForm({ plan }: { plan: string }) {
  const [submitted, setSubmitted] = useState(false);
  const planNames: Record<string, string> = { lite: 'Lite', standard: 'Standard', signature: 'Signature' };
  const planDurations: Record<string, string> = { lite: '15초 내외', standard: '30초 내외', signature: '1분 내외' };
  const planPrices: Record<string, string> = { lite: '₩500,000', standard: '₩900,000', signature: '₩1,500,000' };
  const [videoType, setVideoType] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  if (submitted) {
    return <SubmitSuccess
      title="문의해주셔서 감사합니다"
      subTitle="작성해주신 내용을 검토한 후, 개별적으로 안내드리겠습니다."
      backLink="/production"
      backText="제작 대행 페이지로 돌아가기"
    />;
  }

  return (
    <form className="bg-white rounded-2xl p-8 md:p-12 space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
      <div className="text-center pb-6 border-b border-[#E5E5E5]">
        <p className="text-sm text-[#8A8A8A] mb-1">{planNames[plan]} · {planDurations[plan]}</p>
        <p className="text-2xl font-bold">{planPrices[plan]}</p>
      </div>

      <FormField label="브랜드명"><input type="text" required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="브랜드명 또는 회사명을 입력해주세요" /></FormField>
      <FormField label="홈페이지 링크"><input type="url" className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="https://" /></FormField>
      <FormField label="SNS 링크"><input type="url" className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="https://" /></FormField>
      <FormField label="만들고자 하는 영상 종류"><PillSelect options={['브랜드 광고', '제품 소개', 'SNS 콘텐츠', '기업 홍보', '이벤트', '기타']} selected={videoType} onSelect={setVideoType} /></FormField>
      <FormField label="만들고자 하는 영상에 대한 설명">
        <textarea rows={4} className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none resize-none" placeholder="어떤 영상을 만들고 싶으신지 자유롭게 알려주세요. 아직 아이디어가 구체적이지 않아도 괜찮습니다. 자세한 기획은 상담에서 함께 구체화해드립니다." />
      </FormField>

      <div className="border-t border-[#E5E5E5] pt-6">
        <h4 className="text-base font-semibold mb-4">의뢰자 정보</h4>
        <div className="space-y-4">
          <FormField label="이름"><input type="text" required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="이름을 입력해주세요" /></FormField>
          <FormField label="이메일"><input type="email" required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="email@example.com" /></FormField>
          <FormField label="전화번호"><input type="tel" required className="w-full px-4 py-3.5 border border-[#E5E5E5] rounded-lg text-base focus:border-[#1A1A1A] focus:outline-none" placeholder="010-0000-0000" /></FormField>
        </div>
      </div>

      <PrivacyConsent agreed={privacyAgreed} onChange={setPrivacyAgreed} purpose="제작 의뢰 접수 및 상담" />

      <div className="pt-4">
        <button
          type="submit"
          disabled={!privacyAgreed}
          className={`w-full py-4 font-semibold rounded-full ${privacyAgreed ? 'bg-[#1A1A1A] text-white' : 'bg-[#E5E5E5] text-[#8A8A8A] cursor-not-allowed'}`}
        >
          확인
        </button>
      </div>
    </form>
  );
}

export default function ApplyPage() {
  const { type, plan } = useParams<{ type: string; plan: string }>();

  /* 제작 대행 신청 */
  if (plan && ['lite', 'standard', 'signature'].includes(plan)) {
    return (
      <main className="pt-16">
        <section className="pt-28 md:pt-32 pb-12 bg-white">
          <div className="content-max-width">
            <Link to="/production" className="inline-flex items-center gap-2 text-sm text-[#8A8A8A] mb-6 hover:text-[#1A1A1A] transition-colors">
              <ArrowLeft className="w-4 h-4" /> 제작 대행 페이지로 돌아가기
            </Link>
            <h1 className="text-h1 mb-3">제작 의뢰</h1>
          </div>
        </section>
        <section className="pb-28 md:pb-36 bg-[#F5F5F5]">
          <div className="content-max-width max-w-2xl">
            <ProductionForm plan={plan} />
          </div>
        </section>
      </main>
    );
  }

  const data = type && pageData[type] ? pageData[type] : null;

  if (!data) {
    return (
      <main className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-[#8A8A8A] mb-4">잘못된 접근입니다.</p>
          <Link to="/" className="text-[#1A1A1A] font-medium underline">홈으로 돌아가기</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-16">
      <section className="pt-28 md:pt-32 pb-12 bg-white">
        <div className="content-max-width">
          <Link to="/education" className="inline-flex items-center gap-2 text-sm text-[#8A8A8A] mb-6 hover:text-[#1A1A1A] transition-colors">
            <ArrowLeft className="w-4 h-4" /> 교육 페이지로 돌아가기
          </Link>
          <h1 className="text-h1 mb-3">{data.title}</h1>
          <p className="text-body text-[#8A8A8A]">{data.subtitle}</p>
        </div>
      </section>

      <section className="pb-28 md:pb-36 bg-[#F5F5F5]">
        <div className="content-max-width max-w-2xl">
          {data.form}
        </div>
      </section>
    </main>
  );
}
