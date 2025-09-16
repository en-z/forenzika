var ON_OFF = "OFF";
var image_counter = 0;							// GLOBAL VARIABLE THAT DEFINES THE TOTAL NUMBER OF MODEL IMAGES DISPLAYED AFTER CLICKING ON A YEAR
var rows = 0;									// GLOBAL VARIABLE THAT DEFINES THE TOTAL NUMBER OF MODEL IMAGES ROWS DISPLAYED AFTER CLICKING ON A YEAR
var cols = 0;									// GLOBAL VARIABLE THAT DEFINES THE TOTAL NUMBER OF MODEL IMAGES COLS DISPLAYED AFTER CLICKING ON A YEAR
var SelectedYear = null;						// GLOBAL VARIABLE THAT IS SET TO THE SELECTED YEAR
var SelectedModelsArray = new Array();			// GLOBAL ARRAY OF THE NUMERICAL VALUE OF THE POINTER TO THE IMAGE NAME SO WE KNOW WHICH ONE THE CUSTOMER CHOSE

var CurrentImageSelected = ''; 					// GLOBAL VARIABLE THAT SAVES THE IMAGE THAT THE BLUE OUTLINE DIV IS CURRENTLY OVER
var CurrentColumn = '';							// GLOBAL VARIABLE THAT SAVES THE CURRENT COL - USED TO CALC WHETHER TO EXPAND LEFT/RIGHT OR UP/DOWN
var CurrentRow = '';							// GLOBAL VARIABLE THAT SAVES THE CURRENT ROW - USED TO CALC WHETHER TO EXPAND LEFT/RIGHT OR UP/DOWN
var ChooseDetailsExpanded = null;				// GLOBAL VARIABLE THAT TURNS ON OR OFF THE BLUE OUTLINE OVER THE MODEL IMAGES FUNCTIONS
var scrollTimer = null;
var myTimer = null;								// GLOBAL TIMER VARIABLE USED TO FADE AND CHANGE COLOR
var OpenDirection = null;						// GLOBAL VARIABLE USED TO RECORD WHETHER WE WILL OPEN LEFT OR RIGHT WHEN CLICKING ON A MODEL.  VALUES LEFT / RIGHT
var OpenVertical = null;						// GLOBAL VARIABLE USED TO RECORD WHETHER WE WILL OPEN UP OR DOWN WHEN CLICKING ON A MODEL.  VALUES UP / DOWN

var WindowShadeSubTableTemp = new Array();		// GLOBAL ARRAY USED TO CREATE A TEMP COPY OF THE CHOOSE BODY STYLE TABLE

var CurrentRowBGCOLOR = null;					// GLOBAL VARIABLE THAT HOLDS THE CURRENT VALUE OF THE BACKGROUND COLOR OF THE ROW - USED TO ALTERNATE COLORS

var CurrentSelectedRadioRow = new Array(); 	 	// GLOBAL ARRAY STORES THE VALUES OF THE CURRENTLY SELECTED RADIO BUTTON, SO THAT WE CAN RE-SELECT THEM WHEN THE WINDOW SHADE ROLLS DOWN
var CurrentSelectedRadioRowValue = new Array();  // GLOBAL ARRAY STORES THE VALUES OF THE CURRENTLY SELECTED RADIO BUTTON, SO THAT WE CAN RE-SELECT THEM WHEN THE WINDOW SHADE ROLLS DOWN

var FadeOutCounter = 1;							// GLOBAL VARIABLE USED FOR FADE ROUTINE, SET TO 1 PRIOR TO CALLING THE ROUTINE
var ChooseDetailsWidth  = 0;					// GLOBAL VARIABLE USED DURING THE EXPANDO FOR THE BLUE OUTLINE
var ChooseDetailsHeight = 0;					// GLOBAL VARIABLE USED DURING THE EXPANDO FOR THE BLUE OUTLINE

var TimeToFade = 150.0;							// GLOBAL VARIABLE USED TO CONTROL HOW FAST THE FADING WILL OCCUR

var CurrentMainScreenDisplay = 'YEARS';			// GLOBAL VARIABLE USED TO TELL OTHER ROUTINES WHETHER OR NOT THE YEARS TABLE OR MODEL TABLE IS DISPLAYED

var SelectorBoxOptions = new Array();			// ASSOCIATIVE ARRAY THAT DEFINES WHICH OPTIONS ARE TO BE DISPLAYED ON THE SELCTOR BOX (THREE OPTIONS, "MODEL", "CHASSIS", "ENGINE" - I.E. A6 QUATTRO, CABRIOLET, 1.8L)
var temp_string_array = new Array();
var originalImage = null;
var originalWidth;
var originalImageSrc = null;
var originalSelectorDiv = null;
var firstTitleAdded = false;                   // BOOLEAN TO HOLD WHETHER THE FIRST TITLE HAS BEEN ADDED
var engineTitleAdded = false;                  // BOOLEAN TO HOLD WHETHER THE BODYS TITLE ("Choose Engine Body") HAS BEEN ADDED
var SelectorClosed = false;                    // BOOLEAN TO INDICATE IF THE CLOSE BUTTON ON THE CHOOSE DETAILS BOX HAS BEEN CLICKED
var origSelectorDiv2;                          // HOLDS A COPY OF THE SELCTORDIV2 BEFORE IT IS EXPANDED
var numOptions = 0;                            // NUMBER OF ROLL DOWN OPTIONS FOR THE CAR CHOSEN
var tableHidden = 0;             
var fromReturn = false;
var windowShade3expanded = false;
var heightArray = new Array();
var idCounter = 0;
var scrollPosition = 0;
var tempRecentCarsHtml = null;
var recentCars = false;
var sideImage = "HomePageSideImage";
var safari_test = /safari/;
var opera_test = /opera/;
var firefox_test = /firefox/;
var chrome_test = /chrome/;
var ipad_test = /ipad/;
var bodyTest = /Please choose a body style:/;
var reload = true;
var pathArray = window.location.pathname.split( '/' );
var browserWidth = 0;    
var prev = 0;   
var genericImage = false;
var firstPage = true;
var newPage = false;      
var fading = false;
var tempRecentCarsDropDownList;
var touchable = 'createTouch' in document
// 	EACH SECTION INCLUDES A FILE WITH JAVASCRIPT CODE UNIQUE TO EACH MAKE.  I.E. http://www.pelicanparts.com/javascript/SuperCat_Audi.js
//  THIS FILE CONTAINS THE FOLLOWING INFO:
//  car_array = new Array(1090,'89',1,2,0,3,4,0,0,1091,'89',1,2,0,5,4,0,0,1092,'89',1,6,0,3,4,0,0,1093,'90',1,2,0,3,4,0,0,);
//	string_array = [" ","100","Base","Sedan","2.3L L5","Wagon","E","2.8L V6","CS","S","100 Quattro","200","2.2L L5","200 Quattro","20v","20v Avant","Avant","4000","1.6L L4","1.7L L4","GT","1.8L L4","4000 Quattro","5000","2.0L L5","Turbo","S Turbo","5000 Quattro","80","2.0L L4","80 Quattro","90","Sport","90 Quattro","A3","Hatchback","Quattro","3.2L V6","A4","3.0L V6","2003_A4","Cabriolet","Convertible","A4 Quattro","A6","2003_A6","A6 Quattro","4.2L V8","2.7L V6","A8","3.7L V8","A8 Quattro","L","2003_A8","6.0L W12","Allroad Quattro","2003_Allroad","Coupe","Coupe Quattro","Q7","Sport Utility","3.6L V6","Premium","R8","RS4","RS6","2003_RS6","S4","S6","2003_S6","5.2L V10","S8","2003_S8","TT","2003_TT","TT Quattro","SE","V8 Quattro","3.6L V8","A5 Quattro","S5","Q5","Premium Plus","Prestige","TDI","A5"];
//	min_year = 1978;
//	max_year = 2010;
//
//  car_array contains an array of values according to the following pattern:
//  car_array[i+0] = SVSVSI - INTERNAL RECORD COUNTER FOR SSF TABLE vehicles
//  car_array[i+1] = SVYRI  - TWO DIGIT CODE FOR THE YEAR OF THE CAR
//  car_array[i+2] = SVMDN  - POINTER TO STRING IN string_array for MODEL (A4 QUATTRO)
//  car_array[i+3] = SVSMN  - POINTER TO STRING IN string_array for SECONDARY MODEL (BASE, L, AVANT, CABRIOLET)
//  car_array[i+4] = SVMBCN - POINTER TO STRING IN string_array for CHASSIS CODE
//  car_array[i+5] = SVBOTN - POINTER TO STRING IN string_array for BODY STYLE (SEDAN, COUPE, WAGON, CABRIOLET, ETC)
//  car_array[i+6] = SVENBN - POINTER TO STRING IN string_array for ENGINE SIZE
//  car_array[i+7] = SVENDN - POINTER TO STRING IN string_array for MB CHASSIS CODE
//  car_array[i+8] = POINTER TO STRING IN string_array for IMAGE FILE USED (FROM OUR SPREADSHEET)

//var SelectedModel = '';						// DOESN'T APPEAR TO BE USED ANY MORE
//var CurrentImage = '';						// GLOBAL VARIABLE THAT SAVES THE CURRENT IMAGE NAME, NO LONGER USED SINCE WE USED TRANSPARENT LAYERS NOW



window.onunload = function () {
  if (firstPage != true && newPage == false) {
      var make = window.location.pathname.substring(0,window.location.pathname.lastIndexOf('/') + 1);
	  window.location.href = 'http://www.pelicanparts.com' + make + 'index-sc.htm';
  }
}


function BlockMove(event) {   
   // Tell Safari not to move the window.   
   event.preventDefault() ;  
} 

window.onbeforeunload = function () {
     if (firstPage != true && newPage == false) {
	   var make = window.location.pathname.substring(0,window.location.pathname.lastIndexOf('/') + 1);
	   window.location.href = 'http://www.pelicanparts.com' + make + 'index-sc.htm';
     }
}

function copyStringArrayToTempArray()
  {
    for (var i=0; i<string_array.length; i++)
	  {
	  temp_string_array[i] = string_array[i];
	  }
  }
  
function HideSelectorPageOne()
  {
  if ((ChooseDetailsExpanded != true) && (document.getElementById('SelectorDiv2')) && (firstPage == true))
    {
    document.getElementById('SelectorDiv2').style.visibility = 'hidden';
	}
  }

function HideSelector()
  {
  if ((ChooseDetailsExpanded != true) && (document.getElementById('SelectorDiv2')))
    {
    document.getElementById('SelectorDiv2').style.visibility = 'hidden';
	}
  }
  
function copyTempArrayToStringArray()
  {
  for (var i=0; i<temp_string_array.length; i++)
	  {
	  string_array[i] = temp_string_array[i];
	  }
  }
	  
