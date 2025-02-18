import { cn } from "@/components/lib/utils";

interface UserStatusBadgeProps {
  status: 'Active' | 'Inactive';
}

const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({ status }) => {
  const baseStyles = "px-2 py-1 rounded-full text-xs font-medium";
  
  const statusStyles = {
    Active: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
    Inactive: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
  };

  return (
    <span className={cn(baseStyles, statusStyles[status])}>
      {status}
    </span>
  );
};

export default UserStatusBadge;