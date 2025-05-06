
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Book, 
  Calendar, 
  Settings, 
  Users,
  Database, 
  File, 
  Menu 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

type SidebarNavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

const menuItems: SidebarNavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: Home,
  },
  {
    title: 'General Ledger',
    href: '/general-ledger',
    icon: Book,
  },
  {
    title: 'Chart of Accounts',
    href: '/chart-of-accounts',
    icon: Database,
  },
  {
    title: 'Transactions',
    href: '/transactions',
    icon: Calendar,
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: File,
  },
  {
    title: 'Users',
    href: '/users',
    icon: Users,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const isMobile = useIsMobile();

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "flex flex-col fixed top-0 left-0 z-30 h-full bg-white border-r border-dac-border transition-all duration-300 ease-in-out",
          isOpen ? "w-64" : "w-20",
          isMobile && !isOpen && "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-dac-border">
          <div className={cn("flex items-center", !isOpen && "justify-center w-full")}>
            {isOpen ? (
              <h1 className="text-xl font-bold text-dac-primary">DacEasy</h1>
            ) : (
              <h1 className="text-xl font-bold text-dac-primary">DE</h1>
            )}
          </div>
          {!isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-dac-background hover:text-dac-primary transition-colors",
                    window.location.pathname === item.href
                      ? "bg-dac-background text-dac-primary"
                      : "text-dac-foreground"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isOpen ? "mr-2" : "mx-auto")} />
                  {isOpen && <span>{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
