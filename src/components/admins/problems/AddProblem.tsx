import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSideBar } from "@/context/SideBarContext";
import { Card, CardContent } from "@/components/ui/card";
import {
  DataTypes,
  DifficultyType,
  Example,
  LanguageType,
  Parameter,
  TestCase,
} from "@/types/IProblems";
import {
  ProblemValidationErrorTypes,
  validateProblem,
} from "@/validation/validateProblem";
import { Checkbox } from "@/components/ui/checkbox";
import AddParameter from "./AddParameter";
import { useAppDispatch } from "@/hooks/useRedux";
import { addProblemAction } from "@/redux/store/actions/problem/addProblemAction";
import { Api } from "@/services/axios";
import { adminEndPoints } from "@/constants/endPointUrl";

const AddProblem: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isSideBarCollapsed } = useSideBar();

  const [problemNo, setProblemNo] = useState<number>();
  const [title, setTitle] = useState<string>("");
  const [difficulty, setDifficulty] = useState<DifficultyType>("easy");
  const [description, setDescription] = useState<string>("");
  const [functionName, setFunctionName] = useState<string>("");
  const [returnType, setReturnType] = useState<DataTypes>("Integer");
  const [returnElementType, setReturnElementType] = useState<DataTypes | undefined>();
  const [returnNestedType, setReturnNestedType] = useState<Exclude<DataTypes, "Array"> | undefined>();
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [examples, setExamples] = useState<Example[]>([]);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [supportedLanguages, setSupportedLanguages] = useState<LanguageType[]>([]);
  const [evalFunction, setEvalFunction] = useState<string>("");
  const [isGeneratingTestCases, setIsGeneratingTestCases] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<ProblemValidationErrorTypes>({});

  const [showReturnElementType, setShowReturnElementType] = useState(false);
  const [showReturnNestedType, setShowReturnNestedType] = useState(false);

  useEffect(() => {
    setShowReturnElementType(returnType === "Array");

    if (returnType !== "Array") {
      setReturnElementType(undefined);
      setReturnNestedType(undefined);
      setShowReturnNestedType(false);
    } else if (!returnElementType) {
      setReturnElementType("Integer");
    }
  }, [returnType]);

  useEffect(() => {
    setShowReturnNestedType(returnElementType === "Array");

    if (returnElementType !== "Array") {
      setReturnNestedType(undefined);
    } else if (returnElementType === "Array" && !returnNestedType) {
      setReturnNestedType("Integer");
    }
  }, [returnElementType]);

  const handleLanguageToggle = (language: LanguageType) => {
    if (supportedLanguages.includes(language)) {
      setSupportedLanguages(supportedLanguages.filter((lang) => lang !== language));
    } else {
      setSupportedLanguages([...supportedLanguages, language]);
    }
  };

  const handleGenerateTestCases = async () => {

    if (!title || !description || parameters.length === 0 || !functionName || !returnType) {
      toast.error("Please add problem details before generating test cases");
      return;
    }

    setIsGeneratingTestCases(true);

    const problemData = {
      title,
      description,
      functionName,
      parameters,
      returnType,
      returnElementType,
      returnNestedType,
    };

    try {
      const response = await Api.post(adminEndPoints.GENERATE_TEST_CASES, problemData, {
        params: { count: 10 },
      });

      if (response.data.success) {

        const generatedTestCases: TestCase[] = response.data.data;
        setTestCases(generatedTestCases);

        const examples = generatedTestCases.slice(0, 3).map((tc) => ({
          input: tc.input,
          output: tc.output,
          explanation: tc.explanation,
        }));
        setExamples(examples);

        toast.success("Test cases and examples generated successfully");
        
      } else {
        toast.error("Failed to generate test cases");
      }

    } catch (error) {

      console.error("Failed to generate test cases", error);
      toast.error("Error generating test cases");

    } finally {
      setIsGeneratingTestCases(false);
    }
  };

  const handleSubmit = async () => {
    const problemData = {
      problemNo: problemNo || 0,
      title,
      difficulty,
      description,
      functionName,
      returnType,
      returnElementType,
      returnNestedType,
      parameters,
      examples,
      testCases,
      supportedLanguages,
      evalFunction,
    };

    console.log(problemData,"problem data")

    const errors = validateProblem(problemData);

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      const response = await dispatch(addProblemAction(problemData));

      if (response.payload.success) {
        toast.success("Problem added successfully!");
        navigate("/problems");
      } else {
        toast.error(response.payload.error);
      }
    } catch (error) {
      toast.error("Failed to add problem");
    }
  };

  return (
    <main
      className={`pt-14 ${isSideBarCollapsed ? "lg:ml-0" : "lg:ml-64"} transition-all duration-200`}
    >
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Add New Problem
          </h1>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div>
                {/* Problem Number */}
                <div className="mb-4">
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Problem Number
                  </Label>
                  <Input
                    type="number"
                    value={problemNo}
                    onChange={(e) => setProblemNo(Number(e.target.value))}
                    className={`mt-1 ${validationErrors.problemNo ? "border-red-600" : ""}`}
                  />
                  {validationErrors.problemNo && (
                    <p className="text-red-600 text-sm mt-1">{validationErrors.problemNo}</p>
                  )}
                </div>

                {/* Title */}
                <div className="mb-4">
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Title
                  </Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`mt-1 ${validationErrors.title ? "border-red-600" : ""}`}
                  />
                  {validationErrors.title && (
                    <p className="text-red-600 text-sm mt-1">{validationErrors.title}</p>
                  )}
                </div>

                {/* Difficulty */}
                <div className="mb-4">
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Difficulty
                  </Label>
                  <Select
                    value={difficulty}
                    onValueChange={(value: DifficultyType) => setDifficulty(value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.difficulty && (
                    <p className="text-red-600 text-sm mt-1">{validationErrors.difficulty}</p>
                  )}
                </div>

                {/* Description */}
                <div className="mb-4">
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Description
                  </Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`mt-1 h-32 ${validationErrors.description ? "border-red-600" : ""}`}
                  />
                  {validationErrors.description && (
                    <p className="text-red-600 text-sm mt-1">{validationErrors.description}</p>
                  )}
                </div>

                {/* Evaluation Function */}
                <div className="mb-4">
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Evaluation Function
                  </Label>
                  <Textarea
                    value={evalFunction}
                    onChange={(e) => setEvalFunction(e.target.value)}
                    className="mt-1 h-32"
                    placeholder="Enter JavaScript code to evaluate test cases"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    This function will be used to evaluate test cases. It should return a boolean
                    indicating if the test passed.
                  </p>
                  {validationErrors.evalFunction && (
                    <p className="text-red-600 text-sm mt-1">{validationErrors.evalFunction}</p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div>
                {/* Function Name */}
                <div className="mb-4">
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Function Name
                  </Label>
                  <Input
                    value={functionName}
                    onChange={(e) => setFunctionName(e.target.value)}
                    className={`mt-1 ${validationErrors.functionName ? "border-red-600" : ""}`}
                  />
                  {validationErrors.functionName && (
                    <p className="text-red-600 text-sm mt-1">{validationErrors.functionName}</p>
                  )}
                </div>

                {/* Return Type */}
                <div className="mb-4">
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Return Type
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    <Select
                      value={returnType}
                      onValueChange={(value: DataTypes) => setReturnType(value)}
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Select Return Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Integer">Integer</SelectItem>
                        <SelectItem value="Floating Point">Floating Point</SelectItem>
                        <SelectItem value="String">String</SelectItem>
                        <SelectItem value="Boolean">Boolean</SelectItem>
                        <SelectItem value="Array">Array</SelectItem>
                      </SelectContent>
                    </Select>

                    {showReturnElementType && (
                      <Select
                        value={returnElementType}
                        onValueChange={(value: DataTypes) => setReturnElementType(value)}
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Element Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Integer">Integer</SelectItem>
                          <SelectItem value="Floating Point">Floating Point</SelectItem>
                          <SelectItem value="String">String</SelectItem>
                          <SelectItem value="Boolean">Boolean</SelectItem>
                          <SelectItem value="Array">Array</SelectItem>
                        </SelectContent>
                      </Select>
                    )}

                    {showReturnNestedType && (
                      <Select
                        value={returnNestedType}
                        onValueChange={(value: Exclude<DataTypes, "Array">) =>
                          setReturnNestedType(value)
                        }
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Nested Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Integer">Integer</SelectItem>
                          <SelectItem value="Floating Point">Floating Point</SelectItem>
                          <SelectItem value="String">String</SelectItem>
                          <SelectItem value="Boolean">Boolean</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  {validationErrors.returnType && (
                    <p className="text-red-600 text-sm mt-1">{validationErrors.returnType}</p>
                  )}
                </div>

                {/* Parameters Section */}
                <div className="mb-4">
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Parameters
                  </Label>
                  <AddParameter
                    parameters={parameters}
                    setParameters={setParameters}
                    validationError={validationErrors.parameters}
                  />
                </div>

                {/* Supported Languages */}
                <div className="mb-4">
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Supported Languages
                  </Label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {["javascript", "python", "java", "cpp", "c"].map((lang) => (
                      <div key={lang} className="flex items-center space-x-2">
                        <Checkbox
                          id={`lang-${lang}`}
                          checked={supportedLanguages.includes(lang as LanguageType)}
                          onCheckedChange={() => handleLanguageToggle(lang as LanguageType)}
                        />
                        <label
                          htmlFor={`lang-${lang}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                  {validationErrors.supportedLanguages && (
                    <p className="text-red-600 text-sm mt-1">{validationErrors.supportedLanguages}</p>
                  )}
                </div>

                {/* Examples Section */}
                <div className="mb-4">
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Examples (Auto-generated)
                  </Label>
                  {examples.length > 0 ? (
                    <div className="mt-2">
                      {examples.map((example, index) => (
                        <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
                          <p>
                            <strong>Input:</strong>{" "}
                            {example.input.map((i) => `${i.parameter}=${i.value}`).join(", ")}
                          </p>
                          <p>
                            <strong>Output:</strong> {example.output}
                          </p>
                          <p>
                            <strong>Explanation:</strong> {example.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 mt-1">
                      Generate test cases to populate examples.
                    </p>
                  )}
                  {validationErrors.examples && (
                    <p className="text-red-600 text-sm mt-1">{validationErrors.examples}</p>
                  )}
                </div>

                {/* Test Cases Section */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Test Cases (Sample of Hidden Cases)
                    </Label>
                    <Button
                      onClick={handleGenerateTestCases}
                      variant="outline"
                      size="sm"
                      disabled={isGeneratingTestCases}
                      className="flex items-center gap-2"
                    >
                      {isGeneratingTestCases ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Generating...
                        </>
                      ) : (
                        "Generate Test Cases"
                      )}
                    </Button>
                  </div>
                  {testCases.length > 0 ? (
                    <div className="mt-2">
                      {testCases.slice(3, 6).map((testCase, index) => (
                        <div key={index} className="mb-2 p-2 bg-gray-200 rounded">
                          <p>
                            <strong>Input:</strong>{" "}
                            {testCase.input.map((i) => `${i.parameter}=${i.value}`).join(", ")}
                          </p>
                          <p>
                            <strong>Output:</strong> {testCase.output}
                          </p>
                          <p>
                            <strong>Explanation:</strong> {testCase.explanation}
                          </p>
                        </div>
                      ))}
                      <p className="text-sm text-gray-500 mt-1">
                        Showing 3 of {testCases.length} total test cases.
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 mt-1">
                      Generate test cases to see a sample here.
                    </p>
                  )}
                  {validationErrors.testCases && (
                    <p className="text-red-600 text-sm mt-1">{validationErrors.testCases}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submission Button */}
            <div className="mt-6">
              <Button
                onClick={handleSubmit}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
              >
                Add Problem
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default AddProblem;