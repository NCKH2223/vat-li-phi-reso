import React from 'react';
import { Phone, Mail, MapPin, Shield, MessageCircle, Heart } from 'lucide-react';
import { CONTACT_INFO } from '../data/courseData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm py-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold font-serif text-xl">
                Φ
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                VẬT LÍ <span className="text-sky-400">Φ.RESO</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Hệ thống bồi dưỡng &amp; luyện thi Vật Lí chất lượng cao cùng Cô Châu Đoan. Định hướng tư duy bản chất hiện tượng, bứt phá năng lực cho học sinh THPT toàn quốc.
            </p>
            <div className="flex items-center gap-2 text-slate-500 text-xs">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Chương trình chuẩn theo khung GDPT 2018 và Kỳ thi ĐGNL</span>
            </div>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-white text-xs sm:text-sm uppercase tracking-wider font-mono">
              Thông Tin Liên Hệ
            </h4>
            <div className="space-y-2.5 text-sm">
              <p className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4.5 h-4.5 text-sky-400 shrink-0" />
                <span>Hotline / Zalo: <strong className="text-white">{CONTACT_INFO.hotline}</strong></span>
              </p>
              <p className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4.5 h-4.5 text-sky-400 shrink-0" />
                <span>Email: {CONTACT_INFO.email}</span>
              </p>
              <p className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4.5 h-4.5 text-sky-400 shrink-0 mt-0.5" />
                <span>{CONTACT_INFO.address}</span>
              </p>
            </div>
          </div>

          {/* Direct links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-xs sm:text-sm uppercase tracking-wider font-mono">
              Kênh Học Tập
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={CONTACT_INFO.zaloLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 flex items-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-sky-400" />
                  <span>Tham gia Nhóm Zalo Học Thử</span>
                </a>
              </li>
              <li>
                <span className="text-slate-500 block">Lớp Trực Tuyến Zoom Pro HD</span>
              </li>
              <li>
                <span className="text-slate-500 block">Kho Bài Giảng VOD &amp; Lời Giải Chi Tiết</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} VẬT LÍ Φ.RESO - Cô Châu Đoan. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Cộng hưởng tư duy • Nắm chắc bản chất</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
