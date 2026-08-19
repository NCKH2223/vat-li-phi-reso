import React from 'react';
import { Star, Quote, CheckCircle2, TrendingUp } from 'lucide-react';

export const StudentFeedback: React.FC = () => {
  const reviews = [
    {
      name: 'Nguyễn Hoàng Đức',
      school: 'Lớp 12 - THPT Yên Hòa (Hà Nội)',
      score: 'Từ 5.5 lên 9.25 môn Vật Lí',
      comment: 'Trước đây em sợ nhất phần Dao động cơ và Điện xoay chiều vì quá nhiều công thức vẹt. Học với Cô Châu Đoan em mới hiểu bản chất vòng tròn lượng giác và giản đồ vecto. Điểm thi thử của em tăng vọt từ 5.5 lên 9.25!',
      tag: 'Tăng 3.75 điểm',
    },
    {
      name: 'Trần Thảo Linh',
      school: 'Lớp 11 - THPT Chuyên Lê Hồng Phong (TP.HCM)',
      score: 'Giải Nhì HSG Cấp Thành Phố',
      comment: 'Cách cô giảng bài rất logic và cuốn hút. Nhờ phương pháp Φ.RESO, em không phải cày bừa bài tập trong vô vọng mà biết cách phân tích hiện tượng trước khi đặt bút tính. Buổi học thử hôm đầu tiên đã thay đổi hoàn toàn cách học của em.',
      tag: 'Hiểu sâu bản chất',
    },
    {
      name: 'Phụ huynh Chị Thu Hằng',
      school: 'Phụ huynh bạn Minh Khang (Lớp 10)',
      score: 'Con tự tin, chủ động học tập',
      comment: 'Cháu nhà tôi trước đây rất sợ môn Lí vì chương trình mới có nhiều câu hỏi thực tế. Sau buổi học thử cùng Cô Châu Đoan, cháu khen cô dạy dễ hiểu, tự giác làm bài và hào hứng chia sẻ với bố mẹ.',
      tag: 'Phụ huynh tin tưởng',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-bold mb-3">
            <TrendingUp className="w-3.5 h-3.5 text-sky-700" />
            <span>KẾT QUẢ VÀ TRẢI NGHIỆM THỰC TẾ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Học Sinh &amp; Phụ Huynh Chia Sẻ Về <span className="text-sky-700">Φ.RESO</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Hàng nghìn học sinh đã tìm lại niềm đam mê và tự tin tuyệt đối trước mọi kỳ thi Vật Lí.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Stars & Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {r.tag}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-5">
                  &ldquo;{r.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-800 font-bold flex items-center justify-center text-sm shrink-0">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{r.name}</h4>
                  <p className="text-[11px] text-slate-500">{r.school}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