function SetModels(year) // SHOWS THE MINI IMAGES FOR THE YEAR/MAKE CHOSEN, ACCORDING TO THE FORMULAS LISTED BELOW
	{
	if (fromReturn == false)
	  {
	  copyStringArrayToTempArray();
	  }
	else
	  {
	  copyTempArrayToStringArray();
	  }
	//alert("here");
	document.getElementById('FloaterWindowTDRight').style.visibility = "hidden";
	document.getElementById('FloaterWindowTDLeft').style.visibility = "hidden";
    //$('#FloaterWindowTDRight').hide();
	//$('#FloaterWindowTDLeft').hide();
	//alert("here1");
	copyTempArrayToStringArray();
	SelectedYear = year; // SelectedYear IS A GLOBAL VARIABLE
	// FIGURE OUT HOW MANY IMAGES THERE ARE
	var image_array 	= new Array(); // ARRAY THAT HOLDS THE ACTUAL IMAGE NAMES
	var image_caption 	= new Array(); // ARRAY THAT HOLDS THE CAPTIONS THAT APPEAR UNDER THE IMAGES
	SelectedModelsArray = new Array(); // CLEAR THE GLOBAL ARRAY DEFINED ABOVE

	//var col_array 	= new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40);
	// THE FOLLOWING DICTATE THE FORMULA FOR DISPLAYING THE GRID FOR EACH ELEMENT CHOSEN
	var col_array 		= new Array(0, 1, 2, 3, 4, 5, 3, 4, 4, 5, 5, 4, 4, 5, 5, 5, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
	//var col_array 		= new Array(0, 1, 2, 3, 4, 4, 3, 4, 4, 5, 5, 4, 4, 5, 5, 5, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);
	var row_array 		= new Array(0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8);

	// car_array IS THE BIG ARRAY OF NUMBERS LINKING TO THE STRING DATA
	for (i=0;i<car_array.length;i=i+11)
		{
		if (car_array[i+1] == year.substr(2,2)) // IF THE YEAR IN THE ARRAY MATCHES THE YEAR SELECTED BY THE CUSTOMER
			{
			//var text = string_array[car_array[i+2]] + ' ' + string_array[car_array[i+3]] + ' ' + string_array[car_array[i+4]] + ' ' + string_array[car_array[i+5]] + ' ' + string_array[car_array[i+6]] + ' ' + string_array[car_array[i+7]] + ' ' + string_array[car_array[i+8]];
			if (!(string_array[car_array[i+8]] in oc(image_array))) // SCAN THROUGH AND SEE IF IT'S ALREADY BEEN ADDED TO OUR DISPLAY ARRAY
				{
				image_array.push(string_array[car_array[i+8]]);		// PULL FROM IMAGE INFO, READ FROM SPREADSHEET
				image_caption.push(string_array[car_array[i+9]]); 	// PULL FROM IMAGE CAPTION INFO, READ FROM SPREADSHEET
				SelectedModelsArray.push(car_array[i+8]);
				}
			}
		}
	
	rows = row_array[image_array.length]; 	// GET THE ROWS AS PER OUR FORMULA ABOVE
	cols = col_array[image_array.length];	// GET THE COLS AS PER OUR FORMULA ABOVE

	var models_html = '';	// TEMPORARY VARIABLE TO STORE PHOTOS + CAPTION DATA
	var photos_html = ''; 	// TEMPORARY VARIABLE TO STORE PHOTO IMAGE TABLE DATA
	var captions_html = ''; // TEMPORARY VARIABLE TO STORE CAPTION TABLE DATA
	image_counter = 0;
	if (originalSelectorDiv != null)
	  {
	  document.getElementById('SelectorDiv2').innerHTML = originalSelectorDiv;
	  }
	
	
	 
	for (var row_counter=0;row_counter<rows;row_counter++)
		{
		for (var col_counter=0;col_counter<cols;col_counter++)
			{
			if (image_array[image_counter])
				{
				var caption = image_caption[image_counter].replace('(','<br>(');
				photos_html += '<td><img src="http://www.pelicanparts.com/graphics/transparent.gif" width=5></td>' +
				               '<td align=center valign=center"><img onmouseover="MoveSelector(\'' + image_counter + '\',' 
				               + col_counter + ',' + row_counter + ',\'' + image_array[image_counter] + '\');" id="image' 
							   + image_counter + '" width=130 height=83 src="http://www.pelicanparts.com/SuperCat/images/models/' 
							   + image_array[image_counter] + '.gif"></td><td><img src="http://www.pelicanparts.com/graphics/transparent.gif" width=5></td>';
				if (Make == "Mercedes-Benz") {
				   
				   captions_html += '<td><img src="http://www.pelicanparts.com/graphics/transparent.gif" width=5></td>' +
				                    '<td align=center class="side_menu3" id="lowerTD' + image_counter + 
						    		'" onmouseover="MoveSelector(\'' + image_counter + '\',' 
				                    + col_counter + ',' + row_counter + ',\'' + image_array[image_counter] + '\');">' 
				                    +  caption + '<br>&nbsp; </td><td><img src="http://www.pelicanparts.com/graphics/transparent.gif" width=5></td>';
				} 
				else {
				   captions_html += '<td><img src="http://www.pelicanparts.com/graphics/transparent.gif" width=5></td>' +
				                    '<td align=center class="side_menu3" id="lowerTD' + image_counter + 
						    		'" onmouseover="MoveSelector(\'' + image_counter + '\',' 
				                    + col_counter + ',' + row_counter + ',\'' + image_array[image_counter] + '\');">' + Make + ' ' 
				                    +  caption + '<br>&nbsp; </td><td><img src="http://www.pelicanparts.com/graphics/transparent.gif" width=5></td>';
				}
				image_counter++;
				}
			}
		models_html += '<tr>' + photos_html + '</tr><tr>' + captions_html + '</tr>';
		photos_html = '';
		captions_html = '';
		}
	// OUTPUT MODELS GRID TO THE HIDDEN LAYER ModelDiv
	var align
	var valign;
	if (cols >= 5) {
	  align = 'align="left"';
	}
	if (rows == 1) {
	  valign = ' valign="top"';
	}
	document.getElementById('ModelDiv').innerHTML = '<table id="MainSelectionTable" cellspacing=3 cellpadding=3 border=0 ' + align + valign + '><tr>' + models_html + '</tr><tr> \
	<td colspan=4> \
		<table border=0 id="ReturnToChooseYearTable"> \
			<tr> \
				<td align=left colspan=2 valign=bottom><a href="#" onclick="ReturnToSelectYear();return false" class="side_menu3" id="returnToChooseYear"><img border=0 src="http://www.pelicanparts.com/graphics/arrow2.gif" width=28 height=15></a></td> \
				<td align=left valign=middle><a href="#" onclick="ReturnToSelectYear();return false" class="side_menu3" id="returnToChooseYear1">Return to choose year</td> \
			</tr></table> \
	</td></tr></table>';
	//document.getElementById('SelectorDiv2').style.visibility = 'visible';
	$('#AutoNumber1').hide();
	fade('AutoNumber1','HideYears'); // FADE OUT YEARS, THEN FADE IN ModelDiv
	}

function populateSelector(model, desc, Image)
  {
  var onclick = 'onclick="SetCookiesAndShowCatalog(\'' + model + '\',\'' + desc + '\',\'' + Image + '\');"';
  var cb = '<span valign="top" onClick="RemovePullDownCar(' 
           + model + '); return false;"><img alt="Remove" border="0" src="http://www.pelicanparts.com/SuperCat/icons/remove.gif"\
            height="14" width="19" onClick="RemovePullDownCar(' 
           + model + '); return false;"></span>';
  if (originalSelectorDiv == null)
    {
	originalSelectorDiv = document.getElementById('SelectorDiv2').innerHTML;
	}

   return '<table style="cursor:pointer;cursor:hand;" ' + onclick + ' id="SelectorDivTable" border="0" bordercolor="#111111" cellpadding="0" cellspacing="0">\
			<tbody><tr><td width="11" height="11"><img src="http://www.pelicanparts.com/graphics/upperleft_blue_trans.gif" width="11" height="11"></td>\
			<td background="http://www.pelicanparts.com/graphics/top_blue_outline_trans.gif" height="11"></td>\
			<td width="11" height="11"><img src="http://www.pelicanparts.com/graphics/upper_right_blue_trans.gif" width="11" height="11"></td></tr>\
			<tr><td width="11" background="http://www.pelicanparts.com/graphics/left_blue_outline_trans.gif">&nbsp;</td><td class="side_menu" rowspan="2">\
				<table style="width: 308px; height: 133px;" id="SelectorDivTable2" border="0" cellpadding="0" cellspacing="0">\
				<tbody><tr><td>&nbsp;</td>\
				</tbody></table></td><td width="11" background="http://www.pelicanparts.com/graphics/right_blue_outline_trans.gif">&nbsp;</td></tr>\
			<tr><td width="11" background="http://www.pelicanparts.com/graphics/left_blue_outline_trans.gif">&nbsp;</td>\
			<td width="11" background="http://www.pelicanparts.com/graphics/right_blue_outline_trans.gif">&nbsp;</td></tr>\
			<tr><td width="11" height="2"><img src="http://www.pelicanparts.com/graphics/lower_left_blue_trans.gif" width="11" height="11"></td>\
			<td background="http://www.pelicanparts.com/graphics/lower_blue_outline_trans.gif" height="2"></td>\
			<td width="11" height="2"><img src="http://www.pelicanparts.com/graphics/lower_right_blue_trans.gif" width="11" height="11"></td>\
			</tr>\
		    </tbody></table>';
			
  }
	
function MoveSelector(ImageNumber,Column,Row,Image) // ONMOUSEOVER FUNCTION - MOVES BLUE OUTLINE BOX AND SETS VARIABLES THAT INDICATE WHICH IMAGE IS SELECTED
	{
	if (ChooseDetailsExpanded != true)
		{
		var PosX = findPosX(document.getElementById('image' + ImageNumber));	// FIND X/Y POSITION OF CURRENT MODEL IMAGE
		var PosY = findPosY(document.getElementById('image' + ImageNumber));
		document.getElementById('SelectorDiv2').style.left = PosX-11;		// SET POSITION OF BLUE OUTLINE SELECTOR DIV OVER MODEL IMAGE
		document.getElementById('SelectorDiv2').style.top = PosY-11;
		document.getElementById('SelectorDivTable2').style.width = 130;		// SET WIDTH IN CASE IT WAS PREVIOUSLY EXPANDED BIGGER TO HOLD THE SELECTION DETAILS
		document.getElementById('SelectorDivTable2').style.height = document.getElementById('lowerTD0').offsetHeight + 83;  // SET HEIGHT TO INCLUDE THE LOWER TABLE DATA (USEFUL IN CASE THERE ARE TWO LINES ON THE CAPTIONS)
		document.getElementById('SelectorDiv2').style.visibility = 'visible';
		CurrentImageSelected = ImageNumber;	// SET GLOBAL VARIABLES FOR USE BY OTHER FUNCTIONS LATER ON WHEN THE USER CLICKS
		CurrentColumn = Column;
		CurrentRow = Row;
		//CurrentImage = Image;		// NO LONGER USED SINCE WE USE TRANSPARENT LAYERS NOW
		}
	}

function MoveSelectorRecentCars(Image, model, desc, gif) // ONMOUSEOVER FUNCTION - MOVES BLUE OUTLINE BOX AND SETS VARIABLES THAT INDICATE WHICH IMAGE IS SELECTED
	{
	    document.getElementById('SelectorDiv2').innerHTML = populateSelector(model, desc, gif);
		var PosX = findPosX(document.getElementById(Image));	// FIND X/Y POSITION OF CURRENT MODEL IMAGE
		var PosY = findPosY(document.getElementById(Image));
		document.getElementById('SelectorDiv2').style.left = PosX;		// SET POSITION OF BLUE OUTLINE SELECTOR DIV OVER MODEL IMAGE
		document.getElementById('SelectorDiv2').style.top = PosY - 3;
		document.getElementById('SelectorDivTable2').style.width = document.getElementById(Image).offsetWidth-17;		// SET WIDTH IN CASE IT WAS PREVIOUSLY EXPANDED BIGGER TO HOLD THE SELECTION DETAILS
		document.getElementById('SelectorDivTable2').style.height = document.getElementById(Image).offsetHeight - 15;  // SET HEIGHT TO INCLUDE THE LOWER TABLE DATA (USEFUL IN CASE THERE ARE TWO LINES ON THE CAPTIONS)
		document.getElementById('SelectorDiv2').style.visibility = 'visible';
	}

	
// THIS FUNCTION IS LIKE GREP IN PERL - USED TO TEST TO SEE IF AN ELEMENT IS IN AN ARRAY
function oc(a)	// USAGE EXAMPLE: if (!(car_array[i+2] in oc(TempBoxArray1))) 
	{
	  var o = {};
	  for(var i=0;i<a.length;i++)
	  {
	    o[a[i]]='';
	  }
	  return o;
	}		
	
////////////////////////////////////	
// USER CLICKS ON 'Return to choose year' - FADE OUT MODELS AND DISPLAY YEARS HTML INSTEAD	
function ReturnToSelectYear()  
	{
	if (ChooseDetailsExpanded == true)
	  {
	  closeSelector();
	  }
	else
	  {
	  ReInitChooseDetailsData();
	  }
	SelectorClosed = false;
	fade('AutoNumber1','ShowYears');
	var make = window.location.pathname.substring(0,window.location.pathname.lastIndexOf('/') + 1);
	window.location.href = 'http://www.pelicanparts.com' + make + 'index-sc.htm';
	//window.location.href=window.location.href;
	//window.location.reload(true);
	//if (navigator.userAgent.indexOf("Firefox") == -1)
	//   {
	//   location.reload();    // this is jquery
	//   } 
	}
	
function ReInitChooseDetailsData ()
{
    ChooseDetailsExpanded = false;
	engineTitleAdded = false;
	firstTitleAdded = false;
	CurrentSelectedRadioRow = [];
    numOptions = 0;
	windowShade3expanded = false;
	idCounter = 0;
	heightArray = [];
	fading = false;
}

function deleteTable(table) 
  {
   for(var i = document.getElementById(table).rows.length - 1; i > 0; i--)
				{document.getElementById(table).deleteRow(i);}		
  }

function fadeSelector(width, height)
  {
	// THESE ROUTINES CONTROL THE EXPANSION OF THE BLUE OUTLINE BOX
	var deltaX = parseInt(document.getElementById('SelectorDivTable2').style.width)  * FadeOutCounter/4;
	var deltaY = parseInt(document.getElementById('SelectorDivTable2').style.height) * FadeOutCounter/4;
	var OldWidth  = document.getElementById('SelectorDiv2').offsetWidth;
	var OldHeight = document.getElementById('SelectorDiv2').offsetHeight;
	var OrigHeight = document.getElementById('lowerTD0').offsetHeight + 83;
	if (OpenDirection == 'left')
		{
		var BigWidth = parseInt(document.getElementById('SelectorDivTable2').style.width);
		var Difference = BigWidth - 130; // FINAL WIDTH OF THE BOX WHEN MOVING OVER THE CARS
		var OldWidth = parseInt(document.getElementById('SelectorDivTable2').style.width);
		document.getElementById('SelectorDivTable2').style.width  = parseInt(BigWidth - (Difference * FadeOutCounter)/5);
		var NewWidth = parseInt(BigWidth - (Difference * FadeOutCounter)/5);
		var OldLeft = parseInt(document.getElementById('SelectorDiv2').style.left);
		var NewLeft = OldLeft + (OldWidth - NewWidth);
		document.getElementById('SelectorDiv2').style.left = parseInt(NewLeft);
		}
	else
		{
		var BigWidth = parseInt(document.getElementById('SelectorDivTable2').style.width);
		var Difference = BigWidth - 130; // FINAL WIDTH OF THE BOX WHEN MOVING OVER THE CARS
		document.getElementById('SelectorDivTable2').style.width  = parseInt(BigWidth - (Difference * FadeOutCounter)/5);
		}
	if (OpenVertical == 'up')
		{
		var BigHeight = parseInt(document.getElementById('SelectorDivTable2').style.height);
		var Difference = BigHeight - OrigHeight; // FINAL WIDTH OF THE BOX WHEN MOVING OVER THE CARS
		var OldHeight = parseInt(document.getElementById('SelectorDivTable2').style.height);
		document.getElementById('SelectorDivTable2').style.height  = parseInt(BigHeight - (Difference * FadeOutCounter)/5);
		var NewHeight = parseInt(BigHeight - (Difference * FadeOutCounter)/5);
		var OldTop = parseInt(document.getElementById('SelectorDiv2').style.top);
		var NewTop = OldTop + (OldHeight - NewHeight);
	   	document.getElementById('SelectorDiv2').style.top = NewTop;
		}
	else
		{
		var BigHeight = parseInt(document.getElementById('SelectorDivTable2').style.height);
		var Difference = BigHeight - OrigHeight; // FINAL WIDTH OF THE BOX WHEN MOVING OVER THE CARS
		document.getElementById('SelectorDivTable2').style.height  = parseInt(BigHeight - (Difference * FadeOutCounter)/5);
		}
	
	FadeOutCounter++;
	if (FadeOutCounter > 5)
	   {
	     clearInterval(myTimer);
		 FadeOutCounter = 1;
         document.getElementById('SelectorDiv2').style.visibility = 'visible';
		 document.getElementById('ChooseDetailsData').innerHTML = '';
         document.getElementById('MainSelectionTableDiv').innerHTML = document.getElementById('ModelDiv').innerHTML;
		 OpenDirection = null;						// GLOBAL VARIABLE USED TO RECORD WHETHER WE WILL OPEN LEFT OR RIGHT WHEN CLICKING ON A MODEL.  VALUES LEFT / RIGHT
         OpenVertical = null;	
	   }
  }
  
function closeSelector()
{
   fading = false;
   scrollToTop('slow');
   scrollPosition = 0;
   SelectorClosed = true;
   ReInitChooseDetailsData();
   fade('ChooseDetailsSelector',''); // FADE IN THE SELECTOR DIV
   fade('WhiteSpace',''); // FADE IN THE SELECTOR DIV

   document.getElementById('SelectorDiv2').innerHTML = origSelectorDiv2;
   ChooseDetailsWidth  = document.getElementById('ChooseDetailsTable').offsetWidth;
   ChooseDetailsHeight = document.getElementById('ChooseDetailsTable').offsetHeight;
   var PosX = findPosX(document.getElementById('image' + CurrentImageSelected));	// FIND X/Y POSITION OF CURRENT MODEL IMAGE
   var PosY = findPosY(document.getElementById('image' + CurrentImageSelected));
																		   
   document.getElementById('SelectorDiv2').style.visibility = 'visible';
   document.getElementById('ChooseDetailsData').innerHTML = '';
   document.getElementById('MainSelectionTableDiv').innerHTML = document.getElementById('ModelDiv').innerHTML;   
   fromReturn = true;
   FadeOutCounter = 1;
   myTimer = setInterval("fadeSelector(" + ChooseDetailsWidth + "," + ChooseDetailsHeight + ")",50);
}
////////////////////////////////////	
// USER CLICKS ON A MODEL, EXPAND THE BLUE OUTLINE WINDOW AND START SHOWING THE WINDOWSHADES
function ChooseDetails()	
	{
	
    var closeButton = '&nbsp;<img src="http://www.pelicanparts.com/graphics/blue_close.gif" onClick="closeSelector(); return false;">';
	var closeButton1 = '&nbsp;<img style="vertical-align:top" src="http://www.pelicanparts.com/graphics/blue_close.gif" onClick="closeSelector(); return false;">';
	if (SelectorClosed == true)
	{
	   SelectorClosed = false;
	   if (navigator.appName != 'Microsoft Internet Explorer') 
	     {
	      return;
		 }  
	}

	if (ChooseDetailsExpanded != true)  // CHECK TO SEE IF THE WINDOWSHADE WINDOW IS ALREADY OPEN
		{
		var TempBoxArray1 			= new Array(); // TEMP ARRAY STORES MODEL INFO
		var TempBoxArray2 			= new Array(); // TEMP ARRAY STORES CHASSIS INFO
		var TempBoxArray3 			= new Array(); // TEMP ARRAY STORES ENGINE INFO
		var TempBoxArray1_SVSVSI 	= new Array(); // TEMP ARRAY STORES SVSVSI MODEL CODE (USED FOR ROUTINES WHERE THERE IS ONLY ONE SELECTABLE MODEL OPTION LIKE 2003 AUDI A8 QUATTRO)
		var TempBoxArray2_SVSVSI 	= new Array(); // TEMP ARRAY STORES SVSVSI MODEL CODE (USED FOR ROUTINES WHERE THERE IS ONLY ONE SELECTABLE CHASSIS OPTION LIKE 2008 AUDI S4)
		var TempBoxArray3_SVSVSI 	= new Array(); // TEMP ARRAY STORES SVSVSI MODEL CODE (USED FOR ROUTINES WHERE THERE IS ONLY ONE SELECTABLE ENGINE OPTION LIKE 2005 A6 QUATTRO)
		
		var CurrentSelectedCar = '';

		for (i=0;i<car_array.length;i=i+11)	// CYCLE THROUGH AND LIST ALL OPTIONS, AND TO SEE IF THERE IS ONLY ONE OPTION FOR A CAR, LIKE THE 2003 AUDI S6
			{
			if (car_array[i+8] == SelectedModelsArray[CurrentImageSelected] && car_array[i+1] == SelectedYear.substr(2,2))
				{
				CurrentSelectedCar = car_array[i];
				
				if (!(car_array[i+2] in oc(TempBoxArray1)))
					{
					TempBoxArray1.push(car_array[i+2]);
					TempBoxArray1_SVSVSI.push(CurrentSelectedCar);
					}
				if (!(string_array[car_array[i+5]] in oc(TempBoxArray2)))
					{
					TempBoxArray2.push(string_array[car_array[i+5]]);
					TempBoxArray2_SVSVSI.push(CurrentSelectedCar);
					}
				if (!(car_array[i+6] in oc(TempBoxArray3)))
					{
					TempBoxArray3.push(car_array[i+6]);
					TempBoxArray3_SVSVSI.push(CurrentSelectedCar);
					}
				}
			}
		SelectorBoxOptions["MODEL"] = false;
		SelectorBoxOptions["CHASSIS"] = false;
		SelectorBoxOptions["ENGINE"] = false;
		// SET GLOBAL VARIABLE USED TO DETERMINE WHICH OPTIONS TO DISPLAY

		if (TempBoxArray1.length > 1)	{SelectorBoxOptions["MODEL"] 	= true; numOptions = 1;}
		if (TempBoxArray2.length > 1)	{SelectorBoxOptions["CHASSIS"] 	= true; numOptions++;}
		if (TempBoxArray3.length > 1)	{SelectorBoxOptions["ENGINE"] 	= true; numOptions++;}

		
		if (CurrentColumn == 0){OpenDirection = 'right'} 	// OPEN RIGHT
		if (CurrentColumn == 1)
			{
			   if (cols >= 3){OpenDirection = 'right'} 		// OPEN RIGHT 
			   else {OpenDirection = 'left'} 					// OPEN LEFT
			} 
		if (CurrentColumn == 2)
			{
			   if (cols == 5){OpenDirection = 'right'} 		// OPEN RIGHT 
			   else {OpenDirection = 'left'} 					// OPEN LEFT
			} 
		if (CurrentColumn == 3){OpenDirection = 'left'} 	// OPEN LEFT
		if (CurrentColumn == 4){OpenDirection = 'left'} 	// OPEN LEFT
		if (CurrentRow + 1 == rows){OpenVertical = 'up';}	// OPEN UP
	    if ((CurrentRow == 0) && (TempBoxArray1.length > 4))
		  {
		  OpenVertical = 'down';
		  }
		
		var ChooseDetailsHeight = 255;  
		var WhitespaceHeight = 165;
		var TransparentHeight = 125;
		if (numOptions == 3)
		  {
		  ChooseDetailsHeight = 355;
		  WhitespaceHeight = 217;
		  }
		if (numOptions == 2)
		  {
		  ChooseDetailsHeight = 290;
		  if (TempBoxArray1.length > 3)
		    {
			ChooseDetailsHeight = 310;
			}
		  if (TempBoxArray1.length == 5)
		    {
			WhitespaceHeight = 230;
			}
		  }
	   var img = document.getElementById('image' + CurrentImageSelected).src;
		// RIGHT AND DOWN
		if (OpenDirection == 'right' && OpenVertical != 'up') {
		   document.getElementById('ChooseDetailsData').innerHTML =
		          '<table border=0 cellpadding=0 cellspacing=0 id="ChooseDetailsTable" height=' + ChooseDetailsHeight + ' width=389 style="min-height:' + ChooseDetailsHeight + ';"> \
						<tr> \
							<td> \
								<table height=100% width=100% border=0 cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111"> \
									<tr> \
										<td height=5%><img src="http://www.pelicanparts.com/graphics/transparent.gif" width=135 height=' + 
										     TransparentHeight + '></td> \
							        </tr> \
									<tr> \
										<td height=95% BGCOLOR="#FFFFFF"><img id="WhiteSpace" src="http://www.pelicanparts.com/graphics/whitespace.gif" width=135 height=' +
										WhitespaceHeight + '></td> \
									</tr> \
							   </table> \
							</td> \
									<td id="ChooseDetailsSelector" valign="top" width=200 BACKGROUND="http://www.pelicanparts.com/graphics/whitespace.gif" BGCOLOR="#FFFFFF">' + 
														document.getElementById('WindowShadeMainDiv').innerHTML + 
														'</td> \
									<td id="closeBox" valign="top" height=95% BGCOLOR="#FFFFFF">' + closeButton + '</td> \
					   </tr> \
				   </table>'
		}
        // LEFT AND DOWN																							
		if (OpenDirection == 'left'  && OpenVertical != 'up') {
		          document.getElementById('ChooseDetailsData').innerHTML =  
				  '<table border=0 cellpadding=0 cellspacing=0 id="ChooseDetailsTable" height=' + ChooseDetailsHeight + ' width=389 style="min-height:' + ChooseDetailsHeight + ';" > \
				       <tr> \
							<td id="ChooseDetailsSelector" valign="top">' + document.getElementById('WindowShadeMainDiv').innerHTML + '</td> \
							<td> \
								<table height=100% width=100% border=0 cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111"> \
					               <tr> \
										<td height=5%><img src="http://www.pelicanparts.com/graphics/transparent.gif" width=135 height=' + 
										TransparentHeight + '><span align="top">' 
										+ closeButton1 + '</span></td>' +		
									//	'<td id="closeBox" valign="top" height=5% BGCOLOR="#123456"><span align="top">' + closeButton + '</span></td>' +					
								   '</tr> \
								   <tr> \
										<td height=95% BGCOLOR="#FFFFFF"><img id="WhiteSpace" src="http://www.pelicanparts.com/graphics/whitespace.gif" width=135 height=' +
										WhitespaceHeight + '></td>' +										
								   '</tr> \
							   </table> \
							</td> \
					   </tr> \
				   </table>'
		}
	    // RIGHT AND UP																								
		if (OpenDirection == 'right' && OpenVertical == 'up') { 	   
		          document.getElementById('ChooseDetailsData').innerHTML =
				  '<table border=0 cellpadding=0 cellspacing=0 id="ChooseDetailsTable" height=' + ChooseDetailsHeight + ' width=389 style="min-height:' + ChooseDetailsHeight + ';"> \
						<tr> \
							<td> \
								<table height=100% width="95%" border=0 cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111"> \
									<tr> \
										<td valign="top" height="95%"><img id="WhiteSpace" src="http://www.pelicanparts.com/graphics/whitespace.gif" width=135 height=' + 
										WhitespaceHeight + '></td>' +    
									'</tr> \
									<tr> \
										<td height="5%"><img src="http://www.pelicanparts.com/graphics/transparent.gif" width=135 height=' +
										TransparentHeight + '></td> \
									</tr> \
								</table> \
							</td> \
							<td id="ChooseDetailsSelector" valign="top">' + document.getElementById('WindowShadeMainDiv').innerHTML + '</td> \
							<td id="closeBox" valign="top" height=5% BGCOLOR="#FFFFFF">' + closeButton + '</td> \
						</tr> \
				  </table>'
		}
		// LEFT AND UP																												
		if (OpenDirection == 'left'  && OpenVertical == 'up') {
				  
		          document.getElementById('ChooseDetailsData').innerHTML =
				  '<table border=0 cellpadding=0 cellspacing=0 id="ChooseDetailsTable" height=' + ChooseDetailsHeight + ' width=389 style="min-height:' + ChooseDetailsHeight + ';"> \
						<tr>\
							<td id="ChooseDetailsSelector" valign="top">' + document.getElementById('WindowShadeMainDiv').innerHTML + '</td> \
							<td> \
								<table height=100% width=100% border=0 cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111"> \
								  <tr> \
										<td height=95% BGCOLOR="#FFFFFF"><img id="WhiteSpace" src="http://www.pelicanparts.com/graphics/whitespace.gif" width=135 height=' + 
										WhitespaceHeight + '></td><td valign="top" BGCOLOR="#FFFFFF">'
										+ closeButton1 + '</td>' + 
								  '</tr> \
								  <tr> \
										<td height=5%><img src="http://www.pelicanparts.com/graphics/transparent.gif" width=135 height=' + 
										TransparentHeight + '> \
								  </tr> \
							    </table> \
							</td> \
						</tr> \
				 </table>'
		}
		
		// SELECT MODEL
		if (SelectorBoxOptions["MODEL"] == true) // THERE ARE OPTIONS FOR BOX 1, LIKE A4 AND A4 QUATTRO
			{
			var FoundException = false; // VARIABLE THAT WILL TURN ON IF WE FIND AN EXCEPTION - USED TO SKIP OVER OTHER EXCEPTION TESTS
			
			if (firstTitleAdded == false)
			  {
			  AddTableTitle(1,'Please select:');
			  firstTitleAdded = true;
			  // TEST FOR AUDI 4WD / 2WD 
			  var findText = /Quattro/i;
			  var FoundQuattro = false;
			  for (i=0;i<TempBoxArray1.length;i++)
				{
				  if (findText.test(string_array[TempBoxArray1[i]]))
					  {FoundQuattro = true;}
				}
			  var driveText = /Wheel Drive/;
			  
			  if (FoundQuattro)
				{
				for (i=0;i<TempBoxArray1.length;i++) 
				    {
					if (!(driveText.test(string_array[TempBoxArray1[i]]))) // CHECK TO SEE IF WE ALREADY HAVE TAGGED ON 4 OR 2 WHEEL DRIVE
					    {
					    if (findText.test(string_array[TempBoxArray1[i]]))
						   {string_array[TempBoxArray1[i]] = '<b>' + string_array[TempBoxArray1[i]] + '</b> (4-Wheel Drive)'}
					    else
						   {string_array[TempBoxArray1[i]] = '<b>' + string_array[TempBoxArray1[i]] + '</b> (2-Wheel Drive)'}
					    }
			        }
				}
			    for (i=0;i<TempBoxArray1.length;i++)
				  {
				   if (SelectorBoxOptions["ENGINE"] != true && SelectorBoxOptions["CHASSIS"] != true) // CHOOSING MODEL IS THE ONLY THINGS WE NEED TO DO, EXAMPLE 2003 AUDI A8 QUATTRO
					   {AddTableRow(1,TempBoxArray1_SVSVSI[i],string_array[TempBoxArray1[i]]);}  // PASS THE VALUE OF THE SVSVSI FOR THIS MODEL CAR, SINCE THIS IS THE ONLY OPTION NEEDED TO BE CHOSEN AT THIS TIME
				   else
					   {AddTableRow(1,TempBoxArray1[i],string_array[TempBoxArray1[i]]);}
				  }
				  firstTitleAdded = true;
			   }
			}
		// SELECT CHASSIS (NO MODEL OR ENGINE OPTIONS) - THERE ARE OPTIONS FOR BOX 2, LIKE COUPE OR CABRIOLET
		else if (SelectorBoxOptions["CHASSIS"] == true && SelectorBoxOptions["ENGINE"] != true)
			{
			 
			 if (!bodyTest.test(document.getElementById('WindowShadeSubTable1').innerHTML)) 
			   {
			    AddTableTitle(1,'Please choose a body style:');
			   
			    for (i=0;i<TempBoxArray2.length;i++)
				  {
				  AddTableRow(1,TempBoxArray2_SVSVSI[i],TempBoxArray2[i],'CHASSIS'); // ADD THE VALUE OF THE SELECTED MODEL (example, #1249) AS THE VALUE FOR THE TABLE
				  }
				}
			}
		// NO NEED TO CHOOSE MODEL - ONLY CHASSIS AND ENGINE OPTIONS AVAILABLE - SEE TEST DATA FOR 2007 S4	
		else if (SelectorBoxOptions["ENGINE"] == true && SelectorBoxOptions["CHASSIS"] == true)
			{
			if (!bodyTest.test(document.getElementById('WindowShadeSubTable1').innerHTML))
			   {
			    AddTableTitle(1,'Please choose a body style:');
			 
			    for (i=0;i<TempBoxArray2.length;i++)
				  {
				  AddTableRow(1,TempBoxArray2[i],TempBoxArray2[i],'CHASSIS'); // ADD THE VALUE OF THE SELECTED MODEL (example, #1249) AS THE VALUE FOR THE TABLE
				  }
			   }
			}
		// SELECT ENGINE (NO MODEL OR CHASSIS OPTIONS)
		else if (SelectorBoxOptions["ENGINE"] == true && SelectorBoxOptions["CHASSIS"] != true) // THERE ARE OPTIONS FOR BOX 2, LIKE COUPE OR CABRIOLET
			{
			if (engineTitleAdded == false)
			  {
			  AddTableTitle(1,'Please choose an engine:');
			  engineTitleAdded = true;
			
			  for (i=0;i<TempBoxArray3.length;i++)
		        {
			    AddTableTitle(2,'Please choose a body style:');
		        AddTableRow(1,TempBoxArray3_SVSVSI[i],'<b>' + string_array[TempBoxArray3[i]] + '</b>');
			    }
				if (ON_OFF == "ON") 
				  {
			      AddTableRow(1,'NOT SURE','<b>Not sure</b>');
				  }
			  }
			}
		// ONLY ONE OPTION AVAILABLE, LIKE 2003 AUDI S6
		else 
			{
			//alert('No selectable options available, skipping directly to catalog');
			SetCookiesAndShowCatalog(CurrentSelectedCar,'','');
			return true;
			}

		WindowShadeSubTableTemp[1] = document.getElementById('WindowShadeSubTable1').innerHTML; // STORE A COPY OF THE HTML IN CASE WE NEED TO ROLL DOWN THE SHADE AGAIN
		FadeOutCounter = 1;
		myTimer = setInterval("FadeOutModelImages()",35); // SWAP OUT MODEL IMAGES, EXPAND BLUE OUTLINE DIV AND SHOW BOX 1
		ChooseDetailsExpanded = true;
		}
	}

////////////////////////////////////	
// ADDS THE TITLE TO THE FIRST ROW OF THE SELECTED TABLE. value = THE TEXT TO BE USED	
function AddTableTitle(myTableCounter,value)	
	{
	var table = document.getElementById('WindowShadeSubTable' + myTableCounter);
	var rowCount = table.rows.length;

	var row = table.insertRow(rowCount);
		row.style.backgroundColor = '#eedda8';
		row.setAttribute('height','25px');
			var cell = row.insertCell(0); // Please choose a body style:
			cell.innerHTML = '<span style="font-size:12px;font-weight:bold">&nbsp;'  + value + '&nbsp;</span>';
				cell.setAttribute('valign','middle');
				cell.setAttribute('colSpan','4');
				cell.setAttribute('nowrap','true');
	var CurrentRowBGCOLOR = '#f4efd2';
	}
	
////////////////////////////////////	
// ADD DETAIL ROW TO THE SELECTED TABLE.  RadioValue IS THE VALUE FOR THE RADIO BUTTON, text IS THE TEXT TO BE DISPLAYED
function AddTableRow(myTableCounter,RadioValue,text,TableType) 
	{
	var table = document.getElementById('WindowShadeSubTable' + myTableCounter);
	var rowCount = table.rows.length;
	if (CurrentRowBGCOLOR == '#faf8eb'){CurrentRowBGCOLOR = '#f4efd2'}	// ROUTINE TO ALTERNATE ROW COLOR
	else {CurrentRowBGCOLOR = '#faf8eb'}
	idCounter++;
	var innerhtml;
	var row = table.insertRow(rowCount);
		row.style.backgroundColor = CurrentRowBGCOLOR;
		row.setAttribute('class','side_menu3');
		row.setAttribute('valign','middle');		
		row.setAttribute('align','center');
		row.setAttribute('id','side_menu_id' + idCounter);
		if (TableType == 'CHASSIS')	// IF TABLE IS #2, THEN POPULATE WITH THE INFO / IMAGES FOR SEDAN, COUPE, ETC
			{
			if (text == 'Sedan')
				{
				var text 		= '4-Door Sedan';
				var image 		= 'icon_sedan2';
				}
			if (text == 'Coupe')
				{
				var text 		= '2-Door Coupe';
				var image 		= 'icon_coupe2';
				}
			if (text == 'Convertible')
				{
				var text 		= 'Convertible';
				var image 		= 'icon_convertible2';
				}
			if (text == 'Wagon')
				{
				var text 		= 'Wagon';
				var image 		= 'icon_wagon2';
				}
			 
			innerhtml =      '<td id="ChooseTD' + myTableCounter + '_' + rowCount + 'A" align="center" width="25" onClick="RollUpWindow(' +
			                 rowCount + ',' + myTableCounter + '); return false;">' +
							 '<input ' + ' id="ChooseBody' + myTableCounter + '_' + rowCount + 'A" type="radio" value="' + RadioValue + '" unchecked name="Radio' 
							 + myTableCounter + '"></td>' +
			                
							 '<td id="ChooseTD' + myTableCounter + '_' + rowCount + 'B" align="left" width="133" onClick="RollUpWindow(' +
			                 rowCount + ',' + myTableCounter + ');">' +
							 '<a ' + ' id="ChooseBody' + myTableCounter + '_' + rowCount + 'B" class="side_menu3" style="cursor:pointer"><b>' + text + '</a>'
			                 + '</td>' +
							
							 '<td id="ChooseTD' + myTableCounter + '_' + rowCount + 'C" align="center" width="91" onClick="RollUpWindow(' +
			                 rowCount + ',' + myTableCounter + '); return false;">' +
							 '<a ' + ' style="cursor:pointer"><img id="ChooseBody' + myTableCounter + '_' + rowCount + 
							 'C" border="0" src="http://www.pelicanparts.com/SuperCat/icons/'
							 + image + '.gif" width="51" height="19"></a>'
			                 + '</td>' +
							
							 '<td id="ChooseTD' + myTableCounter + '_' + rowCount + 'D" width="1" onClick="RollUpWindow(' +
			                 rowCount + ',' + myTableCounter + '); return false;">' +
							 '<img ' + ' id="ChooseBody' + myTableCounter + '_' + rowCount + 
							 'D" border="0" src="http://www.pelicanparts.com/graphics/transparent.gif" width="1" height="30">'
			                 + '</td>';
			}
		else
			{
			innerhtml =      '<td id="ChooseTD' + myTableCounter + '_' + rowCount + 'A" align="center" width="25" onClick="RollUpWindow(' +
			                 rowCount + ',' + myTableCounter + '); return false;">' +
							 '<input ' + ' id="ChooseBody' + myTableCounter + '_' + rowCount + 'A" type="radio" value="' + RadioValue + '" unchecked name="Radio' 
							 + myTableCounter + '"></td>' +
			                 
							 '<td id="ChooseTD' + myTableCounter + '_' + rowCount + 'B" align="left" width="223" onClick="RollUpWindow(' +
			                 rowCount + ',' + myTableCounter + '); return false;">' +
							 '<a ' + ' id="ChooseBody' + myTableCounter + '_' + rowCount + 'B" class="side_menu3" style="cursor:pointer">' + text + '</a>'
			                 + '</td>' +
							 
							 '<td id="ChooseTD' + myTableCounter + '_' + rowCount + 'C" width="1" onClick="RollUpWindow(' +
			                 rowCount + ',' + myTableCounter + '); return false;">' +
							 '<span id="ChooseBody' + myTableCounter + '_' + rowCount + 'C" ' + '> </span>  '
			                 + '</td>' +
							 
							 '<td id="ChooseTD' + myTableCounter + '_' + rowCount + 'D" width="1" onClick="RollUpWindow(' +
			                 rowCount + ',' + myTableCounter + '); return false;">' +
							 '<img ' + ' id="ChooseBody' + myTableCounter + '_' + rowCount + 
							 'D" border="0" src="http://www.pelicanparts.com/graphics/transparent.gif" width="1" height="30">'
			                 + '</td>';
			}
		$('#side_menu_id' + idCounter).html(innerhtml); 
		}
		

////////////////////////////////////		
// ADD DETAIL ROW TO THE SELECTED TABLE.  RadioValue IS THE VALUE FOR THE RADIO BUTTON, text IS THE TEXT TO BE DISPLAYED	
function RollDownWindow(SelectedTable)	// ROUTINE THAT WILL RE-OPEN AND ROLL DOWN THE WINDOW TO ALLOW FOR CHANGES TO THE SELECTION
	{
	   if (fading == true)
	     {
		 return;
		 }
	   FadeOutCounter = 1;
	   fading = true;
	   myTimer = setInterval("FadeInRollDownWindow(" + CurrentSelectedRadioRow[SelectedTable] + "," + SelectedTable + ")",35);
	}
	
////////////////////////////////////
// FADE IN THE ROLLDOWN WINDOW FOR THE SELECTED TABLE, WHEN WE ARE RE-OPENING IT TO SELECT DETAIL AGAIN
// CALLED VIA INTERVAL TIMER
function FadeInRollDownWindow(SelectedRow,SelectedTable)
	{
	var rowCount = document.getElementById('WindowShadeSubTable' + SelectedTable).rows.length;
  
	FinalHeight = 30;
	for (i=1;i<rowCount;i++)
			{		
			if (i != SelectedRow)
				{
				//document.getElementById('ChooseBody' + SelectedTable + '_' + i + 'D').height = parseInt((FinalHeight*FadeOutCounter/10));		
				document.getElementById('ChooseTD' + SelectedTable + '_' + i + 'A').style.opacity = 100;
			    document.getElementById('ChooseTD' + SelectedTable + '_' + i + 'A').style.filter = 'alpha(opacity = 100)';
			    document.getElementById('ChooseTD' + SelectedTable + '_' + i + 'B').style.opacity = 100;
			    document.getElementById('ChooseTD' + SelectedTable + '_' + i + 'B').style.filter = 'alpha(opacity = 100)';
			    document.getElementById('ChooseTD' + SelectedTable + '_' + i + 'C').style.opacity = 100;
			    document.getElementById('ChooseTD' + SelectedTable + '_' + i + 'C').style.filter = 'alpha(opacity = 100)';
				}
			}
	FadeOutCounter++;
	if (FadeOutCounter > 10)
		{
		clearInterval(myTimer);
		FadeOutCounter = 1;
		myTimer = setInterval("UncompressRollUpWindow(" + SelectedRow + "," + SelectedTable + ")",35);
		}
	  	
	}

function FadeInModelImages()
   {
       for (i=0;i<image_counter;i++) // FADE IN THE MODEL IMAGES, EXCEPT FOR THE ONE SELECTED
		{
		   if (i != CurrentImageSelected)
			{
			   document.getElementById('image' + i).style.opacity = 100;
			   document.getElementById('image' + i).style.filter = 'alpha(opacity = 100)';
			   document.getElementById('lowerTD' + i).style.opacity = 100;
			   document.getElementById('lowerTD' + i).style.filter = 'alpha(opacity = 100)';
			}
		}
	    document.getElementById('ReturnToChooseYearTable').style.opacity = 100;
	    document.getElementById('ReturnToChooseYearTable').style.filter = 'alpha(opacity = 100)'; 
   
   }	

function scrollWindow(endPos) 
  {
    scrollPosition = scrollPosition + 10;
	window.scrollTo(scrollPosition, scrollPosition);
    if (scrollPosition > endPos)
	   {
	   clearInterval(scrollTimer);
	   }
  }
////////////////////////////////////
// THIS ROUTINE FADES OUT THE MODEL IMAGES, AND EXPANDS THE BLUE OUTLINE BOX
// CALLED VIA INTERVAL TIMER
function FadeOutModelImages()
	{
	ChooseDetailsWidth  = document.getElementById('ChooseDetailsTable').offsetWidth;
	ChooseDetailsHeight = document.getElementById('ChooseDetailsTable').offsetHeight;

	for (i=0;i<image_counter;i++) // FADE THE MODEL IMAGES, EXCEPT FOR THE ONE SELECTED
		{
		if (i != CurrentImageSelected)
			{
			var newOpVal = 1 - FadeOutCounter/16;
			document.getElementById('image' + i).style.opacity = newOpVal;
			document.getElementById('image' + i).style.filter = 'alpha(opacity = ' + (newOpVal*100) + ')';
			document.getElementById('lowerTD' + i).style.opacity = newOpVal;
			document.getElementById('lowerTD' + i).style.filter = 'alpha(opacity = ' + (newOpVal*100) + ')';
			}
		}
	document.getElementById('ReturnToChooseYearTable').style.opacity = newOpVal;
	document.getElementById('ReturnToChooseYearTable').style.filter = 'alpha(opacity = ' + (newOpVal*100) + ')';
	
	// THESE ROUTINES CONTROL THE EXPANSION OF THE BLUE OUTLINE BOX
	var deltaX = ((ChooseDetailsWidth  - parseInt(document.getElementById('SelectorDivTable2').style.width)))  * FadeOutCounter/10;
	var deltaY = ((ChooseDetailsHeight - parseInt(document.getElementById('SelectorDivTable2').style.height))) * FadeOutCounter/10;
	var OldWidth  = document.getElementById('SelectorDiv2').offsetWidth;
	var OldHeight = document.getElementById('SelectorDiv2').offsetHeight;
	
	document.getElementById('SelectorDivTable2').style.width  = parseInt(document.getElementById('SelectorDivTable2').style.width)  + deltaX;
	document.getElementById('SelectorDivTable2').style.height = parseInt(document.getElementById('SelectorDivTable2').style.height) + deltaY;
	// SelectorDiv2 IS WHAT DICTATES THE SIZE OF THE BLUE BOX EXPANDING, WHICH IS DRIVEN BY SelectorDivTable2
	var NewWidth  = document.getElementById('SelectorDiv2').offsetWidth;
	var NewHeight = document.getElementById('SelectorDiv2').offsetHeight;
	
	if (OpenDirection == 'left')
		{document.getElementById('SelectorDiv2').style.left = findPosX(document.getElementById('SelectorDiv2')) - (NewWidth - OldWidth);}
	if (OpenVertical == 'up')
		{document.getElementById('SelectorDiv2').style.top = findPosY(document.getElementById('SelectorDiv2')) - (NewHeight - OldHeight);}
    //var MainDivPos = findPosY(document.getElementById('MainSelectionTableDiv'));
	//var SelectorPos = findPosY(document.getElementById('SelectorDivTable2'));
	
	var MainDivPos = parseInt(document.getElementById('ModelDiv').style.top);
	var SelectorPos = parseInt(document.getElementById('SelectorDivTable2').style.height);
	var FW = findPosY(document.getElementById('FloaterWindowTableA'));
	var pos = findPosY(document.getElementById('SelectorDivTable2'));
	if (((MainDivPos-SelectorPos) < 250) && (OpenVertical != 'up'))
	   {
	   scrollPosition = 20;
	   }
	FadeOutCounter++;
	if (FadeOutCounter > 10)
		{ 
		clearInterval(myTimer);
		document.getElementById('ChooseDetailsSelector').style.opacity = 0;
		document.getElementById('ChooseDetailsSelector').style.filter = 'alpha(opacity = 0)';
		origSelectorDiv2 = document.getElementById('SelectorDiv2').innerHTML;
		document.getElementById('SelectorDiv2').innerHTML = document.getElementById('ChooseDetails').innerHTML; // ALREADY POPULATED BY FUNCTION ChooseDetails
		document.getElementById('ChooseDetailsSelector').style.backgroundColor = '#FFFFFF';
		
		document.getElementById('WindowShadeTable2').style.opacity = 0; // SET BOX NUMBER TWO TO BE TRANSPARENT AT INITIAL FADE IN
		document.getElementById('WindowShadeTable2').style.filter = 'alpha(opacity = 0)';
		document.getElementById('WindowShadeTable2').FadeState = -2;

		document.getElementById('WindowShadeTable3').style.opacity = 0; // SET BOX NUMBER TWO TO BE TRANSPARENT AT INITIAL FADE IN
		document.getElementById('WindowShadeTable3').style.filter = 'alpha(opacity = 0)';
		document.getElementById('WindowShadeTable3').FadeState = -2;

		document.getElementById('WhiteSpace').style.opacity = 0; // SET BOX NUMBER TWO TO BE TRANSPARENT AT INITIAL FADE IN
		document.getElementById('WhiteSpace').style.filter = 'alpha(opacity = 0)';
		document.getElementById('WhiteSpace').FadeState = -2;
		if (scrollPosition != 0)
		  {
		  //goToByScroll('SelectorDiv2','slow');
		  }
		fade('ChooseDetailsSelector',''); // FADE IN THE SELECTOR DIV
		fade('WhiteSpace',''); // FADE IN THE SELECTOR DIV
		}	
	}
	
function fadein (eid)
  {
  document.getElementById(eid).style.opacity = 0; // SET BOX NUMBER TWO TO BE TRANSPARENT AT INITIAL FADE IN
  document.getElementById(eid).style.filter = 'alpha(opacity = 0)';
  document.getElementById(eid).FadeState = -2;
  fade(eid,''); // FADE IN eid 
  }
  
function fadeout (eid)
{
  document.getElementById(eid).style.opacity = 0; // SET BOX NUMBER TWO TO BE TRANSPARENT AT INITIAL FADE IN
  document.getElementById(eid).style.filter = 'alpha(opacity = 0)';
  document.getElementById(eid).FadeState = 1;		
  fade(eid,''); // FADE OUT eid 
  }
  
function goToByScroll(id, speed){
   $('html,body').animate({scrollTop: $("#"+id).offset().top},speed);
}

function scrollToTop(speed) {
   $('body,html').animate({
				scrollTop: 0
			}, speed);
}

function findHeight() {
  var myWidth = 0, myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
  }
 return myHeight;
}
////////////////////////////////////
// THIS FUNCTION IS CALLED WHEN A SELECTION IS MADE
function RollUpWindow(SelectedRow,SelectedTable)
	{	
	if (fading == true) 
	  {
	   return;
	  }
	var windowHeight = findHeight();
	if ((scrollPosition != 0) && (windowHeight < 500))
	  {
	  goToByScroll('SelectorDiv2', 'fast');
	  } 
	fading = true;
    if (CurrentSelectedRadioRow[SelectedTable] != SelectedRow)
	    {
	    document.getElementById('ChooseBody' + SelectedTable + '_' + SelectedRow + 'A').checked = true; // SET CURRENT RADIO BUTTON
	    CurrentSelectedRadioRowValue[SelectedTable] = document.getElementById('ChooseBody' + SelectedTable + '_' + SelectedRow + 'A').value;
	    FadeOutCounter = 1;
        CurrentSelectedRadioRow[SelectedTable] = SelectedRow; // SET GLOBAL VARIABLE RECORDING WHICH RADIO BUTTON IS CLICKED
	    myTimer = setInterval("FadeOutRollUpWindow(" + SelectedRow + "," + SelectedTable + ")",35);
	    }	
	else
	    {
		CurrentSelectedRadioRow[SelectedTable] = SelectedRow;
		fading = false;
		RollDownWindow(SelectedTable);
		if ((SelectedTable == 1) || (SelectedTable == 2)) 
		  {
	      tableHidden = SelectedTable + 1;
		  }		
		CurrentSelectedRadioRowValue[SelectedTable] = document.getElementById('ChooseBody' + SelectedTable + '_' + SelectedRow + 'A').value;
		CurrentSelectedRadioRow[SelectedTable] = 0;
		document.getElementById('ChooseBody' + SelectedTable + '_' + SelectedRow + 'A').checked = false;	
		fadeout('WindowShadeTable' + tableHidden); 
		if (tableHidden == 3)
		  {
		    windowShade3expanded = false;
		  }
		if (SelectedTable == 2)
		  {
		   if (windowShade3expanded == true)
		    {
			deleteTable('WindowShadeSubTable3');
			}
		  }
		if (SelectedTable == 1)
		 {
		  if (windowShade3expanded == true)
		    {
			fadeout('WindowShadeTable3');
			windowShade3expanded = false;
			WindowShadeSubTableTemp[2] = document.getElementById('WindowShadeSubTable2').innerHTML; 
			WindowShadeSubTableTemp[3] = document.getElementById('WindowShadeSubTable3').innerHTML;
			deleteTable('WindowShadeSubTable3');
			}
		  deleteTable('WindowShadeSubTable2');
		  CurrentSelectedRadioRow[2] = 0;
		  }
		}
	}
