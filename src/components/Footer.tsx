import { Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="content-max-width pt-16 pb-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <h3 className="text-2xl font-bold tracking-tight">노딸깍</h3>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/nottalggak/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.youtube.com/@nottalggak" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-[#8A8A8A]">&copy; 2026 노딸깍. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
