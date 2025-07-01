import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Square, 
  RotateCcw, 
  Save, 
  Settings, 
  Maximize2, 
  Minimize2, 
  Copy,
  Check,
  Terminal,
  Code2,
  Lightbulb,
  Clock,
  CheckCircle,
  XCircle,
  Zap,
  Brain,
  Trophy,
  Target,
  BookOpen,
  Users,
  Flame,
  Star,
  TrendingUp,
  Activity,
  Eye,
  MessageSquare,
  Share2,
  Download,
  Upload,
  GitBranch,
  Palette,
  Volume2,
  VolumeX,
  Timer,
  Coffee,
  Rocket
} from 'lucide-react';

interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  tags: string[];
  acceptance: number;
  submissions: number;
  likes: number;
  dislikes: number;
  companies: string[];
}

const mockProblem: Problem = {
  id: 42,
  title: "Neural Network Path Optimization",
  difficulty: "Hard",
  description: "Given a neural network represented as a directed acyclic graph, find the optimal path from input to output that maximizes the activation strength while minimizing computational cost.\n\nEach node has an activation function and computational weight. You need to implement a dynamic programming solution that considers both path efficiency and resource constraints.\n\nThis problem combines graph theory with machine learning optimization principles.",
  examples: [
    {
      input: "nodes = [[0.8, 2], [0.6, 1], [0.9, 3]], edges = [[0,1], [1,2]], target = 0.7",
      output: "[0, 1, 2]",
      explanation: "This path achieves the target activation with optimal resource usage."
    },
    {
      input: "nodes = [[0.5, 1], [0.7, 2], [0.3, 1], [0.9, 4]], edges = [[0,1], [0,2], [1,3], [2,3]], target = 0.8",
      output: "[0, 1, 3]"
    }
  ],
  constraints: [
    "1 ≤ nodes.length ≤ 1000",
    "0.0 ≤ activation ≤ 1.0",
    "1 ≤ cost ≤ 100",
    "Graph is guaranteed to be acyclic"
  ],
  tags: ["Dynamic Programming", "Graph", "Neural Networks", "Optimization"],
  acceptance: 23.4,
  submissions: 15672,
  likes: 847,
  dislikes: 52,
  companies: ["Google", "DeepMind", "OpenAI", "Tesla"]
};

const languages = [
  { 
    value: 'javascript', 
    label: 'JavaScript', 
    icon: '🟨',
    template: `function optimizeNeuralPath(nodes, edges, target) {
    // Initialize memoization for dynamic programming
    const memo = new Map();
    
    // Your neural optimization algorithm here
    
    return [];
}

// Test your solution
console.log(optimizeNeuralPath([[0.8, 2], [0.6, 1]], [[0,1]], 0.7));`
  },
  { 
    value: 'python', 
    label: 'Python', 
    icon: '🐍',
    template: `def optimize_neural_path(nodes, edges, target):
    """
    Optimize neural network path using dynamic programming
    """
    # Initialize memoization
    memo = {}
    
    # Your neural optimization algorithm here
    
    return []

# Test your solution
print(optimize_neural_path([[0.8, 2], [0.6, 1]], [[0,1]], 0.7))`
  },
  { 
    value: 'rust', 
    label: 'Rust', 
    icon: '🦀',
    template: `use std::collections::HashMap;

impl Solution {
    pub fn optimize_neural_path(nodes: Vec<Vec<f64>>, edges: Vec<Vec<i32>>, target: f64) -> Vec<i32> {
        // High-performance neural path optimization
        let mut memo: HashMap<String, Vec<i32>> = HashMap::new();
        
        // Your algorithm here
        
        vec![]
    }
}`
  },
  { 
    value: 'go', 
    label: 'Go', 
    icon: '🔷',
    template: `package main

import "fmt"

func optimizeNeuralPath(nodes [][]float64, edges [][]int, target float64) []int {
    // Concurrent neural path optimization
    memo := make(map[string][]int)
    
    // Your algorithm implementation
    
    return []int{}
}

func main() {
    result := optimizeNeuralPath([][]float64{{0.8, 2}, {0.6, 1}}, [][]int{{0, 1}}, 0.7)
    fmt.Println(result)
}`
  }
];