////////////////////////////////////
// SELECTION IS MADE, THIS IS THE ROUTINE THAT FADES AND THEN CALLS THE NEXT FUNCTION TO ROLL UP THE WINDOWSHADE
// CALLED VIA INTERVAL TIMER
function FadeOutRollUpWindow(SelectedRow, SelectedTable)	
	{
	var rowCount = document.getElementById('WindowShadeSubTable' + SelectedTable).rows.length;
	// CHANGE ROW COLORS FIRST HERE
	for (i=1;i<rowCount;i++)
		{
		if (i != parseInt(SelectedRow) && i/2 - parseInt(i/2) != 0) // CHANGE ROW FROM LIGHT TO DARK, UNLESS SELECTED ROW
			{
			document.getElementById('ChooseTD' + SelectedTable + '_' + i + 'A').style.backgroundColor = get_hex_color(250 - parseInt(FadeOutCounter/2),248-FadeOutCounter,parseInt(235-FadeOutCounter*2.5));
			document.getElementById('ChooseTD' + SelectedTable + '_' + i + 'B').style.backgroundColor = get_hex_color(250 - parseInt(FadeOutCounter/2),248-FadeOutCounter,parseInt(235-FadeOutCounter*2.5));
			document.getElementById('ChooseTD' + SelectedTable + '_' + i + 'C').style.backgroundColor = get_hex_color(250 - parseInt(FadeOutCounter/2),248-FadeOutCounter,parseInt(235-FadeOutCounter*2.5));
			}
		if (i == parseInt(SelectedRow) && i/2 - parseInt(i/2) == 0)// TURN SELECTED ROW TO LIGHT IF IT'S ALREADY DARK
			{
			document.getElementById('ChooseTD' + SelectedTable + '_' + i + 'A').style.backgroundColor = get_hex_color(244 + parseInt(FadeOutCounter/2),239+FadeOutCounter,parseInt(210+FadeOutCounter*2.5));
			document.getElementById('ChooseTD' + SelectedTable + '_' + i + 'B').style.backgroundColor = get_hex_color(244 + parseInt(FadeOutCounter/2),239+FadeOutCounter,parseInt(210+FadeOutCounter*2.5));
			document.getElementById('ChooseTD' + SelectedTable + '_' + i + 'C').style.backgroundColor = get_hex_color(244 + parseInt(FadeOutCounter/2),239+FadeOutCounter,parseInt(210+FadeOutCounter*2.5));
			}
		}
	document.getElementById('ChooseBody' + SelectedTable + '_' + SelectedRow + 'A').checked = true;
	// FADE OUT NON-SELECTED ROWS HERE	
	/**
	for (i=1;i<rowCount;i++)
		{
		if (i != parseInt(SelectedRow))
			{
			var newOpVal = 1 - FadeOutCounter/10;
			document.getElementById('ChooseTD' + SelectedTable + '_' + i + 'A').style.opacity = newOpVal;
			document.getElementById('ChooseTD' + SelectedTable + '_' + i + 'A').style.filter = 'alpha(opacity = ' + (newOpVal*100) + ')';
			document.getElementById('ChooseTD' + SelectedTable + '_' + i + 'B').style.opacity = newOpVal;
			document.getElementById('ChooseTD' + SelectedTable + '_' + i + 'B').style.filter = 'alpha(opacity = ' + (newOpVal*100) + ')';
			document.getElementById('ChooseTD' + SelectedTable + '_' + i + 'C').style.opacity = newOpVal;
			document.getElementById('ChooseTD' + SelectedTable + '_' + i + 'C').style.filter = 'alpha(opacity = ' + (newOpVal*100) + ')';
			}
		}
	**/
	FadeOutCounter++;
	if (FadeOutCounter > 10) // ROW COLORS HAVE BEEN CHANGED, NOW WIND UP THE WINDOWSHADE
		{
		document.getElementById('ChooseBody' + SelectedTable + '_' + SelectedRow + 'A').checked = true;
		clearInterval(myTimer);
		FadeOutCounter = 1;
		myTimer = setInterval("CompressRollUpWindow(" + SelectedRow + "," + SelectedTable + ")",35);
		for (i=1;i<rowCount;i++)
			{
			if (i != parseInt(SelectedRow)) // THESE ROWS SHOULD NOW HAVE OPACITY SET TO ZERO, TIME TO WIPE THEM OUT SO THAT WE CAN COMPRESS THEM
				{
				document.getElementById('ChooseTD' + SelectedTable + '_' + i + 'A').innerHTML = '';
				document.getElementById('ChooseTD' + SelectedTable + '_' + i + 'B').innerHTML = '';
				document.getElementById('ChooseTD' + SelectedTable + '_' + i + 'C').innerHTML = '';
				}
			}
		}
	}
	
function UncompressRollUpWindow(SelectedRow, SelectedTable)
  {
  var rowCount = document.getElementById('WindowShadeSubTable' + SelectedTable).rows.length;
  
  for (i=1;i<rowCount;i++)
	{
	if (i != parseInt(SelectedRow))
		{
		 var ht = heightArray.pop();
		
		 if ((prev == 0) || (ht >= prev))
		   {
		   prev = ht;
		   document.getElementById('ChooseBody' + SelectedTable + '_' + i + 'D').height = ht;
		   }
		}
	}
	FadeOutCounter++;

	if (FadeOutCounter > 10)
		{
		 prev = 0;
         clearInterval(myTimer);	
		 $('#WindowShadeSubTable' + SelectedTable).html(WindowShadeSubTableTemp[SelectedTable]); // COPY THE ORIGINAL HTML BACK
		 fading = false;
		}
  }
////////////////////////////////////
// SQUISHES THE ROLLUP WINDOW AND ROLLS IT UP
// CALLED VIA INTERVAL TIMER
function CompressRollUpWindow(SelectedRow, SelectedTable)
	{
	var rowCount = document.getElementById('WindowShadeSubTable' + SelectedTable).rows.length;
	for (i=1;i<rowCount;i++)
		{
		if (i != parseInt(SelectedRow))
			{
			 var ht = document.getElementById('ChooseBody' + SelectedTable + '_' + i + 'D').height;
			 heightArray.push(parseInt(ht));
			document.getElementById('ChooseBody' + SelectedTable + '_' + i + 'D').height 
			                  = parseInt((document.getElementById('ChooseBody' + SelectedTable + '_' + i + 'D').height)*3/4);
			}
		}
	FadeOutCounter++;

	if (FadeOutCounter > 10)
		{
		clearInterval(myTimer);
		var TempBoxArray = new Array();		// TEMP VARIABLE FOR STORING OPTIONS
		var TempCarArray = new Array(); 	// STORE THE ACTUAL SVSVSI VALUES HERE SO THAT WE CAN JUST POP RIGHT TO THE PROPER CATALOG
	    
		fading = false;
		// CHECK TO SEE IF WE'RE ALL DONE NOW AND CAN MOVE ONTO THE CATALOG
		if (
			// ONLY HAD TO SELECT THE CHASSIS, EXAMPLE 2008 AUDI S4
			(SelectedTable == 1 && SelectorBoxOptions["MODEL"] != true && SelectorBoxOptions["CHASSIS"] == true && SelectorBoxOptions["ENGINE"]  != true) ||
			// ONLY HAD TO SELECT THE ENGINE,  EXAMPLE 2005 AUDI A6 QUATTRO			
			(SelectedTable == 1 && SelectorBoxOptions["MODEL"] != true && SelectorBoxOptions["ENGINE"]  == true && SelectorBoxOptions["CHASSIS"] != true) ||
			// ONLY HAD TO SELECT THE MODEL,   EXAMPLE 2003 AUDI A8 QUATTRO
			(SelectedTable == 1 && SelectorBoxOptions["MODEL"] == true && SelectorBoxOptions["ENGINE"]  != true && SelectorBoxOptions["CHASSIS"] != true) ||
			// ONLY HAD TO SELECT MODEL AND CHASSIS - ALL ENGINE OPTIONS ARE THE SAME, EXAMPLE 2001 AUDI TT
			(SelectedTable == 2 && SelectorBoxOptions["MODEL"] == true && SelectorBoxOptions["CHASSIS"] == true && SelectorBoxOptions["ENGINE"]  != true) ||
			// ONLY HAD TO SELECT MODEL AND ENGINE - ALL CHASSIS OPTIONS ARE THE SAME, EXAMPLE 2006 AUDI QUATTRO L
			(SelectedTable == 2 && SelectorBoxOptions["MODEL"] == true && SelectorBoxOptions["CHASSIS"] != true && SelectorBoxOptions["ENGINE"]  == true) ||
			// ONLY CHASSIS AND ENGINE OPTIONS AVAILABLE - SEE TEST DATA FOR 2007 S4
			(SelectedTable == 2 && SelectorBoxOptions["MODEL"] != true && SelectorBoxOptions["CHASSIS"] == true && SelectorBoxOptions["ENGINE"]  == true)	 
		   )
			{
			SetCookiesAndShowCatalog(CurrentSelectedRadioRowValue[SelectedTable],'','');
			return true;
			}
		// THIS IS WHERE WE ADD THE OPTIONS TO TABLE 2 (BODY STYLE)	- FOR CARS WITH THREE OPTIONS
		else if (SelectedTable == 1 && SelectorBoxOptions["CHASSIS"] == true) 
			{
			// DELETE ALL ROWS IN THE TABLE
			for(var i = document.getElementById('WindowShadeSubTable2').rows.length - 1; i > 0; i--)
				{document.getElementById('WindowShadeSubTable2').deleteRow(i);}			
			for (i=0;i<car_array.length;i=i+11)	// CYCLE THROUGH AND LIST ALL OPTIONS, FILTERING FURTHER
				{
				if (car_array[i+8] == SelectedModelsArray[CurrentImageSelected] && car_array[i+1] == SelectedYear.substr(2,2) && car_array[i+2] == CurrentSelectedRadioRowValue[1])
					{
					if (!(string_array[car_array[i+5]] in oc(TempBoxArray)))
						{
						TempBoxArray.push(string_array[car_array[i+5]]);
						TempCarArray.push(car_array[i]);
						}
					}
				}
			// AFTER CHOOSING THE MODEL, NO MORE CHOICES AVAILABLE, SO FAST FORWARD DIRECTLY TO THE CATALOG
			if (TempBoxArray.length == 1)
				{
				SetCookiesAndShowCatalog(TempCarArray[0],'','');
				return true;
				}
			if (TempBoxArray.length > 0)
				{	
				if (!bodyTest.test(document.getElementById('WindowShadeSubTable2').innerHTML))
				  {
				   AddTableTitle(2,'Please choose a body style:');
				  }
				
				for (i=0;i<TempBoxArray.length;i++)	// CYCLE THROUGH EACH FOUND OPTION
			     {
					// ONLY HAVE TO SELECT MODEL AND CHASSIS - ALL ENGINE OPTIONS ARE THE SAME, EXAMPLE 2001 AUDI TT - PASS SVSVSI IN THE VALUE OF THE RADIO SELECTOR
					   if (SelectorBoxOptions["MODEL"] == true && SelectorBoxOptions["CHASSIS"] == true && SelectorBoxOptions["ENGINE"]  != true)
						  {
						    AddTableRow(2,TempCarArray[i],TempBoxArray[i],'CHASSIS');
						  }
					   // TYPICAL 3-CHOICE OPTION HERE	
					   else
						  {
						    AddTableRow(2,TempBoxArray[i],TempBoxArray[i],'CHASSIS');
						  }
				  }
				
				}
				
			    WindowShadeSubTableTemp[2] = document.getElementById('WindowShadeSubTable2').innerHTML; // STORE A COPY OF THE HTML IN CASE WE NEED TO ROLL DOWN THE SHADE AGAIN
				fadein('WindowShadeTable2');
			}
		// THIS IS WHERE WE ADD THE OPTIONS TO TABLE 3 (ENGINE / SIZE)
		else if (
				 (SelectedTable == 2) ||
				 // ONLY ONE BODY TYPE AVAILABLE EXAMPLE 2006 AUDI A8 QUATTRO, SO DISPLAY ENGINE OPTIONS INSTEAD OF BODY STYLE OPTIONS
				 (SelectedTable == 1 && SelectorBoxOptions["MODEL"] == true && SelectorBoxOptions["CHASSIS"] != true && SelectorBoxOptions["ENGINE"]  == true) ||
				 // NO NEED TO CHOOSE MODEL - ONLY CHASSIS AND ENGINE OPTIONS AVAILABLE - SEE TEST DATA FOR 2007 S4
				 (SelectedTable == 1 && SelectorBoxOptions["MODEL"] != true && SelectorBoxOptions["CHASSIS"] == true && SelectorBoxOptions["ENGINE"]  == true)
 				)
			{
			// CLEAR OUT TABLE
			for(var i = document.getElementById('WindowShadeSubTable3').rows.length - 1; i > 0; i--)
				{document.getElementById('WindowShadeSubTable3').deleteRow(i);}			
			for (i=0;i<car_array.length;i=i+11)	// CYCLE THROUGH AND LIST ALL OPTIONS, FILTERING FURTHER
				{
				if (
					// TYPICAL - CHECK FOR THREE OPTION HERE
					(SelectedTable == 2 && car_array[i+8] == SelectedModelsArray[CurrentImageSelected] && car_array[i+1] == SelectedYear.substr(2,2) && car_array[i+2] == CurrentSelectedRadioRowValue[1] && string_array[car_array[i+5]] == CurrentSelectedRadioRowValue[2]) ||
					// CHECK FOR ONLY ONE BODY TYPE AVAILABLE (WHERE WE SKIPPED THE BODY TYPE SELECTION) - EXAMPLE, 2006 AUDI A8 QUATTRO L
					(SelectedTable == 1 && car_array[i+8] == SelectedModelsArray[CurrentImageSelected] && car_array[i+1] == SelectedYear.substr(2,2) && car_array[i+2] == CurrentSelectedRadioRowValue[1]) ||
				    // CHECK FOR ONLY CHASSIS AND ENGINE OPTIONS AVAILABLE - SEE TEST DATA FOR 2007 S4
					(SelectedTable == 1 && car_array[i+8] == SelectedModelsArray[CurrentImageSelected] && car_array[i+1] == SelectedYear.substr(2,2) && string_array[car_array[i+5]] == CurrentSelectedRadioRowValue[1])
				   )	
					{
					if (!(car_array[i+6] in oc(TempBoxArray)))
						{
						TempBoxArray.push(car_array[i+6]);
						TempCarArray.push(car_array[i]);
						}
					}
				}

			// FOUND ONLY ONE ENGINE OPTION ALTHOUGH OTHERS ARE AVAILABLE WITH OTHER MODELS / CHASSIS STYLES -> SEND DIRECT TO CATALOG.  EXAMPLE 2000 AUDI A6 WAGON
			if (TempBoxArray.length == 1)
				{
				SetCookiesAndShowCatalog(TempCarArray[0],'','');
				return true;
				}

			var TempNextTable = 3;
			if (SelectedTable == 1){TempNextTable = 2} // FOR THE OPTION WHERE CHOOSING THE CHASSIS WAS SKIPPED, THEN USE TABLE 2 INSTEAD OF TABLE 3 - EXAMPLE, 2006 AUDI A8 QUATTRO L
			if (TempBoxArray.length > 0)
				{
				if (engineTitleAdded == false) {
				   AddTableTitle(TempNextTable,'Please choose an engine:');
				   engineTitleAdded = true;
				}
				for (i=0;i<TempBoxArray.length;i++)	// CYCLE THROUGH EACH FOUND OPTION
					{
					AddTableRow(TempNextTable,TempCarArray[i],'<b>' + string_array[TempBoxArray[i]] + '</b>');
					}
				if (ON_OFF == "ON") 
				    {	
				    AddTableRow(TempNextTable,'NOT SURE','<b>Not sure</b>');
					}
				}
			
			    WindowShadeSubTableTemp[TempNextTable] = document.getElementById('WindowShadeSubTable' + TempNextTable).innerHTML; // STORE A COPY OF THE HTML IN CASE WE NEED TO ROLL DOWN THE SHADE AGAIN
				fadein('WindowShadeTable' + TempNextTable);
				windowShade3expanded = true;
			//  }
			}
		// ALL DONE SELECTING OPTIONS, NOW MOVE ONTO THE CATALOG	
		else if (SelectedTable == 3) 
			{
			SetCookiesAndShowCatalog(CurrentSelectedRadioRowValue[3],'','');
			return true;
			}				   
		}
	}
