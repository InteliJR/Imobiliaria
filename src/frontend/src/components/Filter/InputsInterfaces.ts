
// Tipos de input
export type FieldType =
  | "text"
  | "select"    
  | "date"
  | "checkbox"
  | "dateRange"
  | "number"
  | "numberRange";

export interface IFilterField<T> {
  // Nome do campo
  name: string;

  // O que vai exibido
  label: string;

  // O tipo desse field
  type: FieldType;

  // Aqui é a propiredade que ta na interface que eu quero filtrar
  property: keyof T;

  // Se for select vc pode passar as opç~oes
  options?: string[];

  // Placeholder
  placeholder?: string;
  
  // Posso passar uma função customizada de filtro que vai ser chamada
  customFilter?: (item: T, filterValue: any) => boolean;
}
