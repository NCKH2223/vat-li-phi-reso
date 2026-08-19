import React from 'react';
import { Sparkles, CheckCircle2, Award, BookCheck, ArrowDown, Flame, GraduationCap } from 'lucide-react';
import { RegistrationForm } from './RegistrationForm';
import { RegistrationData } from '../types';

interface HeroProps {
  onSubmitSuccess: (data: RegistrationData) => void;
  onScrollToDetails: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSubmitSuccess, onScrollToDetails }) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 bg-gradient-to-b from-sky-50/70 via-white to-slate-50">
      {/* Background visual elements */}
      <div className="absolute top-0 inset-x-0 h-64 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-200/40 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left column: Value Proposition & Teaching Philosophy Summary */}
          <div className="lg:col-span-7 space-y-6 pt-2">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 border border-sky-200 text-sky-900 text-xs font-bold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-sky-600 animate-ping" />
              <span className="font-semibold">Lớp Học Trực Tuyến & Bồi Dưỡng Đặc Biệt 2025</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Hiểu Sâu <span className="text-sky-700 underline decoration-amber-400 decoration-wavy decoration-2">Bản Chất Hiện Tượng</span>
              <br />
              Bứt Phá Điểm Số <span className="text-slate-900">Vật Lí 10, 11, 12</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Đồng hành cùng <strong className="text-slate-900 font-semibold">Cô Châu Đoan</strong> với phương pháp{' '}
              <strong className="text-sky-700 font-semibold">Φ.RESO (Cộng Hưởng Tư Duy)</strong>.
              Nói KHÔNG với học vẹt công thức rập khuôn — Giúp học sinh nắm trọn logic Toán - Lý và làm chủ mọi dạng bài vận dụng cao.
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                { title: 'Tư Duy Bản Chất 100%', desc: 'Hiểu cội nguồn từng định luật & phương trình' },
                { title: 'Sơ Đồ Φ.RESO Độc Quyền', desc: 'Hệ thống hóa toàn bộ kiến thức 10-11-12' },
                { title: 'Tối Ưu Tốc Độ 30s/câu', desc: 'Kỹ thuật nhận diện dạng bài & bấm máy Casio' },
                { title: 'Học Thử 1:1 Miễn Phí', desc: 'Trực tiếp tương tác và giải đáp cùng Cô Châu Đoan' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-sky-200 transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
                    <p className="text-[11px] text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Quote / Stats */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-900 to-sky-800 text-white shadow-md relative overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 font-serif text-2xl font-bold shrink-0 border border-white/10">
                  Φ
                </div>
                <div className="text-xs sm:text-sm">
                  <p className="text-sky-100 font-medium italic">
                    &ldquo;Khi học sinh hiểu rõ bản chất, Vật Lí không còn là nỗi sợ hãi mà trở thành môn học tư duy đầy thú vị!&rdquo;
                  </p>
                  <p className="text-amber-300 text-xs font-bold mt-1">
                    — Cô Châu Đoan (VẬT LÍ Φ.RESO)
                  </p>
                </div>
              </div>
            </div>

            {/* Quick jump to details */}
            <div className="pt-1 flex items-center gap-3 text-xs text-slate-500">
              <span>Tìm hiểu thêm về phương pháp & lộ trình:</span>
              <button
                type="button"
                onClick={onScrollToDetails}
                className="font-bold text-sky-700 hover:text-sky-900 inline-flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>Xem chi tiết bên dưới</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right column: High-converting Lead Form */}
          <div className="lg:col-span-5">
            <RegistrationForm onSubmitSuccess={onSubmitSuccess} />
          </div>

        </div>
      </div>
    </section>
  );
};
