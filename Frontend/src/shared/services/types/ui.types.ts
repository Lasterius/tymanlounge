import { PropsWithChildren } from "react";

export interface IButtonProps extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
}

export interface IReserveButtonProps {
  buttonText: string;
  className?: string;
}
