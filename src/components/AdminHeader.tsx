import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import Logo from './Logo';

const AdminHeader = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="sticky top-0 z-50 pt-4 sm:pt-8 px-4 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <header className="w-full max-w-7xl mx-auto py-2 sm:py-3 px-4 sm:px-6 md:px-8 flex items-center justify-between">
        <div className="p-2 sm:p-3">
          <Logo />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">{user?.email}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>
    </div>
  );
};

export default AdminHeader;
