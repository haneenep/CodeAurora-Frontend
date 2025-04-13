import {
  DataTypes,
  DifficultyType,
  LanguageType,
  Parameter,
  Example,
  TestCase,
  ProblemData,
} from "@/types/IProblems";

export interface ProblemValidationErrorTypes {
  problemNo?: string;
  title?: string;
  difficulty?: string;
  description?: string;
  functionName?: string;
  returnType?: string;
  parameters?: string;
  examples?: string;
  testCases?: string;
  supportedLanguages?: string;
  evalFunction?: string;
}

const VALID_DIFFICULTIES: DifficultyType[] = ["easy", "medium", "hard"];
const VALID_DATA_TYPES: DataTypes[] = ["Integer", "Floating Point", "String", "Boolean", "Array"];
const VALID_LANGUAGES: LanguageType[] = ["javascript", "python", "java", "cpp", "c"];

export const validateProblem = (data: ProblemData): ProblemValidationErrorTypes => {
  const errors: ProblemValidationErrorTypes = {};

  // Problem Number
  if (!data.problemNo && data.problemNo !== 0) {
    errors.problemNo = "Problem number is required";
  } else if (!Number.isInteger(data.problemNo) || data.problemNo <= 0) {
    errors.problemNo = "Problem number must be a positive integer";
  }

  // Title
  if (!data.title?.trim()) {
    errors.title = "Title is required";
  } else if (data.title.trim().length < 10 || data.title.trim().length > 100) {
    errors.title = "Title must be between 10 and 100 characters";
  }

  // Difficulty
  if (!data.difficulty || !VALID_DIFFICULTIES.includes(data.difficulty)) {
    errors.difficulty = "Please select a valid difficulty level (easy, medium, hard)";
  }

  // Description
  if (!data.description?.trim()) {
    errors.description = "Description is required";
  } else if (data.description.trim().length < 50 || data.description.trim().length > 2000) {
    errors.description = "Description must be between 50 and 2000 characters";
  }

  // Function Name
  const camelCaseRegex = /^[a-z][a-zA-Z]*$/;
  if (!data.functionName?.trim()) {
    errors.functionName = "Function name is required";
  } else if (!camelCaseRegex.test(data.functionName.trim())) {
    errors.functionName =
      "Function name must be in camelCase (start with lowercase letter, letters only)";
  } else if (data.functionName.trim().length > 30) {
    errors.functionName = "Function name must not exceed 30 characters";
  }

  // Return Type
  if (!data.returnType) {
    errors.returnType = "Return type is required";
  } else if (!VALID_DATA_TYPES.includes(data.returnType)) {
    errors.returnType = "Please select a valid return type (Integer, Floating Point, String, Boolean, Array)";
  } else if (data.returnType === "Array") {
    if (!data.returnElementType) {
      errors.returnType = "Element type is required for Array return type";
    } else if (!VALID_DATA_TYPES.includes(data.returnElementType)) {
      errors.returnType = "Please select a valid element type for Array";
    } else if (data.returnElementType === "Array" && !data.returnNestedType) {
      errors.returnType = "Nested type is required for nested Array return type";
    } else if (
      data.returnElementType === "Array" &&
      !["Integer", "Floating Point", "String", "Boolean"].includes(data.returnNestedType!)
    ) {
      errors.returnType = "Please select a valid nested type for nested Array";
    }
  }

  // Parameters
  if (!data.parameters?.length) {
    errors.parameters = "At least one parameter is required";
  } else {
    const invalidParams = data.parameters.some((param: Parameter) => {
      const invalidName = !param.name?.trim() || param.name.trim().length > 30;
      const invalidType = !VALID_DATA_TYPES.includes(param.type);
      const invalidArray =
        param.type === "Array" &&
        (!param.elementType ||
          !VALID_DATA_TYPES.includes(param.elementType) ||
          (param.elementType === "Array" &&
            (!param.nestedType ||
              !["Integer", "Floating Point", "String", "Boolean"].includes(param.nestedType))));
      return invalidName || invalidType || invalidArray;
    });
    if (invalidParams) {
      errors.parameters =
        "All parameters must have a valid name (max 30 chars) and type. Array parameters need valid element and nested types.";
    }
  }

  // Examples
  if (!data.examples?.length) {
    errors.examples = "At least one example is required—generate test cases to populate examples";
  } else {
    const invalidExamples = data.examples.some((example: Example) => {
      return (
        !example.input?.length ||
        !example.output?.trim() ||
        !example.explanation?.trim() ||
        example.input.some((input) => !input.parameter?.trim() || !input.value?.trim())
      );
    });
    if (invalidExamples) {
      errors.examples =
        "All examples must have valid inputs (parameter-value pairs), output, and explanation";
    }
  }

  // Test Cases
  if (!data.testCases?.length) {
    errors.testCases = "At least one test case is required—generate test cases before submitting";
  } else {
    const invalidTestCases = data.testCases.some((testCase: TestCase) => {
      return (
        !testCase.input?.length ||
        !testCase.output?.trim() ||
        !testCase.explanation?.trim() ||
        testCase.input.some((input) => !input.parameter?.trim() || !input.value?.trim())
      );
    });
    if (invalidTestCases) {
      errors.testCases =
        "All test cases must have valid inputs (parameter-value pairs), output, and explanation";
    }
  }

  // Supported Languages
  if (!data.supportedLanguages?.length) {
    errors.supportedLanguages = "At least one supported language is required";
  } else {
    const normalizedLanguages = data.supportedLanguages.map((lang) => lang.toLowerCase());
    const invalidLanguages = normalizedLanguages.some(
      (lang: string) => !VALID_LANGUAGES.includes(lang as LanguageType)
    );
    if (invalidLanguages) {
      errors.supportedLanguages =
        "Supported languages must be valid (javascript, python, java, cpp, c)";
    }
  }

  // Evaluation Function
  if (!data.evalFunction?.trim()) {
    errors.evalFunction = "Evaluation function is required";
  } else if (data.evalFunction.trim().length < 10) {
    errors.evalFunction = "Evaluation function must be at least 10 characters long";
  }

  return errors;
};