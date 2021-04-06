export interface Menu {
    //DEFINE Menu Items TYPE here
    //?: => optional parameters/type
    path?:string;
    title?:string;
    type?:string;       //if path => link Else subMenu
    megaMenu?:boolean; //if menu is megaMenu (true/false) 
    children?:Menu[]; //subMenu of Menu[]
}