const themes = [
  { name: 'Matrix', bg: 'from-green-900 via-black to-green-900', accent: 'green-400', editor: 'bg-black' },
  { name: 'Cyberpunk', bg: 'from-purple-900 via-pink-900 to-blue-900', accent: 'cyan-400', editor: 'bg-gray-900' },
  { name: 'Neon', bg: 'from-orange-900 via-red-900 to-pink-900', accent: 'orange-400', editor: 'bg-gray-900' },
  { name: 'Ocean', bg: 'from-blue-900 via-teal-900 to-cyan-900', accent: 'blue-400', editor: 'bg-gray-900' },
  { name: 'Sunset', bg: 'from-yellow-900 via-orange-900 to-red-900', accent: 'yellow-400', editor: 'bg-gray-900' }
];

const testCases = [
  { 
    input: '[[0.8, 2], [0.6, 1]], [[0,1]], 0.7', 
    expected: '[0, 1]', 
    status: 'pending',
    difficulty: 'Easy',
    memory: '12.3 MB',
    time: '0ms'
  },
  { 
    input: '[[0.5, 1], [0.7, 2], [0.9, 4]], [[0,1], [1,2]], 0.8', 
    expected: '[0, 1, 2]', 
    status: 'pending',
    difficulty: 'Medium',
    memory: '15.7 MB',
    time: '0ms'
  },
  { 
    input: '[[0.3, 1], [0.6, 2], [0.8, 1], [0.9, 3]], [[0,1], [0,2], [1,3], [2,3]], 0.85', 
    expected: '[0, 2, 3]', 
    status: 'pending',
    difficulty: 'Hard',
    memory: '18.9 MB',
    time: '0ms'
  }
];

