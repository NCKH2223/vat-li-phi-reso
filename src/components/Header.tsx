import React from 'react';
import { Phone, Users, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';
import { CONTACT_INFO } from '../data/courseData';

interface HeaderProps {
  onScrollToForm: () => void;
  onOpenAdmin: () => void;
  regCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onScrollToForm, onOpenAdmin, regCount }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-sky-900 text-white text-xs py-1.5 px-4 text-center">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 font-medium flex-wrap">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-amber-500 text-slate-900 text-[10px] font-bold uppercase tracking-wider">
            Miễn Phí
          </span>
          <span>Suất học thử tương tác 1:1 cùng Cô Châu Đoan - Tặng trọn bộ Sơ đồ Tư duy Vật Lí 2025</span>
          <button
            onClick={onScrollToForm}
            className="underline hover:text-amber-300 font-semibold ml-1 cursor-pointer transition-colors"
          >
            Nhận suất ngay &rarr;
          </button>
        </div>
      </div>

      {/* Main navigation & brand */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-sky-700 to-sky-500 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-sky-500/20 ring-2 ring-sky-100">
            <span className="font-serif">Φ</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                VẬT LÍ <span className="text-sky-700">Φ.RESO</span>
              </span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 hidden sm:inline-block">
                Cô Châu Đoan
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Cộng Hưởng Tư Duy • Nắm Chắc Bản Chất
            </p>
          </div>
        </div>

        {/* Right action buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={`tel:${CONTACT_INFO.hotline.replace(/\s+/g, '')}`}
            className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-sky-700 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Phone className="w-4 h-4 text-sky-600" />
            <span>Hotline: {CONTACT_INFO.hotline}</span>
          </a>

          {/* Admin badge */}
          <button
            type="button"
            onClick={onOpenAdmin}
            title="Xem danh sách đăng ký đã lưu"
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Users className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Danh sách</span>
            <span className="bg-sky-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
              {regCount}
            </span>
          </button>

          {/* CTA Button */}
          <button
            type="button"
            onClick={onScrollToForm}
            className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-600/25 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Đăng Ký Học Thử</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
