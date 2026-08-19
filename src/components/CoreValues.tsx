import React from 'react';
import { Target, Lightbulb, Compass, LineChart, Sparkles, Heart } from 'lucide-react';

export const CoreValues: React.FC = () => {
  const values = [
    {
      title: 'Học đúng trọng tâm',
      desc: 'Lộ trình rõ ràng, phù hợp từng giai đoạn.',
      icon: Target,
      bgColor: 'bg-sky-50/80 hover:bg-sky-50',
      borderColor: 'border-sky-200/70',
      iconColor: 'text-sky-700 bg-sky-100',
    },
    {
      title: 'Hiểu thay vì học thuộc',
      desc: 'Chú trọng vào bản chất và cách tư duy Vật lí.',
      icon: Lightbulb,
      bgColor: 'bg-amber-50/80 hover:bg-amber-50',
      borderColor: 'border-amber-200/70',
      iconColor: 'text-amber-800 bg-amber-100',
    },
    {
      title: 'Luyện tập có định hướng',
      desc: 'Từ nền tảng đến vận dụng và nâng cao.',
      icon: Compass,
      bgColor: 'bg-emerald-50/80 hover:bg-emerald-50',
      borderColor: 'border-emerald-200/70',
      iconColor: 'text-emerald-700 bg-emerald-100',
    },
    {
      title: 'Theo dõi sự tiến bộ',
      desc: 'Nhận diện điểm mạnh, điểm cần cải thiện để điều chỉnh kịp thời.',
      icon: LineChart,
      bgColor: 'bg-indigo-50/80 hover:bg-indigo-50',
      borderColor: 'border-indigo-200/70',
      iconColor: 'text-indigo-700 bg-indigo-100',
    },
  ];

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 md:p-9 border border-slate-200/80 shadow-2xs space-y-6 sm:space-y-8">
      
      {/* Title */}
      <div className="text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold mb-2.5">
          <Heart className="w-4 h-4 text-emerald-600 fill-emerald-500" />
          <span>PHƯƠNG CHÂM GIÁO DỤC</span>
        </div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center justify-center sm:justify-start gap-2">
          <span>🌱 GIÁ TRỊ CỐT LÕI TẠI Φ.RESO</span>
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-1.5 leading-relaxed">
          Tâm huyết và phương pháp giảng dạy mang lại sự chuyển hóa thực chất cho mỗi học sinh
        </p>
      </div>

      {/* 4 Grid Columns with lively icons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {values.map((v, i) => {
          const Icon = v.icon;
          return (
            <div
              key={i}
              className={`p-5 rounded-2xl ${v.bgColor} border ${v.borderColor} transition-all duration-300 hover:shadow-xs flex flex-col justify-between`}
            >
              <div>
                <div className={`w-11 h-11 rounded-xl ${v.iconColor} flex items-center justify-center mb-3.5 shadow-2xs`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base sm:text-lg font-black text-slate-900 mb-1.5">
                  {v.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Closing quote */}
      <div className="p-5 sm:p-6 rounded-2xl bg-sky-50/70 border border-sky-200 text-center sm:text-left">
        <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed italic">
          &ldquo;<strong className="text-sky-900 font-bold">Φ.RESO</strong> tin rằng mỗi học sinh là một “hệ dao động” khác nhau. Khi tìm được đúng phương pháp, đúng nhịp độ và đúng động lực, việc học sẽ tạo nên sự cộng hưởng.&rdquo;
        </p>
      </div>

      {/* Banner Khẩu hiệu 3 dòng đặc biệt */}
      <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-sky-950 via-sky-900 to-slate-950 text-white border border-sky-800 shadow-md relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>KHẨU HIỆU ĐỒNG HÀNH</span>
          </div>

          <div className="space-y-2 text-base sm:text-xl md:text-2xl font-black tracking-tight leading-snug">
            <p className="text-slate-200 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
              <span>Khi cùng pha, chúng ta tiến bộ.</span>
            </p>
            <p className="text-amber-400 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              <span>Khi cộng hưởng, chúng ta mạnh hơn.</span>
            </p>
            <p className="text-emerald-300 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>Khi bứt phá, chúng ta vươn xa.</span>
            </p>
          </div>
        </div>
      </div>

    </section>
  );
};
