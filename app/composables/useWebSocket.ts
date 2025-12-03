export const useWebSocket = (url: string) => {
  const ws = ref<WebSocket | null>(null);
  const isConnected = ref(false);
  const reconnectAttempts = ref(0);
  const maxReconnectAttempts = 5;
  let pingInterval: NodeJS.Timeout | null = null;

  const connect = () => {
    ws.value = new WebSocket(url);

    ws.value.onopen = () => {
      isConnected.value = true;
      reconnectAttempts.value = 0;
      startKeepAlive();
    };

    ws.value.onclose = () => {
      isConnected.value = false;
      stopKeepAlive();
      if (reconnectAttempts.value < maxReconnectAttempts) {
        const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.value), 30000);
        reconnectAttempts.value++;
        setTimeout(connect, delay);
      }
    };
  };

  const disconnect = () => {
    stopKeepAlive();
    ws.value?.close();
    ws.value = null;
    isConnected.value = false;
  };

  const sendMessage = (message: string) => {
    if (ws.value && ws.value.readyState === WebSocket.OPEN) {
      ws.value.send(message);
    }
  };

  const startKeepAlive = () => {
    stopKeepAlive();
    pingInterval = setInterval(() => {
      if (ws.value && ws.value.readyState === WebSocket.OPEN) {
        ws.value.send('ping');
      }
    }, 30000);
  };

  const stopKeepAlive = () => {
    if (pingInterval) {
      clearInterval(pingInterval);
      pingInterval = null;
    }
  };

  return {
    ws: readonly(ws),
    isConnected: readonly(isConnected),
    connect,
    disconnect,
    sendMessage,
  };
};
