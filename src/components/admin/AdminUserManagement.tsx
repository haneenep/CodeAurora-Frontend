import { User, UserManagementProps } from "@/types/IUser";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import UserStatusBadge from "./AdminUserStatusBadge";

const AdminUserManagement: React.FC<UserManagementProps> = ({
  users,
  searchTerm,
  setSearchTerm,
}) => {
  const filteredUsers = users.filter(
    (user) =>
      user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="border bg-card text-card-foreground">
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <div className="mt-4">
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                  Name
                </th>
                <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                  Email
                </th>
                <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td className="p-4 text-foreground">{user.userName}</td>
                  <td className="p-4 text-foreground">{user.email}</td>
                  <td className="p-4">
                    <UserStatusBadge status={user.status} />
                  </td>
                  <td className="p-4">
                    <button className="text-primary hover:text-primary/80">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminUserManagement;