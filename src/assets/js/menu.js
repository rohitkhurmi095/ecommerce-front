"use strict";
$(document).ready(function(){
  //==========
  //SMARTMENU
  //==========
  //call smartmenu on defined id's of <ul> of- navbar component-

  //----------
  //MAIN MENU (NAVBAR COMPONENT)
  //----------
  $('#main-menu').smartmenus();

  //---------
  //SUB MENU (MENU-LEFT COMPONENT)
  //---------
  $('#sub-menu').smartmenus();
});

 //MOBILE SIDE
 if ($(window).width() > '1200') {
  $('#hover-cls').hover(
    function(){
      $('.sm').addClass('hover-unset');
    }
)}



//----------------------------------------------------------------------------------
//NOTE:
//To load these scripts: CODE FOR ngx-smart-menu
//1) put in <script>code</script> in indexedDB.html
//2) put in the loaded component - header component.ts using jquey($.getScript('script file path'))
//------------------------------------------------------------------------------------

//---------------------------------------------------
/* DOCUMENTATION: http://vadikom.github.io/smartmenus/src/demo/
//USING smartmenu (Vertical Sidebar):
<nav id="main-nav">
	<ul id="main-menu" class="sm sm-blue sm-vertical">
		...Sidebar Menu Integration
	</ul>
</nav> 

//Script:
$(function() {
		$('#main-menu').smartmenus({
			mainMenuSubOffsetX: 1,
			mainMenuSubOffsetY: -8,
			subMenusSubOffsetX: 1,
			subMenusSubOffsetY: -8
		});
	});
*/

//---------------------------------------------------

/* 
 $('#main-menu').smartmenus({
    subMenusSubOffsetX: 1,
    subMenusSubOffsetY: -8
  });

  //---------
  //SUB MENU (MENU-LEFT COMPONENT)
  //---------
  $('#sub-menu').smartmenus({
    subMenusSubOffsetX: 1,
    subMenusSubOffsetY: -8
  })
*/