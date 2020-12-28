(function () {

    var container = document.createElement("div");
    document.body.appendChild(container);
    container.setAttribute('id','container');
    container.setAttribute('class','container');

    var header = document.createElement("div");
    container.appendChild(header);
    header.setAttribute('id','header');
    header.setAttribute('class','header');

    document.getElementById('header').innerHTML = '<h1>Calender</h1>';

    var arrowLinkLt = document.createElement("div");
    header.appendChild(arrowLinkLt);
    arrowLinkLt.setAttribute('class','arrow-link');

    var arrowLinkAnchorLt = document.createElement("a");
    arrowLinkLt.appendChild(arrowLinkAnchorLt);
    arrowLinkAnchorLt.setAttribute('href','javascript:void(0)');
    arrowLinkAnchorLt.setAttribute('id','last_month');
    arrowLinkAnchorLt.innerHTML = '&lt;';

    var monthSelect = document.createElement("select");
    header.appendChild(monthSelect);
    monthSelect.setAttribute('class','month-select');
    monthSelect.setAttribute('id','month-select');

    var yearSelect = document.createElement("select");
    header.appendChild(yearSelect);
    yearSelect.setAttribute('class','month-select');
    yearSelect.setAttribute('id','year-select');

    var arrowLinkGt = document.createElement("div");
    header.appendChild(arrowLinkGt);
    arrowLinkGt.setAttribute('class','arrow-link');

    var arrowLinkAnchorGt = document.createElement("a");
    arrowLinkGt.appendChild(arrowLinkAnchorGt);
    arrowLinkAnchorGt.setAttribute('href','javascript:void(0)');
    arrowLinkAnchorGt.setAttribute('id','next_month');
    arrowLinkAnchorGt.innerHTML = '&gt;';

    var calenderSection = document.createElement("div");
    container.appendChild(calenderSection);
    calenderSection.setAttribute('id','main-section');
    calenderSection.setAttribute('class','main-section');

    var calenderWrap = document.createElement("div");
    calenderSection.appendChild(calenderWrap);
    calenderWrap.setAttribute('class','calender-wrap');
    calenderWrap.setAttribute('id','calender-wrap');

    var weekHeading = document.createElement("div");
    calenderWrap.appendChild(weekHeading);
    weekHeading.setAttribute('class','week-heading clearfix');
    weekHeading.setAttribute('id','week-heading');

    var allWeeks = document.createElement("div");
    calenderWrap.appendChild(allWeeks);
    allWeeks.setAttribute('class','all-weeks clearfix');
    allWeeks.setAttribute('id','all-weeks');

    var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    for(var i = 0; i < monthNames.length; i++){
        var monthParent = document.getElementById('month-select');
        var monthChild = document.createElement("option");
        var monthChildText = document.createTextNode(monthNames[i]);
        monthChild.value = i;
        monthChild.appendChild(monthChildText);
        monthParent.appendChild(monthChild);
    }

    var yearNames = ['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'];
    for(var i = 0; i < yearNames.length; i++){
        var yearParent = document.getElementById('year-select');
        var yearChild = document.createElement("option");
        var yearChildText = document.createTextNode(yearNames[i]);
        yearChild.value = yearNames[i];
        yearChild.appendChild(yearChildText);
        yearParent.appendChild(yearChild);
    }

    var weekNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    for(var i = 0; i < weekNames.length; i++){
        var weekParent = document.getElementById('week-heading');
        var weekChild = document.createElement("div");
        var weekChildText = document.createTextNode(weekNames[i]);
        weekChild.appendChild(weekChildText);
        weekParent.appendChild(weekChild);
    }

    for(var i = 0; i < 6; i++){
        var weekDayParent = document.getElementById('all-weeks');
        var weekDayChild = document.createElement("div");
        weekDayChild.setAttribute("class",'week');
        weekDayChild.setAttribute("id",`week-${i+1}`);
        weekDayParent.appendChild(weekDayChild);
    }

    var d = new Date();
    var today = d.getDate()
    var month = d.getMonth();
    var year = d.getFullYear();

    document.getElementById("month-select").selectedIndex = month;
    document.getElementById("year-select").value = year;

    var weeks = getDayData(year,month);

    for(var i = 0; i < 7; i++){
        
        for(var j = 0; j < weeks[i].length; j++ ){

            var dayTile = document.createElement("div");
            var tileDate = document.createTextNode(weeks[i][j]);
            if(weeks[i][j] == ""){
                dayTile.setAttribute("class","day-of-week-empty");
            }else{
                dayTile.setAttribute("class","day-of-week");
            }
            dayTile.appendChild(tileDate);
            var parentElement = document.getElementById(`week-${j+1}`);
            parentElement.appendChild(dayTile);
            if(weeks[i][j] == today) {
                dayTile.setAttribute('class','active');
            }

        }

    }   

    function getDayData(year,month){

        var dates = new Date(year, month, 0).getDate();
        var days = [];

        for(var i = 0; i <= dates; i++){
            var eachDay = new Date(year,month,i+1);
            if(eachDay.getMonth() == month){
                days.push(eachDay);
            } 
        }

        var weeks = {0:[],1:[],2:[],3:[],4:[],5:[]};
        for(var j = 0; j < 7; j++){
            var tempArray = [];
            days.forEach(days => {
                if(days.getDay() == j){  
                    tempArray.push(days.getDate()) 
                    weeks[j] =  tempArray;
                }
            })
        }


        for(var i = 6; i >= 0; i--){

            if(weeks[i] && weeks[i-1]){

                if(weeks[i][0] < weeks[i-1][0]){
                    weeks[i-1].unshift("");
                }

            }    

        } 
        return weeks;
    }

    function create_tile(year,month){

        var activeElement = document.getElementsByClassName("active");
        if(activeElement[0]){
            activeElement[0].classList.remove("active");
        }

        for(var i = 1; i < 7; i++){
            var emptyElement = document.getElementById(`week-${i}`);
            emptyElement.innerHTML = '';
        }

        var weeks = getDayData(year,month);

        for(var i = 0; i < 7; i++){
            
            for(var j = 0; j < weeks[i].length; j++ ){
    
                var dayTile = document.createElement("div");
                var tileDate = document.createTextNode(weeks[i][j]);
                if(weeks[i][j] == ""){
                    dayTile.setAttribute("class","day-of-week-empty");
                }else{
                    dayTile.setAttribute("class","day-of-week");
                }
                dayTile.appendChild(tileDate);
                var parentElement = document.getElementById(`week-${j+1}`);
                parentElement.appendChild(dayTile);
    
                var currentDate = new Date();
    
                if(weeks[i][j] == currentDate.getDate() && currentDate.getMonth() == month && currentDate.getFullYear() == year) {
                    dayTile.setAttribute('class','active');
                }
    
            }
    
        } 
    }


    function select_year_month(){
        var month = document.getElementById("month-select").value;
        var year = document.getElementById("year-select").value;
        
        create_tile(year,month);
    
    }

    function next_month(){

        var oldMonth = document.getElementById("month-select").value;
        var oldYear = document.getElementById("year-select").value;

        var oldDate = new Date(oldYear,oldMonth,1);

        oldDate.setMonth(oldDate.getMonth()+1);

        var month = oldDate.getMonth();
        var year = oldDate.getFullYear();

        document.getElementById("month-select").selectedIndex = month;
        document.getElementById("year-select").value = year;
        
        create_tile(year,month);
        
    }

    function last_month(){

        var oldMonth = document.getElementById("month-select").value;
        var oldYear = document.getElementById("year-select").value;

        var oldDate = new Date(oldYear,oldMonth,1);

        oldDate.setMonth(oldDate.getMonth()-1);

        var month = oldDate.getMonth();
        var year = oldDate.getFullYear();

        document.getElementById("month-select").selectedIndex = month;
        document.getElementById("year-select").value = year;
        
        create_tile(year,month);

    }

    document.getElementById('month-select').addEventListener("change",function(){
        select_year_month();
    })
    
    document.getElementById('year-select').addEventListener("change",function(){
        select_year_month();
    })

    document.getElementById('last_month').addEventListener("click",function(){
        last_month();
    })

    document.getElementById('next_month').addEventListener("click",function(){
        next_month();
    })
    
})();