import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Code,
  GitBranch,
  MessageSquare,
  Brain,
  Zap,
  Target,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Submission {
  problem: string;
  difficulty: "Easy" | "Medium" | "Hard";
  language: string;
  timestamp: string;
}

const UserProfile = () => {
  const userData = useSelector((state: RootState) => state.user.data);

  const navigate = useNavigate();

  // Mock recent submissions
  const recentSubmissions: Submission[] = [
    {
      problem: "Two Sum",
      difficulty: "Easy",
      language: "Python",
      timestamp: "9 hours ago",
    },
    {
      problem: "Flatten Deeply Nested Array",
      difficulty: "Medium",
      language: "JavaScript",
      timestamp: "1 day ago",
    },
    {
      problem: "Is Object Empty",
      difficulty: "Easy",
      language: "JavaScript",
      timestamp: "2 days ago",
    },
    {
      problem: "Create Hello World Function",
      difficulty: "Easy",
      language: "JavaScript",
      timestamp: "3 days ago",
    },
    {
      problem: "First Missing Positive",
      difficulty: "Hard",
      language: "Python",
      timestamp: "4 days ago",
    },
  ];

  const problemStats = {
    easy: { solved: 107, total: 861, percentage: 12.4 },
    medium: { solved: 12, total: 1800, percentage: 0.67 },
    hard: { solved: 1, total: 804, percentage: 0.12 },
  };

  // Calculate mastery score
  const calculateMasteryScore = () => {
    // This is a weighted calculation where harder problems count more
    const easyScore = problemStats.easy.solved * 1;
    const mediumScore = problemStats.medium.solved * 3;
    const hardScore = problemStats.hard.solved * 5;
    const maxPossibleScore = 1000; // Theoretical maximum

    const totalScore = easyScore + mediumScore + hardScore;
    return Math.min(Math.round((totalScore / maxPossibleScore) * 100), 100);
  };

  const masteryScore = calculateMasteryScore();

  function editProfile() {
    navigate("/edit-profile");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-16"></div>
              <CardContent className="pt-0 relative">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 border-4 border-background dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center -mt-10 relative z-10">
                    {userData?.profileImage ? (
                      <img
                        src={userData.profileImage}
                        className="w-20 h-20 rounded-full object-cover"
                        alt="profile-image"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        {userData?.userName?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className="mt-2 text-center">
                    <h2 className="text-xl font-bold mb-1 flex items-center justify-center gap-2">
                      {userData?.userName || "username"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {userData?.email || "user@example.com"}
                    </p>
                  </div>

                  <div className="mt-4 w-full">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Rank</span>
                      <span className="font-bold">950,889</span>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={editProfile}
                    >
                      Edit Profile
                    </Button>
                  </div>

                  <div className="w-full border-t border-border mt-4 pt-4">
                    <h3 className="font-semibold mb-2">Community Stats</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2 text-sm">
                          <Code className="w-4 h-4" /> Solution
                        </span>
                        <div className="flex items-center">
                          <span className="font-medium">104</span>
                          <span className="text-xs text-green-500 ml-1">
                            +9
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2 text-sm">
                          <MessageSquare className="w-4 h-4" /> Discuss
                        </span>
                        <span className="font-medium">0</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full border-t border-border mt-4 pt-4">
                    <h3 className="font-semibold mb-2">Languages</h3>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">JavaScript</span>
                        <span className="text-sm font-medium">
                          119 problems
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">PostgreSQL</span>
                        <span className="text-sm font-medium">1 problem</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Stats & Activity */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Coding Mastery Meter - Unique Feature */}
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-2 flex justify-between items-center">
                    <h3 className="font-bold text-lg flex items-center">
                      <Brain className="w-5 h-5 mr-2 text-orange-500" />
                      Coding Mastery
                    </h3>
                    <Badge variant="outline" className="font-normal">
                      {masteryScore < 30
                        ? "Novice"
                        : masteryScore < 50
                        ? "Advanced Beginner"
                        : masteryScore < 70
                        ? "Competent"
                        : masteryScore < 85
                        ? "Proficient"
                        : "Expert"}
                    </Badge>
                  </div>

                  {/* Custom Mastery Progress - Unique Visualization */}
                  <div className="relative h-10 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mt-4">
                    <div
                      className="absolute h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                      style={{ width: `${masteryScore}%` }}
                    ></div>

                    {/* Skill Level Markers */}
                    <div className="absolute top-0 left-0 w-full h-full flex justify-between px-1">
                      {[20, 40, 60, 80].map((marker) => (
                        <div
                          key={marker}
                          className="h-full flex flex-col justify-center"
                        >
                          <div className="h-full w-px bg-gray-300 dark:bg-gray-600"></div>
                        </div>
                      ))}
                    </div>

                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <span className="font-bold text-white drop-shadow-md">
                        {masteryScore}/100
                      </span>
                    </div>
                  </div>

                  <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>Novice</span>
                    <span>Advanced Beginner</span>
                    <span>Competent</span>
                    <span>Proficient</span>
                    <span>Expert</span>
                  </div>
                </CardContent>
              </Card>

              {/* Problem Distribution - Top Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Problem Categories - Now with unique styling */}
                <Card className="overflow-hidden">
                  <div className="bg-green-50 dark:bg-green-900/20 border-b px-4 py-2">
                    <h3 className="font-medium text-sm flex items-center">
                      <Target className="w-4 h-4 mr-2 text-green-500" />
                      Easy Problems
                    </h3>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-green-600">
                        {problemStats.easy.solved}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        / {problemStats.easy.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-green-500 h-full rounded-full"
                        style={{ width: `${problemStats.easy.percentage}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <div className="bg-orange-50 dark:bg-orange-900/20 border-b px-4 py-2">
                    <h3 className="font-medium text-sm flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2 text-orange-500" />
                      Medium Problems
                    </h3>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-orange-600">
                        {problemStats.medium.solved}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        / {problemStats.medium.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-orange-500 h-full rounded-full"
                        style={{ width: `${problemStats.medium.percentage}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <div className="bg-red-50 dark:bg-red-900/20 border-b px-4 py-2">
                    <h3 className="font-medium text-sm flex items-center">
                      <GitBranch className="w-4 h-4 mr-2 text-red-500" />
                      Hard Problems
                    </h3>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-red-600">
                        {problemStats.hard.solved}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        / {problemStats.hard.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-red-500 h-full rounded-full"
                        style={{ width: `${problemStats.hard.percentage}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardContent className="p-0">
                  <Tabs defaultValue="solutions" className="w-full">
                    <TabsList className="w-full rounded-none border-b">
                      <TabsTrigger
                        value="solutions"
                        className="flex items-center"
                      >
                        <Code className="w-4 h-4 mr-2" />
                        Solutions
                      </TabsTrigger>
                      <TabsTrigger
                        value="challenge"
                        className="flex items-center"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Daily Challenge
                      </TabsTrigger>
                      <TabsTrigger
                        value="discuss"
                        className="flex items-center"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Discuss
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="solutions" className="p-0">
                      <div className="p-4">
                        <div className="space-y-2">
                          {recentSubmissions.map((submission, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-3 hover:bg-muted/50 rounded-lg cursor-pointer"
                            >
                              <div>
                                <h3 className="font-medium text-sm hover:text-indigo-500">
                                  {submission.problem}
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                  {submission.language} • {submission.timestamp}
                                </p>
                              </div>
                              <Badge
                                variant="outline"
                                className={`
                                  ${
                                    submission.difficulty === "Easy"
                                      ? "text-green-500 border-green-200 dark:border-green-800"
                                      : ""
                                  }
                                  ${
                                    submission.difficulty === "Medium"
                                      ? "text-orange-500 border-orange-200 dark:border-orange-800"
                                      : ""
                                  }
                                  ${
                                    submission.difficulty === "Hard"
                                      ? "text-red-500 border-red-200 dark:border-red-800"
                                      : ""
                                  }
                                `}
                              >
                                {submission.difficulty}
                              </Badge>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 text-right">
                          <Button
                            variant="link"
                            className="text-sm flex items-center gap-1"
                          >
                            View all solutions{" "}
                            <ArrowRight className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="challenge">
                      <div className="p-6">
                        <div className="text-center mb-4">
                          <Badge variant="outline" className="mb-2">
                            TODAY'S CHALLENGE
                          </Badge>
                          <h3 className="text-lg font-bold mb-1">
                            Maximum Subarray
                          </h3>
                          <Badge
                            variant="outline"
                            className="text-orange-500 border-orange-200 dark:border-orange-800"
                          >
                            Medium
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground text-center mb-4">
                          Complete the daily challenge to maintain your streak
                          and earn bonus points!
                        </p>
                        <div className="flex justify-center">
                          <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                            Solve Challenge
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="discuss">
                      <div className="p-4 text-center text-muted-foreground">
                        <p className="mb-3">
                          You haven't participated in any discussions yet
                        </p>
                        <Button variant="outline">Join a discussion</Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
