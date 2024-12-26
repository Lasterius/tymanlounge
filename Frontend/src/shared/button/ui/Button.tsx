import { IButtonProps } from "@/app/types/ui.types";

export const Button = ({ children, className, onClick }: IButtonProps) => {
  return (
    <button
      className={`h-14 w-40 rounded-xl border-2 border-solid border-blck bg-blck font-bold uppercase text-wht transition-colors hover:bg-wht hover:text-blck dark:border-wht dark:bg-wht dark:text-blck hover:dark:bg-blck hover:dark:text-wht ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
