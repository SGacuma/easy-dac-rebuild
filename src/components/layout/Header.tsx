
import React from 'react';
import { Menu, Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  toggleSidebar: () => void;
  pageTitle: string;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, pageTitle }) => {
  return (
    <header className="bg-white border-b border-dac-border h-16 flex items-center justify-between px-4">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold text-dac-foreground">{pageTitle}</h1>
      </div>

      <div className="flex items-center space-x-2">
        <div className="hidden md:flex relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dac-muted h-4 w-4" />
          <Input 
            placeholder="Search..." 
            className="pl-9 w-64 bg-dac-background border-dac-border"
          />
        </div>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-dac-primary rounded-full"></span>
        </Button>
        
        <div className="h-8 w-8 rounded-full bg-dac-primary text-white flex items-center justify-center">
          <span className="text-sm font-medium">JD</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
