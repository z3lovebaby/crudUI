export interface FilterSelectOption {
  name: string;
  columnProp: string;
  options: string[]; // Adjust the type of options as per your requirements
  modelValue?: any;
}