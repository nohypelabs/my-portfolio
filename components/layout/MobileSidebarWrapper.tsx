'use client';

import { useSidebar } from '@/contexts/SidebarContext';
import { MobileSidebar } from './MobileSidebar';

export const MobileSidebarWrapper = () => {
  const { isMobileOpen, closeMobileSidebar } = useSidebar();

  return (
    <MobileSidebar isOpen={isMobileOpen} onClose={closeMobileSidebar} />
  );
};