////////////////////////////////////		
// THIS FUNCTION SETS THE COOKIES FOR THE PULLDOWN MENU AND THEN SENDS THE USER TO THE CATALOG
function SetCookiesAndShowCatalog (ModelId, desc, Image)
	{
	newPage = true;
	// LOOP THROUGH THE DATA, FIND THE TEXT DATA AGAIN, AND THEN CREATE THE TEXT THAT IS STORED IN THE COOKIES
	var temp = 0;
	var myImg;
	
	if (Image)
	  {
	  myImg = Image;
	  }
	else
	  {
	  for (i=0;i<car_array.length;i=i+11)
		{
		if (car_array[i] == ModelId) // FOUND IT!
			{
			temp = i;
			i = car_array.length;
			myImg = string_array[car_array[temp+8]];
			break;
			}
		}
	  }
	var myCookieDesc;
    if (desc)
	  {
	  myCookieDesc = desc;
	  }
	else
	  {
	  myCookieDesc = SelectedYear + ' ' + Make + ' ' + string_array[car_array[temp+2]] + ' ' + string_array[car_array[temp+5]];
	  }
	myCookieDesc = myCookieDesc.replace('<b>','');
    myCookieDesc = myCookieDesc.replace('</b>','');
	var RecentModelId 	= new Array();
	var RecentModelDesc	= new Array();
	var RecentModelImg	= new Array();

	for (i=1;i<6;i++) // READ THE COOKIE VALUES INTO AN ARRAY FIRST, AND THEN MOVE THEM DOWN LATER ON IN THE NEXT LOOP
		{
		RecentModelId[i] 	= readCookie('RecentModelId_' + i);
		RecentModelDesc[i]	= readCookie('RecentModelDesc_' + i);
		RecentModelImg[i]	= readCookie('RecentModelImg_' + i);
		}

	var tempcounter = 2;
	for (i=1;i<6;i++)
		{
		if (RecentModelId[i] != ModelId && RecentModelId[i] != '' && RecentModelId[i] != null) // SKIP RE-RECORDING THE VALUES IF THE MODEL IS ALREADY IN THE LIST - IT WILL BE REPLACED AT THE TOP AUTOMATICALLY
			{
			saveCookie('RecentModelId_'   + tempcounter,RecentModelId[i],3650);		
			saveCookie('RecentModelDesc_' + tempcounter,RecentModelDesc[i],3650);		
			saveCookie('RecentModelImg_'  + tempcounter,RecentModelImg[i],3650);
			tempcounter++;
			}
		}
	if (myImg)
	  {
	  saveCookie('RecentModelId_1',ModelId,3650);		
	  saveCookie('RecentModelDesc_1',myCookieDesc,3650);		
	  saveCookie('RecentModelImg_1',myImg,3650);
	  }
	
	if (ChooseDetailsExpanded == true)
	{
	    closeSelector();
	}
	
	var ReturnToSearch 	= readCookie('ReturnToSearch');
	if (ReturnToSearch != null && ReturnToSearch != '')
		{
		saveCookie('ReturnToSearch','',10);
		window.location.href = 'http://www.pelicanparts.com/cgi-bin/ksearch/pel_search_2014.cgi?SUPERCAT_FLAG=Y&command=DWsearch&description=' + ReturnToSearch ;
		}
	else
		{window.location.href = 'http://www.pelicanparts.com/catalog/SuperCat/' + ModelId + '_catalog.htm';}
	}

////////////////////////////////////		
// CONVERT RGB TO HEX COLOR - USED TO FADE COLORS
function get_hex_color (r, g, b)
	{
	var hexstring = "0123456789abcdef"; 
	var hex_color =  hexstring . charAt (Math . floor (r / 16)) 
					 + hexstring . charAt (r % 16)
					 + hexstring . charAt (Math . floor (g / 16)) 
					 + hexstring . charAt (g % 16) 
					 + hexstring . charAt (Math . floor (b / 16)) 
					 + hexstring . charAt (b % 16); return hex_color;
	} 	

////////////////////////////////////	
// INIT FADING OF ELEMENTS
// http://www.switchonthecode.com/tutorials/javascript-tutorial-simple-fade-animation
function fade(eid,command)
{
  var element = document.getElementById(eid);
  if(element == null)
    return;
  if(element.FadeState == null)
  {
    if(element.style.opacity == null
        || element.style.opacity == ''
        || element.style.opacity == '1')
    {
      element.FadeState = 2;
    }
    else
    {
      element.FadeState = -2;
    }
  }
   
  if(element.FadeState == 1 || element.FadeState == -1)
  {
    element.FadeState = element.FadeState == 1 ? -1 : 1;
    element.FadeTimeLeft = TimeToFade - element.FadeTimeLeft;
  }
  else
  {
    element.FadeState = element.FadeState == 2 ? -1 : 1;
    element.FadeTimeLeft = TimeToFade;
    setTimeout("animateFade(" + new Date().getTime() + ",'" + eid + "','" + command + "')", 33);
  }  
}
////////////////////////////////////
// ACTUAL FADE ROUTINE
// CALLED VIA INTERVAL TIMER
function animateFade(lastTick, eid, command)
{  
  var curTick = new Date().getTime();
  var elapsedTicks = curTick - lastTick;
 
  window.status += ' ' + elapsedTicks;
 
  var element = document.getElementById(eid);
  if (element == null)
    {
	  return;
	}
  if (element.FadeTimeLeft <= elapsedTicks)
  {      
	element.style.opacity = element.FadeState == 1 ? '1' : '0';
    element.style.filter = 'alpha(opacity = ' + (element.FadeState == 1 ? '100' : '0') + ')';
    element.FadeState = element.FadeState == 1 ? 2 : -2;
	
	if (command == 'HideYears') // FADE OUT YEARS AND THEN FADE IN MODEL SELECT 
		{
		
		//window.location.href=window.location.href + "?Models";
		document.getElementById('FloaterWindowTDLeft').width = 1;
		document.getElementById('FloaterWindowTDLeft').style.visibility = "hidden";
		document.getElementById('MainSelectionTableDiv').innerHTML = document.getElementById('ModelDiv').innerHTML;
		document.getElementById('FloaterWindowTDRight').style.visibility = "visible";
		HideSelector();
		firstPage = false;
		scrollToTop('fast');
		CurrentMainScreenDisplay = 'MODELS';
		if (document.getElementById('HomePageSideImage') != null)
		  {
		  document.getElementById('HomePageSideImage').src = 'http://www.pelicanparts.com/graphics/transparent.gif'; // WIPE OUT MAIN HOME PAGE IMAGE
		  originalWidth = document.getElementById('HomePageSideImage').width;
		  document.getElementById('HomePageSideImage').width = 1;
		  document.getElementById('HomePageSideImage').style.visibility = 'hidden';
		  }
		
		document.getElementById('ChooseBar').innerHTML = 'Select Model - ' + SelectedYear + ' ' + Make;
		
		document.getElementById('RecentCarsDropDownDiv').style.visibility = 'hidden';
		if (originalSelectorDiv != null)
		  {
		  document.getElementById('SelectorDiv2').innerHTML = originalSelectorDiv;
		  }
		
		if (navigator.appName == 'Microsoft Internet Explorer') 
	      {
		  // BEGIN CODE RANA
		  var ua = $.browser;  
		  if (cols >= 5) 
		    {	
			e = document.getElementById('MainSelectionTableDiv');
			
            if (ua.version.slice(0,3) == "10.") 
			  {
			  e.style.width = "820px";
			  }
			else
			  {  
		      e.style.width = "720px";
			  }
		    }
		  }
		  // END CODE RANA
		if (document.getElementById('Spaces'))
		  { 
		  document.getElementById('Spaces').innerHTML = '<img src="http://www.pelicanparts.com/graphics/transparent.gif">&nbsp;&nbsp;';
		  }
		if (rows == 1)
		  {
		  document.getElementById('FloaterWindowTable').align = "center";
		  tableA = document.getElementById('FloaterWindowTableA');
		  tableRight = document.getElementById('FloaterWindowTDRight');
		  topDiv = document.getElementById('FloaterWindow');
		  winTable = document.getElementById('FloaterWindowTable');
		  winTable.style.height = "300px";
		  if (navigator.appName == "Netscape") // FIREFOX 
		    {
			topDiv.style.height = "350";
			}
		  tableA.style.height="340";
		  tableRight.style.height="300";
		  if (navigator.appName == 'Microsoft Internet Explorer')
		     {
			 tableA.style.top="100px";
			 tableRight.style.top="100px";
			 topDiv.style.top="25px";
			 }
		  }
		
		document.getElementById('FloaterWindowTDRight').align = "center";
        $('#FloaterWindowTDRight').show();
		$('#FloaterWindowTDLeft').html(''); 
		CurrentMainScreenDisplay = 'MODELS';
		if (navigator.appName == 'Microsoft Internet Explorer') 
	      {
		  // BEGIN CODE RANA
		  var ua = $.browser;
          if (ua.version.slice(0,3) == "10.") {  
		      fade('AutoNumber1',''); // DIV AutoNumber1 IS THE DIV THAT CONTAINS THE YEARS IN A GRID - FADE IT OUT HERE
		      $('#AutoNumber1').show();
		  }
		  else {
		      $('#AutoNumber1').fadeIn(200);
		  }
		  // END CODE RANA
		  }
		else
		  {
		  fade('AutoNumber1',''); // DIV AutoNumber1 IS THE DIV THAT CONTAINS THE YEARS IN A GRID - FADE IT OUT HERE
		  $('#AutoNumber1').show();
		  }
		//window.location.href=window.location.href + "?Models";
		}
	if (command == 'ShowYears') // FADE OUT MODELS AND THEN FADE IN YEARS
		{
		firstPage = true;
		newPage = false;
		scrollToTop('fast');
		CurrentMainScreenDisplay = 'YEARS';
		document.getElementById('SelectorDiv2').style.visibility = 'hidden';
		document.getElementById('MainSelectionTableDiv').innerHTML = Year_Select_HTML;
		
		document.getElementById('ChooseBar').innerHTML = 'Choose year:';
		if (document.getElementById('FloaterWindowTDLeft').width == 1)
		  {
		  document.getElementById('FloaterWindowTDLeft').width = originalWidth;
		  }
		PopulateRecentCarsDropDownMenu();
		ResizeMainHomePageImage();
		if (document.getElementById('HomePageSideImage') != null)
		  {
		  if (tempRecentCarsHtml == null)
		    {
		    document.getElementById('HomePageSideImage').src = originalImageSrc;
		    document.getElementById('HomePageSideImage').style.visibility = 'visible';
		    document.getElementById('HomePageSideImage').width = originalWidth;
			}
		  }
		document.getElementById('SelectorDiv2').style.visibility = 'hidden';
		fade('AutoNumber1',''); // DIV AutoNumber1 IS THE DIV THAT CONTAINS THE YEARS IN A GRID - FADE IT IN HERE
		}
	if (eid == 'RecentCarsDropDownDiv' && element.FadeState == -2) // HIDE THE LAYER SO THAT IT DOESN'T INTERFERE WITH THE OTHER LAYERS UNDERNEATH
		{	
		document.getElementById('RecentCarsDropDownDiv').style.visibility = 'hidden';
		}	
    return;
  }
  
  element.FadeTimeLeft -= elapsedTicks;
  var newOpVal = element.FadeTimeLeft/TimeToFade;
  if(element.FadeState == 1)
    newOpVal = 1 - newOpVal;

  element.style.opacity = newOpVal;
  element.style.filter = 'alpha(opacity = ' + (newOpVal*100) + ')';
  setTimeout("animateFade(" + curTick + ",'" + eid + "','" + command + "')", 33);
}

////////////////////////////////////
// CALLED WHEN CLICKING ON THE 'VIEW RECENT CARS' LINK IN THE TOP BAR
function ShowRecentCarsDropDown(base_div)
	{
	var pos;
//	if (document.getElementById('next'))
//	  {
//	  pos = findPosY(document.getElementById("next"));
//	  }
	if (document.getElementById('RecentCarsDropDownDiv').FadeState == 2)
		{ return false;}
	document.getElementById('RecentCarsDropDownDiv').style.opacity = 0;
	document.getElementById('RecentCarsDropDownDiv').style.filter = 'alpha(opacity = 0)';
	document.getElementById('RecentCarsDropDownDiv').style.visibility = 'visible';
	if (document.getElementById('RecentCarsDropDownDiv').innerHTML == "") {
	   document.getElementById('RecentCarsDropDownDiv').innerHTML = tempRecentCarsDropDownList;
	}
	var PosX = findPosX(document.getElementById(base_div));	// FIND X/Y POSITION OF CURRENT MODEL IMAGE
	var PosY = findPosY(document.getElementById(base_div));
	var offsetY = 21;
	if (safari_test.test(navigator.userAgent.toLowerCase()))
	  {
		    offsetY = 22;
			if (ipad_test.test(navigator.userAgent.toLowerCase()))
	         {
	         offsetY = 31;
	         }
			else if (PosY >= 123)
			  {
			    offsetY = 51;
			  }
	  }
	else if (opera_test.test(navigator.userAgent.toLowerCase()))
	  {
	      offsetY = 22;
		  if (PosY < 121)
		   {
           offsetY = 25;
		   }	
		  if (PosY <= 113)
		   {
		   offsetY = 39;
		   } 	  
	  }
    else if (PosY == 120)
	  {
	  offsetY = 23;
	  }
	else if ((PosY < 120) && (PosY > 113))
	  {
	    offsetY = 40;
		if (navigator.appName == 'Microsoft Internet Explorer') 
	    {
	    offsetY = 31;
	    }
	  }
	else if (PosY <= 113)
	  {
	  offsetY = 52;
	  if (navigator.appName == 'Microsoft Internet Explorer') 
	    {
	    offsetY = 39;
	    }
	  }
	
	if (base_div == 'Top_Bar_Recent_Cars')	// SET POSITION OF BLUE OUTLINE SELECTOR DIV UNDER TOP BAR
		{document.getElementById('RecentCarsDropDownDiv').style.left = PosX + "px";}
	if (base_div == 'ChooseBar') // SET POSITION OF BLUE OUTLINE SELECTOR DIV UNDER CHOOSE RECENT CAR DROPDOWN
		{document.getElementById('RecentCarsDropDownDiv').style.left = PosX + 150;}
	document.getElementById('RecentCarsDropDownDiv').style.top = PosY -document.getElementById('RecentCarsDropDownDiv').offsetHeight + 21;
	FadeOutCounter = 1;
	
	document.getElementById('RecentCarsDropDownDiv').style.top = PosY + 18;
	if (base_div == 'Top_Bar_Recent_Cars')
	   {
	   document.getElementById('RecentCarsDropDownDiv').style.top = PosY + offsetY + "px";
	   }
	document.getElementById('RecentCarsDropDownDiv').style.zIndex = 10000;
	/**
	if (PosX != document.getElementById('RecentCarsDropDownDiv').style.left)
	   {
		  document.getElementById('Top_Bar_Recent_Cars').innerHTML = document.getElementById('RecentCarsDropDownDiv').innerHTML;
	   }
	**/
	if (safari_test.test(navigator.userAgent.toLowerCase()))
	  {
	  if (base_div == "ChooseBar")
	    {
	    document.getElementById('RecentCarsDropDownDiv').style.top = PosY + 30;
	    }
	  }
	var isiPad = navigator.userAgent.match(/iPad/i) != null;
	if (isiPad)
	  {
	  document.getElementById('RecentCarsDropDownDiv').style.top = (PosY + 43) + "px";
	  document.getElementById('RecentCarsDropDownDiv').style.top = pos;
	  $('#RecentCarsDropDownDiv').mouseout( function () { $('#RecentCarsDropDownDiv').fadeOut(50); });
	  }
	
	//alert("TOP = " + top + " ofF = " + bottom);
	
    if (navigator.appName == 'Microsoft Internet Explorer') 
	  {
	  if (base_div == "ChooseBar")
	    {
	    document.getElementById('RecentCarsDropDownDiv').style.top = PosY + 26;
		//document.getElementById('RecentCarsDropDownDiv').style.top = pos;
	    }
	  //var PosX = findPosX(document.getElementById(base_div));	// FIND X/Y POSITION OF CURRENT MODEL IMAGE
	 
	  $('#RecentCarsDropDownDiv').fadeTo(15,1.0);
	  $('#RecentCarsDropDownDiv').mouseleave( function () { $('#RecentCarsDropDownDiv').fadeOut(50); });
	}
	else
	  {
	  fadein('RecentCarsDropDownDiv','');
	  DropDownInterval = setInterval('HideRecentCarsDropDown()',100);
	  }
	}


function HideRecentCarsDropDown()
	{
	window.status = "xMousePos=" + xMousePos + ", yMousePos=" + yMousePos + ", xMousePosMax=" + xMousePosMax + ", yMousePosMax=" + yMousePosMax;
	var PosY  = findPosY(document.getElementById('RecentCarsDropDownDiv'));
	var PosX  = findPosX(document.getElementById('RecentCarsDropDownDiv'));
	var width  = document.getElementById('RecentCarsDropDownDiv').offsetWidth;
	var height = document.getElementById('RecentCarsDropDownDiv').offsetHeight;
	window.status += " (" + PosX + "," + PosY + ")" + " (" + width + "," + height + ")";
	if (xMousePos <= PosX || yMousePos <= PosY-50 || xMousePos >= PosX + width || yMousePos >= PosY + height)
		{
		//fade('RecentCarsDropDownDiv','');
		fadeout('RecentCarsDropDownDiv');
		tempRecentCarsDropDownList = document.getElementById('RecentCarsDropDownDiv').innerHTML;
		document.getElementById('RecentCarsDropDownDiv').innerHTML = "";
		clearInterval(DropDownInterval);
		return;
		}
	}	
	
