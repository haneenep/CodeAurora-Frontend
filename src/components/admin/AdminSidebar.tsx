import { LayoutDashboard, Users, LogOut, Menu, X } from 'lucide-react';

interface SidebarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

interface AdminSidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
  { id: 'users', icon: <Users size={20} />, label: 'User Management' },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  activeTab,
  setActiveTab,
}) => {
  return (
    <aside className={`${
      isSidebarOpen ? 'w-64' : 'w-20'
    } bg-background border-r transition-all duration-300 flex flex-col`}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h1 className={`font-bold text-xl text-foreground ${!isSidebarOpen && 'hidden'}`}>
          CodeAurora Panel
        </h1>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg hover:bg-accent"
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isSidebarOpen ? <X size={20} className="text-foreground" /> : <Menu size={20} className="text-foreground" />}
        </button>
      </div>
      
      <nav className="p-4 flex-1">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 p-3 rounded-lg mb-2 transition-colors
              ${activeTab === item.id ? 'bg-primary/10 text-primary' : 'hover:bg-accent text-muted-foreground hover:text-foreground'}`}
            aria-current={activeTab === item.id ? 'page' : undefined}
          >
            {item.icon}
            <span className={`${!isSidebarOpen && 'hidden'}`}>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <button className="w-full flex items-center gap-4 p-3 rounded-lg text-destructive hover:bg-destructive/10">
          <LogOut size={20} />
          <span className={`${!isSidebarOpen && 'hidden'}`}>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;