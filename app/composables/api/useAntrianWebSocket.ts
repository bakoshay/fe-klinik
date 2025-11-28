export const useAntrianWebSocket = () => {
  const ws = ref<WebSocket | null>(null);
  const antrianData = ref<any>(null);
  const isConnected = ref(false);
  const reconnectAttempts = ref(0);
  const maxReconnectAttempts = 5;
  const config = useRuntimeConfig();

  let pingInterval: NodeJS.Timeout | null = null;

  const connect = () => {
    try {
      // Ganti dengan URL backend kamu atau gunakan env
      const wsUrl = `${config.public.wsBaseUrl}/antrian`;

      ws.value = new WebSocket(wsUrl);

      ws.value.onopen = () => {
        if (import.meta.env.DEV) {
          console.log('WebSocket Connected');
        }

        isConnected.value = true;
        reconnectAttempts.value = 0;
        startKeepAlive();
      };

      ws.value.onmessage = (event) => {
        try {
          // Cek apakah data kemungkinan besar JSON
          if (event.data && typeof event.data === 'string' && event.data.trim().startsWith('{')) {
            const data = JSON.parse(event.data);
            console.log('data ws', data);

            antrianData.value = data;
          } else {
            if (import.meta.env.DEV) {
              console.warn('Received non-JSON message:', event.data);
            }
          }
        } catch (error) {
          if (import.meta.env.DEV) {
            console.error('Failed to parse message:', error);
          }
        }
      };

      ws.value.onerror = (error) => {
        console.error('WebSocket Error:', error);
      };

      ws.value.onclose = () => {
        if (import.meta.env.DEV) {
          console.log('WebSocket Closed');
        }

        isConnected.value = false;
        stopKeepAlive();

        // Auto reconnect dengan exponential backoff
        if (reconnectAttempts.value < maxReconnectAttempts) {
          const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.value), 30000);
          reconnectAttempts.value++;

          if (import.meta.env.DEV) {
            console.log(
              `🔄 Reconnecting in ${delay}ms... (Attempt ${reconnectAttempts.value}/${maxReconnectAttempts})`
            );
          }

          setTimeout(() => {
            connect();
          }, delay);
        } else {
          if (import.meta.env.DEV) {
            console.error('Max reconnect attempts reached');
          }
        }
      };
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Failed to connect WebSocket:', error);
      }
    }
  };

  const disconnect = () => {
    stopKeepAlive();

    if (ws.value) {
      ws.value.close();
      ws.value = null;
    }

    isConnected.value = false;
  };

  const sendMessage = (message: string) => {
    if (ws.value && ws.value.readyState === WebSocket.OPEN) {
      ws.value.send(message);
    } else {
      if (import.meta.env.DEV) {
        console.warn('WebSocket is not connected');
      }
    }
  };

  const startKeepAlive = () => {
    stopKeepAlive(); // Clear existing interval

    pingInterval = setInterval(() => {
      if (ws.value && ws.value.readyState === WebSocket.OPEN) {
        ws.value.send('ping');
      }
    }, 30000); // Setiap 30 detik
  };

  const stopKeepAlive = () => {
    if (pingInterval) {
      clearInterval(pingInterval);
      pingInterval = null;
    }
  };

  return {
    antrianData: readonly(antrianData),
    isConnected: readonly(isConnected),
    connect,
    disconnect,
    sendMessage,
  };
};