////////////////////////////////////
// ANIMATE DROPDOWN FOR RECENT CARS	
//function ShowRecentCarsDropDownMotion(base_div)
//	{
//	var PosY = findPosY(document.getElementById(base_div));	
//	//document.getElementById('RecentCarsDropDownDiv').style.top = PosY + document.getElementById('RecentCarsDropDownDiv').offsetHeight;
//	var FinalPosition 	= PosY + 21;
//	var CurrentPosition = findPosY(document.getElementById('RecentCarsDropDownDiv'));	
//	document.getElementById('RecentCarsDropDownDiv').style.top = parseInt(CurrentPosition + (FinalPosition - CurrentPosition)*2/5);
//	FadeOutCounter++;
//	if (FadeOutCounter > 10)
//		{
//		document.getElementById('RecentCarsDropDownDiv').style.top = FinalPosition;
//		//alert(document.getElementById('RecentCarsDropDownDiv').style.zIndex);
//		//alert(document.getElementById('home_page_frame').style.zIndex);
//		document.getElementById('RecentCarsDropDownDiv').style.zIndex = 10000;
//		clearInterval(myTimer);
//		}
//	}
// THIS RETURNS THE UPPER HTML FOR THE LEFT BOX
function getTopStructure(middle)
  {
  if (middle == true)
    {
	// WE UPPER CASE THE FIRST LETTER OF THE MAKE
	var name = pathArray[1].substr(0,1).toUpperCase() + pathArray[1].substr(1);
	return '<table id="FloaterWindowTableLeft" width="100%" height=420 align="right" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; right:15px;left:5px; min-height:420;" \
                     bordercolor="#111111"> \
	  <tr><TD width=11 height=11><IMG src="http://www.pelicanparts.com/graphics/left_corner_outline.gif" width="11" height="11" onmouseover="HideSelector();"></TD>\
              <TD background="http://www.pelicanparts.com/graphics/top_orange_outline.gif" height=11></TD>\
              <TD width=11 height=11><IMG src="http://www.pelicanparts.com/graphics/right_top_outline_curve.gif" width="11" height="11" onmouseover="HideSelector();"></TD>\
          </tr>\
	      <tr><TD width=11 background="http://www.pelicanparts.com/graphics/left_orange_outline.gif" onmouseover="HideSelector();">&nbsp;</TD>\
	      <TD class="side_menu" rowspan="2" align="center">\
		  <table border=0 cellpadding=0 cellspacing=0 BGCOLOR="#FFFFFF" style="left:1px;" width="100%">\
		    <tr>\
		      <td><span id="FloaterWindowMessageSpanLeft">\
			    <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;"' +                                                   
                   'bordercolor="#111111;" width="100%" id="AutoNumber2" align="center">\
				   <tr>\
			          <td width="1%" height="10">&nbsp;</td>\
			          <td nowrap width="99%" colspan="2" height="20" align="left">\
				          <font face="tahoma" size="5" color="#808080" style="font-weight:900">\
                                   <span id="ChooseBarLeft" valign="left">' + name + '</span></font>\
					  </td>\
			        </tr>\
			       <tr>\
			          <td color="#FFFFFF" colspan=3 align="center" height="1" valign="top">\
				      <div id="MainSelectionTableDivLeft">';
	}
  else
    {
    return '<table id="FloaterWindowTableLeft" width="100%" height=420 align="right" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; top:5px; right:15px;left:5px min-height:420" \
                     bordercolor="#111111"> \
	  <tr><TD width=11 height=11><IMG src="http://www.pelicanparts.com/graphics/left_corner_outline.gif" width="11" height="11" onmouseover="HideSelector();"></TD>\
              <TD background="http://www.pelicanparts.com/graphics/top_orange_outline.gif" height=11></TD>\
              <TD width=11 height=11><IMG src="http://www.pelicanparts.com/graphics/right_top_outline_curve.gif" width="11" height="11" onmouseover="HideSelector();"></TD>\
          </tr>\
	      <tr><TD width=11 background="http://www.pelicanparts.com/graphics/left_orange_outline.gif" onmouseover="HideSelector();">&nbsp;</TD>\
	      <TD class="side_menu" rowspan="2" align="center">\
		  <table border=0 cellpadding=0 cellspacing=0 BGCOLOR="#FFFFFF" style="left:1px" width="100%">\
		    <tr>\
		      <td><span id="FloaterWindowMessageSpanLeft">\
			    <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;"' +                                                   
                   'bordercolor="#111111;" width="100%" id="AutoNumber2" align="center" valign="top">\
			        <tr>\
			          <td width="1%" height="10">&nbsp;</td>\
			          <td nowrap width="99%" colspan="2" height="20" align="left">\
				          <font face="tahoma" size="5" color="#808080" style="font-weight:900">\
                                   <span id="ChooseBarLeft" valign="left">Choose recent car:</span></font>\
					  </td>\
			        </tr>\
			        <tr>\
			          <td width="1%" height="1">&nbsp;</td>\
			          <td width="61%" height="1">&nbsp;</td>\
			          <td width="1%" height="1">&nbsp;</td>\
			       </tr>\
			       <tr>\
			          <td color="#FFFFFF" colspan=3 align="center" height="1" valign="top">\
				      <div id="MainSelectionTableDivLeft">';
      }
  }
  
// THIS RETURNS THE HTML FOR THE BOTTOM HALF OF THE LEFT BOX
function getBottomStructure()
  {  
   var spaces = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
   if (navigator.appName != 'Microsoft Internet Explorer') 
     {
	 spaces += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
	 }
   return '</div>\
           </td>\
           </tr>\
           </table>\
           </span>\
           </td>\
           </tr>\
           </table>\
           </TD>\
           <TD width=11 background="http://www.pelicanparts.com/graphics/right_orange_outline.gif">&nbsp;</TD>\
           </tr>\
           <tr><TD width=11 background="http://www.pelicanparts.com/graphics/left_orange_outline.gif" onmouseover="HideSelector();">&nbsp;</TD>\
		   <TD width=11 background="http://www.pelicanparts.com/graphics/right_orange_outline.gif">&nbsp;</TD>\
		   </tr>\
           <tr><TD width=11 height=2><IMG src="http://www.pelicanparts.com/graphics/left_bottom_orange_outline_.gif" width="11" height="11" onmouseover="HideSelector();"></TD>\
           <TD background="http://www.pelicanparts.com/graphics/bottom_orange_outline.gif" height=2></TD>\
           <TD width=11 height=2><IMG src="http://www.pelicanparts.com/graphics/right_bottom_outline_curve_.gif" width="11"height="11" onmouseover="HideSelector();"></TD>\
           </tr>\
           </table>\
           </td>\
           </tr>\
           </table>';
  }


////////////////////////////////////
// CALLED WHEN THIS FILE IS LOADED - WILL WAIT UNTIL THE SPAN IN THE TOP BAR IS AVAILABLE AND THEN WILL POPULATE WITH A DROPDOWN MENU SHOWING THE PREVIOUSLY SELECTED CARS
function PopulateRecentCarsDropDownMenu()
	{
	var height = 150;
	genericImage = false;
	var t = navigator.userAgent.toLowerCase();
	var RecentCarsDropDownSpan = document.getElementById('RecentCarsDropDownDivSubTable');
	if (RecentCarsDropDownSpan != null)
		{
		// DELETE ALL ROWS IF THERE ARE ANY IN THERE ALREADY
		var table = document.getElementById('RecentCarsDropDownDivSubTable');
	    var rowCount = table.rows.length;
		if (rowCount != 0)
			{
			for(var i = table.rows.length - 1; i > -1; i--)
				{
				table.deleteRow(i);
				}
			}
		CurrentRowBGCOLOR = '#faf8eb';
		var RecentModelId 	= new Array();
		var RecentModelDesc	= new Array();
		var RecentModelImg	= new Array();
		
		var FoundRecentCars = false;
		//recentCars = false;
		tempRecentCarsHtml = null;
		var rowcounter = 0;
        var photos = '';
		var captions = '';
		var cookielist = new Array();
		var desclist = new Array();
		var imglist = new Array();
		var insertedMainPic = false;
		numCars = 0;
		
		for (i=1;i<6;i++) // READ THE COOKIE VALUES INTO AN ARRAY FIRST, AND THEN MOVE THEM DOWN LATER ON IN THE NEXT LOOP
			{
			RecentModelId[i] 	= readCookie('RecentModelId_' + i);
			RecentModelDesc[i]	= readCookie('RecentModelDesc_' + i);
			RecentModelImg[i]	= readCookie('RecentModelImg_' + i);
			var model;
			var currentMake = false;
			if (RecentModelDesc[i] != null) 
			  {
			  model = RecentModelDesc[i].split(' ');
			  currentMake = false;
			  if (pathArray[1].toLowerCase() == model[1].toLowerCase())
			    {
			    currentMake = true;
			    }
			  }
			var found = false;
			for (var j=0; j < cookielist.length; j++)
			  {
			  if ((cookielist[j] == RecentModelId[i]) || (desclist[j] == RecentModelDesc[i]))
			    {
				found = true;
				}
			  }
		   if (found == false)
		     {
			 cookielist.push(RecentModelId[i]);
			 desclist.push(RecentModelDesc[i]);
			 imglist.push(RecentModelImg[i]);
			 }	      
			if (RecentModelId[i] != null && RecentModelId[i] != '' && found == false)
				{
				var mainCar = false;
				if ((tempRecentCarsHtml == null) && (currentMake == true) && (insertedMainPic == false))
				  {
				    // POPULATE THE BIGGER IMAGE ON THE LEFT BOX
				
					tempRecentCarsHtml = //'<table width="' + originalWidth + '" style="border-collapse: collapse" bordercolor="#111111" id="recent_top">' + 
					                      '<tr><td align="center" valign="middle" colspan="4"><table id="MainCar"><tr><td align="center" valign="middle">\
										  <img height="' + height + '" src="http://www.pelicanparts.com/SuperCat/images/source/' 
										  + RecentModelImg[i] + '.jpg" id="HomePageSideImage1" style="cursor:pointer>" ' + 
										  'onclick="SetCookiesAndShowCatalog(\'' + RecentModelId[i] + '\',\'\',\'' + RecentModelImg[i] + '\');"' +
										  ' onmouseover="MoveSelectorRecentCars(\'MainCar\',\'' + RecentModelId[i] + '\', \'' + RecentModelDesc[i] + 
										  '\',\'' + RecentModelImg[i] + '\');"></td></tr>';
										  
					tempRecentCarsHtml += '<tr><td align="center" valign="top" id="lowerTD0" colspan="4" class="side_menu3" style="outline:none;"' +
					                       ' onmouseover="MoveSelectorRecentCars(\'MainCar\',\'' + RecentModelId[i] + '\', \'' + RecentModelDesc[i] + 
										   '\',\'' + RecentModelImg[i] + '\');">'
					                      + RecentModelDesc[i] + '</td></tr>\
										  </table></td></tr>';
					numCars++;					  
				    insertedMainPic = true;
					mainCar = true;
				  }
				FoundRecentCars = true;
				recentCars = true;
				sideImage = "HomePageSideImage1";
				if (CurrentRowBGCOLOR == '#faf8eb'){CurrentRowBGCOLOR = '#f4efd2'}	// ROUTINE TO ALTERNATE ROW COLOR
				else {CurrentRowBGCOLOR = '#faf8eb'}

				var row = table.insertRow(rowcounter);
					row.style.backgroundColor = CurrentRowBGCOLOR;
					row.setAttribute('class','side_menu3');
					row.setAttribute('valign','middle');		
					row.setAttribute('align','center');
					row.setAttribute('height','40');
					if (mainCar == false)
					  {
					  if (((numCars < 3 ) && (insertedMainPic == true)) ||
					          ((numCars < 2) && (insertedMainPic == false)))
					    {
					;
						// WE POPULTE THE SMALLER IMAGES ON THE LEFT BOX
						var desc = RecentModelDesc[i].replace('(','&nbsp;(');
						photos += '<td align="center" valign="middle"><table id="Car' + rowcounter + '" border="0" width="100%" height="100%"><tr><td height=50 align="center">\
						                  <img id="image' + rowcounter + '" border="0" src="http://www.pelicanparts.com/SuperCat/images/models/' 
					  					  + RecentModelImg[i] + '.gif" onclick="SetCookiesAndShowCatalog(\'' + RecentModelId[i] + '\',\'\',\'' + RecentModelImg[i] + '\');"' +
									      ' onmouseover="MoveSelectorRecentCars(\'Car' + rowcounter + '\', \'' + RecentModelId[i] + '\',\'' + desc 
										  + '\',\'' + RecentModelImg[i] + '\');"></td>' +
										  '<td><img src="http://www.pelicanparts.com/graphics/transparent.gif" width=5></td></tr>';
					    photos += '<tr><td align="center" valign="top" height=70 class="side_menu3" id="lowerTD' + (rowcounter-1) + '" style="outline:none;font-size:11px;"' 
						          + ' onmouseover="MoveSelectorRecentCars(\'Car' + rowcounter + '\', \'' + RecentModelId[i] + '\',\'' + desc 
								  + '\',\'' + RecentModelImg[i] + '\');">'
								  + desc + 
					              '<br>&nbsp; </td><td><img src="http://www.pelicanparts.com/graphics/transparent.gif" width=5></td></tr></table></td>';
						numCars++;
						}
					  }

				var cell = row.insertCell(0);	// FOR SELECT ALL EXCEPT BODY STYLE
					cell.innerHTML = '<a class="side_menu3" href="http://www.pelicanparts.com/catalog/SuperCat/' + RecentModelId[i] + '_catalog.htm"><img border="0" src="http://www.pelicanparts.com/SuperCat/images/models/' + RecentModelImg[i] + '.gif" height="35"></a>';
					cell.setAttribute('width','25');		
					cell.setAttribute('align','center');		
					
				var cell = row.insertCell(1);
					cell.innerHTML = '&nbsp;';
					row.setAttribute('align','left');			
				var cell = row.insertCell(2);
					cell.innerHTML = '<a class="side_menu3" href="http://www.pelicanparts.com/catalog/SuperCat/' + RecentModelId[i] + '_catalog.htm">' + RecentModelDesc[i] + '</a>';
					row.setAttribute('align','left');			
					row.setAttribute('valign','middle');	
						
				var cell = row.insertCell(3);
					cell.innerHTML = '<a href="#" onclick="RemovePullDownCar(' + i + ');return false;"><img alt="Remove" border="0" src="http://www.pelicanparts.com/SuperCat/icons/remove.gif" height="14" width="19"></a>';
					cell.setAttribute('align','center');		
		
				rowcounter++;	
				}
			}	
		if (FoundRecentCars == true)
			{
		    var middle = false;
			height = 110;
			if (rowcounter >= 2)
			  {
			  height = 125;
			  }
			if (insertedMainPic == false)
			  {
			  ++rowcounter; // BUMP ROW COUNTER TO FORCE IT TO GET INTO THE NEXT IF STATEMENT
			  middle = true;
			  genericImage = true;
			  var choose = '<br><br><font face="tahoma" size="4" color="#808080" style="font-weight:900">\
                                   <span id="ChooseBarLeft" valign="left">Choose recent car:</span></font>'
			  if (document.getElementById('HomePageSideImage'))
			    {
				tempRecentCarsHtml = '<tr><td align="center" valign="middle" colspan="4"><table id="MainCar" border=0 onmouseover="HideSelector();"><tr><td align="center" valign="middle">\
									 <img height="' + height + '" src="' + document.getElementById('HomePageSideImage').src + '" id="HomePageSideImage1"></td></tr>';
			    tempRecentCarsHtml += '<tr><td align="left" valign="top" id="lowerTD0" colspan="4">' + choose 
					                  + '</td></tr>\
									  </table></td></tr>';
				}
			   else if (originalImageSrc)
			    {
				tempRecentCarsHtml = '<tr><td align="center" valign="middle" colspan="4"><table id="MainCar" border=0 onmouseover="HideSelector();"><tr><td align="center" valign="middle">\
										  <img height="' + height + '" src="' + originalImageSrc + '" id="HomePageSideImage1"></td></tr>';
			    tempRecentCarsHtml += '<tr><td align="left" valign="top" id="lowerTD0" colspan="4">' + choose 
					                      + '</td></tr>\
										  </table></td></tr>';
				}
			  						  
			  }		

			if (rowcounter > 1)
			  {
			  if (rowcounter < 2)
			    {
				// WE ONLY HAVE ONE SMALLER IMAGE
				var index = 2;
				if (imglist[2] == null)
				  {
				  index = 1;
				  }
				
			    var desc = desclist[index].replace('(','&nbsp;(');	
			    photos = '<td align="center" valign="middle"><table id="Car1" border="0"><tr><td align="center" valign="middle"><img id="image' 
				          + rowcounter + '" height="108" border="0" src="http://www.pelicanparts.com/SuperCat/images/models/' 
					  	  + imglist[index] + '.gif" onclick="SetCookiesAndShowCatalog(\'' + cookielist[index] + '\',\'\',\'' + imglist[index] + '\');"' + 
						  ' onmouseover="MoveSelectorRecentCars(\'Car1\', \'' + cookielist[index] + '\',\'' + desc 
						  + '\',\'' + img + '\');"></td></tr>';
										 
				photos += '<tr><td align="center" valign="middle" class="side_menu3" style="word-wrap: break-word; outline:none;" id="lowerTD' + (rowcounter-1) + 
					      ' onmouseover="MoveSelectorRecentCars(\'Car1' + '\', \'' + cookielist[index] + '\',\'' + desc 
						  + '\'.\'' + imglist[index] + '\');">' + desc +
						  '</td></tr></table></td>';
				}
			  
		        
			  tempRecentCarsHtml += photos;
			  tempRecentCarsHtml += '</table>';
			  tempRecentCarsHtml = '<table width="' + originalWidth + '" height="315" border="0" style="border-collapse: collapse;top:5px; bottom:5px; " bordercolor="#111111" id="recent_top">' +
			                       tempRecentCarsHtml;
			  } 
			else
			  {
			  tempRecentCarsHtml += '</tr></table>';
			  tempRecentCarsHtml = '<table height="350" border="0" style="border-collapse: collapse; top:5px; bottom:5px;" bordercolor="#111111" id="recent_top">' +
			                       tempRecentCarsHtml;
			  tempRecentCarsHtml = tempRecentCarsHtml.replace('height="' + height + '"','height="200"');
			  }
			tempRecentCarsHtml = getTopStructure(middle) + tempRecentCarsHtml;
			tempRecentCarsHtml += getBottomStructure();
			recentCars = true;
			
			if (document.getElementById('FloaterWindowTDLeft'))
			  {
			  document.getElementById('FloaterWindowTDLeft').innerHTML = tempRecentCarsHtml;
			  //document.getElementById('FloaterWindowTableLeft').style.top = document.getElementById('FloaterWindowTable').style.top;
			  //document.getElementById('FloaterWindowTableLeft').height = document.getElementById('FloaterWindowTable').height;	
			  document.getElementById('FloaterWindowTableLeft').style.bottom = document.getElementById('FloaterWindowTable').style.bottom;
			  if (!chrome_test.test(navigator.userAgent.toLowerCase()))
			    {
			    if ($('#FloaterWindowTable').width() < $('#FloaterWindowTableLeft').width())
			      {
				  $('#FloaterWindowTable').width($('#FloaterWindowTableLeft').width());
				  }
			    else
			      {
				  $('#FloaterWindowTableLeft').width($('#FloaterWindowTable').width());
				  }
			    }
			  else
			    {
				$('#FloaterWindowTable').width(400);
				$('#FloaterWindowTableLeft').width(400);
				}
			  if (browserWidth > 1191)
			    { 
		        //document.getElementById('FloaterWindowTableLeft').width = "400px";
			    //document.getElementById('FloaterWindowTable').width = "400px";
			    //document.getElementById('FloaterWindowTableLeft').height = "400px";
			    //document.getElementById('FloaterWindowTable').height = "400px";
				}
			  //document.getElementById('FloaterWindowTDLeft').style.top = document.getElementById('FloaterWindowTDRight').style.top; 
			  equalHeight($('#FloaterWindowTableA'));
			  }
			if (document.getElementById('Top_Bar_Recent_Cars'))
				{document.getElementById('Top_Bar_Recent_Cars').innerHTML = '<a class=top_bar href="#" onclick="ShowRecentCarsDropDown(\'Top_Bar_Recent_Cars\');return false;">View Recent Cars </a>&nbsp;<FONT color=#DBEDFF>|</FONT>&nbsp;';}
			if (document.getElementById('ChooseBar'))
			  {
			  if ($('#ChooseBar').html() != 'Choose year:')
			    {
			    $('#ChooseBar').html('Choose year:');
			    }
			 }
			 if (genericImage == true)
			   {
			   if (document.getElementById('FloaterWindowTDRight')) 
			      {
			      document.getElementById('FloaterWindowTDRight').style.height = "445px";
			      }
			   if (document.getElementById('MainSelectionTable')) 
			      {
			      document.getElementById('MainSelectionTable').style.height = "330px";
				  }
			   }
			}
		else
		    { 
			sideImage = "HomePageSideImage";
			recentCars = false;
			if (document.getElementById('FloaterWindowTDLeft'))
			  {
			  document.getElementById('FloaterWindowTDLeft').innerHTML = originalImage;
			  document.getElementById('FloaterWindowTDLeft').style.visibility = 'visible';
			  if (document.getElementById('FloaterWindowTDLeft').width == 1)
			    {
			    document.getElementById('FloaterWindowTDLeft').width = originalWidth;
			    }
			  }
			
			if (document.getElementById('HomePageSideImage') != null)
			  {
			  document.getElementById('HomePageSideImage').width = 350;
			  //document.getElementById('HomePageSideImage').style.visibility = 'visible';
			  ResizeMainHomePageImage();
			  }
			
			//document.getElementById('RecentCarsDropDownDiv').style.visibility = 'hidden';
			$('#Top_Bar_Recent_Cars').html('');
			if (document.getElementById('ChooseBar') && $('#ChooseBar').html() != 'Choose year:')
			  {
			  $('#ChooseBar').html('Choose year:');
			  }
			if (document.getElementById('FloaterWindowTDLeft'))
			  {
			  document.getElementById('FloaterWindowTDLeft').align="center";
			  }
			if (document.getElementById('FloaterWindowTDRight'))
			  {  
			  document.getElementById('FloaterWindowTDRight').align="center";
			  }
			}
			if (document.getElementById('FloaterWindowTDRight'))
			  {
			  ResizeMainHomePageImage();
			  }
			$('#FloaterWindowTable').width(400);
			$('#FloaterWindowTableLeft').width(400);
		}
	else
		{
		setTimeout('PopulateRecentCarsDropDownMenu()',500);
		}
	}

