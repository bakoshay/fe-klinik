export const useAntrianSocket = () => {
  const config = useRuntimeConfig();
  const wsUrl = `${config.public.wsBaseUrl}/antrian`;
  const antrianData = ref<any>(null);

  const { ws, isConnected, connect, disconnect, sendMessage } = useWebSocket(wsUrl);

  // Listen message khusus antrian
  const setupListener = () => {
    if (!ws.value) return;
    ws.value.addEventListener('message', (event) => {
      try {
        if (event.data && typeof event.data === 'string' && event.data.trim().startsWith('{')) {
          const data = JSON.parse(event.data);
          antrianData.value = data;
        }
      } catch (error) {
        console.error('Failed to parse message:', error);
      }
    });
  };

  // Setup listener setiap connect
  watch(ws, (val) => {
    if (val) setupListener();
  });

  return {
    antrianData: readonly(antrianData),
    isConnected,
    connect,
    disconnect,
    sendMessage,
  };
};
