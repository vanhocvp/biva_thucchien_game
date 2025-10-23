export interface Question {
  id: number;
  // Các key này sẽ tương ứng với tên file ảnh bạn lưu trong public/assets
  image_left: string;
  image_right: string;
  correct_choice: 'left' | 'right';
}

export const questions: Question[] = [
  {
    id: 1,
    image_left: 'milk_bad.png',    // HSD: Tháng 10/2023
    image_right: 'milk_ok.png',     // HSD: Tháng 10/2026
    correct_choice: 'right',
  },
  {
    id: 2,
    image_left: 'check_first.png', // Ảnh icon "Kiểm tra quán"
    image_right: 'eat_now.png',    // Ảnh icon "Ăn luôn"
    correct_choice: 'left',
  },
  {
    id: 3,
    image_left: 'stall_dirty.png', // Quầy hàng bẩn
    image_right: 'stall_clean.png',// Quầy hàng sạch
    correct_choice: 'right',
  },
  // ... Thêm 7 câu hỏi nữa vào đây
];
