/* eslint-disable @typescript-eslint/no-explicit-any */
interface Window {
  Tawk_API?: Record<string, any> & {
    maximize?: () => void;
    minimize?: () => void;
    toggle?: () => void;
    hideWidget?: () => void;
    showWidget?: () => void;
    onLoad?: () => void;
  };
}
