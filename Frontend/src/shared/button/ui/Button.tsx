import { IButtonProps } from "@/shared/config/types/ui.types";

export const Button = ({ children, className, onClick }: IButtonProps) => {
  return (
    <button
      className={`h-10 w-48 rounded-xl border-2 border-solid border-blck bg-blck font-mainPicture font-bold uppercase text-wht transition-colors hover:bg-wht hover:text-blck dark:border-wht dark:bg-wht dark:text-blck hover:dark:bg-blck hover:dark:text-wht sm:h-14 md:w-40 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
