import React, { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, CheckCircle, Circle, Clock, Brain, ChevronRight, List, BookOpen } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  acceptance: number;
  status: 'solved' | 'attempted' | 'unsolved';
  tags: string[];
  likes?: number;
  companies?: string[];
}

const mockProblems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    acceptance: 49.2,
    status: "solved",
    tags: ["Array", "Hash Table"],
    likes: 2845,
    companies: ["Google", "Amazon", "Facebook"]
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    category: "Linked List",
    acceptance: 38.7,
    status: "attempted",
    tags: ["Linked List", "Math", "Recursion"],
    likes: 1923,
    companies: ["Microsoft", "Apple"]
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "String",
    acceptance: 33.8,
    status: "unsolved",
    tags: ["Hash Table", "String", "Sliding Window"],
    likes: 3102,
    companies: ["Amazon", "Google", "Netflix"]
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Array",
    acceptance: 35.3,
    status: "unsolved",
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    likes: 1567,
    companies: ["Facebook", "Google"]
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    category: "String",
    acceptance: 32.1,
    status: "solved",
    tags: ["String", "Dynamic Programming"],
    likes: 2234,
    companies: ["Amazon", "Microsoft", "Apple"]
  },
  {
    id: 6,
    title: "ZigZag Conversion",
    difficulty: "Medium",
    category: "String",
    acceptance: 44.6,
    status: "unsolved",
    tags: ["String"],
    likes: 892,
    companies: ["PayPal", "Adobe"]
  },
  {
    id: 7,
    title: "Reverse Integer",
    difficulty: "Medium",
    category: "Math",
    acceptance: 27.3,
    status: "attempted",
    tags: ["Math"],
    likes: 1445,
    companies: ["Bloomberg", "Apple"]
  },
  {
    id: 8,
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    category: "String",
    acceptance: 16.4,
    status: "unsolved",
    tags: ["String"],
    likes: 678,
    companies: ["Amazon", "Microsoft"]
  }
];

const ProblemsListing: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredProblems = useMemo(() => {
    return mockProblems.filter(problem => {
      const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDifficulty = difficultyFilter === 'all' || problem.difficulty === difficultyFilter;
      const matchesStatus = statusFilter === 'all' || problem.status === statusFilter;
      
      return matchesSearch && matchesDifficulty && matchesStatus;
    });
  }, [searchTerm, difficultyFilter, statusFilter]);

  // Calculate stats for progress bar
  const stats = useMemo(() => {
    const solved = mockProblems.filter(p => p.status === 'solved').length;
    const total = mockProblems.length;
    return { solved, total };
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'from-green-400 to-emerald-500';
      case 'Medium': return 'from-yellow-400 to-orange-500';
      case 'Hard': return 'from-red-400 to-pink-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'solved': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'attempted': return <Clock className="w-5 h-5 text-yellow-500" />;
      default: return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  // Kanban View Component
  const KanbanView = () => {
    const columns = [
      {
        status: 'unsolved',
        title: 'To Do',
        icon: <Circle className="w-5 h-5" />,
        color: 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'
      },
      {
        status: 'attempted',
        title: 'In Progress',
        icon: <Clock className="w-5 h-5" />,
        color: 'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-gray-800'
      },
      {
        status: 'solved',
        title: 'Completed',
        icon: <CheckCircle className="w-5 h-5" />,
        color: 'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-gray-800'
      }
    ];

    return (
      <div className="grid gap-6 md:grid-cols-3">
        {columns.map((column) => {
          const columnProblems = filteredProblems.filter(p => p.status === column.status);
          return (
            <div key={column.status} className={`rounded-xl border-2 ${column.color}`}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-2">
                  {column.icon}
                  <h3 className="font-bold text-gray-900 dark:text-white">{column.title}</h3>
                  <Badge variant="secondary" className="ml-auto">{columnProblems.length}</Badge>
                </div>
              </div>
              
              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {columnProblems.map((problem) => (
                  <div key={problem.id} className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-500">#{problem.id}</span>
                      <Badge className={`bg-gradient-to-r ${getDifficultyColor(problem.difficulty)} text-white text-xs border-0`}>
                        {problem.difficulty}
                      </Badge>
                    </div>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">{problem.title}</h4>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{problem.category}</span>
                      <span>{problem.acceptance}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Minimal List View
  const MinimalListView = () => (
    <div className="space-y-2">
      {filteredProblems.map((problem) => (
        <div key={problem.id} className="group flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {getStatusIcon(problem.status)}
            <span className="text-sm font-medium text-gray-500 w-8">#{problem.id}</span>
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
              {problem.title}
            </h3>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge className={`bg-gradient-to-r ${getDifficultyColor(problem.difficulty)} text-white border-0 text-xs`}>
              {problem.difficulty}
            </Badge>
            <span className="text-sm text-gray-600 w-16 text-right">{problem.acceptance}%</span>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderView = () => {
    switch (viewMode) {
      case 'kanban': return <KanbanView />;
      case 'list': return <MinimalListView />;
      default: return <MinimalListView />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
        {/* Dynamic Header with Progress Bar */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
            <Brain className="w-4 h-4" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Master Your Coding Skills
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Practice with {mockProblems.length} carefully curated problems across multiple difficulty levels
          </p>
          {/* Progress Bar */}
          <div className="space-y-2 max-w-md mx-auto">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Progress</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {stats.solved} of {stats.total} ({Math.round((stats.solved / stats.total) * 100)}%)
              </span>
            </div>
            <Progress value={(stats.solved / stats.total) * 100} className="h-2" />
          </div>
        </div>

        {/* Enhanced Controls */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search problems, tags, companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 rounded-xl h-12 text-lg"
              />
            </div>
            
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-lg"
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'kanban' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('kanban')}
                  className="rounded-lg"
                >
                  <BookOpen className="w-4 h-4" />
                </Button>
              </div>

              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-40 h-10 rounded-xl">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 h-10 rounded-xl">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="solved">Solved</SelectItem>
                  <SelectItem value="attempted">Attempted</SelectItem>
                  <SelectItem value="unsolved">Todo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Showing <strong>{filteredProblems.length}</strong> problems in <strong>{viewMode}</strong> view</span>
            {(searchTerm || difficultyFilter !== 'all' || statusFilter !== 'all') && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setSearchTerm('');
                  setDifficultyFilter('all');
                  setStatusFilter('all');
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                Clear filters
              </Button>
            )}
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="animate-fadeIn">
          {renderView()}
        </div>

        {/* Empty State */}
        {filteredProblems.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No problems found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search criteria or clearing the filters</p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setDifficultyFilter('all');
                setStatusFilter('all');
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemsListing;