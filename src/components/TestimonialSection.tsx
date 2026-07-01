import { Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initial: string;
}

interface TestimonialSectionProps {
  title?: string;
  testimonials: Testimonial[];
}

export default function TestimonialSection({ title = '고객 후기', testimonials }: TestimonialSectionProps) {
  return (
    <section className="section-padding bg-white">
      <div className="content-max-width">
        <h2 className="text-h1 text-center mb-16">{title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-[#E5E5E5] rounded-2xl p-8 md:p-10"
            >
              <Quote className="w-10 h-10 text-[#F5D0C5] mb-4" strokeWidth={1.5} />
              <p className="text-body text-[#1A1A1A] leading-relaxed mb-8">
                {item.quote}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white font-semibold text-sm">
                  {item.initial}
                </div>
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-[#8A8A8A]">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
