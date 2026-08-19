import React from 'react';
import { Gift, Video, BookOpen, UserCheck, MessageSquare, ArrowRight, Flame, Clock, Sparkles } from 'lucide-react';
import { TRIAL_PACKAGES } from '../data/courseData';

interface TrialBenefitsProps {
  onScrollToForm: () => void;
}

export const TrialBenefits: React.FC<TrialBenefitsProps> = ({ onScrollToForm }) => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold mb-3">
            <Gift className="w-3.5 h-3.5 text-amber-600" />
            <span>QUYỀN LỢI ĐẶC BIỆT KHI THAM GIA HỌC THỬ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Bạn Nhận Được Gì Trong <span className="text-sky-700">Buổi Học Trải Nghiệm?</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Không chỉ là một buổi nghe giảng, đây là cơ hội để bạn nhìn lại toàn bộ phương pháp học tập của mình.
          </p>
        </div>

        {/* 4 Big Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            {
              icon: <Video className="w-6 h-6 text-sky-600" />,
              title: '01 Buổi Học Trực Tiếp 90 Phút',
              desc: 'Học và tương tác 2 chiều với Cô Châu Đoan qua Zoom Pro bản quyền mượt mà, giải đáp trực tiếp trên bảng điện tử.',
              badge: 'Miễn phí 100%',
            },
            {
              icon: <BookOpen className="w-6 h-6 text-amber-600" />,
              title: 'Bộ Sơ Đồ Tư Duy Φ.RESO',
              desc: 'Nhận ngay tài liệu tổng hợp bản chất các chủ đề Vật Lí trọng tâm theo chương trình mới GDPT 2018.',
              badge: 'Tặng kèm ngay',
            },
            {
              icon: <UserCheck className="w-6 h-6 text-emerald-600" />,
              title: 'Đánh Giá Năng Lực & Lộ Trình',
              desc: 'Cô Châu Đoan trực tiếp phân tích điểm mạnh - điểm yếu và vạch lộ trình bứt phá điểm số mục tiêu 8.5+ - 10.',
              badge: 'Tư vấn 1:1',
            },
            {
              icon: <MessageSquare className="w-6 h-6 text-purple-600" />,
              title: 'Nhóm Zalo Giải Bài 24/7',
              desc: 'Được thêm vào nhóm học tập kín, gửi câu hỏi khó và nhận lời giải chi tiết từ đội ngũ trợ giảng chuyên Lý.',
              badge: 'Hỗ trợ không giới hạn',
            },
          ].map((b, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-sky-50/40 hover:border-sky-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    {b.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                    {b.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{b.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Schedule & Remaining spots cards */}
        <div className="bg-sky-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-sky-800">
            <div>
              <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                LỊCH HỌC THỬ CÁC KHỐI LỚP TRONG TUẦN
              </span>
              <h3 className="text-xl sm:text-2xl font-bold mt-1">
                Chọn Lớp Học Phù Hợp &amp; Giữ Chỗ Sớm
              </h3>
            </div>
            <div className="text-xs text-sky-200 bg-sky-800/80 px-3 py-1.5 rounded-xl border border-sky-700/60 inline-flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-300" />
              <span>Mỗi lớp giới hạn 15 học sinh để đảm bảo tương tác</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TRIAL_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-sky-950/70 border border-sky-800/80 rounded-2xl p-5 hover:border-amber-400/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-300">
                      {pkg.target}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      Còn {pkg.spotsLeft} suất
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{pkg.name}</h4>
                  <p className="text-xs text-sky-200 mb-3 leading-relaxed">
                    ✨ {pkg.highlight}
                  </p>
                  <div className="text-xs text-sky-300/80 space-y-1 mb-4 font-mono">
                    <div>📅 {pkg.schedule}</div>
                    <div>💻 {pkg.format}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onScrollToForm}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Đăng Ký Khối Này</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
