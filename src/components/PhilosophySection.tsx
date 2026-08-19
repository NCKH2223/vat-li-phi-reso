import React from 'react';
import { BrainCircuit, Sparkles, Waves, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { ResonanceDemo } from './ResonanceDemo';
import { PHILOSOPHY_PILLARS } from '../data/courseData';

interface PhilosophySectionProps {
  onScrollToForm: () => void;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({ onScrollToForm }) => {
  const iconMap: Record<string, React.ReactNode> = {
    BrainCircuit: <BrainCircuit className="w-5 h-5 text-sky-700" />,
    Sparkles: <Sparkles className="w-5 h-5 text-amber-600" />,
    Waves: <Waves className="w-5 h-5 text-sky-700" />,
    Users: <Users className="w-5 h-5 text-emerald-600" />,
  };

  return (
    <section id="philosophy-section" className="py-12 sm:py-16 bg-white border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-800 text-xs font-bold mb-3">
            <span className="font-serif font-bold text-sky-600">Φ</span>
            <span>TRIẾT LÝ GIẢNG DẠY CỐT LÕI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Vì Sao Học Sinh Tại <span className="text-sky-700">Φ.RESO</span> Yêu Thích & Tiến Bộ Nhanh?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Thay vì ép buộc học sinh nhồi nhét công thức thụ động, phương pháp Φ.RESO đánh thức khả năng phân tích logic tự nhiên.
          </p>
        </div>

        {/* 2-Column layout: 4 Pillars & Resonance Interactive Demo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* 4 Pillars */}
          <div className="lg:col-span-7 space-y-4">
            {PHILOSOPHY_PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-sky-200 hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                    {iconMap[pillar.icon] || <CheckCircle2 className="w-5 h-5 text-sky-600" />}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1 group-hover:text-sky-800 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resonance Interactive Component */}
          <div className="lg:col-span-5">
            <ResonanceDemo />
          </div>

        </div>

        {/* Comparison table: Học Vẹt vs Phương Pháp Φ.RESO */}
        <div className="mt-12 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl overflow-hidden">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider">
              BẢNG SO SÁNH PHƯƠNG PHÁP
            </span>
            <h3 className="text-xl sm:text-2xl font-bold mt-1">
              Sự Khác Biệt Giữa Học Vẹt &amp; Học Tư Duy Bản Chất
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            {/* Old Way */}
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-rose-500/30">
              <div className="flex items-center gap-2 text-rose-400 font-bold mb-3">
                <span className="text-base">❌</span>
                <span>Cách Học Truyền Thống / Học Vẹt</span>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 shrink-0">•</span>
                  <span>Ghi nhớ máy móc hơn 200+ công thức rời rạc, dễ quên khi vào phòng thi.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 shrink-0">•</span>
                  <span>Đổi số liệu hoặc đổi cách hỏi của đề bài là lập tức bế tắc.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 shrink-0">•</span>
                  <span>Mất 5-7 phút cho một câu vận dụng cao vì giải theo lối mòn dài dòng.</span>
                </li>
              </ul>
            </div>

            {/* Φ.RESO Way */}
            <div className="p-4 rounded-2xl bg-sky-950/60 border border-sky-400/40">
              <div className="flex items-center gap-2 text-sky-300 font-bold mb-3">
                <span className="text-base">✨</span>
                <span>Phương Pháp Vật Lí Φ.RESO (Cô Châu Đoan)</span>
              </div>
              <ul className="space-y-2 text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 shrink-0">✓</span>
                  <span>Chỉ cần 5-7 nguyên lý gốc, tự suy luận ra mọi công thức nhánh.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 shrink-0">✓</span>
                  <span>Nhìn thấu hiện tượng thực tế, tự tin giải mọi đề mới lạ và đề ĐGNL.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 shrink-0">✓</span>
                  <span>Kỹ thuật sơ đồ hoá giúp rút ngắn thời gian giải chỉ còn 30s - 90s/câu.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={onScrollToForm}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <span>Trải Nghiệm Phương Pháp Ngay Trong Buổi Học Thử</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
