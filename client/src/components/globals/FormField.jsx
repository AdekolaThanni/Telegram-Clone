import React from "react";
import { Field } from "formik";

function FormField({
  labelName,
  labelClassName,
  name,
  value,
  error,
  required,
  fieldType,
}) {
  return (
    <div className="relative group">
      <label
        onClick={(event) =>
          event.currentTarget.closest("div").querySelector("input").focus()
        }
        htmlFor={name}
        className={`${labelClassName}
        absolute 
        ${
          value
            ? "text-[1.4rem] -top-[1.1rem] -translate-y-0 "
            : "top-1/2 -translate-y-1/2 text-[1.6rem]"
        } group-focus-within:-top-[1.1rem]
        group-focus-within:-translate-y-0
        left-[1.5rem] group-focus-within:left-[1rem]
        bg-primary 
        text-secondary-text group-focus-within:text-cta-icon
        px-[.3rem] 
        duration-200
        group-focus-within:text-[1.4rem]
        `}
      >
        {labelName} ({required ? "required" : "optional"})
      </label>
      <Field
        name={name}
        className="bg-transparent border border-secondary-text rounded-2xl py-[1rem] group-focus-within:outline-none px-[1.5rem] focus-within:border-2 focus-within:border-cta-icon w-full"
        type={fieldType ? fieldType : "text"}
      />
    </div>
  );
}

export default FormField;
