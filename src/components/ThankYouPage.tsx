import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  MessageCircle, 
  ArrowLeft, 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink,
  Phone,
  Clock,
  BookOpen,
  Calendar,
  ShieldCheck,
  Facebook
} from 'lucide-react';
import { RegistrationData } from '../types';
import { BRAND_ASSETS, CONTACT_INFO } from '../data/courseData';
import { formatPhoneNumber, getGoogleDriveDirectLink } from '../utils/googleDrive';

interface ThankYouPageProps {
  registration: RegistrationData;
  onBackToHome: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ registration, onBackToHome }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [showCheatSheetModal, setShowCheatSheetModal] = useState(false);

  const zaloDirectLink = 'https://zalo.me/0903471106';
  const facebookDirectLink = 'https://www.facebook.com/chaudoan.chung';
  const teacherAvatarDirectUrl = getGoogleDriveDirectLink(BRAND_ASSETS.teacherAvatarDriveUrl);

  useEffect(() => {
    // Launch celebratory confetti upon landing
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.55 },
        colors: ['#0284c7', '#f59e0b', '#10b981', '#1877f2', '#6366f1'],
      });
    } catch (e) {
      // ignore
    }

    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCopyCode = () => {
    if (!registration.id) return;
    navigator.clipboard.writeText(registration.id);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Google Calendar Link generator for the trial class
  const createCalendarUrl = () => {
    const title = encodeURIComponent(`[VẬT LÍ Φ.RESO] Buổi Học Thử Cùng Cô Châu Đoan`);
    const details = encodeURIComponent(
      `Mã đăng ký: ${registration.id}\nHọc sinh: ${registration.fullName}\nChương trình: ${registration.selectedProgram || registration.grade}\nCô Châu Đoan sẽ liên hệ xếp lịch học.\nHotline / Zalo: 0903.471.106`
    );
    const location = encodeURIComponent('Zoom Pro Online');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/80 via-[#f8fafc] to-white py-8 sm:py-16 px-4 sm:px-6 flex flex-col justify-between">
      <div className="max-w-2xl mx-auto w-full">
        
        {/* Card trung tâm tinh tế */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-sky-100 shadow-xl shadow-sky-900/5 text-center relative overflow-hidden">
          
          {/* Subtle decorative glow */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-sky-200/40 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-amber-200/30 rounded-full blur-2xl pointer-events-none" />

          {/* 1. Icon dấu tích xanh thành công */}
          <div className="relative mb-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-100/60 shadow-inner">
              <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 stroke-[2.2]" />
            </div>
            <div className="absolute bottom-0 right-1/2 translate-x-7 bg-amber-400 text-slate-950 p-1.5 rounded-full shadow-xs">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>

          {/* Badge & Tiêu đề */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold mb-3.5 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>XÁC NHẬN ĐĂNG KÝ THÀNH CÔNG</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-snug mb-3">
            Chào mừng <span className="text-sky-700">{registration.fullName}</span>!
          </h1>

          {/* 2. Lời cảm ơn chuẩn chỉnh */}
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-lg mx-auto mb-6">
            Chúc mừng em đã đăng ký tham gia lớp học thử Vật lí tại <strong className="text-slate-900">Φ.RESO</strong> thành công! <strong className="text-sky-800 font-bold">Cô Châu Đoan</strong> sẽ liên hệ sớm nhất để xếp lịch học phù hợp.
          </p>

          {/* Thông tin vé đăng ký tóm tắt */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 mb-8 text-left text-sm space-y-3 max-w-lg mx-auto">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
              <span className="text-slate-600 font-semibold text-xs sm:text-sm">Mã đăng ký:</span>
              <div className="flex items-center gap-2 font-mono font-bold text-sky-800 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs sm:text-sm">
                <span>{registration.id}</span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  title="Sao chép mã"
                  className="text-slate-400 hover:text-sky-600 cursor-pointer transition-colors"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-slate-700">
              <div>
                <span className="text-slate-500 block text-xs font-medium">Số điện thoại:</span>
                <span className="font-bold text-sm sm:text-base font-mono">{formatPhoneNumber(registration.phone)}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-xs font-medium">Lớp đang học:</span>
                <span className="font-bold text-sm sm:text-base text-slate-800">
                  {registration.currentGrade}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/60">
              <span className="text-slate-500 block text-xs font-medium">Chương trình đăng ký:</span>
              <span className="font-bold text-sm sm:text-base text-sky-800">
                {registration.selectedProgram || `Lớp ${registration.currentGrade}`}
                {registration.grade12Tracks && registration.grade12Tracks.length > 0
                  ? ` (${registration.grade12Tracks.join(', ')})`
                  : ''}
              </span>
            </div>

            {registration.address && (
              <div className="pt-2 border-t border-slate-200/60">
                <span className="text-slate-500 block text-xs font-medium">Địa chỉ (Xã / Phường, Tỉnh / Thành):</span>
                <span className="font-semibold text-slate-800 text-sm sm:text-base truncate block">{registration.address}</span>
              </div>
            )}
          </div>

          {/* 3. Khối kết nối trực tiếp (Call to Action) */}
          <div className="border-t border-slate-100 pt-6 max-w-lg mx-auto">
            
            <p className="text-sm sm:text-base font-bold text-slate-800 mb-4 flex items-center justify-center gap-2">
              <Phone className="w-4.5 h-4.5 text-sky-600" />
              <span>Mọi thắc mắc cần giải đáp ngay, hãy liên hệ:</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
              
              {/* Nút 1: Nhắn Zalo Cô Châu Đoan (Màu xanh Zalo #0068FF / #0284c7) */}
              <a
                href={zaloDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 py-4 px-4 rounded-2xl bg-[#0068FF] hover:bg-[#0055d4] text-white font-bold text-sm sm:text-base shadow-md shadow-blue-500/25 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-white text-[#0068FF] flex items-center justify-center font-bold text-xs shrink-0">
                  Z
                </div>
                <span>Nhắn Zalo Cô Châu Đoan</span>
                <ExternalLink className="w-4 h-4 opacity-80" />
              </a>

              {/* Nút 2: Nhắn Facebook Cô Châu Đoan (Màu xanh Facebook #1877F2) */}
              <a
                href={facebookDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 py-4 px-4 rounded-2xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-sm sm:text-base shadow-md shadow-blue-600/25 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Facebook className="w-5 h-5 fill-white shrink-0" />
                <span>Nhắn Facebook Cô Châu Đoan</span>
                <ExternalLink className="w-4 h-4 opacity-80" />
              </a>

            </div>

            {/* Tiện ích bổ sung: Nhắc lịch & Quà tặng Sơ đồ tư duy */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => setShowCheatSheetModal(true)}
                className="p-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold flex items-center justify-center gap-2 border border-amber-200/80 transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>Xem Sơ Đồ Tư Duy (Tặng Kèm)</span>
              </button>

              <a
                href={createCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Calendar className="w-4 h-4 text-sky-700" />
                <span>Thêm Vào Google Calendar</span>
              </a>
            </div>

            {/* 4. Nút điều hướng phụ: "Về trang chủ / Đăng ký lại" */}
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onBackToHome}
                className="inline-flex items-center justify-center gap-2 text-sm sm:text-base font-semibold text-slate-500 hover:text-sky-800 py-2.5 px-5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Về trang chủ / Đăng ký lại</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Modal Cẩm nang Sơ đồ Tư duy */}
      {showCheatSheetModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative text-left">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold font-serif text-lg">
                  Φ
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    Sơ Đồ Tư Duy Vật Lí Φ.RESO 2025
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">Quà tặng kèm độc quyền cho học sinh đăng ký</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCheatSheetModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-2">
                <h4 className="font-bold text-sky-900 text-sm sm:text-base">
                  ✨ 3 Nguyên Lý Cốt Lõi:
                </h4>
                <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm text-slate-700">
                  <li><strong>Vecto &amp; Hình chiếu:</strong> Mọi bài toán lực và dao động đều quy về giản đồ vecto.</li>
                  <li><strong>Bảo toàn năng lượng:</strong> Động năng, thế năng và công ngoại lực liên kết chặt chẽ.</li>
                  <li><strong>Đồ thị &amp; Đạo hàm:</strong> Phân tích độ dốc tiếp tuyến và diện tích hình phẳng.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm">
                <p className="font-bold mb-1">
                  📩 Link tải file PDF Full HD:
                </p>
                <p className="text-amber-800 leading-relaxed">
                  Cô Châu Đoan sẽ gửi trọn bộ file tài liệu qua Zalo sau khi xác nhận lịch học thử với em.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowCheatSheetModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold cursor-pointer"
              >
                Đóng
              </button>
              <a
                href={zaloDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-xl bg-[#0068FF] hover:bg-[#0055d4] text-white text-xs sm:text-sm font-bold flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Nhắn Zalo Nhận PDF</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
