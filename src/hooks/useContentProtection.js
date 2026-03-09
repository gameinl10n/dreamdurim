import { useEffect } from 'react';
import { CONTEXT_MENU_TOOLTIP_DURATION } from '../constants/timing';

/** 우클릭, 복사, 붙여넣기, 드래그, 선택 차단. 우클릭 시 setShowTooltip(true) 호출. */
export function useContentProtection(setShowTooltip) {
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(null), CONTEXT_MENU_TOOLTIP_DURATION);
    };
    const preventDefault = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', preventDefault);
    document.addEventListener('cut', preventDefault);
    document.addEventListener('paste', preventDefault);
    document.addEventListener('dragstart', preventDefault);
    document.addEventListener('selectstart', preventDefault);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', preventDefault);
      document.removeEventListener('cut', preventDefault);
      document.removeEventListener('paste', preventDefault);
      document.removeEventListener('dragstart', preventDefault);
      document.removeEventListener('selectstart', preventDefault);
    };
  }, [setShowTooltip]);
}
