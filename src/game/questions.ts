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
    image_left: 'milk_bad.png',
    image_right: 'milk_ok.png',
    correct_choice: 'right',
  },
  {
    id: 2,
    image_left: 'check_first.png',
    image_right: 'eat_now.png',
    correct_choice: 'left',
  },
  {
    id: 3,
    image_left: 'stall_dirty.png',
    image_right: 'stall_clean.png',
    correct_choice: 'right',
  },
  {
    id: 4,
    image_left: 'pack_ok.png',
    image_right: 'pack_bad.png',
    correct_choice: 'left',
  },
  // ... Thêm các câu hỏi còn lại vào đây
];
