//FOR DYNAMICALLY BINDING MENU ITEMS
//------------------------------------
//Menu Items are written in this file & then dynamically binded
//to add one or more menu items changes will be made in this file only
//define menuItems JSON configuration here

//Menu Type
import {Menu} from './menu';

//===========
//MENU ITEMS 
//===========
export const MENUITEMS:Menu[] = [

    //_________________
    // ** CLOTHING ** 
    //_________________
    //megaMenu -> children = MENS FASHION, WOMENS FASHION
    //url: /home/left-sidebar/collection/all

    {title:'clothing',type:'sub',megaMenu:true,
        children:[
            //MENS FASHION
            {title:'mens fashion',type:'link',
                children:[
                  {path:'/home/left-sidebar/collection/all', title:'sports wear', type:'link'},
                  {path:'/home/left-sidebar/collection/all', title:'top wear', type:'link'},
                  {path:'/home/left-sidebar/collection/all', title:'bottom wear', type:'link'},
                  {path:'/home/left-sidebar/collection/all', title:'ethic wear', type:'link'},
                  {path:'/home/left-sidebar/collection/all', title:'shirts', type:'link'},
                ]
            },
            //WOMENS FASHION (has megaMenu for image)
            {title:'womens fashion',type:'link',megaMenu:true,
                children:[  
                  {path:'/home/left-sidebar/collection/all',title:'dresses',type:'link'},
                  {path:'/home/left-sidebar/collection/all',title:'skirts',type:'link'},
                  {path:'/home/left-sidebar/collection/all',title:'westarn wear',type:'link'},
                  {path:'/home/left-sidebar/collection/all',title:'ethic wear',type:'link'},
                  {path:'/home/left-sidebar/collection/all',title:'bottom wear',type:'link'},
                  {path:'/home/left-sidebar/collection/all',title:'sports wear',type:'link'}
                ]
            }
        ] 
    }
]