import React, { useState } from 'react';
import { Award, CheckCircle, GraduationCap, HeartHandshake, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { TEACHER_INFO } from '../data/courseData';
import { getGoogleDriveDirectLink } from '../utils/googleDrive';

export const TeacherIntro: React.FC = () => {
  // Allow dynamic avatar preview from Google Drive if desired
  const [customDriveLink, setCustomDriveLink] = useState('');
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(TEACHER_INFO.avatarUrl);

  const handleApplyDriveLink = () => {
    if (!customDriveLink.trim()) return;
    const direct = getGoogleDriveDirectLink(customDriveLink);
    setCurrentAvatar(direct);
    setIsEditingImage(false);
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Teacher Image / Avatar Column with Google Drive Link Helper */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-3xl overflow-hidden shadow-lg shadow-sky-900/10 border-4 border-white bg-slate-100 group">
                <img
                  src={getGoogleDriveDirectLink(currentAvatar)}
                  alt="Cô Châu Đoan - Giáo Viên Vật Lí Φ.RESO"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to high quality academic portrait if custom link fails
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop';
                  }}
                  referrerPolicy="no-referrer"
                />

                {/* Floating Experience Badge */}
                <div className="absolute bottom-3 inset-x-3 bg-slate-900/85 backdrop-blur-md text-white p-2.5 rounded-2xl text-center border border-white/20">
                  <span className="text-[11px] font-mono uppercase text-amber-300 font-bold block">
                    {TEACHER_INFO.badge}
                  </span>
                  <span className="text-xs font-semibold text-slate-100">
                    Sư Phạm Vật Lí • Đồng Hành Tận Tâm
                  </span>
                </div>
              </div>

              {/* Quick Drive Image Link helper for teacher */}
              <div className="mt-3 w-full max-w-xs text-center">
                {!isEditingImage ? (
                  <button
                    type="button"
                    onClick={() => setIsEditingImage(true)}
                    className="text-[11px] text-slate-400 hover:text-sky-700 inline-flex items-center gap-1 font-medium hover:underline cursor-pointer"
                  >
                    <LinkIcon className="w-3 h-3" />
                    <span>Dùng ảnh cá nhân từ Google Drive (Tùy chọn)</span>
                  </button>
                ) : (
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-2 mt-1">
                    <label className="text-[11px] font-semibold text-slate-700 block">
                      Dán link ảnh Google Drive của Cô:
                    </label>
                    <input
                      type="text"
                      placeholder="https://drive.google.com/file/d/..."
                      value={customDriveLink}
                      onChange={(e) => setCustomDriveLink(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs rounded border border-slate-300 bg-white"
                    />
                    <div className="flex gap-1.5 justify-end">
                      <button
                        type="button"
                        onClick={() => setIsEditingImage(false)}
                        className="px-2 py-1 text-xs text-slate-500 hover:bg-slate-200 rounded"
                      >
                        Hủy
                      </button>
                      <button
                        type="button"
                        onClick={handleApplyDriveLink}
                        className="px-2.5 py-1 text-xs bg-sky-700 text-white rounded font-bold hover:bg-sky-800"
                      >
                        Áp dụng
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Teacher Details & Credibility Column */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold mb-2">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
                  <span>NGƯỜI TRUYỀN CẢM HỨNG VẬT LÍ</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {TEACHER_INFO.name}
                </h2>
                <p className="text-sm font-semibold text-sky-700 mt-0.5">
                  {TEACHER_INFO.title}
                </p>
              </div>

              {/* Quote Block */}
              <blockquote className="p-4 rounded-2xl bg-sky-50/70 border-l-4 border-sky-600 text-slate-700 text-xs sm:text-sm italic leading-relaxed">
                &ldquo;{TEACHER_INFO.quote}&rdquo;
              </blockquote>

              {/* Bullet points */}
              <div className="space-y-2.5">
                {TEACHER_INFO.bulletPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Teaching Commitments */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <HeartHandshake className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800">
                    Kèm cặp sát sao từng học sinh
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <Award className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800">
                    Cam kết tiến bộ rõ rệt
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
