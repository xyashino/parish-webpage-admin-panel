import { Submenu } from "./submenu.interface";
export interface Page {
  name: string;
  submenu?: Submenu[];
}
