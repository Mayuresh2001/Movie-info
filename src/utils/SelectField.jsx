import { useId } from "react";

const SelectField = ({
  placeholder = "Select an option",
  label,
  options = [],
}) => {
  const id = useId();
  if (typeof options !== "object" || !Array.isArray(options)) {
    console.error("Invalid options provided to SelectField");
    options = [];
  }

  return (
    <div className="relative flex flex-nowrap">
      <label className="mx-2.5 my-auto text-sm" htmlFor={id}>{label + ":"}</label>
      <select
        id={id}
        className="
      appearance-none
      text-[13px] font-medium
      rounded-[30px]
      border-2 border-border
      bg-background
      px-2.5 py-2.25 pr-9
      text-textColor
      transition-all duration-200
      focus:outline-none
    border-white/10
    text-[#6d7988]
    hover:border-redGlow
      hover:bg-[color-hover-bg]
      hover:text-[color-hover-text]
    "
        defaultValue=""
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 px-1.5">
        ▾
      </span>
    </div>
  );
};

export default SelectField;