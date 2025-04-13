import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { DataTypes, Parameter } from "@/types/IProblems";

interface AddParameterProps {
  parameters: Parameter[];
  setParameters: React.Dispatch<React.SetStateAction<Parameter[]>>;
  validationError?: string;
}

const AddParameter: React.FC<AddParameterProps> = ({
  parameters,
  setParameters,
  validationError,
}) => {
  const [parameterInput, setParameterInput] = useState<Parameter>({
    name: "",
    type: "Integer",
    elementType: undefined,
    nestedType: undefined,
  });

  const [showElementTypeSelector, setShowElementTypeSelector] = useState(false);
  const [showNestedTypeSelector, setShowNestedTypeSelector] = useState(false);

  useEffect(() => {
    setShowElementTypeSelector(parameterInput.type === "Array");

    if (parameterInput.type !== "Array") {
      setParameterInput((prev) => ({
        ...prev,
        elemType: undefined,
        nestedType: undefined,
      }));
    } else if (parameterInput.type === "Array" && !parameterInput.elementType) {
      setParameterInput((prev) => ({
        ...prev,
        elemType: "Integer",
      }));
    }
  }, [parameterInput.type]);

  useEffect(() => {
    setShowNestedTypeSelector(parameterInput.elementType === "Array");

    if (parameterInput.elementType !== "Array") {
      setParameterInput((prev) => ({
        ...prev,
        nestedType: undefined,
      }));
    } else if (parameterInput.elementType === "Array" && !parameterInput.nestedType) {
      setParameterInput((prev) => ({
        ...prev,
        nestedType: "Integer",
      }));
    }
  }, [parameterInput.elementType]);

  const addParameter = () => {
    if (!parameterInput.name) return;
    if (parameterInput.type === "Array" && !parameterInput.elementType) return;
    if (parameterInput.elementType === "Array" && !parameterInput.nestedType) return;

    setParameters([...parameters, parameterInput]);
    setParameterInput({
      name: "",
      type: "Integer",
      elementType: undefined,
      nestedType: undefined,
    });
  };

  const removeParameter = (index: number) => {
    setParameters(parameters.filter((_, i) => i !== index));
  };

  const getTypeDisplayText = (param: Parameter) => {
    if (param.type === "Array" && param.elementType) {
      if (param.elementType === "Array" && param.nestedType) {
        return `Array<Array<${param.nestedType}>>`;
      }
      return `Array<${param.elementType}>`;
    }
    return param.type;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-2">
        <div className="w-full md:w-auto flex-grow">
          <Input
            placeholder="Parameter Name"
            value={parameterInput.name}
            onChange={(e) =>
              setParameterInput({
                ...parameterInput,
                name: e.target.value,
              })
            }
          />
        </div>

        <Select
          value={parameterInput.type}
          onValueChange={(value: DataTypes) =>
            setParameterInput({
              ...parameterInput,
              type: value,
            })
          }
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Integer">Integer</SelectItem>
            <SelectItem value="Floating Point">Floating Point</SelectItem>
            <SelectItem value="String">String</SelectItem>
            <SelectItem value="Boolean">Boolean</SelectItem>
            <SelectItem value="Array">Array</SelectItem>
          </SelectContent>
        </Select>

        {showElementTypeSelector && (
          <Select
            value={parameterInput.elementType}
            onValueChange={(value: DataTypes) =>
              setParameterInput({
                ...parameterInput,
                elementType: value,
              })
            }
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

        {showNestedTypeSelector && (
          <Select
            value={parameterInput.nestedType}
            onValueChange={(value: Exclude<DataTypes, "Array">) =>
              setParameterInput({
                ...parameterInput,
                nestedType: value,
              })
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

        <Button
          onClick={addParameter}
          variant="outline"
          disabled={
            !parameterInput.name ||
            (parameterInput.type === "Array" && !parameterInput.elementType) ||
            (parameterInput.elementType === "Array" && !parameterInput.nestedType)
          }
        >
          <FaPlus className="mr-2" /> Add
        </Button>
      </div>

      {validationError && (
        <p className="text-red-600 text-sm mt-1">{validationError}</p>
      )}

      {/* Display Parameters */}
      {parameters.length > 0 && (
        <div className="border rounded-md mt-2">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  Type
                </th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-600 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {parameters.map((param, index) => (
                <tr
                  key={index}
                  className="border-b last:border-b-0 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                    {param.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                    {getTypeDisplayText(param)}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => removeParameter(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddParameter;
