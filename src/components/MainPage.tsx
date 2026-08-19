import React, { useState } from 'react';
import { 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Lock, 
  Gift, 
  User, 
  MapPin, 
  Layers, 
  GraduationCap
} from 'lucide-react';
import { RegistrationData } from '../types';
import { BRAND_ASSETS, GOOGLE_SHEET_WEBHOOK_URL } from '../data/courseData';
import { getGoogleDriveDirectLink } from '../utils/googleDrive';
import { Roadmap } from './Roadmap';
import { CoreValues } from './CoreValues';

interface MainPageProps {
  onSubmitSuccess: (data: RegistrationData) => void;
  onOpenAdmin?: () => void;
  regCount?: number;
}

export const MainPage: React.FC<MainPageProps> = ({
  onSubmitSuccess,
}) => {
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    currentGrade: '',
    address: '',
    selectedProgram: 'Vật lí 12' as 'Vật lí 10' | 'Vật lí 11' | 'Vật lí 12',
    grade12Track: 'Luyện thi THPT' as 'Cơ bản' | 'Luyện thi THPT',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [logoError, setLogoError] = useState(false);

  // Scroll to registration form
  const scrollToForm = () => {
    const el = document.getElementById('dang-ky-hoc-thu') || document.getElementById('registration-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Form Validation
  const validate = () => {
    const errs: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      errs.fullName = 'Vui lòng nhập họ và tên của học sinh hoặc phụ huynh';
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = 'Họ tên quá ngắn';
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      errs.phone = 'Vui lòng nhập số điện thoại để nhận link học thử';
    } else if (phoneDigits.length !== 10) {
      errs.phone = 'Số điện thoại bắt buộc phải có đúng 10 số (VD: 0903471106)';
    }

    if (!formData.currentGrade.trim()) {
      errs.currentGrade = 'Vui lòng nhập lớp đang học (Ví dụ: 10.7 hoặc 12A5)';
    }

    if (!formData.address.trim()) {
      errs.address = 'Vui lòng nhập Xã/Phường và Tỉnh/Thành phố';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    // Xác định định hướng nếu chọn chương trình khối 12
    const is12 = formData.selectedProgram.includes('12');
    const dinhHuongValue = is12 ? (formData.grade12Track || 'Luyện thi THPT') : '';

    const registrationItem: RegistrationData = {
      id: `RESO-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      currentGrade: formData.currentGrade.trim(),
      address: formData.address.trim(),
      selectedProgram: formData.selectedProgram,
      grade12Tracks: is12 ? [dinhHuongValue] : undefined,
      grade: formData.currentGrade.trim(),
      schoolCity: formData.address.trim(),
      currentChallenge: is12 
        ? `Chương trình: ${formData.selectedProgram} (${dinhHuongValue})`
        : `Chương trình: ${formData.selectedProgram}`,
      learningMode: 'online_live',
      preferredTime: 'weekend_evening',
      createdAt: new Date().toISOString(),
    };

    // 1. Gửi dữ liệu về Google Sheets qua Apps Script Webhook
    try {
      if (GOOGLE_SHEET_WEBHOOK_URL) {
        await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify({
            ...registrationItem,
            grade12Track: dinhHuongValue,
          }),
        });
      }
    } catch (err) {
      console.error('Lỗi gửi dữ liệu Google Sheets:', err);
    }

    // 2. Lưu dự phòng vào LocalStorage trên trình duyệt
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
  };

  const logoDirectUrl = getGoogleDriveDirectLink(BRAND_ASSETS.logoDriveUrl);
  const teacherAvatarDirectUrl = getGoogleDriveDirectLink(BRAND_ASSETS.teacherAvatarDriveUrl);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 antialiased">
      
      {/* 1. HEADER TINH GỌN CHỨA LOGO NÉT & NÚT ĐĂNG KÝ NGAY */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-6xl mx-auto px-2.5 sm:px-6 h-18 sm:h-24 md:h-26 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo không đóng khung, to rõ và trải dài tự nhiên trên header */}
          <div className="flex items-center min-w-0">
            <div className="h-12 sm:h-18 md:h-20 flex items-center">
              {(!logoLoaded || logoError) && (
                <div className="flex items-center gap-2">
                  <span className="font-serif font-black text-2xl min-[360px]:text-3xl sm:text-4xl md:text-5xl text-sky-950 tracking-tight select-none">Φ.RESO</span>
                </div>
              )}
              {!logoError && (
                <img
                  src={logoDirectUrl}
                  alt="Logo Φ.RESO"
                  className={`h-10 min-[360px]:h-12 sm:h-18 md:h-20 w-auto max-w-[115px] min-[360px]:max-w-[135px] sm:max-w-[340px] md:max-w-[420px] object-contain object-left transition-opacity duration-300 ${
                    logoLoaded ? 'opacity-100' : 'opacity-0 absolute'
                  }`}
                  onLoad={() => setLogoLoaded(true)}
                  onError={() => setLogoError(true)}
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
          </div>

          {/* Hotline / Zalo & Nút Đăng Ký Ngay */}
          <div className="flex items-center gap-1.5 sm:gap-3.5 shrink-0">
            
            {/* Nút Hotline / Zalo theo chuẩn thiết kế */}
            <a
              href="https://zalo.me/0903471106"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-3 px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-[#f0f6fa] hover:bg-[#e4eff6] text-slate-800 border border-sky-200/80 shadow-2xs transition-all hover:shadow-xs"
              title="Chat Zalo hoặc Gọi hotline: 0903.471.106"
            >
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#0088cc] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Phone className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 fill-current" />
              </div>
              <div className="text-left hidden min-[440px]:block">
                <span className="text-[9px] sm:text-xs font-semibold text-slate-500 block leading-tight">
                  Hotline / Zalo:
                </span>
                <span className="text-xs sm:text-sm md:text-[15px] font-black text-[#00558f] tracking-tight block">
                  {BRAND_ASSETS.hotline}
                </span>
              </div>
              <div className="text-left block min-[440px]:hidden">
                <span className="text-[11px] font-black text-[#00558f] block leading-none">
                  Zalo
                </span>
              </div>
            </a>

            {/* Nút Đăng Ký Ngay */}
            <button
              type="button"
              onClick={scrollToForm}
              className="flex items-center justify-center gap-1 sm:gap-2 px-2.5 min-[360px]:px-3.5 sm:px-6 py-2 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-[11px] min-[360px]:text-xs sm:text-sm md:text-base shadow-md shadow-amber-500/25 transition-all hover:shadow-lg active:scale-95 cursor-pointer shrink-0"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-slate-950 shrink-0" />
              <span className="whitespace-nowrap">ĐĂNG KÝ NGAY</span>
            </button>
          </div>

        </div>
      </header>

      {/* MAIN CONTAINER: 2-COLUMN HERO & REGISTRATION */}
      <main className="flex-1 py-6 sm:py-12 px-3 sm:px-6 max-w-6xl mx-auto w-full">
        
        {/* Top Slogan Banner */}
        <div className="text-center mb-6 sm:mb-10 w-full flex flex-col items-center px-1">
          <div className="inline-flex items-center justify-center gap-1 sm:gap-2 px-2 min-[360px]:px-3.5 sm:px-5 py-1 sm:py-2 rounded-full bg-amber-50 border border-amber-200/90 text-amber-900 shadow-2xs mb-2.5 max-w-full">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 shrink-0" />
            <span className="text-[8.5px] min-[340px]:text-[9.5px] min-[370px]:text-[10.5px] min-[400px]:text-[11.5px] min-[430px]:text-xs sm:text-sm md:text-base font-extrabold tracking-tight sm:tracking-normal whitespace-nowrap text-center">
              {BRAND_ASSETS.slogan}
            </span>
          </div>
          
          {/* Headline hiển thị trọn vẹn trên 1 dòng trên điện thoại */}
          <div className="w-full flex justify-center px-1">
            <h1 className="text-[13.5px] min-[360px]:text-[15px] min-[390px]:text-[16.5px] min-[420px]:text-[18.5px] sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight whitespace-nowrap text-center">
              {BRAND_ASSETS.quoteHeadline}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* 2. HERO & UY TÍN CỐT LÕI (Bên trái / Phía trên) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Teacher Avatar & Resonance Quote Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-9 border border-sky-100 shadow-md relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-7">
                
                {/* Avatar Cô Châu Đoan */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-3xl overflow-hidden border-3 border-sky-200 shadow-lg bg-slate-100 group">
                    <img
                      src={teacherAvatarDirectUrl}
                      alt="Cô Châu Đoan - Giáo Viên Vật Lí Φ.RESO"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop';
                      }}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-900/85 to-transparent text-white text-center pt-5 pb-2.5 px-2">
                      <span className="text-sm sm:text-base font-black tracking-wide block">Cô Châu Đoan</span>
                    </div>
                  </div>
                </div>

                {/* Resonance Philosophy Content */}
                <div className="flex-1 text-center md:text-left space-y-3 sm:space-y-3.5">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-900 text-xs sm:text-sm font-bold uppercase font-mono">
                    <Zap className="w-4 h-4 text-sky-700 fill-sky-500" />
                    <span>TRIẾT LÝ CỘNG HƯỞNG Φ.RESO</span>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3 text-slate-700 leading-relaxed italic text-sm sm:text-[15px] md:text-base">
                    <p className="font-medium text-slate-800">
                      &ldquo;Trong Vật lí, cộng hưởng xảy ra khi tần số ngoại lực bằng tần số dao động riêng của hệ, làm cho biên độ đạt cực đại.&rdquo;
                    </p>
                    <p className="text-slate-600">
                      &ldquo;Φ.RESO ra đời với tinh thần ấy: không áp đặt một khuôn mẫu cho mọi học sinh, mà tìm được ‘tần số’ phù hợp với cách tiếp thu của từng em; từ đó truyền cảm hứng, tạo động lực và khơi mở tiềm năng để mỗi học sinh đạt được ‘biên độ’ phát triển tốt nhất của chính mình.&rdquo;
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-slate-600">
                    <span className="inline-flex items-center gap-1 text-sky-800 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Tìm đúng tần số
                    </span>
                    <span className="inline-flex items-center gap-1 text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      Tối đa biên độ
                    </span>
                    <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Đồng hành tận tâm
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* 1. Component Lộ Trình Đào Tạo Theo Từng Cấp Lớp */}
            <Roadmap />

            {/* 2. Component Giá Trị Cốt Lõi */}
            <CoreValues />

          </div>

          {/* 3. FORM ĐĂNG KÝ HỌC THỬ NỔI BẬT */}
          <div className="lg:col-span-5 sticky top-24">
            <div
              id="dang-ky-hoc-thu"
              className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sky-600/30 shadow-2xl shadow-sky-900/10 relative overflow-hidden"
            >
              {/* Header of Form */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-bold mb-2.5">
                  <Gift className="w-4 h-4 text-amber-600" />
                  <span>SUẤT HỌC THỬ MIỄN PHÍ 100%</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase leading-tight">
                  ĐĂNG KÝ HỌC THỬ CÙNG Φ.RESO
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                
                {/* 1. Họ và tên */}
                <div>
                  <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-sky-600" />
                    Họ và tên <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Nguyễn Minh Anh"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base outline-hidden transition-all ${
                      errors.fullName
                        ? 'border-rose-300 bg-rose-50/40 text-rose-900 focus:ring-2 focus:ring-rose-200'
                        : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-sky-600 focus:ring-2 focus:ring-sky-100'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs sm:text-sm text-rose-600 mt-1.5 font-medium">{errors.fullName}</p>
                  )}
                </div>

                {/* 2. Số điện thoại */}
                <div>
                  <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-sky-600" />
                    Số điện thoại / Zalo (10 số) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="Ví dụ: 0903471106"
                    value={formData.phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setFormData({ ...formData, phone: val });
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base font-mono outline-hidden transition-all ${
                      errors.phone
                        ? 'border-rose-300 bg-rose-50/40 text-rose-900 focus:ring-2 focus:ring-rose-200'
                        : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-sky-600 focus:ring-2 focus:ring-sky-100'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs sm:text-sm text-rose-600 mt-1.5 font-medium">{errors.phone}</p>
                  )}
                </div>

                {/* 3. Lớp đang học */}
                <div>
                  <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-sky-600" />
                    Lớp đang học <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: 10.7 hoặc 12A5"
                    value={formData.currentGrade}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        currentGrade: e.target.value,
                      });
                      if (errors.currentGrade) setErrors({ ...errors, currentGrade: '' });
                    }}
                    className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base outline-hidden transition-all ${
                      errors.currentGrade
                        ? 'border-rose-300 bg-rose-50/40 text-rose-900 focus:ring-2 focus:ring-rose-200'
                        : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-sky-600 focus:ring-2 focus:ring-sky-100'
                    }`}
                  />
                  {errors.currentGrade && (
                    <p className="text-xs sm:text-sm text-rose-600 mt-1.5 font-medium">{errors.currentGrade}</p>
                  )}
                </div>

                {/* 4. Địa chỉ */}
                <div>
                  <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-sky-600" />
                    Xã / Phường (Tỉnh / Thành phố) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Xã Tân Triều, Thanh Trì, Hà Nội"
                    value={formData.address}
                    onChange={(e) => {
                      setFormData({ ...formData, address: e.target.value });
                      if (errors.address) setErrors({ ...errors, address: '' });
                    }}
                    className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base outline-hidden transition-all ${
                      errors.address
                        ? 'border-rose-300 bg-rose-50/40 text-rose-900 focus:ring-2 focus:ring-rose-200'
                        : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-sky-600 focus:ring-2 focus:ring-sky-100'
                    }`}
                  />
                  {errors.address && (
                    <p className="text-xs sm:text-sm text-rose-600 mt-1.5 font-medium">{errors.address}</p>
                  )}
                </div>

                {/* 5. Chương trình học */}
                <div>
                  <label className="block text-sm sm:text-base font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-sky-600" />
                    Chương trình học thử muốn tham gia <span className="text-rose-500">*</span>
                  </label>
                  
                  <div className="grid grid-cols-3 gap-2.5">
                    {(['Vật lí 10', 'Vật lí 11', 'Vật lí 12'] as const).map((prog) => (
                      <label
                        key={prog}
                        className={`p-3 rounded-xl border text-center text-xs sm:text-sm font-bold flex flex-col items-center justify-center cursor-pointer transition-all ${
                          formData.selectedProgram === prog
                            ? 'bg-sky-600 text-white border-sky-600 shadow-sm shadow-sky-600/30'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <input
                          type="radio"
                          name="selectedProgram"
                          value={prog}
                          checked={formData.selectedProgram === prog}
                          onChange={() => setFormData({ ...formData, selectedProgram: prog })}
                          className="sr-only"
                        />
                        <span>{prog}</span>
                      </label>
                    ))}
                  </div>

                  {/* 5.1 LOGIC ĐỘNG: Nếu chọn "Vật lí 12" */}
                  {formData.selectedProgram === 'Vật lí 12' && (
                    <div className="mt-3.5 p-3.5 sm:p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 animate-in fade-in slide-in-from-top-2 duration-300">
                      <span className="text-xs sm:text-sm font-bold text-amber-900 block mb-2.5">
                        🎯 Định hướng cho Khối 12 (Chọn 1 trong 2):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                        {[
                          { id: 'Cơ bản', label: 'Cơ bản & Xây gốc' },
                          { id: 'Luyện thi THPT', label: 'Luyện thi THPT' },
                        ].map((item) => {
                          const isChecked = formData.grade12Track === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, grade12Track: item.id as any })}
                              className={`py-2.5 sm:py-3 px-3 sm:px-3.5 rounded-xl text-xs sm:text-sm font-bold text-left flex items-center gap-2.5 border transition-all cursor-pointer ${
                                isChecked
                                  ? 'bg-white border-amber-500 text-amber-950 shadow-xs ring-2 ring-amber-400/40'
                                  : 'bg-white/70 border-slate-200 text-slate-700 hover:bg-white'
                              }`}
                            >
                              <div
                                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center shrink-0 text-xs ${
                                  isChecked
                                    ? 'border-amber-600 bg-amber-500 text-white'
                                    : 'border-slate-300'
                                }`}
                              >
                                {isChecked && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                              <span className="whitespace-normal leading-tight font-bold">{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2.5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm sm:text-base md:text-lg shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>ĐANG GỬI THÔNG TIN...</span>
                      </>
                    ) : (
                      <>
                        <span>XÁC NHẬN ĐĂNG KÝ HỌC THỬ</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>

                {/* Trust Footer */}
                <div className="flex items-center justify-center gap-5 pt-1.5 text-xs sm:text-sm text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Miễn phí 100%
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-sky-600" />
                    Bảo mật thông tin
                  </span>
                </div>

              </form>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
};
