export type DataTypes = "Array" | "Integer" | "Floating Point" | "String" | "Boolean";

export type DifficultyType = "easy" | "medium" | "hard";

export type LanguageType = "javascript" | "python" | "java" | "cpp" | "c";

export interface Parameter {
  name: string;
  type: DataTypes;
  elementType?: DataTypes;
  nestedType?: Exclude<DataTypes, "Array">;
}

interface Input {
  parameter: string;
  value: string;
}

export interface Example {
  input: Input[];
  output: string;
  explanation?: string;
}

export interface TestCase {
  input: Input[];
  output: string;
  explanation?: string;
}

export interface BoilerplateCode {
  language: string;
  code: string;
}

export interface ProblemData {
  problemNo: number;
  title: string;
  difficulty: DifficultyType;
  description: string;
  functionName: string;
  returnType: DataTypes;
  returnElementType?: DataTypes;
  returnNestedType?: Exclude<DataTypes, "Array">;
  parameters: Parameter[];
  examples: Example[];
  testCases?: TestCase[];
  boilerplateCodes?: BoilerplateCode[];
  supportedLanguages: LanguageType[];
  evalFunction: string;
}
