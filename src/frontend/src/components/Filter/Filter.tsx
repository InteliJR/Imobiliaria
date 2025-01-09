import React, { useState } from "react";
import { IUser } from "./UserInterfaces";
import { IFilterField } from "./InputsInterfaces";

// Função genérica de filtragem
function applyFilters(
  data: IUser[],
  fields: IFilterField[],
  filters: Record<string, any>
): IUser[] {
  let result = [...data];

  for (const field of fields) {
    const filterValue = filters[field.name];
    if (!filterValue) continue;

    // Se existe customFilter, chama e pula o resto 
    if (field.customFilter) {
        // filtra usando a função custom
        result = result.filter((item) => field.customFilter!(item, filterValue));
        continue;
        }


    switch (field.type) {
      case "text":
      case "select": {
        if (typeof filterValue === "string" && filterValue.trim() !== "") {
          const lower = filterValue.toLowerCase();
          const prop = field.property;
          result = result.filter((item) => {
            const val = item[prop];
            if (!val) return false;
            return String(val).toLowerCase().includes(lower);
          });
        }
        break;
      }

      case "checkbox": {
        if (typeof filterValue === "boolean") {
          const prop = field.property;
          if (filterValue) {
            result = result.filter((item) => item[prop] === true);
          } else {

          }
        }
        break;
      }

      case "date": {
        if (typeof filterValue === "string" && filterValue.trim() !== "") {
            const prop = field.property;
            result = result.filter((item) => {
                const val = item[prop];
                if (!val) return false;
                return String(val).slice(0, 10) === filterValue;
            });
        }
        break
      }


      case "dateRange": {
        const { from, to } = filterValue;
        if (from || to) {
          const prop = field.property;
          result = result.filter((item) => {
            const val = item[prop];
            if (!val) return false;

            const dataStr = String(val).slice(0, 10);
            let passFrom = true;
            let passTo = true;
            if (from) passFrom = dataStr >= from;
            if (to) passTo = dataStr <= to;
            return passFrom && passTo;
          });
        }
        break;
      }

      case "number": {
        const num = Number(filterValue);
        if (!isNaN(num)) {
          const prop = field.property;
          const modeKey = field.name + "_comparison";
          const comparison = filters[modeKey] || "eq"; // se não vier nada, eq
      
          result = result.filter((item) => {
            const val = item[prop];
            if (typeof val !== "number") return false;
      
            switch (comparison) {
              case "eq":  return val === num;
              case "gt":  return val > num;
              case "gte": return val >= num;
              case "lt":  return val < num;
              case "lte": return val <= num;
              default:    return false;
            }
          });
        }
        break;
      }


      case "numberRange": {
        const { min, max } = filterValue;
        if (min || max) {
          const prop = field.property; // ex.: 'nImoveis'
          const minNum = min ? Number(min) : undefined;
          const maxNum = max ? Number(max) : undefined;
      
          result = result.filter((item) => {
            const val = item[prop];
            // Se não for número ja descarta
            if (typeof val !== "number") return false;
      
            let passMin = true;
            if (minNum !== undefined && !isNaN(minNum)) {
              passMin = val >= minNum;
            }
      
            let passMax = true;
            if (maxNum !== undefined && !isNaN(maxNum)) {
              passMax = val <= maxNum;
            }
      
            return passMin && passMax;
          });
        }
        break;
      }
      
    }
  }

  return result;
}

/**
 * Props do componente genérico de filtro (modal).
 * Ele receberá a lista de dados (`data`), o array de `fields`,
 * e retornará o array filtrado via `onFilteredResult`.
 */
interface GenericFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  fields: IFilterField[];
  data: IUser[];
  initialValues?: Record<string, any>;
  onFilteredResult: (filteredData: IUser[]) => void;
}