const AdvancedCodeEditor: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [code, setCode] = useState(languages[1].template);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'solutions' | 'discuss' | 'submissions'>('description');
  const [testResults, setTestResults] = useState(testCases);
  const [showOutput, setShowOutput] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(0);
  const [showStats, setShowStats] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [timerActive, setTimerActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [streak, setStreak] = useState(7);
  const [rank, setRank] = useState(1247);
  const [solvedToday, setSolvedToday] = useState(3);
  const [difficulty, setDifficulty] = useState({ easy: 142, medium: 89, hard: 23 });
  
  const timerRef = useRef<NodeJS.Timeout>();
  const theme = themes[currentTheme];

  useEffect(() => {
    const selectedLang = languages.find(lang => lang.value === selectedLanguage);
    if (selectedLang) {
      setCode(selectedLang.template);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
  };

  const handleRun = () => {
    if (!timerActive) {
      setTimerActive(true);
      setElapsedTime(0);
    }
    
    setIsRunning(true);
    setShowOutput(true);
    
    if (soundEnabled) {
      // Simulate sound effect
      console.log('🔊 Running tests...');
    }
    
    setTimeout(() => {
      const results = testCases.map((testCase, index) => {
        const passed = Math.random() > 0.2;
        return {
          ...testCase,
          status: passed ? 'passed' : 'failed',
          runtime: `${Math.floor(Math.random() * 100) + 5}ms`,
          memory: `${(Math.random() * 10 + 10).toFixed(1)} MB`,
          time: `${Math.floor(Math.random() * 50) + 5}ms`
        };
      });
      setTestResults(results);
      setIsRunning(false);
      
      const allPassed = results.every(r => r.status === 'passed');
      if (allPassed && soundEnabled) {
        console.log('🎉 All tests passed!');
      }
    }, 2000);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'from-emerald-400 to-green-500';
      case 'Medium': return 'from-amber-400 to-orange-500';
      case 'Hard': return 'from-red-400 to-rose-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const selectedLang = languages.find(lang => lang.value === selectedLanguage);

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : ''} bg-gradient-to-br ${theme.bg} min-h-screen transition-all duration-500`}>
      <div className="h-screen flex flex-col backdrop-blur-sm">
        {/* Enhanced Header */}
        <div className="bg-black/20 backdrop-blur-md border-b border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Brain className={`w-8 h-8 text-${theme.accent} animate-pulse`} />
                  <div className={`absolute -top-1 -right-1 w-3 h-3 bg-${theme.accent} rounded-full animate-ping`}></div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold text-white">
                      #{mockProblem.id}. {mockProblem.title}
                    </h1>
                    <Badge className={`bg-gradient-to-r ${getDifficultyColor(mockProblem.difficulty)} text-white border-0 animate-pulse`}>
                      <Star className="w-3 h-3 mr-1" />
                      {mockProblem.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-300">
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {mockProblem.acceptance}% Acceptance
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {mockProblem.submissions.toLocaleString()} Submissions
                    </span>
                    <span className="flex items-center gap-1">
                      <Trophy className="w-3 h-3 text-yellow-400" />
                      {mockProblem.likes}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Timer */}
              <div className="flex items-center gap-2 bg-black/30 rounded-lg px-3 py-2">
                <Timer className={`w-4 h-4 ${timerActive ? 'text-green-400' : 'text-gray-400'}`} />
                <span className="text-white font-mono">{formatTime(elapsedTime)}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setTimerActive(!timerActive)}
                  className="text-white hover:bg-white/10"
                >
                  {timerActive ? <Square className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </Button>
              </div>

              {/* Theme Selector */}
              <Select value={currentTheme.toString()} onValueChange={(v) => setCurrentTheme(parseInt(v))}>
                <SelectTrigger className="w-32 bg-black/30 border-white/20 text-white">
                  <Palette className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((theme, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {theme.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="text-white hover:bg-white/10"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>

              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-white hover:bg-white/10"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Enhanced Tags & Stats */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              {mockProblem.tags.map((tag) => (
                <Badge key={tag} className="bg-white/10 text-white border-white/20 hover:bg-white/20 transition-colors">
                  {tag}
                </Badge>
              ))}
              <div className="flex items-center gap-2 ml-4">
                {mockProblem.companies.slice(0, 3).map((company) => (
                  <Badge key={company} variant="outline" className="border-blue-400 text-blue-400">
                    {company}
                  </Badge>
                ))}
              </div>
            </div>

            {showStats && (
              <div className="flex items-center gap-6 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span>{streak} day streak</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span>Rank #{rank.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-yellow-400" />
                  <span>{solvedToday} solved today</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Problem & Community */}
          <div className="w-1/2 border-r border-white/10 flex flex-col">
            {/* Enhanced Tabs */}
            <div className="bg-black/20 border-b border-white/10">
              <div className="flex">
                {[
                  { key: 'description', icon: BookOpen, label: 'Description' },
                  { key: 'solutions', icon: Lightbulb, label: 'Solutions' },
                  { key: 'discuss', icon: MessageSquare, label: 'Discuss' },
                  { key: 'submissions', icon: Activity, label: 'Submissions' }
                ].map(({ key, icon: Icon, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key as any)}
                    className={`px-4 py-3 text-sm font-medium flex items-center gap-2 transition-all ${
                      activeTab === key
                        ? `bg-${theme.accent}/20 text-${theme.accent} border-b-2 border-${theme.accent}`
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Tab Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-black/10">
              {activeTab === 'description' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                      <Rocket className="w-5 h-5 text-blue-400" />
                      Problem Description
                    </h3>
                    <div className="text-gray-300 leading-relaxed whitespace-pre-line bg-black/20 rounded-lg p-4 border border-white/10">
                      {mockProblem.description}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      Examples
                    </h3>
                    <div className="space-y-4">
                      {mockProblem.examples.map((example, index) => (
                        <div key={index} className="bg-gradient-to-r from-black/30 to-black/20 rounded-lg p-4 border border-white/10">
                          <div className="font-medium text-white mb-3 flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full bg-${theme.accent} flex items-center justify-center text-black font-bold text-sm`}>
                              {index + 1}
                            </div>
                            Example {index + 1}:
                          </div>
                          <div className="space-y-3 text-sm">
                            <div className="bg-black/30 rounded p-3">
                              <span className="font-medium text-green-400">Input:</span>
                              <code className={`block mt-1 text-${theme.accent} font-mono text-xs`}>
                                {example.input}
                              </code>
                            </div>
                            <div className="bg-black/30 rounded p-3">
                              <span className="font-medium text-blue-400">Output:</span>
                              <code className={`block mt-1 text-${theme.accent} font-mono text-xs`}>
                                {example.output}
                              </code>
                            </div>
                            {example.explanation && (
                              <div className="bg-black/30 rounded p-3">
                                <span className="font-medium text-purple-400">Explanation:</span>
                                <p className="mt-1 text-gray-300 text-xs">
                                  {example.explanation}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                      <Target className="w-5 h-5 text-red-400" />
                      Constraints
                    </h3>
                    <div className="bg-black/20 rounded-lg p-4 border border-white/10">
                      <ul className="space-y-2">
                        {mockProblem.constraints.map((constraint, index) => (
                          <li key={index} className="text-gray-300 text-sm flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full bg-${theme.accent}`}></div>
                            {constraint}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'solutions' && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-r from-${theme.accent} to-blue-500 flex items-center justify-center mb-6 animate-bounce`}>
                    <Lightbulb className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">AI-Powered Solutions</h3>
                  <p className="text-gray-400 mb-6 max-w-md">
                    Get hints, optimal approaches, and detailed explanations after your first submission.
                  </p>
                  <Button className={`bg-gradient-to-r from-${theme.accent} to-blue-500 text-white`}>
                    <Brain className="w-4 h-4 mr-2" />
                    Unlock Solutions
                  </Button>
                </div>
              )}

              {activeTab === 'discuss' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Community Discussion</h3>
                    <Button size="sm" className={`bg-${theme.accent} text-black`}>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      New Post
                    </Button>
                  </div>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-black/20 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-${theme.accent} to-blue-500 flex items-center justify-center text-white font-bold text-sm`}>
                          U{i}
                        </div>
                        <div>
                          <div className="text-white font-medium">CodeMaster{i}</div>
                          <div className="text-xs text-gray-400">2 hours ago</div>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Great problem! The key insight is to use dynamic programming with memoization...
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" /> 12 likes
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" /> 5 replies
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'submissions' && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Terminal className={`w-16 h-16 text-${theme.accent} mb-4 animate-pulse`} />
                  <h3 className="text-xl font-semibold text-white mb-2">Your Journey Starts Here</h3>
                  <p className="text-gray-400">
                    Submit your first solution to track your progress and compare with others.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Enhanced Code Editor */}
          <div className="w-1/2 flex flex-col">
            {/* Enhanced Editor Header */}
            <div className="bg-black/20 border-b border-white/10 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-44 bg-black/30 border-white/20 text-white">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{selectedLang?.icon}</span>
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          <div className="flex items-center gap-2">
                            <span>{lang.icon}</span>
                            {lang.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button variant="ghost" size="sm" onClick={handleCopy} className="text-white hover:bg-white/10">
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </Button>

                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <Upload className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <GitBranch className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Enhanced Code Editor */}
            <div className={`flex-1 ${theme.editor} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent pointer-events-none"></div>
              <div className="relative h-full flex">
                {/* Line numbers */}
                <div className="bg-black/40 text-gray-500 text-sm font-mono p-4 pt-4 min-w-12 select-none border-r border-white/10">
                  {code.split('\n').map((_, index) => (
                    <div key={index} className="leading-6 text-right pr-2">
                      {index + 1}
                    </div>
                  ))}
                </div>

                {/* Code textarea */}
                <div className="flex-1 relative">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className={`w-full h-full bg-transparent text-${theme.accent} font-mono text-sm p-4 resize-none outline-none border-none leading-6`}
                    style={{ 
                      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                      tabSize: 2
                    }}
                    placeholder="// Start coding your neural network optimization..."
                    spellCheck={false}
                  />
                  
                  {/* Floating AI Assistant */}
                  <div className="absolute top-4 right-4">
                    <Button 
                      size="sm" 
                      className={`bg-gradient-to-r from-${theme.accent} to-blue-500 text-black opacity-80 hover:opacity-100 transition-opacity`}
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      AI Hint
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Test Panel */}
            <div className="h-80 border-t border-white/10 bg-black/10">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Terminal className={`w-5 h-5 text-${theme.accent}`} />
                  Test Cases & Performance
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Eye className="w-4 h-4" />
                    <span>Real-time Analysis</span>
                  </div>
                  <Button 
                    onClick={handleRun}
                    disabled={isRunning}
                    className={`bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all transform ${isRunning ? 'scale-95' : 'hover:scale-105'}`}
                  >
                    {isRunning ? (
                      <>
                        <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Rocket className="w-4 h-4 mr-2" />
                        Execute Code
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="p-4 overflow-y-auto h-64">
                {showOutput ? (
                  <div className="space-y-4">
                    {testResults.map((test, index) => (
                      <div key={index} className="bg-gradient-to-r from-black/40 to-black/20 rounded-lg p-4 border border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(test.status)}
                            <span className="font-medium text-white">Test Case {index + 1}</span>
                            <Badge 
                              className={`${test.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' : 
                                         test.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 
                                         'bg-red-500/20 text-red-400'} border-0`}
                            >
                              {test.difficulty}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {test.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <Activity className="w-3 h-3" />
                              {test.memory}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="bg-black/30 rounded p-3">
                            <div className="text-blue-400 font-medium mb-1">Input:</div>
                            <code className={`text-${theme.accent} font-mono text-xs block`}>
                              {test.input}
                            </code>
                          </div>
                          <div className="bg-black/30 rounded p-3">
                            <div className="text-green-400 font-medium mb-1">Expected:</div>
                            <code className={`text-${theme.accent} font-mono text-xs block`}>
                              {test.expected}
                            </code>
                          </div>
                        </div>

                        {test.status === 'passed' && (
                          <div className="mt-3 flex items-center gap-2 text-xs text-green-400">
                            <CheckCircle className="w-3 h-3" />
                            <span>Optimal solution found with O(n) complexity</span>
                          </div>
                        )}
                        
                        {test.status === 'failed' && (
                          <div className="mt-3 bg-red-500/10 border border-red-500/20 rounded p-2">
                            <div className="text-red-400 text-xs font-medium mb-1">Error Analysis:</div>
                            <div className="text-red-300 text-xs">
                              Expected optimization path not found. Consider using dynamic programming with memoization.
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Performance Summary */}
                    <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg p-4 border border-white/10 mt-6">
                      <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                        Performance Analysis
                      </h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <div className={`text-2xl font-bold text-${theme.accent}`}>
                            {testResults.filter(t => t.status === 'passed').length}/3
                          </div>
                          <div className="text-gray-400">Tests Passed</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-2xl font-bold text-${theme.accent}`}>47ms</div>
                          <div className="text-gray-400">Avg Runtime</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-2xl font-bold text-${theme.accent}`}>15.3MB</div>
                          <div className="text-gray-400">Memory Usage</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r from-${theme.accent} to-blue-500 flex items-center justify-center mb-4 animate-pulse`}>
                      <Rocket className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-white font-medium mb-2">Ready for Launch</h4>
                    <p className="text-gray-400 text-sm">
                      Execute your neural optimization algorithm to see real-time performance metrics
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="bg-black/20 backdrop-blur-md border-t border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-green-400 animate-pulse`}></div>
                <span>Neural AI Assistant Active</span>
              </div>
              <span>•</span>
              <span>Auto-save enabled</span>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-yellow-400" />
                <span>Coding session: {formatTime(elapsedTime)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className={`text-${theme.accent}`}>{difficulty.easy + difficulty.medium + difficulty.hard}</span>
                <span>problems solved</span>
                <div className="flex gap-1 ml-2">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                </div>
              </div>
              
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Code
              </Button>
              
              <Button className={`bg-gradient-to-r from-${theme.accent} to-blue-500 text-black hover:shadow-lg hover:shadow-${theme.accent}/25 transition-all transform hover:scale-105`}>
                <Rocket className="w-4 h-4 mr-2" />
                Submit Solution
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedCodeEditor;