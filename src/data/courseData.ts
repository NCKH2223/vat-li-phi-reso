import { TrialPackage, TeacherProfile } from '../types';

export const BRAND_ASSETS = {
  logoDriveUrl: 'https://drive.google.com/file/d/1-4HT59ELUK45bJU0cXozeib-NLacvhsB/view?usp=sharing',
  teacherAvatarDriveUrl: 'https://drive.google.com/file/d/1fOJFDgFBvQ4EkG9GiK1k2PnRWGE4dEHe/view?usp=sharing',
  hotline: '0903.471.106',
  hotlineRaw: '0903471106',
  brandName: 'VẬT LÍ Φ.RESO',
  teacherName: 'Cô Châu Đoan',
  slogan: 'CÙNG PHA TƯ DUY • CỘNG HƯỞNG NỖ LỰC • BỨT PHÁ NĂNG LỰC',
  quoteHeadline: '“Vật lí không khó, 10 trong tầm ngó!”',
  resonancePhilosophy: 'Trong Vật lí, cộng hưởng xảy ra khi tần số ngoại lực bằng tần số dao động riêng của hệ, làm cho biên độ đạt cực đại.  Φ.RESO ra đời với tinh thần ấy: không áp đặt một khuôn mẫu cho mọi học sinh, mà tìm được ‘tần số’ phù hợp với cách tiếp thu của từng em; từ đó truyền cảm hứng, tạo động lực và khơi mở tiềm năng để mỗi học sinh đạt được ‘biên độ’ phát triển tốt nhất của chính mình.',
};

export const TEACHER_INFO: TeacherProfile = {
  name: 'Cô Châu Đoan',
  title: 'Chuyên Gia Luyện Thi & Bồi Dưỡng Vật Lí',
  subTitle: 'Sáng lập phương pháp Vật Lí Φ.RESO (Cộng Hưởng Tư Duy)',
  badge: '10+ Năm Kinh Nghiệm Giảng Dạy & Luyện Thi',
  quote: '“Vật lí không khó, 10 trong tầm ngó!” — Trong Vật lí, cộng hưởng xảy ra khi tần số ngoại lực bằng tần số dao động riêng, giúp biên độ đạt cực đại. Φ.RESO tìm đúng "tần số tiếp thu" của từng học sinh để tối ưu hóa năng lực.',
  avatarUrl: BRAND_ASSETS.teacherAvatarDriveUrl,
  bulletPoints: [
    'Tốt nghiệp xuất sắc Sư phạm Vật Lí - Đại học Sư Phạm',
    'Tác giả bộ tài liệu "Bản Đồ Tư Duy Vật Lí Φ.RESO" độc quyền',
    'Giúp hàng nghìn học sinh từ mất gốc, sợ môn Lí đạt từ 8.5+ đến 9.75 điểm THPTQG & ĐGNL',
    'Phương pháp giảng giải trực quan, gắn liền thí nghiệm thực tế và giải mã Toán-Lý',
  ],
};

export const TRIAL_PACKAGES: TrialPackage[] = [
  {
    id: 'grade-10',
    name: 'Vật Lí 10 - Nền Tảng Cơ Học & Năng Lượng',
    target: 'Dành cho học sinh Lớp 10 (Chương trình mới GDPT 2018)',
    schedule: 'Thứ 7 (19:30 - 21:00) hoặc CN (09:00 - 10:30)',
    format: 'Trực tuyến Zoom/Meet tương tác 1:1 + Tặng Sơ đồ Mindmap',
    spotsLeft: 6,
    highlight: 'Xây gốc chuẩn Vecto - Động học - Động lực học',
  },
  {
    id: 'grade-11',
    name: 'Vật Lí 11 - Dao Động, Sóng & Điện Từ Trường',
    target: 'Dành cho học sinh Lớp 11 muốn làm chủ bản chất',
    schedule: 'Chủ Nhật (19:30 - 21:00)',
    format: 'Trực tuyến có bài tập tương tác trên bảng vẽ kỹ thuật số',
    spotsLeft: 4,
    highlight: 'Giải mã hiện tượng Dao Động Điều Hòa & Sóng Cơ',
  },
  {
    id: 'grade-12',
    name: 'Vật Lí 12 & Luyện Thi THPTQG / ĐGNL 2025-2026',
    target: 'Chinh phục mốc 8.5+ đến 10 điểm Đại học',
    schedule: 'Thứ 6 & CN (20:00 - 21:30)',
    format: 'Lớp học tương tác chuyên sâu + Luyện đề chuẩn ma trận',
    spotsLeft: 3,
    highlight: 'Bứt phá điểm số - Tối ưu 30s/câu trắc nghiệm tư duy',
  },
];

