import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const clientLogos = [
  '/logos/logo1.png',
  '/logos/logo2.png',
  '/logos/logo3.png',
  '/logos/logo4.png',
  '/logos/logo5.png',
  '/logos/logo6.png',
  '/logos/logo7.png',
  '/logos/logo8.png',
  '/logos/logo9.png',
];

const whyChoose = [
  { num: '01', title: '100+ 기업이 선택한 AI 파트너', desc: '스타트업부터 대기업까지, 국내외 다양한 규모와 업종의 브랜드와 함께 AI 프로젝트를 진행하고 있습니다.' },
  { num: '02', title: '7년간의 영상 제작 경험', desc: '뮤직비디오, 광고, 브랜드 콘텐츠까지. 다양한 상업 프로젝트를 통해 콘텐츠 제작 경험을 쌓아왔습니다.' },
  { num: '03', title: '현업 AI 콘텐츠 크리에이터', desc: 'AI 시장은 매주 바뀝니다. 2.4만 팔로워들에게 새로운 툴과 트렌드를 직접 테스트하고, 검증된 방법을 공유하고 있습니다.' },
];

const targetLines = ['AI 영상,', '새로운 시대의', '생존 기술.'];
const enChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
const koChars = 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ가나다라마바사아자차카타파하';

function DecodingText({ text, isActive, delay, lang }: { text: string; isActive: boolean; delay: number; lang: 'en' | 'ko' }) {
  const [display, setDisplay] = useState('');
  const pool = lang === 'en' ? enChars : koChars;

  useEffect(() => {
    if (!isActive) return;
    const timer = setTimeout(() => {
      let iteration = 0;
      const maxIterations = 18;
      const interval = setInterval(() => {
        const progress = iteration / maxIterations;
        const revealed = Math.floor(progress * text.length);
        let result = '';
        for (let i = 0; i < text.length; i++) {
          if (i < revealed) {
            result += text[i];
          } else {
            result += pool[Math.floor(Math.random() * pool.length)];
          }
        }
        setDisplay(result);
        iteration++;
        if (iteration > maxIterations) {
          setDisplay(text);
          clearInterval(interval);
        }
      }, 40 + iteration * 4);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [isActive, delay, text, pool]);

  return <span>{display || (isActive ? '' : '\u00A0'.repeat(text.length))}</span>;
}

const chartDataBase = [
  { year: '2023년', value: '약 6,600억 원', height: 44 },
  { year: '2024년', value: '약 7,200억 원', height: 48 },
  { year: '2025년', value: '약 3조 원', height: 200 },
];

function AboutModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        navigate('/');
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handleEsc); };
  }, [onClose, navigate]);

  return (
    <div className="modal-overlay fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => { onClose(); navigate('/'); }}>
      <div className="bg-white rounded-2xl max-w-lg w-full p-8 md:p-10 shadow-2xl relative max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => { onClose(); navigate('/'); }} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center z-10">
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <img src="/hero_image.png" alt="노딸깍" className="w-28 h-28 rounded-full object-cover mb-5" />
          <h3 className="text-3xl font-bold mb-1">노딸깍</h3>
          <p className="text-sm text-[#8A8A8A] mb-8">AI Content Creator</p>

          <div className="w-full text-left">
            {/* Career */}
            <div className="mb-8">
              <h4 className="text-lg font-bold text-[#1A1A1A] mb-5 pb-3 border-b border-[#E5E5E5]">경력</h4>
              <div className="space-y-5">
                {[
                  { period: '2026–현재', company: '노딸깍', role: '2.4만 AI 콘텐츠 크리에이터' },
                  { period: '2025–2026', company: 'Pickle', role: 'Head of Pickle Studio' },
                  { period: '2024–2025', company: 'Nonce (논스)', role: '크리에이티브 디렉터' },
                  { period: '2023–2024', company: 'Blob', role: 'Content Lead' },
                  { period: '2022–2023', company: 'Gallery STAN', role: 'Video Producer' },
                  { period: '2021–2022', company: '거지탈출', role: '3.2만 콘텐츠 크리에이터' },
                  { period: '2020–2021', company: '나는원균', role: '1.7천 유튜버' },
                ].map((item) => (
                  <div key={item.company} className="flex gap-4">
                    <span className="text-xs text-[#8A8A8A] flex-shrink-0 w-20 text-right pt-0.5">{item.period}</span>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">{item.company}</p>
                      <p className="text-sm text-[#8A8A8A]">{item.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expertise */}
            <div className="bg-[#F5F5F5] rounded-xl p-5">
              <h4 className="text-sm font-semibold text-[#1A1A1A] mb-3">전문 분야</h4>
              <ul className="space-y-2 text-sm text-[#555555]">
                <li className="flex items-start gap-2">
                  <span className="text-[#8A8A8A] flex-shrink-0">&#8226;</span>
                  <span>AI 콘텐츠 제작</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8A8A8A] flex-shrink-0">&#8226;</span>
                  <span>AI 교육 및 컨설팅</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8A8A8A] flex-shrink-0">&#8226;</span>
                  <span>브랜드 콘텐츠 전략</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8A8A8A] flex-shrink-0">&#8226;</span>
                  <span>햄버거 마스터</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [startAnimation, setStartAnimation] = useState(false);
  const [chartVisible, setChartVisible] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setStartAnimation(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setChartVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (chartRef.current) observer.observe(chartRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="min-h-[78vh] flex items-center pt-16">
        <div className="content-max-width w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-6">
            <div className="flex-1 lg:flex-[1.5] text-center lg:text-left">
              <h1 className="text-display text-[#1A1A1A] mb-10">
                <DecodingText text={targetLines[0]} isActive={startAnimation} delay={0} lang="en" /><br />
                <DecodingText text={targetLines[1]} isActive={startAnimation} delay={150} lang="ko" /><br />
                <DecodingText text={targetLines[2]} isActive={startAnimation} delay={300} lang="ko" />
              </h1>
              <button
                onClick={() => setShowAbout(true)}
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#1A1A1A] text-sm font-semibold rounded-full border border-[#1A1A1A] animate-bounce-slow"
              >
                노딸깍에 대해 알아보기
              </button>
            </div>
            <div className="flex-1 lg:flex-[0.8] flex justify-center lg:justify-end">
              <img src="/hero_image.png" alt="" className="w-40 md:w-56 lg:w-72 h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Powered by */}
      <section className="pb-16 md:pb-20 bg-white overflow-hidden">
        <div className="content-max-width mb-8">
          <p className="text-xs text-[#8A8A8A] text-center">Powered by</p>
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="logo-track-left flex items-center gap-6">
            {[...clientLogos, ...clientLogos].map((logo, idx) => (
              <div key={idx} className="flex-shrink-0 w-[160px] md:w-[200px] h-[64px] md:h-[76px] flex items-center justify-center px-4">
                <img src={logo} alt="" className="max-w-full max-h-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Investment Bar Chart */}
      <section className="section-padding bg-white">
        <div className="content-max-width max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-h2">AI 콘텐츠 업계 글로벌 투자액</h2>
          </div>
          <div ref={chartRef} className="flex items-end justify-center gap-4 md:gap-8 h-[380px] md:h-[420px]">
            {/* 2023-2025 */}
            {chartDataBase.map((item) => (
              <div key={item.year} className="flex flex-col items-center gap-3 flex-1 max-w-[140px]">
                <div className="w-full flex flex-col items-center">
                  <span className="text-xs md:text-sm font-medium text-[#1A1A1A] mb-2">{item.value}</span>
                  <div
                    className="w-full rounded-t-lg transition-all duration-1000 ease-out bg-[#1A1A1A]"
                    style={{ height: chartVisible ? `${item.height}px` : '0px' }}
                  />
                </div>
                <span className="text-xs text-[#8A8A8A]">{item.year}</span>
              </div>
            ))}
            {/* 2026 — confirmed 2.3trillion (black) + projected to 5trillion (stripe) */}
            <div className="flex flex-col items-center gap-3 flex-1 max-w-[140px]">
              <div className="w-full flex flex-col items-center">
                <span className="text-[10px] md:text-xs font-medium text-[#8A8A8A] mb-2">(예상) 약 5조+</span>
                <div className="w-full flex flex-col-reverse rounded-t-lg overflow-hidden relative" style={{ height: chartVisible ? '333px' : '0px', transition: 'height 1s ease-out' }}>
                  {/* Full projected outline */}
                  <div className="absolute inset-0 rounded-t-lg border-2 border-[#1A1A1A] border-b-0" />
                  {/* Confirmed 2.3trillion — black filled */}
                  <div className="w-full bg-[#1A1A1A]" style={{ height: '153px' }} />
                  {/* Projected 2.3~5trillion — stripe pattern */}
                  <div className="w-full stripe-pattern" style={{ height: '180px' }} />
                </div>
              </div>
              <span className="text-xs text-[#8A8A8A]">2026년</span>
            </div>
          </div>
          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#1A1A1A] rounded-sm" />
              <span className="text-xs text-[#8A8A8A]">확정 투자액</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm stripe-pattern border border-[#1A1A1A]" />
              <span className="text-xs text-[#8A8A8A]">예상 투자액</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="section-padding bg-[#F5F5F5]">
        <div className="content-max-width">
          <div className="text-center mb-16">
            <h2 className="text-h1">왜 노딸깍과<br className="hidden md:block" /> 함께해야 할까요</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {whyChoose.map((item) => (
              <div key={item.num} className="bg-white rounded-2xl p-10 md:p-12 text-center">
                <span className="text-5xl font-bold text-[#E5E5E5] mb-6 block">{item.num}</span>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-body-sm text-[#8A8A8A]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Letter */}
      <section className="section-padding bg-white">
        <div className="content-max-width max-w-3xl mx-auto">
          <div className="bg-[#F5F5F5] rounded-3xl p-10 md:p-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 leading-snug">
              혁고정신(革故鼎新)
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold mb-8 leading-snug text-[#1A1A1A]">
              "낡은 것을 버리고 새롭게 혁신한다"
            </h3>
            <div className="space-y-5 text-body text-[#555555] leading-relaxed">
              <p>
                제가 매달 플래너 첫 장에 적어두는 사자성어입니다.
              </p>
              <p>
                세상은 늘 변해왔고,<br />
                변화를 가장 먼저 받아들인 사람들이 새로운 기회를 가져갔습니다.
              </p>
              <p>
                지금 AI가 그런 변화의 중심에 있습니다.
              </p>
              <p>
                누군가는 AI로 새로운 커리어를 시작하고,<br />
                누군가는 생산성을 10배 높이고,<br />
                누군가는 더 많은 돈을 법니다.
              </p>
              <p>
                낡은 것을 버리고 새롭게 혁신하기에<br />
                더할 나위없이 좋은 상황인 겁니다.
              </p>
              <p>
                변화는 선택이 아닙니다.<br />
                얼마나 빨리 적응하느냐의 문제입니다.
              </p>
              <p>
                저의 경험과 노하우가<br />
                여러분의 혁고정신에 도움이 되었으면 좋겠습니다.
              </p>
            </div>
            <p className="mt-10 text-sm text-[#8A8A8A]">
              노딸깍 드림
            </p>
          </div>
        </div>
      </section>

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}

      {/* Service Explorer */}
      <section className="section-padding bg-[#F5F5F5]">
        <div className="content-max-width">
          <div className="text-center mb-16">
            <h2 className="text-h1">서비스 둘러보기</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { title: '제작 대행', link: '/production' },
              { title: '교육', link: '/education' },
              { title: '커뮤니티', link: '/community' },
            ].map((service) => (
              <Link
                key={service.title}
                to={service.link}
                className="bg-white rounded-2xl p-10 md:p-12 text-center hover:scale-105 transition-transform duration-300 group flex flex-col items-center justify-center gap-4"
              >
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <span className="text-sm font-medium text-[#8A8A8A] group-hover:text-[#1A1A1A] transition-colors">
                  자세히 보기 &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