// Componente genérico de filtro
export const GenericFilterModal: React.FC<GenericFilterModalProps> = ({
  isOpen,
  onClose,
  fields,
  data,
  initialValues = {},
  onFilteredResult,
}) => {
  const [filterValues, setFilterValues] = useState<Record<string, any>>(initialValues);

  function handleChange(fieldName: string, value: any) {
    setFilterValues((prev) => ({ ...prev, [fieldName]: value }));
  }

  function handleDateRangeChange(
    fieldName: string,
    subField: "from" | "to",
    newValue: string
  ) {
    setFilterValues((prev) => {
      const oldRange = prev[fieldName] ?? {};
      return {
        ...prev,
        [fieldName]: {
          ...oldRange,
          [subField]: newValue,
        },
      };
    });
  }

  function handleSearch() {
    const filtered = applyFilters(data, fields, filterValues);
    onFilteredResult(filtered);
    onClose();
  }

  function handleClearAll() {
    setFilterValues({});
    onFilteredResult([...data]);
    // onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-4 rounded w-[400px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Filtros</h2>

        {fields.map((field) => {
          const value = filterValues[field.name] ?? "";

          switch (field.type) {
            case "text":
              return (
                <div className="mb-3" key={field.name}>
                  <label className="block mb-1 font-medium">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    className="border rounded p-2 w-full"
                    value={value}
                    placeholder={field.placeholder}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                  />
                </div>
              );

            case "select":
              return (
                <div className="mb-3" key={field.name}>
                  <label className="block mb-1 font-medium">
                    {field.label}
                  </label>
                  <select
                    className="border rounded p-2 w-full"
                    value={value}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                  >
                    <option value="">Selecione</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              );

            case "checkbox":
              return (
                <div className="mb-3" key={field.name}>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="border rounded"
                      checked={!!value}
                      onChange={(e) =>
                        handleChange(field.name, e.target.checked)
                      }
                    />
                    {field.label}
                  </label>
                </div>
              );

            case "date":
              return (
                <div className="mb-3" key={field.name}>
                  <label className="block mb-1 font-medium">
                    {field.label}
                  </label>
                  <input
                    type="date"
                    className="border rounded p-2 w-full"
                    value={value}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                  />
                </div>
              );

            case "dateRange":
              const fromValue = value?.from || "";
              const toValue = value?.to || "";
              return (
                <div className="mb-3" key={field.name}>
                  <label className="block mb-1 font-medium">
                    {field.label} (intervalo)
                  </label>
                  <div className="flex gap-2 mt-1">
                    <input
                      type="date"
                      className="border rounded p-2 w-full"
                      value={fromValue}
                      onChange={(e) =>
                        handleDateRangeChange(field.name, "from", e.target.value)
                      }
                    />
                    <input
                      type="date"
                      className="border rounded p-2 w-full"
                      value={toValue}
                      onChange={(e) =>
                        handleDateRangeChange(field.name, "to", e.target.value)
                      }
                    />
                  </div>
                </div>
              );

              case "number":
                return (
                  <div className="mb-3" key={field.name}>
                    <label className="block mb-1 font-medium">{field.label}</label>
              
                    <select
                      className="border rounded p-2 mb-1"
                      value={filterValues[field.name + "_comparison"] || "eq"}
                      onChange={(e) => {
                        setFilterValues((prev) => ({
                          ...prev,
                          [field.name + "_comparison"]: e.target.value,
                        }));
                      }}
                    >
                      <option value="eq">{"Igual"}</option>
                      <option value="gt">{"Maior que"}</option>
                      <option value="gte">{"Maior e igual"}</option>
                      <option value="lt">{"Menor"}</option>
                      <option value="lte">{"Menor e igual"}</option>
                    </select>
              
                    <input
                      type="number"
                      className="border rounded p-2 w-full"
                      value={value}
                      placeholder={field.placeholder}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                    />
                  </div>
                );

            case "numberRange":
                const minVal = value?.min || "";
                const maxVal = value?.max || "";
                
                return (
                    <div className="mb-3" key={field.name}>
                    <label className="block mb-1 font-medium">
                        {field.label} (intervalo)
                    </label>
                    <div className="flex gap-2 mt-1">
                        <input
                        type="number"
                        className="border rounded p-2 w-full"
                        placeholder="Mínimo"
                        value={minVal}
                        onChange={(e) => {
                            setFilterValues((prev) => {
                            const oldRange = prev[field.name] ?? {};
                            return {
                                ...prev,
                                [field.name]: {
                                ...oldRange,
                                min: e.target.value,
                                },
                            };
                            });
                        }}
                        />
                        <input
                        type="number"
                        className="border rounded p-2 w-full"
                        placeholder="Máximo"
                        value={maxVal}
                        onChange={(e) => {
                            setFilterValues((prev) => {
                            const oldRange = prev[field.name] ?? {};
                            return {
                                ...prev,
                                [field.name]: {
                                ...oldRange,
                                max: e.target.value,
                                },
                            };
                            });
                        }}
                        />
                    </div>
                    </div>
                );
                
            
            default:
              return null;
          }
        })}

        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Buscar
          </button>
          <button
            onClick={handleClearAll}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Limpar
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
