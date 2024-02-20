export interface FilterSelectOption {
  name: string;
  columnProp: string;
  options: string[]; // Adjust the type of options as per your requirements
  selectedValue: string; // Lưu giá trị được chọn từ dropdown
  inputValue: string;
}