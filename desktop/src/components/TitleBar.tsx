import { useState, useEffect } from 'react';

export default function TitleBar() {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    console.log('TitleBar mounted, electron API:', window.electron);
    checkMaximized();
  }, []);

  const checkMaximized = async () => {
    if (window.electron) {
      const maximized = await window.electron.isMaximized();
      setIsMaximized(maximized);
    }
  };

  const handleMinimize = async () => {
    try {
      if (window.electron) {
        await window.electron.minimizeWindow();
      }
    } catch (error) {
      console.error('Failed to minimize window:', error);
    }
  };

  const handleMaximize = async () => {
    try {
      if (window.electron) {
        await window.electron.maximizeWindow();
        await checkMaximized();
      }
    } catch (error) {
      console.error('Failed to maximize window:', error);
    }
  };

  const handleClose = async () => {
    try {
      if (window.electron) {
        await window.electron.closeWindow();
      }
    } catch (error) {
      console.error('Failed to close window:', error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-10 bg-gradient-to-b from-background-dark via-background-dark to-transparent backdrop-blur-xl border-b border-white/[0.08] flex items-center justify-between px-4 z-[9999] select-none" style={{ WebkitAppRegion: 'drag' } as any}>
      {/* App Title */}
      <div className="flex items-center gap-2.5">
        <div className="size-6 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-white text-base font-bold">shield_lock</span>
        </div>
        <span className="text-sm font-bold text-white tracking-tight">BupStore</span>
      </div>

      {/* Window Controls */}
      <div className="flex items-center gap-0.5" style={{ WebkitAppRegion: 'no-drag' } as any}>
        <button
          onClick={handleMinimize}
          className="w-11 h-8 rounded-md hover:bg-white/[0.08] active:bg-white/[0.12] flex items-center justify-center text-white/60 hover:text-white transition-all duration-150 group focus:outline-none"
          title="Minimize"
        >
          <svg width="12" height="2" viewBox="0 0 12 2" className="fill-current">
            <rect width="12" height="2" rx="1" />
          </svg>
        </button>
        <button
          onClick={handleMaximize}
          className="w-11 h-8 rounded-md hover:bg-white/[0.08] active:bg-white/[0.12] flex items-center justify-center text-white/60 hover:text-white transition-all duration-150 group focus:outline-none"
          title={isMaximized ? "Restore" : "Maximize"}
        >
          {isMaximized ? (
            <svg width="12" height="12" viewBox="0 0 12 12" className="fill-current">
              <path d="M3 0H12V9H10V2H3V0Z" />
              <rect x="0" y="3" width="9" height="9" rx="1" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" className="fill-current">
              <rect width="12" height="12" rx="1.5" strokeWidth="1.5" className="stroke-current fill-none" />
            </svg>
          )}
        </button>
        <button
          onClick={handleClose}
          className="w-11 h-8 rounded-md hover:bg-red-500 active:bg-red-600 flex items-center justify-center text-white/60 hover:text-white transition-all duration-150 group focus:outline-none"
          title="Close"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" className="fill-current">
            <path d="M11.8 1.6L10.4 0.2L6 4.6L1.6 0.2L0.2 1.6L4.6 6L0.2 10.4L1.6 11.8L6 7.4L10.4 11.8L11.8 10.4L7.4 6L11.8 1.6Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
