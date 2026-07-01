import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const services = [
  {
    name: '제작 대행',
    price: '₩500,000~',
    desc: 'AI 이미지·영상 제작, 패키지 구성',
    features: ['맞춤형 AI 이미지', '영상 콘텐츠', '소셜 미디어 에셋', '수정 2회 포함'],
    cta: '제작 문의하기',
    link: '/contact/production',
  },
  {
    name: '교육',
    price: '₩150,000~',
    desc: '온라인·오프라인·기업 출강',
    features: ['10시간+ 강의', '실습 키트', '프롬프트 템플릿', '평생 수강'],
    cta: '교육 신청하기',
    link: '/contact/education',
  },
  {
    name: '커뮤니티',
    price: '₩29,900/월',
    desc: 'AI 툴 정보·프롬프트·라이브 세션',
    features: ['AI 툴 정보 알림', '프롬프트 공유', '주간 라이브', 'Q&A 기능'],
    cta: '커뮤니티 가입하기',
    link: '/contact/community',
  },
];

export default function Pricing() {
  return (
    <main className="pt-16">
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 bg-white text-center">
        <div className="content-max-width">
          <h1 className="text-h1 mb-4">서비스 가격</h1>
          <p className="text-body text-[#8A8A8A]">투명한 가격으로 시작하세요.</p>
        </div>
      </section>

      <section className="section-padding bg-[#F5F5F5]">
        <div className="content-max-width">
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {services.map((service) => (
              <div key={service.name} className="bg-white rounded-2xl p-10 md:p-12 h-full flex flex-col text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden">
                  <img src="/new_image.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">{service.name}</h2>
                <p className="text-3xl md:text-4xl font-bold mb-3">{service.price}</p>
                <p className="text-body-sm text-[#8A8A8A] mb-6">{service.desc}</p>
                <div className="border-t border-[#E5E5E5] pt-6 mb-8 flex-1">
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-[#1A1A1A] justify-center">
                        <Check className="w-4 h-4 text-[#1A1A1A] flex-shrink-0" />{feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to={service.link} className="block w-full py-3.5 bg-[#1A1A1A] text-white text-center font-semibold rounded-full">
                  {service.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white">
        <div className="content-max-width">
          <p className="text-body-sm text-[#8A8A8A] text-center max-w-xl mx-auto">
            상기 가격은 기준가이며, 프로젝트의 규모와 복잡도에 따라 달라질 수 있습니다. 
            정확한 견적은 문의를 통해 안내해 드립니다.
          </p>
        </div>
      </section>
    </main>
  );
}
