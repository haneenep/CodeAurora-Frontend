export interface User {
    _id: string;
    userName: string;
    email: string;
    status: 'Active' | 'Inactive';
    lastLogin?: string;
    role: string;
  }
  
  export interface UserManagementProps {
    users: User[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
  }