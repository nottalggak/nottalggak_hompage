export default function Contact() {
  return (
    <main className="pt-16 min-h-screen bg-white flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-h1 mb-3">문의하기</h1>
        <p className="text-body text-[#8A8A8A] mb-24">협업 및 광고 관련 문의는 아래 채널로 부탁드립니다.</p>
        <div className="space-y-10">
          <div>
            <p className="text-sm text-[#8A8A8A] mb-2">이메일</p>
            <a href="mailto:nottalggak@gmail.com" className="text-xl md:text-2xl font-semibold hover:text-[#8A8A8A] transition-colors">
              nottalggak@gmail.com
            </a>
          </div>
          <div>
            <p className="text-sm text-[#8A8A8A] mb-2">인스타그램</p>
            <a href="https://www.instagram.com/nottalggak/" target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl font-semibold hover:text-[#8A8A8A] transition-colors">
              @nottalggak
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
