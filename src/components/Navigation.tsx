import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: '홈', path: '/' },
  { label: '제작 대행', path: '/production' },
  { label: '교육', path: '/education' },
  { label: '커뮤니티', path: '/community' },
  { label: '포트폴리오', path: '/portfolio' },
  { label: '기타 문의', path: '/contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-black/5' : 'bg-transparent'}`}>
      <div className="content-max-width flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-bold text-[#1A1A1A] tracking-tight">노딸깍</Link>

        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className={`relative text-[15px] font-medium ${isActive(item.path) ? 'text-[#1A1A1A]' : 'text-[#8A8A8A]'}`}>
              {item.label}
              {isActive(item.path) && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#1A1A1A] rounded-full" />}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link to="/ai-test" className="inline-flex items-center px-6 py-2.5 bg-[#1A1A1A] text-white text-sm font-semibold rounded-full">AI 레벨 테스트하기</Link>
        </div>

        <button className="lg:hidden flex flex-col gap-1.5 p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <span className={`block w-5 h-0.5 bg-[#1A1A1A] ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[#1A1A1A] ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[#1A1A1A] ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-lg">
          <div className="content-max-width py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className={`px-4 py-3 rounded-lg text-base font-medium ${isActive(item.path) ? 'bg-[#1A1A1A] text-white' : 'text-[#8A8A8A]'}`}>{item.label}</Link>
            ))}
            <Link to="/ai-test" className="px-4 py-3 mt-2 bg-[#1A1A1A] text-white rounded-lg text-base font-semibold text-center">AI 레벨 테스트하기</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
