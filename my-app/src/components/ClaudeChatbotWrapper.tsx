'use client';

import dynamic from 'next/dynamic';

// Client component wrapper for ClaudeChatbot to allow ssr: false
const ClaudeChatbot = dynamic(() => import('@/components/ClaudeChatbot'), {
  ssr: false,
  loading: () => null
});

export function ClaudeChatbotWrapper() {
  return <ClaudeChatbot />;
}
