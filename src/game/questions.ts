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
  // ... Thêm 8 câu hỏi nữa vào đây
];
