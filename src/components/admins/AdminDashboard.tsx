import { Card, CardContent } from '../ui/card'
import { Award, Brain, Code2, FileCode, GitPullRequest, Users } from 'lucide-react'
import { useSideBar } from '@/context/SideBarContext'

const AdminDashboard = () => {

  const {isSideBarCollapsed} = useSideBar()
  
  return (
    <>
      <main
        className={`pt-14 ${
          isSideBarCollapsed ? "lg:ml-0" : "lg:ml-64"
        } transition-all duration-200`}
      >
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Admin Dashboard
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Total Problems
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      324
                    </h3>
                  </div>
                  <FileCode className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Active Users
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      1,234
                    </h3>
                  </div>
                  <Users className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Today's Submissions
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      456
                    </h3>
                  </div>
                  <GitPullRequest className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center px-4 py-2 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Code2 className="h-5 w-5 mr-3" />
                    Add New Problem
                  </button>
                  <button className="w-full flex items-center px-4 py-2 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Award className="h-5 w-5 mr-3" />
                    Create Contest
                  </button>
                  <button className="w-full flex items-center px-4 py-2 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Brain className="h-5 w-5 mr-3" />
                    Review Solutions
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    New problem added: "Dynamic Programming Basics"
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Contest "Weekly Challenge #45" started
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    5 new problem reports require review
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}

export default AdminDashboard