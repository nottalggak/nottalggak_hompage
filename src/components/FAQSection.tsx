import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  items: FAQItem[];
}

export default function FAQSection({ title = '자주 묻는 질문', items }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-[#F5F5F5]">
      <div className="content-max-width">
        <h2 className="text-h1 text-center mb-16">{title}</h2>
        <div className="max-w-[800px] mx-auto space-y-3">
          {items.map((item, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-6 md:px-8 py-5 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-base md:text-lg font-semibold pr-4">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 text-[#8A8A8A] ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                className={`overflow-hidden ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="px-6 md:px-8 pb-5 text-[#8A8A8A] text-sm md:text-base leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
