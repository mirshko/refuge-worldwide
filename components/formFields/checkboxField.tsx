import { useField } from "formik";

export default function CheckboxField({
  label,
  description,
  size,
  ...props
}: {
  label: string;
  description?: string;
  name: string;
  size?: string;
}) {
  const [field, meta, helpers] = useField(props);

  return (
    <div
      className={`${
        size == "small" ? "-mt-6" : ""
      } flex space-x-3 text-base mb-10 items-center`}
    >
      <input
        type="checkbox"
        id={props.name}
        {...field}
        {...props}
        className="h-6 w-6 rounded-full border-2 border-black text-black focus:ring-black"
      />
      <label
        htmlFor={props.name}
        className={`${
          size == "small" ? "text-small" : "text-small sm:text-base"
        } sm:leading-none checkbox-label`}
      >
        {label}
      </label>
    </div>
  );
}
