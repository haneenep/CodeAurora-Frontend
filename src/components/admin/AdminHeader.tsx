import { Bell } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title }) => {
  return (
    <header className="bg-background border-b">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-4">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <button 
          className="p-2 rounded-lg hover:bg-accent transition-colors duration-200"
          aria-label="Notifications"
        >
          <Bell 
            size={20} 
            className="text-muted-foreground hover:text-foreground transition-colors duration-200" 
          />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;