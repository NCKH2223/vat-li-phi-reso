import React from 'react';
import { Lightbulb, Brain, Layers, TrendingUp, Sparkles, ArrowRight, Zap } from 'lucide-react';

export const Philosophy: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Hiểu Bản Chất',
      desc: 'Thấu suốt nguyên lí và bản chất của hiện tượng vật lí, nói không với học vẹt công thức.',
      icon: Lightbulb,
      color: 'from-amber-500/10 to-amber-500/5 text-amber-700 border-amber-200',
      badgeColor: 'bg-amber-100 text-amber-900',
    },
    {
      step: '02',
      title: 'Rèn Tư Duy',
      desc: 'Hình thành phản xạ phân tích logic Toán - Lí, định hình phương pháp giải quyết vấn đề.',
      icon: Brain,
      color: 'from-sky-500/10 to-sky-500/5 text-sky-700 border-sky-200',
      badgeColor: 'bg-sky-100 text-sky-900',
    },
    {
      step: '03',
      title: 'Làm Chủ Kỹ Năng',
      desc: 'Thành thạo kỹ thuật giải nhanh, đọc đồ thị chuẩn xác và tối ưu thời gian làm bài.',
      icon: Layers,
      color: 'from-indigo-500/10 to-indigo-500/5 text-indigo-700 border-indigo-200',
      badgeColor: 'bg-indigo-100 text-indigo-900',
    },
    {
      step: '04',
      title: 'Bứt Phá Điểm Số',
      desc: 'Tự tin chinh phục bài toán vận dụng cao và chạm mốc điểm số mơ ước trong các kỳ thi.',
      icon: TrendingUp,
      color: 'from-emerald-500/10 to-emerald-500/5 text-emerald-700 border-emerald-200',
      badgeColor: 'bg-emerald-100 text-emerald-900',
    },
  ];

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 md:p-9 border border-sky-100 shadow-sm relative overflow-hidden">
      
      {/* Decorative background aura */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header Tag */}
      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs sm:text-sm font-bold w-fit mb-4">
        <Zap className="w-4 h-4 text-sky-600 fill-sky-500" />
        <span>TRIẾT LÝ CỘNG HƯỞNG ĐỘT PHÁ</span>
      </div>

      {/* 1. Định nghĩa Hiện tượng Cộng Hưởng */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-sky-900 via-sky-800 to-slate-900 text-white shadow-md relative overflow-hidden mb-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/30">
            <span className="font-serif font-black text-xl sm:text-2xl">Φ</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-xs sm:text-sm font-mono font-bold tracking-wider text-amber-300 uppercase">
              Nguyên Lý Vật Lí
            </h3>
            <p className="text-sm sm:text-base md:text-lg font-medium text-slate-100 leading-relaxed italic">
              &ldquo;Trong Vật lí, cộng hưởng xảy ra khi tần số của ngoại lực cưỡng bằng với tần số dao động riêng của hệ, làm cho biên độ dao động đạt giá trị cực đại.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* 2. Đoạn văn dẫn dắt triết lý */}
      <div className="space-y-3 mb-8">
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
          <strong className="text-sky-800 font-bold">Φ.RESO</strong> được xây dựng từ chính nguyên lí ấy. Mỗi học sinh có một điểm xuất phát, tốc độ tiếp thu và cách tư duy riêng. Vì vậy, <strong className="text-slate-900 font-bold">Φ.RESO không hướng đến một khuôn mẫu chung</strong>, mà tìm kiếm <span className="text-sky-800 font-bold bg-sky-50 px-2 py-0.5 rounded-lg border border-sky-100">“đúng tần số”</span> của từng học sinh – lựa chọn phương pháp phù hợp, khơi dậy động lực và phát huy tối đa tiềm năng của mỗi em.
        </p>
      </div>

      {/* 3. Quy trình 4 bước chuẩn mực (Horizontal Timeline) */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Quy Trình 4 Bước Chuẩn Mực</span>
          </h4>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
            Từng bước vững chắc chạm tới điểm 9+
          </span>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-b ${item.color} border transition-all duration-300 hover:shadow-md hover:-translate-y-1 relative flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-mono font-black px-2.5 py-1 rounded-lg ${item.badgeColor}`}>
                      Bước {item.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h5 className="text-base sm:text-lg font-black text-slate-900 mb-1.5">
                    {item.title}
                  </h5>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Arrow connector on desktop (except last item) */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-slate-200 items-center justify-center text-slate-400 shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};
