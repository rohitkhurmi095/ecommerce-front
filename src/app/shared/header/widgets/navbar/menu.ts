export interface Menu {
    //DEFINE Menu Items TYPE here
    //?: => optional parameters/type
    path?:string,
    title?:string,
    type?:string,
    megaMenu?:boolean,
    megaMenuType?: string; // small, medium, large
    image?: string;
    children?:Menu[]
}
