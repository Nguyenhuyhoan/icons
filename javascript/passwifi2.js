

import http from 'k6/http';
import { check } from 'k6';
import { randomIntBetween } from 'k6/experimental/js_common';

/**
 * Cấu hình bài kiểm thử hiệu năng.
 * Kịch bản này được thiết kế để tăng tải từ từ nhằm tránh bị hệ thống phòng thủ
 * chặn ngay lập tức.
 */
export const options = {
  stages: [
    // Giai đoạn 1: Khởi động nhẹ nhàng
    { duration: '2m', target: 500 },   // Tăng từ 0 lên 500 người dùng trong 2 phút

    // Giai đoạn 2: Giữ tải thấp để kiểm tra sự ổn định
    { duration: '4m', target: 500 },   // Giữ ổn định 500 người dùng trong 4 phút

    // Giai đoạn 3: Tăng tải lên mức trung bình
    { duration: '5m', target: 2500 },  // Tăng từ 500 lên 2500 người dùng trong 5 phút

    // Giai đoạn 4: Giữ tải trung bình
    { duration: '5m', target: 2500 },  // Giữ ổn định 2500 người dùng trong 5 phút

    // Giai đoạn 5: Tăng tốc lên mức cao nhất
    { duration: '10m', target: 10000 }, // Tăng từ 2500 lên 10,000 người dùng trong 10 phút

    // Giai đoạn 6: Giữ tải ở mức cao nhất để kiểm tra hiệu năng đỉnh
    { duration: '15m', target: 10000 }, // Giữ ổn định 10,000 người dùng trong 15 phút

    // Giai đoạn 7: Giảm tải để xem hệ thống phục hồi
    { duration: '2m', target: 0 },     // Giảm dần về 0 người dùng trong 2 phút
  ],

  thresholds: {
    // Ngưỡng chịu đựng: tỷ lệ lỗi phải dưới 1%
    'http_req_failed': ['rate<0.01'],
    // Ngưỡng hiệu năng: 95% yêu cầu phải hoàn thành dưới 800ms
    'http_req_duration': ['p(95)<800'],
  },
};

/**
 * Hàm chính thực thi kịch bản cho mỗi người dùng ảo.
 */
export default function () {
  const targetUrl = 'https://applep12.com';
  
  // Gửi yêu cầu GET đến URL mục tiêu
  const res = http.get(targetUrl);

  // --- PHẦN DEBUG LOGGING ---
  // Để tránh làm ngập log, chúng ta chỉ in ra thông tin của một số yêu cầu ngẫu nhiên.
  // Ở đây, chúng ta có cơ hội 1/500 để in log cho một yêu cầu bất kỳ.
  // Bạn có thể điều chỉnh số 500 để in nhiều hơn hoặc ít hơn.
  if (randomIntBetween(1, 500) === 1) {
    // In ra mã trạng thái HTTP mà máy chủ trả về.
    // Nếu không phải 200, rất có thể bạn đã bị chặn (ví dụ: 403, 503).
    console.log(`[DEBUG] Response status: ${res.status}`);

    // In ra 300 ký tự đầu tiên của nội dung phản hồi.
    // Điều này giúp bạn xem liệu đó có phải là trang lỗi của Cloudflare,
    // trang CAPTCHA, hay một thông báo "Access Denied" hay không.
    if (res.body) {
      console.log(`[DEBUG] Response body (first 300 chars): ${res.body.substring(0, 300)}...`);
    } else {
      console.log(`[DEBUG] Response body is empty.`);
    }
  }
  // --- KẾT THÚC PHẦN DEBUG LOGGING ---

  // Kiểm tra (check) xem yêu cầu có thành công hay không.
  // Một yêu cầu thành công là khi mã trạng thái trả về là 200.
  // Kết quả của check này sẽ quyết định tỷ lệ 'http_req_failed'.
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
