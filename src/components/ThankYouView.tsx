import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  MessageSquare, 
  Download, 
  Calendar, 
  Phone, 
  Share2, 
  ArrowLeft, 
  Sparkles, 
  Clock, 
  BookOpen, 
  Copy, 
  Check, 
  ExternalLink,
  QrCode,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { RegistrationData } from '../types';
import { CONTACT_INFO } from '../data/courseData';
import { formatPhoneNumber } from '../utils/googleDrive';

interface ThankYouViewProps {
  registration: RegistrationData;
  onBackToHome: () => void;
}

export const ThankYouView: React.FC<ThankYouViewProps> = ({ registration, onBackToHome }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedShareLink, setCopiedShareLink] = useState(false);
  const [showCheatSheetModal, setShowCheatSheetModal] = useState(false);

  useEffect(() => {
    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0284c7', '#f59e0b', '#10b981', '#6366f1'],
      });
    } catch (e) {
      // ignore
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(registration.id);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopiedShareLink(true);
    setTimeout(() => setCopiedShareLink(false), 2000);
  };

  const getGradeDisplay = (g: string) => {
    switch (g) {
      case '10': return 'Lớp 10 (Chương trình mới)';
      case '11': return 'Lớp 11 (Chương trình mới)';
      case '12': return 'Lớp 12 & Luyện thi Đại học';
      case 'dgnl_thptqg': return 'Luyện thi ĐGNL / THPTQG 2025-2026';
      default: return `Khối ${g}`;
    }
  };

  const getTimeDisplay = (t: string) => {
    switch (t) {
      case 'weekend_evening': return 'Tối Thứ Bảy hoặc Chủ Nhật (19:30)';
      case 'weekend_morning': return 'Sáng Chủ Nhật (09:00)';
      case 'weekday_evening': return 'Tối trong tuần (20:00)';
      default: return 'Tối cuối tuần (19:30)';
    }
  };

  // Google Calendar Link generator
  const createCalendarUrl = () => {
    const title = encodeURIComponent(`[VẬT LÍ Φ.RESO] Buổi Học Thử Cùng Cô Châu Đoan`);
    const details = encodeURIComponent(
      `Mã đăng ký: ${registration.id}\nHọc sinh: ${registration.fullName}\nKhối: ${getGradeDisplay(registration.grade)}\nLink phòng Zoom sẽ gửi qua Zalo trước 2 tiếng.\nHotline hỗ trợ: ${CONTACT_INFO.hotline}`
    );
    const location = encodeURIComponent('Zoom Pro Meeting Online');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/70 via-slate-50 to-white py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Back navigation button */}
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-sky-800 mb-6 px-3 py-1.5 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại trang giới thiệu</span>
        </button>

        {/* Hero Success Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-sky-100 shadow-xl shadow-sky-900/5 mb-8 relative overflow-hidden">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner ring-8 ring-emerald-50">
              <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>ĐĂNG KÝ HỌC THỬ THÀNH CÔNG!</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Chào Mừng <span className="text-sky-700">{registration.fullName}</span> Đến Với <span className="text-slate-900">Φ.RESO</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Thông tin đăng ký học thử của bạn đã được ghi nhận. Cô Châu Đoan và ban học vụ sẽ kết nối với bạn qua Zalo <strong>{formatPhoneNumber(registration.phone)}</strong> để gửi link phòng Zoom và tài liệu học.
            </p>

            {/* Registration Ticket / ID badge */}
            <div className="inline-flex items-center gap-2 p-2.5 px-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 mt-2">
              <span>Mã Đăng Ký:</span>
              <strong className="font-mono text-sky-800 font-bold tracking-wider">{registration.id}</strong>
              <button
                type="button"
                onClick={handleCopyCode}
                title="Sao chép mã"
                className="p-1 text-slate-400 hover:text-sky-600 transition-colors cursor-pointer"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Registration Details Summary Grid */}
          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50/70 p-4 rounded-2xl">
            <div>
              <span className="text-slate-400 block text-[11px]">Khối lớp đăng ký:</span>
              <strong className="text-slate-800 font-semibold">{getGradeDisplay(registration.grade)}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Trường &amp; Tỉnh thành:</span>
              <strong className="text-slate-800 font-semibold">{registration.schoolCity}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Khung giờ ưu tiên:</span>
              <strong className="text-slate-800 font-semibold">{getTimeDisplay(registration.preferredTime)}</strong>
            </div>
          </div>

        </div>

        {/* Step-by-Step Next Actions */}
        <div className="space-y-6 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-sky-700 text-white font-bold text-xs flex items-center justify-center">
              !
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              3 Bước Tiếp Theo Để Chuẩn Bị Vào Lớp Học Thử
            </h2>
          </div>

          {/* Step 1: Join Zalo */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-sky-600 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 font-bold text-xl shadow-xs">
                1
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">
                    Tham Gia Nhóm Zalo Học Thử &amp; Nhận Link Zoom
                  </h3>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                    Quan Trọng
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Link phòng học Zoom, mật khẩu và file tài liệu làm trước sẽ được gửi vào nhóm Zalo trước buổi học 2 tiếng.
                </p>
              </div>
            </div>

            <a
              href={CONTACT_INFO.zaloLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-600/30 transition-all shrink-0 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Vào Nhóm Zalo Ngay</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Step 2: Download Cheat sheet / Gift */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold text-xl shadow-xs">
                2
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">
                    Xem &amp; Tải Bộ Sơ Đồ Tư Duy Vật Lí (Quà Tặng)
                  </h3>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Độc Quyền
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Tổng hợp các nguyên lý cốt lõi, bảng tóm tắt đại lượng và sơ đồ tư duy logic để bạn đọc trước.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowCheatSheetModal(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-sm transition-all shrink-0 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Xem &amp; Tải Sơ Đồ Tư Duy</span>
            </button>
          </div>

          {/* Step 3: Calendar reminder */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 font-bold text-xl shadow-xs">
                3
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  Thêm Lịch Nhắc Hẹn Vào Google Calendar
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Tránh quên lịch học thử, hệ thống sẽ tự động nhắc bạn trước giờ lên lớp.
                </p>
              </div>
            </div>

            <a
              href={createCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors shrink-0"
            >
              <Calendar className="w-4 h-4 text-sky-700" />
              <span>Thêm Vào Google Calendar</span>
            </a>
          </div>
        </div>

        {/* Direct Contact & Support Box */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <span className="text-xs font-mono uppercase text-amber-400 font-bold">
                HỖ TRỢ TRỰC TIẾP TỪ CÔ CHÂU ĐOAN
              </span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2">
                Cần Hỗ Trợ Gấp Hoặc Thay Đổi Lịch?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Nếu bạn cần đổi khung giờ học hoặc có câu hỏi về học phí các lớp chính thức, đừng ngần ngại gọi trực tiếp hoặc nhắn tin Zalo cho Cô.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${CONTACT_INFO.hotline.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Hotline: {CONTACT_INFO.hotline}</span>
                </a>
                <a
                  href={CONTACT_INFO.zaloLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
                  <span>Nhắn Tin Zalo</span>
                </a>
              </div>
            </div>

            {/* Invite a friend / Share card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs">
              <div className="flex items-center gap-2 text-amber-300 font-bold mb-2">
                <Share2 className="w-4 h-4" />
                <span>Rủ Bạn Cùng Học Thử &amp; Cùng Tiến Bộ</span>
              </div>
              <p className="text-slate-300 mb-3 leading-relaxed">
                Học nhóm cùng bạn bè giúp tăng hứng thú trao đổi bài tập và nhân đôi hiệu ứng cộng hưởng tư duy!
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyShareLink}
                  className="flex-1 py-2 px-3 rounded-lg bg-sky-700 hover:bg-sky-600 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copiedShareLink ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Đã chép link!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao chép link gửi bạn</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onBackToHome}
                  className="py-2 px-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Đăng ký thêm bạn
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal: Preview Mindmap & Cheat Sheet */}
        {showCheatSheetModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    Φ
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      Cẩm Nang Sơ Đồ Tư Duy Vật Lí Φ.RESO 2025
                    </h3>
                    <p className="text-xs text-slate-500">Tài liệu tặng độc quyền cho học sinh đăng ký học thử</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCheatSheetModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 space-y-2">
                  <h4 className="font-bold text-sky-900 text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    3 Nguyên Lý Vàng Cần Nắm Chắc:
                  </h4>
                  <ul className="space-y-1.5 list-disc list-inside text-slate-700">
                    <li><strong>Bản chất Vector:</strong> Vecto lực, vecto vận tốc &amp; gia tốc luôn tuân theo quy tắc hình bình hành và hình chiếu trục.</li>
                    <li><strong>Định luật Bảo toàn Năng lượng:</strong> Mọi bài toán biến đổi cơ - nhiệt - điện đều bắt nguồn từ $W_1 + A = W_2$.</li>
                    <li><strong>Mối liên hệ Toán - Lý:</strong> Đạo hàm của li độ $x$ là vận tốc $v$; đạo hàm của $v$ là gia tốc $a$; tích phân là diện tích đồ thị.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">
                    Nội dung trọn bộ tài liệu chi tiết:
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 bg-white rounded border border-slate-200">
                      📄 Chương 1: Động học &amp; Động lực học
                    </div>
                    <div className="p-2 bg-white rounded border border-slate-200">
                      📄 Chương 2: Dao động cơ &amp; Sóng cơ
                    </div>
                    <div className="p-2 bg-white rounded border border-slate-200">
                      📄 Chương 3: Điện xoay chiều &amp; Sóng điện từ
                    </div>
                    <div className="p-2 bg-white rounded border border-slate-200">
                      📄 Chương 4: Kỹ thuật Casio 30s giải nhanh
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                  <p className="font-semibold mb-1">
                    📩 File PDF Full HD bản in sẽ được tự động gửi vào nhóm Zalo học thử!
                  </p>
                  <p className="text-[11px] text-amber-800">
                    Bạn cũng có thể xem trực tiếp bài tập tương tác ngay trong buổi học cùng Cô Châu Đoan.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCheatSheetModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Đóng
                </button>
                <a
                  href={CONTACT_INFO.zaloLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Vào Zalo Nhận Full PDF</span>
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