export const PHILOSOPHY_PILLARS = [
  {
    icon: 'BrainCircuit',
    title: '1. Hiểu Bản Chất Thay Vì Học Vẹt',
    description: 'Không bao giờ bắt học sinh "nhớ mò" hàng trăm công thức. Mọi định luật đều được xuất phát từ hiện tượng thực tiễn và bản chất vật lý.',
  },
  {
    icon: 'Sparkles',
    title: '2. Tư Duy Toán - Lý Tương Hỗ',
    description: 'Chỉ ra mối liên hệ chặt chẽ giữa toán học (đạo hàm, hình học, đồ thị) và vật lý để giải quyết mọi bài toán vận dụng cao một cách tự nhiên.',
  },
  {
    icon: 'Waves',
    title: '3. Hiệu Ứng Cộng Hưởng Φ.RESO',
    description: 'Khơi gợi niềm say mê khám phá. Khi tần số tư duy của học sinh "cộng hưởng" với sự định hướng của giáo viên, hiệu suất tiếp thu tăng gấp 3 lần.',
  },
  {
    icon: 'Users',
    title: '4. Kèm Cặp & Giải Đáp Sát Sao',
    description: 'Lớp học có sĩ số giới hạn, trợ giảng và Cô Châu Đoan đồng hành trực tiếp, giải đáp 24/7 không để đọng lại bất kỳ lỗ hổng kiến thức nào.',
  },
];

export const FAQS = [
  {
    q: 'Buổi học thử có thực sự hoàn toàn miễn phí không?',
    a: 'Hoàn toàn 100% MIỄN PHÍ! Đây là buổi học trải nghiệm thực tế cùng Cô Châu Đoan để học sinh và phụ huynh cảm nhận phong cách giảng dạy, đánh giá năng lực hiện tại và nhận lộ trình học tập cá nhân hóa.',
  },
  {
    q: 'Học sinh cần chuẩn bị những gì trước buổi học?',
    a: 'Chỉ cần máy tính/iPad/điện thoại có kết nối internet, tập vở ghi chép, máy tính Casio và một tinh thần cởi mở. Toàn bộ tài liệu buổi học và link phòng Zoom sẽ được gửi qua Zalo trước 2 tiếng.',
  },
  {
    q: 'Nếu học sinh bận vào giờ học thử thì có được xem lại video không?',
    a: 'Có. Mỗi buổi học đều được ghi hình chất lượng Full HD (VOD). Bạn sẽ được cấp quyền truy cập để xem lại bài giảng và nhận tài liệu bài tập tương ứng.',
  },
  {
    q: 'Học sinh đang mất gốc hoặc học lực trung bình có theo kịp không?',
    a: 'Chắc chắn được! Phương pháp Φ.RESO được thiết kế đặc biệt để giúp các bạn từ mất gốc hiểu bản chất từ những khái niệm căn bản nhất rồi mới nâng dần lên các bài toán ứng dụng.',
  },
];

export const CONTACT_INFO = {
  hotline: '0903.471.106',
  hotlineRaw: '0903471106',
  zaloLink: 'https://zalo.me/0903471106',
  zaloGroupCode: 'Nhóm Zalo: Lớp Học Thử Vật Lí Φ.RESO',
  email: 'vatli.phi.reso@gmail.com',
  address: 'Hà Nội & TP. Hồ Chí Minh (Học Online tương tác toàn quốc)',
};
