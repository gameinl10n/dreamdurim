import { useEffect } from 'react';

/** Escape 키 입력 시 onClose 콜백 실행. enabled가 false면 리스너 미등록. */
export function useCloseOnEscape(onClose, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, enabled]);
}
