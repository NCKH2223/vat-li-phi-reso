import React, { useState } from 'react';
import { Sparkles, ShieldCheck, CheckCircle2, Send, Lock, Gift, User, Phone, School, HelpCircle, Calendar, Clock } from 'lucide-react';
import { RegistrationData } from '../types';

interface RegistrationFormProps {
  onSubmitSuccess: (data: RegistrationData) => void;
  defaultGrade?: '10' | '11' | '12' | 'dgnl_thptqg';
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmitSuccess,
  defaultGrade = '12',
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    grade: defaultGrade,
    schoolCity: '',
    currentChallenge: 'Muốn hiểu sâu bản chất & bứt phá điểm 8.5+',
    learningMode: 'online_live' as 'online_live' | 'hybrid' | 'vod',
    preferredTime: 'weekend_evening' as 'weekday_evening' | 'weekend_morning' | 'weekend_evening',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Vui lòng nhập họ và tên của học sinh hoặc phụ huynh';
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = 'Họ tên quá ngắn';
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      errs.phone = 'Vui lòng nhập số điện thoại / Zalo để nhận link học thử';
    } else if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      errs.phone = 'Số điện thoại không hợp lệ (cần 10 chữ số)';
    }

    if (!formData.schoolCity.trim()) {
      errs.schoolCity = 'Vui lòng nhập trường THPT hoặc Tỉnh/Thành';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate reliable instant registration processing
    setTimeout(() => {
      const registrationItem: RegistrationData = {
        id: `RESO-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        currentGrade: (formData.grade === '10' || formData.grade === '11' || formData.grade === '12' ? formData.grade : '12') as '10' | '11' | '12',
        address: formData.schoolCity.trim(),
        selectedProgram: (formData.grade === '10' ? 'Vật lí 10' : formData.grade === '11' ? 'Vật lí 11' : 'Vật lí 12'),
        grade: formData.grade as any,
        schoolCity: formData.schoolCity.trim(),
        currentChallenge: formData.currentChallenge,
        learningMode: formData.learningMode,
        preferredTime: formData.preferredTime,
        notes: formData.notes.trim(),
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage
      try {
        const stored = localStorage.getItem('phi_reso_registrations');
        const list: RegistrationData[] = stored ? JSON.parse(stored) : [];
        list.unshift(registrationItem);
        localStorage.setItem('phi_reso_registrations', JSON.stringify(list));
      } catch (err) {
        console.error('Failed to save to local storage', err);
      }

      setIsSubmitting(false);
      onSubmitSuccess(registrationItem);
    }, 600);
  };

  return (
    <div
      id="registration-form"
      className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xl shadow-sky-900/5 relative overflow-hidden"
    >
      {/* Decorative top accent badge */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-bold mb-3">
          <Gift className="w-3.5 h-3.5 text-amber-600" />
          <span>QUÀ TẶNG KÈM: BỘ TỔNG HỢP SƠ ĐỒ VẬT LÍ 2025</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Đăng Ký Suất Học Thử Miễn Phí
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Điền thông tin trong 30 giây • Cô Châu Đoan sẽ gửi link phòng học qua Zalo
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-sky-600" />
            Họ và tên học sinh / phụ huynh <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Ví dụ: Nguyễn Minh Anh"
            value={formData.fullName}
            onChange={(e) => {
              setFormData({ ...formData, fullName: e.target.value });
              if (errors.fullName) setErrors({ ...errors, fullName: '' });
            }}
            className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-hidden ${
              errors.fullName
                ? 'border-rose-300 bg-rose-50/40 text-rose-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                : 'border-slate-200 bg-slate-50/60 focus:bg-white focus:border-sky-600 focus:ring-2 focus:ring-sky-100 text-slate-900'
            }`}
          />
          {errors.fullName && (
            <p className="text-xs text-rose-600 mt-1 font-medium">{errors.fullName}</p>
          )}
        </div>

        {/* Phone / Zalo */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-sky-600" />
            Số điện thoại nhận link Zoom & tài liệu qua Zalo <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            placeholder="Ví dụ: 0988 123 456"
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
              if (errors.phone) setErrors({ ...errors, phone: '' });
            }}
            className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-hidden ${
              errors.phone
                ? 'border-rose-300 bg-rose-50/40 text-rose-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                : 'border-slate-200 bg-slate-50/60 focus:bg-white focus:border-sky-600 focus:ring-2 focus:ring-sky-100 text-slate-900'
            }`}
          />
          {errors.phone && (
            <p className="text-xs text-rose-600 mt-1 font-medium">{errors.phone}</p>
          )}
        </div>

        {/* Grade Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-sky-600" />
            Chọn khối lớp cần đăng ký học thử <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: '10', label: 'Lớp 10' },
              { id: '11', label: 'Lớp 11' },
              { id: '12', label: 'Lớp 12' },
              { id: 'dgnl_thptqg', label: 'ĐGNL / THPT' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFormData({ ...formData, grade: item.id as any })}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border text-center cursor-pointer ${
                  formData.grade === item.id
                    ? 'bg-sky-600 text-white border-sky-600 shadow-sm shadow-sky-600/30'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* School & City */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <School className="w-3.5 h-3.5 text-sky-600" />
            Trường THPT & Tỉnh / Thành phố <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Ví dụ: THPT Chuyên Lê Hồng Phong - TP.HCM"
            value={formData.schoolCity}
            onChange={(e) => {
              setFormData({ ...formData, schoolCity: e.target.value });
              if (errors.schoolCity) setErrors({ ...errors, schoolCity: '' });
            }}
            className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-hidden ${
              errors.schoolCity
                ? 'border-rose-300 bg-rose-50/40 text-rose-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                : 'border-slate-200 bg-slate-50/60 focus:bg-white focus:border-sky-600 focus:ring-2 focus:ring-sky-100 text-slate-900'
            }`}
          />
          {errors.schoolCity && (
            <p className="text-xs text-rose-600 mt-1 font-medium">{errors.schoolCity}</p>
          )}
        </div>

        {/* Current challenge */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
            Mục tiêu hoặc khó khăn lớn nhất hiện tại
          </label>
          <select
            value={formData.currentChallenge}
            onChange={(e) => setFormData({ ...formData, currentChallenge: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:border-sky-600 focus:ring-2 focus:ring-sky-100 text-slate-800 text-sm outline-hidden cursor-pointer"
          >
            <option value="Muốn hiểu sâu bản chất & bứt phá điểm 8.5+">
              Muốn hiểu sâu bản chất & bứt phá mốc điểm 8.5+ đến 10
            </option>
            <option value="Mất gốc lý thuyết, sợ công thức khô khan">
              Mất gốc lý thuyết, cảm thấy công thức khô khan khó nhớ
            </option>
            <option value="Biết công thức nhưng gặp đề lạ không biết áp dụng">
              Biết công thức nhưng gặp bài toán mới/vận dụng là bí ý tưởng
            </option>
            <option value="Cần rèn tốc độ làm bài & chiến thuật bấm máy Casio">
              Cần rèn tốc độ tư duy 30s/câu & kỹ thuật giải nhanh
            </option>
            <option value="Ôn thi Đánh giá năng lực ĐHQG / ĐHBK 2025-2026">
              Ôn thi Đánh giá năng lực ĐHQG / ĐHBK 2025 - 2026
            </option>
          </select>
        </div>

        {/* Preferred Study Time */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-sky-600" />
            Khung giờ học thử thuận tiện nhất
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { id: 'weekend_evening', label: 'Tối T7 / CN (19:30)' },
              { id: 'weekend_morning', label: 'Sáng Chủ Nhật (09:00)' },
              { id: 'weekday_evening', label: 'Tối trong tuần (20:00)' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setFormData({ ...formData, preferredTime: t.id as any })}
                className={`py-2 px-2.5 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                  formData.preferredTime === t.id
                    ? 'bg-sky-50 border-sky-600 text-sky-800 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-base shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                <span>Đang xử lý đăng ký...</span>
              </>
            ) : (
              <>
                <span>XÁC NHẬN ĐĂNG KÝ HỌC THỬ MIỄN PHÍ</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Trust assurances */}
        <div className="flex items-center justify-center gap-4 pt-2 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            100% Miễn phí trải nghiệm
          </span>
          <span className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-sky-600" />
            Bảo mật thông tin
          </span>
        </div>
      </form>
    </div>
  );
};
