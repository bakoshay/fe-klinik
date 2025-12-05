export const useAntrianBell = () => {
  const audio = ref<HTMLAudioElement | null>(null);
  const isEnabled = ref(false);

  if (process.client && !audio.value) {
    audio.value = new Audio('/antrian-bell.wav');
    audio.value.preload = 'auto';
  }

  const enableAudio = async () => {
    if (!process.client || !audio.value || isEnabled.value) return;

    try {
      audio.value.volume = 0;
      await audio.value.play();
      audio.value.pause();
      audio.value.currentTime = 0;
      audio.value.volume = 1;
      isEnabled.value = true;
    } catch (error) {
      console.error('Failed to enable audio:', error);
    }
  };

  const playBell = async () => {
    if (!process.client || !audio.value) return;

    try {
      audio.value.currentTime = 0;
      await audio.value.play();
    } catch (error) {
      if (error instanceof DOMException && error.name === 'NotAllowedError') {
        console.warn('Audio playback requires user interaction. Click anywhere on the page first.');
      } else {
        console.error('Failed to play bell:', error);
      }
    }
  };

  return {
    playBell,
    enableAudio,
    isEnabled: readonly(isEnabled),
  };
};
