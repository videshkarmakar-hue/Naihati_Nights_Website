import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-50 flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-[#3E2723] border border-[#5D4037] text-amber-200 text-xs font-medium shadow-md backdrop-blur-sm"
    >
      <span className="w-2 h-2 rounded-full bg-amber-400" aria-hidden="true" />
      <WifiOff className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
      <span>Offline Mode — Cached content available</span>
    </div>
  );
};
