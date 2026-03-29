import { useEffect } from 'react';

/** Surfaces uncaught errors in the devtools console (no remote logging). */
export function ClientErrorHandler() {
  useEffect(() => {
    const handleError = (e: ErrorEvent) => {
      console.error('[uncaught error]', e.message, e.error);
    };

    const handleRejection = (e: PromiseRejectionEvent) => {
      console.error('[unhandled rejection]', e.reason);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  return null;
}
