import { ReactNode } from "react";

export interface MenuItem {
  title: string;
  active: boolean;
  type?: string;
  article?: ReactNode;
  id?: string;
}
