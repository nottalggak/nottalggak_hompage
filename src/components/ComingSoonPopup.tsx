import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function ComingSoonPopup({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handleEsc); };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-sm w-full p-8 shadow-2xl relative text-center" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center">
          <X className="w-4 h-4" />
        </button>
        <h3 className="text-xl font-bold mb-3">준비 중입니다</h3>
        <p className="text-sm text-[#8A8A8A] leading-relaxed">준비되는 대로 안내드리겠습니다.</p>
      </div>
    </div>
  );
}