function PopulateRecentCarsDropDownMenuNotFirstPage()
	{
	var RecentCarsDropDownSpan = document.getElementById('RecentCarsDropDownDivSubTable');
	var found = false;
	if (RecentCarsDropDownSpan != null)
		{
		// DELETE ALL ROWS IF THERE ARE ANY IN THERE ALREADY
		var table = document.getElementById('RecentCarsDropDownDivSubTable');
	    var rowCount = table.rows.length;
		if (rowCount != 0)
			{
			for(var i = table.rows.length - 1; i > -1; i--)
				{
				table.deleteRow(i);
				}
			}
		CurrentRowBGCOLOR = '#faf8eb';
		var RecentModelId 	= new Array();
		var RecentModelDesc	= new Array();
		var RecentModelImg	= new Array();		
		var cookielist = new Array();
		var desclist = new Array();
		var rowcounter = 0;
		for (i=1;i<6;i++) // READ THE COOKIE VALUES INTO AN ARRAY FIRST, AND THEN MOVE THEM DOWN LATER ON IN THE NEXT LOOP
			{
			RecentModelId[i] 	= readCookie('RecentModelId_' + i);
			RecentModelDesc[i]	= readCookie('RecentModelDesc_' + i);
			RecentModelImg[i]	= readCookie('RecentModelImg_' + i);
           
		   var found = false;
			for (var j=0; j < cookielist.length; j++)
			  {
			  if ((cookielist[j] == RecentModelId[i]) || (desclist[j] == RecentModelDesc[i]))
			    {
				found = true;
				}
			  }
		   if (found == false)
		     {
			 cookielist.push(RecentModelId[i]);
			 desclist.push(RecentModelDesc[i]);
			 }	  
		   
			if (RecentModelId[i] != null && RecentModelId[i] != '' && found == false)
				{
				if (CurrentRowBGCOLOR == '#faf8eb'){CurrentRowBGCOLOR = '#f4efd2'}	// ROUTINE TO ALTERNATE ROW COLOR
				else {CurrentRowBGCOLOR = '#faf8eb'}
                found = true;
				var row = table.insertRow(rowcounter);
					row.style.backgroundColor = CurrentRowBGCOLOR;
					row.setAttribute('class','side_menu3');
					//row.setAttribute('onClick','RollUpWindow(' + rowCount + ',' + myTableCounter + ')');
					row.setAttribute('valign','middle');		
					row.setAttribute('align','center');
					row.setAttribute('height','40');
					
				var cell = row.insertCell(0);	// FOR SELECT ALL EXCEPT BODY STYLE
					cell.innerHTML = '<a class="side_menu3" href="http://www.pelicanparts.com/catalog/SuperCat/' + RecentModelId[i] + '_catalog.htm"><img border="0" src="http://www.pelicanparts.com/SuperCat/images/models/' + RecentModelImg[i] + '.gif" height="35"></a>';
					//cell.setAttribute('id','ChooseTD' + myTableCounter + '_' + rowCount + 'A');		
					cell.setAttribute('width','25');		
					cell.setAttribute('align','center');		
					
				var cell = row.insertCell(1);
					cell.innerHTML = '&nbsp;';
					row.setAttribute('align','left');			
				var cell = row.insertCell(2);
					cell.innerHTML = '<a class="side_menu3" href="http://www.pelicanparts.com/catalog/SuperCat/' + RecentModelId[i] + '_catalog.htm">' + RecentModelDesc[i] + '</a>';
					//cell.setAttribute('width', '30');
					row.setAttribute('align','left');			
					row.setAttribute('valign','middle');	
					//cell.setAttribute('id','ChooseTD' + myTableCounter + '_' + rowCount + 'B');
						
				var cell = row.insertCell(3);
					cell.innerHTML = '<a href="#" onclick="RemovePullDownCar(' + i + ');return false;"><img alt="Remove" border="0" src="http://www.pelicanparts.com/SuperCat/icons/remove.gif" height="14" width="19"></a>';
					cell.setAttribute('align','center');		
					//cell.setAttribute('width','2');
					//cell.setAttribute('id','ChooseTD' + myTableCounter + '_' + rowCount + 'B');
				rowcounter++;	
				}
			}	
       }
	   if (found == false) {
	        document.getElementById('RecentCarsDropDownDiv').style.visibility = 'hidden';
			$('#Top_Bar_Recent_Cars').html('');
	   }
}
	
// JQUERY FUNCTION TO RESIZE IMAGES MOVED TO index-sc.htm
/**
$.fn.resize=function(a)   
  {
  var d=Math.ceil;if(a==null)a=200;
  var e=a,f=a;
  $(this).each(function(){
  var b=$(this).height(),c=$(this).width();
  if(b>c)
	   f=d(c/b*a);
  else e=d(b/c*a);
       $(this).css({height:e,width:f})
  })};	  
 **/
  
////////////////////////////////////
// FADES OUT THE RECENT CARS MENU
function RemovePullDownCar(i)
	{
	var RecentModelDesc	= readCookie('RecentModelDesc_' + i);
	var RecentModelId	= readCookie('RecentModelId_' + i);
	var LastVisited 	= readCookie('LastVisited');
	
	RecentModelDesc = RecentModelDesc.replace(/\<\/?b\>/gi,"");

	var message = 'Please confirm that you would like to remove:\n\n' + RecentModelDesc + '\n\nfrom your Recent Cars list.';
	var x=window.confirm(message)
	if (x)
		{
		fadeout('RecentCarsDropDownDiv');
		HideSelector();
		document.cookie = 'RecentModelId_' + i + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/; domain=.pelicanparts.com;';
		//alert(LastVisited + ':' + RecentModelId);
		if (LastVisited == RecentModelId)
			{
			saveCookie('LastVisited',"",3650);
			}
		if (firstPage == true)
		  {
		  PopulateRecentCarsDropDownMenu();
		  ResizeMainHomePageImage();
		  }
		else
		  {
		  PopulateRecentCarsDropDownMenuNotFirstPage()
		  }
		}
	}

////////////////////////////////////
// CALLED WHEN THIS FILE IS LOADED - RESIZES THE MAIN HOME IMAGE TO MATCH THE SIZE OF THE BROWSER
function ResizeMainHomePageImage()
	{
	var threshold = 706;
	browserWidth = $(window).width();
	var HomePageSideImage = document.getElementById(sideImage); // CHECK TO SEE IF THE IMAGE HAS BEEN LOADED YET OR NOT, IF NOT THEN LOOP AGAIN UNTIL YES
    /**
    if (touchable) {
	  canvas.addEventListener( 'touchstart', onTouchStart, false );
	  canvas.addEventListener( 'touchmove', onTouchMove, false );
	  canvas.addEventListener( 'touchend', onTouchEnd, false );
   }
   **/
   var cookie = null;
   for (i=1;i<6;i++) // READ THE COOKIE VALUES INTO AN ARRAY FIRST, AND THEN MOVE THEM DOWN LATER ON IN THE NEXT LOOP
	 {
	 cookie 	= readCookie('RecentModelId_' + i);
	 if (cookie)
	   {
	   break;
	   }
     }
	if (HomePageSideImage != null)
		{
		if (originalImage == null)
		  {
		  originalImage = document.getElementById('FloaterWindowTDLeft').innerHTML;
		  if ((document.getElementById('HomePageSideImage')) && (recentCars != true)) 
		    {
		    originalImageSrc = document.getElementById('HomePageSideImage').src;
		    originalWidth = document.getElementById('HomePageSideImage').width;
			}
		  }
		if (CurrentMainScreenDisplay == 'YEARS')
			{
			if (recentCars == true)
			  {
			  //document.getElementById('FloaterWindowTDLeft').innerHTML = tempRecentCarsHtml;
			  }
			else if (document.getElementById('HomePageSideImage') != null)
			  {
			  document.getElementById('FloaterWindowTDLeft').innerHTML = originalImage;
			  }
			if (opera_test.test(navigator.userAgent.toLowerCase()))
			  {
			  document.getElementById('FloaterWindowTDRight').height = parseInt(document.getElementById('FloaterWindowTDRight').width) - 7;
			  document.getElementById('FloaterWindowTDRight').width = parseInt(document.getElementById('FloaterWindowTDRight').width) - 7;
			  }
			else if (safari_test.test(navigator.userAgent.toLowerCase()))
			  {
			  document.getElementById('FloaterWindowTDRight').height = parseInt(document.getElementById('FloaterWindowTDRight').width) - 7;
			  document.getElementById('FloaterWindowTDRight').width = parseInt(document.getElementById('FloaterWindowTDRight').width) -100;
			  }
			else if (chrome_test.test(navigator.userAgent.toLowerCase()))
			  {
			  document.getElementById('FloaterWindowTDRight').height = parseInt(document.getElementById('FloaterWindowTDRight').width) - 7;
			  document.getElementById('FloaterWindowTDRight').width = parseInt(document.getElementById('FloaterWindowTDRight').width) -100;
			  }
			
			if ((browserWidth != 0) && ((browserWidth <= 1191) && (browserWidth > threshold)))
			  {
			  // WE START SHRINKING THE TDS AND IMAGES HERE
			  $('#FloaterWindowTDLeft').show();
			  if (tempRecentCarsHtml != null)
			    {
			    $('#AutoNumber2').show();
				}
			  
			  
			  if (cookie == null)
				{
				if (document.getElementById('HomePageSideImage')) 
				  {
				  document.getElementById('HomePageSideImage').width = 300;
				  document.getElementById(sideImage).style.visibility = 'visible';
				  }
				}
			 //$('#'+sideImage).show();
			 if (genericImage == true)
			   {
			   //$('#'+sideImage).resize(parseInt(browserWidth*20/100));
			   }
			 else
			   {
			   //$('#'+sideImage).resize(parseInt(browserWidth*90/100));
			   }
			 
			 if (document.getElementById('image1'))
			   {
			   $('#image1').resize(parseInt(browserWidth*10/100));
			   }
			 if (document.getElementById('image2'))
			   {
			   $('#image2').resize(parseInt(browserWidth*10/100));
			   }
			 if (document.getElementById('image0'))
			   {
			   $('#image0').resize(parseInt(browserWidth*10/100));
			   }
			  if (document.getElementById('FloaterWindowTable'))
			    {
				var width = $('#FloaterWindowTable').width();
				$('#FloaterWindowTable').width(width*90/100);
				}
			  if (document.getElementById('FloaterWindowTableLeft'))
			    {
				var width = $('#FloaterWindowTableLeft').width();
				$('#FloaterWindowTableLeft').width(width*90/100);
				document.getElementById('FloaterWindowTable').height = "100%";
				document.getElementById('FloaterWindowTableLeft').height = "100%";
				/**
				if (document.getElementById('FloaterWindowTableLeft').offsetHeight > document.getElementById('FloaterWindowTable').offsetHeight)
				   {
				   document.getElementById('FloaterWindowTable').style.height = document.getElementById('FloaterWindowTableLeft').offsetHeight;
				   }
				else
				   {
				   document.getElementById('FloaterWindowTableLeft').style.height = document.getElementById('FloaterWindowTable').offsetHeight;
				   }
				if (document.getElementById('FloaterWindowTableLeft').offsetWidth > document.getElementById('FloaterWindowTable').offsetWidth)
				   {
				   document.getElementById('FloaterWindowTable').style.width = document.getElementById('FloaterWindowTableLeft').offsetWidth;
				   }
				else
				   {
				   document.getElementById('FloaterWindowTableLeft').style.width = document.getElementById('FloaterWindowTable').offsetWidth;
				   }
				**/
				document.getElementById('FloaterWindowTable').align = "left";
				}
			  //document.getElementById(sideImage).style.visibility = 'visible';
			  document.getElementById('MainSelectionTable').align="center";
			  }
			else if ((browserWidth != 0) && (browserWidth <= threshold))
			  {
			  // WE HIDE THE LEFT BOX AS THE BROWSERS WIDTH IS SMALL
			  document.getElementById(sideImage).style.visibility = 'hidden';
			  if (document.getElementById('AutoNumber2'))
			    {
			    $('#AutoNumber2').hide();
				}
			  
			  if (document.getElementById('FloaterWindowTDLeft'))
			    {
				$('#FloaterWindowTDLeft').hide();
				}	  
			  document.getElementById('FloaterWindowTDRight').width = '100%';
			  document.getElementById('FloaterWindowTDRight').align="center";
			  }
			else
				{
				// THIS IS FOR THE NORMAL BROWSER SIZE
				if ((document.getElementById('FloaterWindowTableLeft')) && (!chrome_test.test(navigator.userAgent.toLowerCase())))
				  {
				  if ($('#FloaterWindowTable').width() < $('#FloaterWindowTableLeft').width())
			        {
					document.getElementById('FloaterWindowTable').style.width = document.getElementById('FloaterWindowTableLeft').style.width;
				    }
			      else
			        {
					document.getElementById('FloaterWindowTableLeft').style.width = document.getElementById('FloaterWindowTable').style.width;
				    }
				
				
					//document.getElementById('FloaterWindowTable').width = "350";
					//document.getElementById('FloaterWindowTableLeft').width = "350px";
					//document.getElementById('FloaterWindowTable').height = "400px";
					//document.getElementById('FloaterWindowTableLeft').height = "400px";
					//document.getElementById('FloaterWindowTDRight').style.height = document.getElementById('FloaterWindowTDLeft').offsetHeight;
				    //document.getElementById('FloaterWindowTDLeft').align="";
			        //document.getElementById('FloaterWindowTDRight').align="";	
					//document.getElementById('AutoNumber1').align="center";
					//document.getElementById('MainSelectionTable').align="center";
				}  
				
				if (document.getElementById('HomePageSideImage'))
				  {
				     document.getElementById('HomePageSideImage').width = 350;
				  }
				if (cookie == null)
				  {
				  document.getElementById(sideImage).style.visibility = 'visible';
				  }
				$('#FloaterWindowTDLeft').show();
				$('#'+sideImage).show();
				if (tempRecentCarsHtml != null)
				  {
			      $('#AutoNumber2').show();
				  }
				}
			}
		//equalHeight($('#FloaterWindowTableA'));
		if (document.getElementById('FloaterWindowTDLeft'))
		   {
		   var leftHeight = $('#FloaterTableTDRight').height();
           $('#FloaterTableTDLeft').css({'height':leftHeight});
		   }

		if (CurrentImageSelected)
			{
			MoveSelector(CurrentImageSelected,CurrentColumn,CurrentRow)	// RESET THE LOCATION OF THE BLUE SURROUND SELECTOR, CurrentImageSelected,CurrentColumn,CurrentRow ARE ALL GLOBAL VARIABLES
			}
		}
	else
		{
		setTimeout('ResizeMainHomePageImage()',500);
		}		
	}

/////////////////////////////////////////////
// MOUSE POSITION CAPTURE ROUTINES - CODE IS MIRRORED IN HOMEPAGE.JS
// Global variables
var xMousePos = 0; // Horizontal position of the mouse on the screen
var yMousePos = 0; // Vertical position of the mouse on the screen
var xMousePosMax = 0; // Width of the page
var yMousePosMax = 0; // Height of the page
var yScroll = 2; // position of scroll bar

function captureMousePosition(e) {
    if (document.layers) {
        // When the page scrolls in Netscape, the event's mouse position
        // reflects the absolute position on the screen. innerHight/Width
        // is the position from the top/left of the screen that the user is
        // looking at. pageX/YOffset is the amount that the user has 
        // scrolled into the page. So the values will be in relation to
        // each other as the total offsets into the page, no matter if
        // the user has scrolled or not.
        xMousePos = e.pageX;
        yMousePos = e.pageY;
        xMousePosMax = window.innerWidth+window.pageXOffset;
        yMousePosMax = window.innerHeight+window.pageYOffset;
		yScroll = window.pageYOffset;
    } else if (document.all) {
        // When the page scrolls in IE, the event's mouse position 
        // reflects the position from the top/left of the screen the 
        // user is looking at. scrollLeft/Top is the amount the user
        // has scrolled into the page. clientWidth/Height is the height/
        // width of the current page the user is looking at. So, to be
        // consistent with Netscape (above), add the scroll offsets to
        // both so we end up with an absolute value on the page, no 
        // matter if the user has scrolled or not.
        xMousePos = window.event.x+document.body.scrollLeft;
        yMousePos = window.event.y+document.body.scrollTop;
        xMousePosMax = document.body.clientWidth+document.body.scrollLeft;
        yMousePosMax = document.body.clientHeight+document.body.scrollTop;
		//yScroll = document.body.scrollTop;
		yScroll = document.documentElement.scrollTop;
		
    } else if (document.getElementById) {
        // Netscape 6 behaves the same as Netscape 4 in this regard 
        xMousePos = e.pageX;
        yMousePos = e.pageY;
        xMousePosMax = window.innerWidth+window.pageXOffset;
        yMousePosMax = window.innerHeight+window.pageYOffset;
		yScroll = window.pageYOffset;
    }
}
// Set Netscape up to run the "captureMousePosition" function whenever
// the mouse is moved. For Internet Explorer and Netscape 6, you can capture
// the movement a little easier.
if (document.layers) { // Netscape
    document.captureEvents(Event.MOUSEMOVE);
    document.onmousemove = captureMousePosition;
} else if (document.all) { // Internet Explorer
    document.onmousemove = captureMousePosition;
} else if (document.getElementById) { // Netcsape 6
    document.onmousemove = captureMousePosition;
}

var FreezeScrollBar = -1;

