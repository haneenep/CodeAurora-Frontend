import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  Target,
  Pencil,
  X,
  Check,
  Code,
  GitBranch,
  BookOpen,
  Clock,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Formik, Form } from "formik";
import { useAppDispatch } from "@/hooks/useRedux";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { updateUsernameSchema } from "@/utils/validationSchemas/updateUserNameSchema";
import { useState } from "react";
import { updateUserNameAction } from "@/redux/store/actions/user/updateUserNameAction";
import { getUserDataAction } from "@/redux/store/actions/auth/getUserDataAction";

interface UpdateFormValues {
  userName: string;
  email: string;
}

const UserProfile = () => {
  const userData = useSelector((state: RootState) => state.user.data);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();

  console.log(userData, "userdata profile");

  const handleUpdateUsername = async (
    values: UpdateFormValues,
    { setSubmitting }: any
  ) => {
    console.log(values, "nameval");

    try {
      const response = await dispatch(
        updateUserNameAction({
          userName: values.userName,
          email: userData?.email || "",
        })
      );

      if (response.payload.success) {
        dispatch(getUserDataAction());

        setIsEditing(false);
        toast.success("Username updated successfully");
      } else {
        toast.error("Username is not updated");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update username");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Profile Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Left Column - Profile Info */}
          <div className="w-full md:w-1/3">
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center mb-4">
                    <span className="text-4xl font-bold text-orange-600 dark:text-orange-300">
                      {userData?.userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    {isEditing ? (
                      <Formik
                        initialValues={{
                          userName: userData?.userName || "",
                          email: userData?.email || "", // Include email but don't show input field
                        }}
                        validationSchema={updateUsernameSchema}
                        onSubmit={handleUpdateUsername}
                      >
                        {({
                          isSubmitting,
                          errors,
                          touched,
                          handleChange,
                          values,
                        }) => (
                          <Form className="flex items-center gap-2">
                            <Input
                              name="userName"
                              value={values.userName}
                              onChange={handleChange}
                              className={`max-w-[200px] ${
                                errors.userName && touched.userName
                                  ? "border-red-500"
                                  : ""
                              }`}
                              autoFocus
                            />
                            {/* Remove email input field since we don't want to update it */}
                            <Button
                              size="sm"
                              variant="ghost"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              <Check className="w-4 h-4 text-green-500" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setIsEditing(false)}
                              type="button"
                            >
                              <X className="w-4 h-4 text-red-500" />
                            </Button>
                            {errors.userName && touched.userName && (
                              <span className="text-xs text-red-500 absolute -bottom-5 left-0">
                                {errors.userName}
                              </span>
                            )}
                          </Form>
                        )}
                      </Formik>
                    ) : (
                      <>
                        {userData?.userName}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-0 h-auto hover:bg-transparent"
                          onClick={() => setIsEditing(true)}
                        >
                          <Pencil className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                        </Button>
                      </>
                    )}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {userData?.email}
                  </p>
                  <div className="flex gap-2 mb-4">
                    <Badge variant="secondary" className="px-3 py-1">
                      <Trophy className="w-4 h-4 mr-1" />
                      Rank: 12,345
                    </Badge>
                    {/* <Badge variant="secondary" className="px-3 py-1">
                      <Star className="w-4 h-4 mr-1" />
                      Rating: 1842
                    </Badge> */}
                  </div>
                  <div className="w-full space-y-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Problems Solved
                      </span>
                      <span className="font-semibold">324</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Contests</span>
                      <span className="font-semibold">28</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Solutions</span>
                      <span className="font-semibold">156</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Stats & Activity */}
          <div className="w-full md:w-2/3">
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Easy Problems
                        </p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          142/455
                        </p>
                      </div>
                      <Target className="w-8 h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Medium Problems
                        </p>
                        <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                          156/999
                        </p>
                      </div>
                      <Code className="w-8 h-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Hard Problems
                        </p>
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                          26/400
                        </p>
                      </div>
                      <GitBranch className="w-8 h-8 text-red-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tabs Section */}
              <Tabs defaultValue="achievements" className="w-full">
                <TabsList className="w-full">
                  {/* <TabsTrigger value="activity" className="flex-1">Activity</TabsTrigger> */}
                  <TabsTrigger value="achievements" className="flex-1">
                    Achievements
                  </TabsTrigger>
                  <TabsTrigger value="solutions" className="flex-1">
                    Solutions
                  </TabsTrigger>
                </TabsList>

                {/* <TabsContent value="activity">
                  <Card>
                    <CardHeader>
                      <CardTitle>Submission Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={activityData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="submissions" 
                            stroke="#f97316" 
                            strokeWidth={2}
                            dot={{ fill: '#f97316' }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </TabsContent> */}

                <TabsContent value="achievements">
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                          {/* <Fire className="w-8 h-8 text-orange-500" /> */}
                          <div>
                            <h3 className="font-semibold">30 Days Streak</h3>
                            <p className="text-sm text-muted-foreground">
                              Solved one problem every day for 30 days
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <BookOpen className="w-8 h-8 text-blue-500" />
                          <div>
                            <h3 className="font-semibold">Problem Solver</h3>
                            <p className="text-sm text-muted-foreground">
                              Solved 300+ problems
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <Trophy className="w-8 h-8 text-purple-500" />
                          <div>
                            <h3 className="font-semibold">Contest Master</h3>
                            <p className="text-sm text-muted-foreground">
                              Participated in 25+ contests
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <Clock className="w-8 h-8 text-green-500" />
                          <div>
                            <h3 className="font-semibold">Speed Demon</h3>
                            <p className="text-sm text-muted-foreground">
                              Solved problems under 10 minutes
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="solutions">
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Recent Solutions */}
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-4 bg-muted rounded-lg"
                          >
                            <div>
                              <h3 className="font-semibold">Two Sum</h3>
                              <p className="text-sm text-muted-foreground">
                                Python • 2 days ago
                              </p>
                            </div>
                            <Badge variant="secondary">Easy</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
