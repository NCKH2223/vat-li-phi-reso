import React from 'react';
import { BookOpen, Compass, Target, Award, CheckCircle2 } from 'lucide-react';

export const Roadmap: React.FC = () => {
  const roadmaps = [
    {
      grade: 'Lớp 10',
      tag: 'Φ.RESO 10',
      title: 'XÂY NỀN VỮNG CHẮC',
      description:
        'Nắm vững kiến thức cốt lõi, hình thành phương pháp học và tư duy khoa học ngay từ những năm đầu THPT.',
      highlights: [
        'Chuẩn hóa phương pháp học Vật lí THPT',
        'Nắm chắc bản chất Động học & Động lực học',
        'Rèn luyện kỹ năng phân tích hiện tượng',
      ],
      colorTheme: 'from-emerald-500/10 via-emerald-500/5 to-white',
      borderColor: 'border-emerald-200/80',
      badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      icon: Compass,
      accentColor: 'text-emerald-700',
    },
    {
      grade: 'Lớp 11',
      tag: 'Φ.RESO 11',
      title: 'ĐÀO SÂU BẢN CHẤT',
      description:
        'Hiểu sâu hiện tượng Vật lí, phát triển năng lực phân tích và vận dụng kiến thức vào các dạng bài tập.',
      highlights: [
        'Giải mã hiện tượng Dao động & Sóng cơ',
        'Làm chủ tư duy Điện trường & Từ trường',
        'Phát triển năng lực tư duy vận dụng linh hoạt',
      ],
      colorTheme: 'from-sky-500/10 via-sky-500/5 to-white',
      borderColor: 'border-sky-200/80',
      badgeClass: 'bg-sky-100 text-sky-900 border-sky-300',
      icon: Target,
      accentColor: 'text-sky-700',
    },
    {
      grade: 'Lớp 12',
      tag: 'Φ.RESO 12',
      title: 'BỨT PHÁ KỲ THI TỐT NGHIỆP THPT',
      description:
        'Hệ thống hóa toàn diện kiến thức; chuyên sâu kỹ năng phân tích đồ thị, số liệu, bài toán thực nghiệm và mô hình thực tế; luyện đề chuẩn cấu trúc theo từng giai đoạn.',
      highlights: [
        'Hệ thống hóa toàn diện kiến thức trọng tâm',
        'Chuyên sâu phân tích đồ thị, số liệu thực nghiệm',
        'Luyện đề chuẩn cấu trúc theo từng giai đoạn',
      ],
      colorTheme: 'from-amber-500/10 via-amber-500/5 to-white',
      borderColor: 'border-amber-200/80',
      badgeClass: 'bg-amber-100 text-amber-950 border-amber-300',
      icon: Award,
      accentColor: 'text-amber-800',
    },
  ];

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 md:p-9 border border-slate-200/80 shadow-2xs">
      {/* Title */}
      <div className="text-center sm:text-left mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs sm:text-sm font-bold mb-2.5">
          <BookOpen className="w-4 h-4 text-sky-600" />
          <span>CHƯƠNG TRÌNH ĐÀO TẠO</span>
        </div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center justify-center sm:justify-start gap-2">
          <span>📚 LỘ TRÌNH ĐÀO TẠO THEO TỪNG CẤP LỚP</span>
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-1.5 leading-relaxed">
          Định hướng chuẩn mực bám sát chương trình GDPT và kỳ thi Tốt nghiệp THPT
        </p>
      </div>

      {/* 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {roadmaps.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`rounded-3xl p-5 sm:p-6 bg-gradient-to-b ${card.colorTheme} border ${card.borderColor} shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group`}
            >
              <div>
                {/* Header Tag & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-mono font-black px-3 py-1 rounded-full border ${card.badgeClass}`}>
                    {card.tag}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-white shadow-xs flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className={`w-5 h-5 ${card.accentColor}`} />
                  </div>
                </div>

                {/* Card Title */}
                <h4 className="text-base sm:text-lg font-black text-slate-900 mb-2.5 leading-snug">
                  {card.title}
                </h4>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {card.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 pt-3 border-t border-slate-200/60">
                  {card.highlights.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
