import { Card, CardContent } from "../ui/card";
import { User } from "lucide-react";
import { useSideBar } from "@/context/SideBarContext";
import { EnableFeature } from "../common/skeleton/EnableFeature";
import { useEffect, useState } from "react";
import { UserType } from "@/types/IUser";
import SearchInput from "../common/skeleton/SearchInput";
import { usePagination } from "@/hooks/usePagination";
import { toast } from "sonner";
import { Api } from "@/services/axios";

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    visiblePages,
    refetch,
  } = usePagination<UserType>({
    apiEndpoint: `/auth/get-all-users`,
    itemsPerPage: 7,
    searchQuery,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const { isSideBarCollapsed } = useSideBar();

  const handleBlockUser = async (userId: string | undefined, isBlocked: boolean) => {
    try {
      await Api.patch(`/auth/block-user/${userId}`, { isBlocked });
      toast.success(`User ${isBlocked ? "blocked" : "unblocked"} successfully`);
      refetch();
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <main
      className={`pt-14 ${
        isSideBarCollapsed ? "lg:ml-0" : "lg:ml-64"
      } transition-all duration-200`}
    >
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            User Management
          </h1>
          <SearchInput onSearch={handleSearch} />
        </div>

        {/* User Table */}
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="text-center py-4">Loading...</div>
              ) : (
                <>
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="text-left border-b dark:border-gray-700">
                        <th className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                          Name
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                          Email
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                          Premium
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                          Status
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((user) => (
                        <tr
                          key={user._id}
                          className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            <div className="flex items-center">
                              <User className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                              {user.userName}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            {user.email}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            {user.subscriptionType}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                !user.isBlocked
                                  ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                                  : "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100"
                              }`}
                            >
                              {!user.isBlocked ? "Active" : "Blocked"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <EnableFeature feature="block" checked={user.isBlocked} onChange={(checked) => handleBlockUser(user._id, checked)} color="red" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Pagination Controls */}
                  <div className="flex items-center justify-between px-4 py-3 border-t dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-md disabled:opacity-50"
                      >
                        Previous
                      </button>

                      {visiblePages.map((pageNumber, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            pageNumber !== -1 && goToPage(pageNumber)
                          }
                          className={`px-3 py-1 text-sm rounded-md ${
                            pageNumber === currentPage
                              ? "bg-indigo-500 text-white"
                              : pageNumber === -1
                              ? "cursor-default"
                              : "bg-gray-100 dark:bg-gray-800"
                          }`}
                        >
                          {pageNumber === -1 ? "..." : pageNumber}
                        </button>
                      ))}

                      <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-md disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>

                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Page {currentPage} of {totalPages}
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default UserManagement;
