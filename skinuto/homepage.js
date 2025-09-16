
function switchOn(imgName) {
  eval ('document.' + imgName + '.src = "images/drivewerks/' + imgName + '_On.gif"');
}
function switchOff(imgName) {
  eval ('document [imgName].src = "images/drivewerks/transparent.gif"');  }

function popUp(url) {
sealWin=window.open(url,"win",'toolbar=0,location=0,directories=0,status=1,menubar=1,scrollbars=1,resizable=1,width=700,height=800');
self.name = "mainWin";
}

function saveCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString()
	}
	else
		expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
	var nameEQ = name + "="
	var ca = document.cookie.split(';')
	for(var i=0;i<ca.length;i++)
		{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length)
		if (c.indexOf(nameEQ) == 0)
			{
			out = "+"; // replace this
			add = " "; // with this
			temp = "" + c.substring(nameEQ.length,c.length)
			while (temp.indexOf(out)>-1) {
				pos= temp.indexOf(out);
				temp = "" + (temp.substring(0, pos) + add + 
				temp.substring((pos + out.length), temp.length));
				}
			return temp;	
			}
		}
	return null;
	}

function deleteCookie(name) {
	saveCookie(name,"",-1);
}

function init(){

//saveCookie('CurrentYEAR','1993',1);
//saveCookie('CurrentMAKE','BMW',1);
//saveCookie('CurrentMODEL','325is',1);

//saveCookie('YEAR1','1998',1);
//saveCookie('MAKE1','Nissan',1);
//saveCookie('MODEL1','Pathfinder',1);

//saveCookie('YEAR2','1993',1);
//saveCookie('MAKE2','BMW',1);
//saveCookie('MODEL2','325is',1);

//saveCookie('YEAR3','1974',1);
//saveCookie('MAKE3','Porsche',1);
//saveCookie('MODEL3','914-6',1);

//saveCookie('YEAR4','1988',1);
//saveCookie('MAKE4','Buick',1);
//saveCookie('MODEL4','Skylark',1);

CheckCookie();

}

function CheckCookie(){

var CurrentCookieMake = readCookie('CurrentMAKE');
var CurrentCookieYear = readCookie('CurrentYEAR');
var CurrentCookieModel = readCookie('CurrentMODEL');
var CurrentCookieModel_Id = readCookie('CurrentMODEL_ID');
var CurrentCookieMake_Id = readCookie('CurrentMAKE_ID');

var YourCar = '';
if (CurrentCookieYear != null){YourCar = CurrentCookieYear + ' '}
if (CurrentCookieMake != null){YourCar = YourCar + CurrentCookieMake + ' '}
if (CurrentCookieModel != null){YourCar = YourCar + CurrentCookieModel}

if (CurrentCookieYear != null && CurrentCookieMake != null && CurrentCookieModel != null)
	{
	document.all.SelectCar.innerHTML = YourCar + '<br><a class="VehicleSelect" href="http://www.drivewerks.com/cgi-bin/ppexpress/ppe_drivewerks.cgi?command=SelectCar">Change Vehicle</a>';
	var PreviousCar = '<select onChange="ChangePrevCar();" NAME="PrevCar" style="width: 120px; font-family: Verdana; font-style: normal; font-size: 6pt" size="1">'
	PreviousCar += '<option>Previous Cars</option>';
	for (i=1;i<6;i++)
		{
		eval ("var MAKE = readCookie('MAKE" + i + "')");
		eval ("var MODEL = readCookie('MODEL" + i + "')");
		eval ("var YEAR = readCookie('YEAR" + i + "')");
		if (YEAR != null){YEAR = YEAR.substr(2,2);}
		if (MAKE != null)
			{
			PreviousCar += '<option value = ' + i + '>' + YEAR + ' ' + MAKE + ' ' + MODEL + '</option>';
			}
		}
	document.all.PreviousCar.innerHTML = PreviousCar + '</select>';
	document.all.MakeMessage.innerHTML = 'Your Car:'; 
	}
}
function ChangePrevCar(){
	i = ChooseCar.PrevCar.value;
	eval ("var MAKE = readCookie('MAKE" + i + "')");
	eval ("var MODEL = readCookie('MODEL" + i + "')");
	eval ("var YEAR = readCookie('YEAR" + i + "')");
	eval ("var MODEL_ID = readCookie('MODEL_ID" + i + "')");	
	eval ("var MAKE_ID = readCookie('MAKE_ID" + i + "')");

	var CurrentYEAR = readCookie('CurrentYEAR');
	var CurrentMAKE = readCookie('CurrentMAKE');
	var CurrentMODEL = readCookie('CurrentMODEL');
	var CurrentMODEL_ID = readCookie('CurrentMODEL_ID');
	var CurrentMAKE_ID = readCookie('CurrentMAKE_ID');				
	
	saveCookie('CurrentYEAR',YEAR,1);
	saveCookie('CurrentMAKE',MAKE,1);
	saveCookie('CurrentMODEL',MODEL,1);
	saveCookie('CurrentMODEL_ID',MODEL_ID,1);
	saveCookie('CurrentMAKE_ID',MAKE_ID,1);
	
	eval("saveCookie('MAKE" + i + "',CurrentMAKE,1)");
	eval("saveCookie('YEAR" + i + "',CurrentYEAR,1)");	
	eval("saveCookie('MODEL" + i + "',CurrentMODEL,1)");
	eval("saveCookie('MODEL_ID" + i + "',CurrentMODEL_ID,1)");
	eval("saveCookie('MAKE_ID" + i + "',CurrentMAKE_ID,1)");
	CheckCookie();
}

function zoom_popup(){
    page = 'http://www.drivewerks.com/cgi-bin/zoom_pic/zoom_pic3.cgi?PW=450&PH=337&GS=4&CF=main&ACT=display&COL=JPM&PIC=PEL-020-055-99';
    target_window = window.open(page,'target_window','resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,height=550,width=600');
}
