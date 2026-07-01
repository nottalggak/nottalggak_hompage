import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function NoticePopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setShow(false); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    const hidePermanently = localStorage.getItem('notice_hide_permanent');
    const hideUntil = localStorage.getItem('notice_hide_24h');
    
    if (hidePermanently === 'true') {
      setShow(false);
      return;
    }
    
    if (hideUntil) {
      const untilTime = parseInt(hideUntil, 10);
      if (Date.now() < untilTime) {
        setShow(false);
        return;
      }
    }
    
    setShow(true);
  }, []);

  const handleClose = () => setShow(false);

  const handleHide24h = () => {
    const until = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem('notice_hide_24h', until.toString());
    setShow(false);
  };

  const handleHidePermanent = () => {
    localStorage.setItem('notice_hide_permanent', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={handleClose}>
      <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center">
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-lg font-bold mb-5">📢 안내드립니다</h3>
        
        <div className="space-y-4 text-sm text-[#555555] leading-relaxed">
          <p>
            현재 기존에 이용하던 플랫폼을 정리하고, 새로운 홈페이지로 이전하는 작업을 진행하고 있습니다.
          </p>
          <p>
            아직 결제 시스템이 완전히 구축되지 않아 일부 서비스 이용에 불편이 있을 수 있습니다. 이용에 참고 부탁드립니다.
          </p>
          <p>
            서비스 신청 및 결제 관련 문의, 협업 제안, 기타 문의는 아래 연락처를 통해 남겨주시면 빠르게 확인 후 안내드리겠습니다.
          </p>
          <div className="bg-[#F5F5F5] rounded-xl p-4 space-y-2">
            <p className="flex items-center gap-2">
              <span className="text-xs text-[#8A8A8A]">📧 Email</span>
              <span className="font-medium">nottalggak@gmail.com</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-xs text-[#8A8A8A]">📷 Instagram</span>
              <span className="font-medium">@nottalggak</span>
            </p>
          </div>
          <p className="text-[#8A8A8A] text-xs">
            더 나은 서비스를 제공하기 위해 준비 중입니다. 감사합니다.
          </p>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={handleHide24h} className="flex-1 py-3 border border-[#E5E5E5] text-sm text-[#8A8A8A] rounded-full hover:bg-[#F5F5F5] transition-colors">
            24시간 동안 그만보기
          </button>
          <button onClick={handleHidePermanent} className="flex-1 py-3 bg-[#1A1A1A] text-white text-sm font-medium rounded-full hover:bg-[#333333] transition-colors">
            그만보기
          </button>
        </div>
      </div>
    </div>
  );
}