function PopUpWindowFullScreen(anchor,URL) {
	{
	//document.getElementById('FloaterWindowMessageSpan').innerHTML = '<table border=0 id="PopUpTable"><tr><td STYLE="background-position: center;background-color:#FFFFFF; background-repeat:no-repeat;background-attachment:scroll" background="http://www.pelicanparts.com/graphics/big_spinner.gif"><IFRAME frameBorder="0" ID="PopUpIFrame" SRC="' + URL + '"></IFRAME></td></tr></table>';
	document.getElementById('FloaterWindowMessageSpan').innerHTML = '<table border=0 id="PopUpTable"><tr><td width=100% align=right><a href="#" onclick="HidePopUpWindow();return false" class="side_menu3"><img src="http://www.pelicanparts.com/graphics/orange_close.gif" width=15 height=16 border=0></a></td></tr><tr><td background="http://www.pelicanparts.com/graphics/Please_Wait.gif" STYLE="background-position: center;background-color:#FFFFFF; background-repeat:no-repeat;background-attachment:scroll"><IFRAME frameBorder="0" ID="PopUpIFrame" SRC="' + URL + '"></IFRAME></td></tr></table>';
	PosX = findPosX(document.getElementById(anchor));
	PosY = findPosY(document.getElementById(anchor));
//	if (NegativeYoffset != null) // USED TO RAISE SOME OF THE POPUP BOXES LIKE 3-DAY SHIPPING POPUP
//		{PosY = PosY - NegativeYoffset}
//	if (NegativeXoffset != null) 
//		{PosX = PosX - NegativeXoffset}
//alert(f_clientWidth() + ' ' + f_clientHeight());
	document.getElementById('FloaterWindow').style.left = parseInt(25 + f_scrollLeft()) + 'px';
	document.getElementById('FloaterWindow').style.top = parseInt(25 + f_scrollTop()) + 'px';
	
	document.getElementById('PopUpIFrame').width  = f_clientWidth()  - 100;
	document.getElementById('PopUpIFrame').height = f_clientHeight() - 115;
	
	document.getElementById('PopUpIFrame').width = document.getElementById('PopUpTable').offsetWidth;

//	FloaterWidth  = document.getElementById('FloaterWindowTable').offsetWidth;
//	FloaterHeight = document.getElementById('FloaterWindowTable').offsetHeight;
//	linkWidth  = document.getElementById(anchor).offsetWidth;
//	linkHeight = document.getElementById(anchor).offsetHeight;
//	if (PosX + linkWidth - FloaterWidth > 0) // OPEN ON THE LEFT
//		{document.getElementById('FloaterWindow').style.left = PosX + linkWidth - FloaterWidth;}
//	else	
//		{document.getElementById('FloaterWindow').style.left = PosX;}
//	if (PosY - FloaterHeight + 25 < yScroll)
//		{document.getElementById('FloaterWindow').style.top = yScroll + 5}
//	else if (PosY - FloaterHeight + 25 < 0)
//		{document.getElementById('FloaterWindow').style.top = 5}
//	else
//		{document.getElementById('FloaterWindow').style.top = PosY - FloaterHeight + 25;}

  	//document.getElementById('FloaterWindow').style.opacity = 0;
	//document.getElementById('FloaterWindow').style.filter = 'alpha(opacity = 0)';
	//document.getElementById('FloaterWindow').style.visibility = 'visible'
  	//document.getElementById('MainPageTable').style.opacity = 0;
  	//document.getElementById('MainPageTable').style.filter = 'alpha(opacity = 0)';
	//TimeToFade = 3500;
	//document.getElementById('FloaterWindow').FadeTimeLeft = TimeToFade;
	//setTimeout("FullWindowFade(" + new Date().getTime() + ",'IN')", 33);
	document.getElementById('FloaterWindow').style.visibility = 'visible'
	document.getElementById('MainPageTable').style.opacity = .25;
	document.getElementById('MainPageTable').style.filter = 'alpha(opacity = 25)';
	
	FreezeScrollBar = f_scrollTop();

//    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
//    document.body.scroll = "no"; // ie only
	}
}

function HidePopUpWindow() {
	// THIS ROUTINE WILL WILL FADE OUT THE WINDOW AND FADE IN THE BACKGROUND
	document.getElementById('FloaterWindow').style.visibility = 'hidden'
  	document.getElementById('MainPageTable').style.opacity = 1;
  	document.getElementById('MainPageTable').style.filter = 'alpha(opacity = 100)';

	FreezeScrollBar = -1;
	
//    document.documentElement.style.overflow = 'auto';  // firefox, chrome
//    document.body.scroll = "yes"; // ie only
	//document.getElementById('FloaterWindow').FadeTimeLeft = TimeToFade;
	//setTimeout("FullWindowFade(" + new Date().getTime() + ",'OUT')", 33);
	
}

function FullWindowFade(lastTick, command, FadeBackground){
  var curTick = new Date().getTime();
  var elapsedTicks = curTick - lastTick;
  //alert(elapsedTicks);

  window.status += ' ' + elapsedTicks;// + '(' + document.getElementById('FloaterWindow').FadeTimeLeft + ')';
  
  if(document.getElementById('FloaterWindow').FadeTimeLeft <= elapsedTicks)
  	{
	if (command == 'OUT')
		{
		document.getElementById('FloaterWindow').style.visibility = 'hidden'
	  	document.getElementById('FloaterWindow').style.opacity = 0;
  		document.getElementById('FloaterWindow').style.filter = 'alpha(opacity = 0)';
  		document.getElementById('MainPageTable').style.opacity = 1;
		document.getElementById('MainPageTable').style.filter = 'alpha(opacity = 100)';
		}
	else
		{
	  	document.getElementById('FloaterWindow').style.opacity = 1;
  		document.getElementById('FloaterWindow').style.filter = '';
		if (FadeBackground != null)
  			{		
	  		document.getElementById('MainPageTable').style.opacity = .25;
  			document.getElementById('MainPageTable').style.filter = 'alpha(opacity = 25)';
			}
		}
	return;
	}
  document.getElementById('FloaterWindow').FadeTimeLeft -= elapsedTicks;
  var newOpVal = document.getElementById('FloaterWindow').FadeTimeLeft/TimeToFade;
  if (command == 'IN')
  	{newOpVal = 1 - newOpVal;}
  document.getElementById('FloaterWindow').style.opacity = newOpVal;
  document.getElementById('FloaterWindow').style.filter = 'alpha(opacity = ' + (newOpVal*100) + ')';
  if (FadeBackground != 'N')
  	{
	newOpVal = 1 - newOpVal;
    document.getElementById('MainPageTable').style.opacity = .75 * newOpVal + .25;
  	document.getElementById('MainPageTable').style.filter = 'alpha(opacity = ' + (newOpVal*75 + 25) + ')';
	}
  setTimeout("FullWindowFade(" + curTick + ",'" + command + "')", 33);
}

// THESE ROUTINES CLEARLY DEFINE THE HEIGHT AND WIDTH (WITH SCROLLBARS) OF THE WINDOW ON ALL BROWSERS
	function f_clientWidth() {
		return f_filterResults (
			window.innerWidth ? window.innerWidth : 0,
			document.documentElement ? document.documentElement.clientWidth : 0,
			document.body ? document.body.clientWidth : 0
		);
	}
	function f_clientHeight() {
		return f_filterResults (
			window.innerHeight ? window.innerHeight : 0,
			document.documentElement ? document.documentElement.clientHeight : 0,
			document.body ? document.body.clientHeight : 0
		);
	}
	function f_scrollLeft() {
		return f_filterResults (
			window.pageXOffset ? window.pageXOffset : 0,
			document.documentElement ? document.documentElement.scrollLeft : 0,
			document.body ? document.body.scrollLeft : 0
		);
	}
	function f_scrollTop() {
		return f_filterResults (
			window.pageYOffset ? window.pageYOffset : 0,
			document.documentElement ? document.documentElement.scrollTop : 0,
			document.body ? document.body.scrollTop : 0
		);
	}
	function f_filterResults(n_win, n_docel, n_body) {
		var n_result = n_win ? n_win : 0;
		if (n_docel && (!n_result || (n_result > n_docel)))
			n_result = n_docel;
		return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
	}

function PopUpMessageNew(anchor,message,ImageSrc,NegativeYoffset,NegativeXoffset,ImageWidth,ImageHeight,ImageCount)
	{
	var Multiple_Image_Code = "";
	if (ImageSrc == null)
		{
		document.getElementById('FloaterWindowMessageSpan').innerHTML = '<table border=0 cellpadding=0 cellspacing=0 id="PopUpTable"><tr><td width=100% align=right><a href="#" onclick="HidePopUpWindow();return false" class="side_menu3"><img src="http://www.pelicanparts.com/graphics/orange_close_big.gif" width=30 height=30 border=0></a></td></tr><tr><td STYLE="background-position: center;background-color:#FFFFFF;">' + FloaterWindowMessage[message] + '</td></tr></table>';
		}
	else
		{
		if (ImageCount != null)
			{
			var image_thumb = ImageSrc.replace("Connect-Images","Connect-Thumbnails2");
			Multiple_Image_Code  = '<tr><td align=center><table border=0 cellpadding=3 cellspacing=3><tr>';
			Multiple_Image_Code += '<td><a href="#" onclick="document.getElementById(\'PopUpImageId\').src=\'' + ImageSrc + '\';return false;"><img style="border-color:#E0E0E0" border=1 src="' + image_thumb + '" width=75 height=56></a></td>';
			for (i=2;i<ImageCount+1;i++)
				{
				var image_name = ImageSrc.replace(".jpg","-Pic" + i + ".jpg");
				var image_thumb = image_name.replace("Connect-Images","Connect-Thumbnails2");
				Multiple_Image_Code += '<td><a href="#" onclick="document.getElementById(\'PopUpImageId\').src=\'' + image_name + '\';return false;"><img style="border-color:#E0E0E0" border=1 src="' + image_thumb + '" width=75 height=56></a></td>';
				}
			Multiple_Image_Code += '</tr></table></td></tr>'
			}
			
		if (ImageWidth != null && ImageHeight != null)
			{var HTML = '<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="100%" id="AutoNumber1"><tr><td width=100% align=right><a href="#" onclick="HidePopUpWindow();return false" class="side_menu3"><img src="http://www.pelicanparts.com/graphics/orange_close.gif" width=15 height=16 border=0></a></td></tr><tr><td align=center STYLE="background-position: center;background-color:#FFFFFF; background-repeat:no-repeat;background-attachment:scroll" background="http://www.pelicanparts.com/graphics/big_spinner.gif"><img onclick="HidePopUpWindow();return false" id="PopUpImageId" border=0 src="' + ImageSrc + '" width="' + ImageWidth + '" height="' + ImageHeight + '"></td></tr>' + Multiple_Image_Code + '</table>';}
		else
			{var HTML = '<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="100%" id="AutoNumber1"><tr><td width=100% align=right><a href="#" onclick="HidePopUpWindow();return false" class="side_menu3"><img src="http://www.pelicanparts.com/graphics/orange_close.gif" width=15 height=16 border=0></a></td></tr><tr><td align=center STYLE="background-position: center;background-color:#FFFFFF; background-repeat:no-repeat;background-attachment:scroll" background="http://www.pelicanparts.com/graphics/big_spinner.gif"><img onclick="HidePopUpWindow();return false" id="PopUpImageId" border=0 src="' + ImageSrc + '"></td></tr>' + Multiple_Image_Code + '</table>';}
		document.getElementById('FloaterWindowMessageSpan').innerHTML = HTML;
		}	
	PosX = findPosX(document.getElementById(anchor));
	PosY = findPosY(document.getElementById(anchor));

	if (NegativeYoffset != null) // USED TO RAISE SOME OF THE POPUP BOXES LIKE 3-DAY SHIPPING POPUP
		{PosY = PosY - NegativeYoffset}
	if (NegativeXoffset != null) 
		{PosX = PosX - NegativeXoffset}
	FloaterWidth  = document.getElementById('FloaterWindowTable').offsetWidth;
	FloaterHeight = document.getElementById('FloaterWindowTable').offsetHeight;
	linkWidth  = document.getElementById(anchor).offsetWidth;
	linkHeight = document.getElementById(anchor).offsetHeight;
	if (PosX + linkWidth - FloaterWidth > 0) // OPEN ON THE LEFT
		{document.getElementById('FloaterWindow').style.left = parseInt(PosX + linkWidth - FloaterWidth) + 'px';}
	else	
		{document.getElementById('FloaterWindow').style.left = parseInt(PosX) + 'px';}
	if (PosY - FloaterHeight + 25 < yScroll)
		{document.getElementById('FloaterWindow').style.top = parseInt(yScroll + 5) + 'px'}
	else if (PosY - FloaterHeight + 25 < 0)
		{document.getElementById('FloaterWindow').style.top = parseInt(5) + 'px'}
	else if (PosY - FloaterHeight + 25 + FloaterHeight > f_clientHeight() + yScroll)
		{document.getElementById('FloaterWindow').style.top = parseInt(f_clientHeight() - FloaterHeight + yScroll) + 'px';}
	else
		{document.getElementById('FloaterWindow').style.top = parseInt(PosY - FloaterHeight + 25) + 'px';}
	//document.title = f_clientHeight() + ":" + PosY + ":" + yScroll + ":" + FloaterHeight + ":";
	
	//	document.getElementById('PopUpIFrame').height = f_clientHeight() - 115;
  	//document.getElementById('FloaterWindow').style.opacity = 0;
	//document.getElementById('FloaterWindow').style.filter = 'alpha(opacity = 0)';
	//document.getElementById('FloaterWindow').style.visibility = 'visible'
	//document.getElementById('FloaterWindow').FadeTimeLeft = TimeToFade;
	//setTimeout("FullWindowFade(" + new Date().getTime() + ",'IN','N')", 33);
	document.getElementById('FloaterWindow').style.visibility = 'visible'
	document.getElementById('MainPageTable').style.opacity = .25;
	document.getElementById('MainPageTable').style.filter = 'alpha(opacity = 25)';
	}	

var SmoothScrollingTimer = null;
var SmoothScrollingCounter = 0;
var down = false;
function AdjustQuickLinks()
{
if (FreezeScrollBar != -1)
	{window.scrollTo(0, FreezeScrollBar)}

if (document.getElementById('QuickLinksDIV'))
	{
	var QuickLinksOffset = 7;
	QuickHomePosY 		= findPosY(document.getElementById('QuickLinksTD'));
	QuickDivPosY		= findPosY(document.getElementById('QuickLinksDIV'));
	
	if (document.getElementById('SideBarCarImageTable')) // NEW ELEMENTS WITH 2014 DESIGN
		{
		BlueBarTableOffset	= findPosY(document.getElementById('BlueBarTable')) + document.getElementById('BlueBarTable').offsetHeight + document.getElementById('SideBarCarImageTable').offsetHeight;
		}
	else if (document.getElementById('BlueBarTable'))
		{
		BlueBarTableOffset	= findPosY(document.getElementById('BlueBarTable')) + document.getElementById('BlueBarTable').offsetHeight;
		}
	else
		{
		BlueBarTableOffset = 143 // IN CASE THE ELEMENT ISN'T DEFINED - USED FOR TRANSITIONING
		}		
	if (f_scrollTop() > (findPosY(document.getElementById('BottomBarTD')) - document.getElementById('QuickLinksDIV').offsetHeight - 2))
		{
		//document.title="1 " + f_scrollTop();
		//document.getElementById('QuickLinksDIV').style.top = findPosY(document.getElementById('BottomBarTD')) - document.getElementById('QuickLinksDIV').offsetHeight - 2;
		//document.getElementById('QuickLinksDIV').style.position = 'absolute';
		var pos = findPosY(document.getElementById('BottomBarTD')) - document.getElementById('QuickLinksDIV').offsetHeight - 2;
		$('#QuickLinksDIV').css({
                position: 'absolute',
                top: pos
            });
		}
	else if (f_scrollTop() > BlueBarTableOffset)
	//else if (f_scrollTop() > 0)
		{
		//document.title="2 " + f_scrollTop();
		//alert("2 " + f_scrollTop());
		//document.getElementById('QuickLinksDIV').style.position = 'fixed';
		//document.getElementById('QuickLinksDIV').style.top = 0;

		if (f_scrollLeft() > 0)
			{
			var pos = f_scrollTop() - BlueBarTableOffset;
			$('#QuickLinksDIV').css({
	                position: 'relative',
	                top: pos
	            });
			}
		else
			{	
			$('#QuickLinksDIV').css({
	                position: 'fixed',
	                top: 0
	            });
			down = true;
			}
		//alert(document.getElementById('QuickLinksDIV').style.position);
		//alert(document.getElementById('QuickLinksDIV').style.top);
		}
	else
		{
		//document.title="3 " + f_scrollTop();
		if (down == false)
		  {
		  $('#QuickLinksDIV').css({
                position: 'relative',
                top: 0
            })
		  }
		else
		  {
		  // SCROLLED UP TO THE TOP
		  //var pos = findPosY(document.getElementById('BottomBarTD')) - document.getElementById('QuickLinksDIV').offsetHeight - 2;
		  $('#QuickLinksDIV').css({
                position: 'absolute',
                top: BlueBarTableOffset
            });
		  }
		}
	}
// LAST CATEGORY ON PAGE SECTION IS SCROLLING UP TO THE TOP?
if (document.getElementById('LastCategoryOnPage'))
	{
	if (findPosY(document.getElementById('LastCategoryOnPage')) - f_scrollTop() < 0 && f_clientHeight() + f_scrollTop() > findPosY(document.getElementById('TransparentBottomImage'))) // IS THE LAST CATEGORY SCROLLING UP TO THE BOTTOM
		{
		if (navigator.userAgent.indexOf("Firefox") == -1)
			{
			if (SmoothScrollingTimer == null)
				{SmoothScrollingTimer = self.setInterval("SmoothScrolling()",25);}
			}
	    else if (document.getElementById) // FIREFOX - MOZILLA NETSCAPE DOM
			{
			// NOW FIGURE OUT WHERE TO SNAP TO
			// IF THE DISTANCE BETWEEN THE LAST CATEGORY AND THE TOP OF THE BOTTOM IMAGE IS GREATER THAN THE CLIENT HEIGHT, THEN SNAP TO THE BOTTOM OF THE SCREEN
			if (findPosY(document.getElementById('TransparentBottomImage')) - findPosY(document.getElementById('LastCategoryOnPage')) > f_clientHeight())
				{window.scrollTo(f_scrollLeft(), findPosY(document.getElementById('TransparentBottomImage')) - f_clientHeight())}
			else // OTHERWISE, SNAP TO THE TOP OF THE LAST CATEGORY
				{window.scrollTo(f_scrollLeft(), findPosY(document.getElementById('LastCategoryOnPage')));}
			}	
		}
	}
}

function SmoothScrolling() // NOT CALLED FOR FIREFOX
{
if (findPosY(document.getElementById('LastCategoryOnPage')) - f_scrollTop() < 0 && f_clientHeight() + f_scrollTop() > findPosY(document.getElementById('TransparentBottomImage'))) // IS THE LAST CATEGORY SCROLLING UP TO THE BOTTOM
	{
	if (findPosY(document.getElementById('TransparentBottomImage')) - findPosY(document.getElementById('LastCategoryOnPage')) > f_clientHeight())
		{
		final_position = findPosY(document.getElementById('TransparentBottomImage')) - f_clientHeight();
		current_position = f_scrollTop();
		window.scrollTo(f_scrollLeft(), Math.round(final_position - (final_position - current_position)/1.5));
		}
	else // OTHERWISE, SNAP TO THE TOP OF THE LAST CATEGORY
		{
		final_position = findPosY(document.getElementById('LastCategoryOnPage'));
		current_position = f_scrollTop();
		window.scrollTo(f_scrollLeft(), Math.round(final_position - (final_position - current_position)/1.5));
		}
	SmoothScrollingCounter++;
	if (SmoothScrollingCounter > 10)
		{
		clearInterval(SmoothScrollingTimer);
		SmoothScrollingTimer = null;
		SmoothScrollingCounter = 0;
		}
	//window.status = SmoothScrollingCounter;	
	}
}

function equalHeight(group) {
	var tallest = 0;
	group.each(function() {
		var thisHeight = $(this).height();
		if(thisHeight > tallest) {
			tallest = thisHeight;
		}
	});
	group.height(tallest);
}

// NEW CODE HERE FOR THE 'BROWSE CATALOG BY VEHICLE' SECTIONS AT THE BOTTOM OF EACH PAGE
function BrowseCatalogBy(){
	if ($('#BrowseCatalogBy-header').hasClass('BrowseCatalogBy-collapsed'))
	{
		$('#BrowseCatalogBy-header').removeClass('BrowseCatalogBy-collapsed');
		$('#BrowseCatalogBy-header').addClass('BrowseCatalogBy-expanded');
		$('#BrowseCatalogBy-outer').show();
	}
	else
	{
		$('#BrowseCatalogBy-header').removeClass('BrowseCatalogBy-expanded');
		$('#BrowseCatalogBy-header').addClass('BrowseCatalogBy-collapsed');
		$('#BrowseCatalogBy-outer').hide();
	}
}
	
// CODE HERE IS SET TO RUN WHEN THE JAVASCRIPT FILE IS CALLED AND COMPLETELY READ
PopulateRecentCarsDropDownMenu();
// ResizeMainHomePageImage(); // THIS IS DISABLED BECAUSE THIS JS FILE IS CALLED BY EVERY PAGE IN THE CATALOG - NOT JUST THE HOME PAGE (Wayne)
window.onscroll = AdjustQuickLinks;
