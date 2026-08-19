import React, { useState } from 'react';
import { Download, Trash2, X, Users, Phone, School, Calendar, Search } from 'lucide-react';
import { RegistrationData } from '../types';
import { formatPhoneNumber } from '../utils/googleDrive';

interface AdminRegistrationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  registrations: RegistrationData[];
  onClearAll: () => void;
  onDeleteOne: (id: string) => void;
}

export const AdminRegistrationsModal: React.FC<AdminRegistrationsModalProps> = ({
  isOpen,
  onClose,
  registrations,
  onClearAll,
  onDeleteOne,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = registrations.filter(
    (r) =>
      r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.includes(searchTerm) ||
      r.schoolCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportCSV = () => {
    if (registrations.length === 0) return;
    const headers = [
      'Mã Đăng Ký',
      'Họ Và Tên',
      'Số Điện Thoại / Zalo',
      'Khối Lớp',
      'Trường & Tỉnh Thành',
      'Mục Tiêu / Vướng Mắc',
      'Khung Giờ Ưu Tiên',
      'Ngày Đăng Ký',
    ];

    const rows = registrations.map((r) => [
      `"${r.id}"`,
      `"${r.fullName}"`,
      `"${r.phone}"`,
      `"Lớp ${r.grade}"`,
      `"${r.schoolCity}"`,
      `"${r.currentChallenge}"`,
      `"${r.preferredTime}"`,
      `"${new Date(r.createdAt).toLocaleString('vi-VN')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Dang_Ky_Hoc_Thu_Vat_Li_Phi_Reso_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between gap-3 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base sm:text-xl">
                Danh Sách Đăng Ký Học Thử (Admin / Giáo Viên)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Tổng cộng: <strong className="text-sky-700 font-bold">{registrations.length}</strong> học sinh đã đăng ký
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center font-bold text-sm cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-white">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo tên, SĐT, trường..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-sky-600 font-medium"
            />
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={exportCSV}
              disabled={registrations.length === 0}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Xuất File Excel/CSV</span>
            </button>

            {registrations.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (confirm('Bạn có chắc muốn xóa tất cả danh sách đăng ký đã lưu cục bộ?')) {
                    onClearAll();
                  }
                }}
                className="px-3.5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs sm:text-sm font-semibold flex items-center gap-1.5 border border-rose-200 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Xóa hết</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Table / List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              Chưa có thông tin đăng ký nào khớp với tìm kiếm.
            </div>
          ) : (
            <div className="space-y-3.5">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3.5 text-xs sm:text-sm"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-slate-900 text-base">{item.fullName}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold text-xs">
                        Lớp {item.grade}
                      </span>
                      <span className="font-mono text-xs text-slate-400">{item.id}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3.5 text-slate-600 text-xs sm:text-sm">
                      <span className="flex items-center gap-1.5 font-bold text-slate-800 font-mono">
                        <Phone className="w-3.5 h-3.5 text-sky-600" />
                        {formatPhoneNumber(item.phone)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <School className="w-3.5 h-3.5 text-slate-400" />
                        {item.schoolCity}
                      </span>
                      <span className="text-slate-500 text-xs">
                        {new Date(item.createdAt).toLocaleString('vi-VN')}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 pt-1">
                      🎯 <strong className="text-slate-800">Mục tiêu / Khó khăn:</strong> {item.currentChallenge}
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200/60">
                    <a
                      href={`https://zalo.me/${item.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm"
                    >
                      Mở Zalo
                    </a>
                    <button
                      type="button"
                      onClick={() => onDeleteOne(item.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Xóa mục này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs sm:text-sm font-bold cursor-pointer"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
