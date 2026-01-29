import { useEffect } from 'react';

export function ClientErrorHandler() {
  useEffect(() => {
    // #region agent log
    const logError = (location: string, message: string, data: any, hypothesisId: string) => {
      fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({location, message, data, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run2', hypothesisId})
      }).catch(() => {});
    };

    // Global error handler
    const handleError = (e: ErrorEvent) => {
      logError('client:global-error', 'Uncaught error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        error: e.error?.toString(),
        stack: e.error?.stack
      }, 'G');
    };

    // Unhandled promise rejection
    const handleRejection = (e: PromiseRejectionEvent) => {
      logError('client:unhandled-rejection', 'Unhandled promise rejection', {
        reason: e.reason?.toString(),
        stack: e.reason?.stack
      }, 'G');
    };

    // DOM ready check
    const checkDOM = () => {
      logError('client:dom-ready', 'DOM content loaded', {
        readyState: document.readyState,
        bodyExists: !!document.body,
        htmlExists: !!document.documentElement,
        bodyChildren: document.body?.children?.length || 0
      }, 'H');
    };

    // Initial check
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(checkDOM, 0);
    } else {
      document.addEventListener('DOMContentLoaded', checkDOM);
    }

    // Post-render check
    setTimeout(() => {
      logError('client:post-render', 'Post-render check', {
        bodyChildren: document.body?.children?.length || 0,
        mainExists: !!document.querySelector('main'),
        headerExists: !!document.querySelector('header, [class*="header"]'),
        footerExists: !!document.querySelector('footer, [class*="footer"]'),
        cssLoaded: document.styleSheets.length > 0
      }, 'I');
    }, 100);

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
    // #endregion
  }, []);

  return null;
}
