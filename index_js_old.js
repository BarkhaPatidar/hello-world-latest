(function () {

    var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    var yearNames = ['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'];

    var weekNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    createCalenderHeader();

    createCalenderContainer();

    createMonthWeekDay();

    createCalender();

    allEvents();

    function createCalenderHeader() {

        document.body.innerHTML = '<div id="container" class="container"><div id="header" class="header"></div></div>';

        document.getElementById('header').innerHTML = 
        `
        <h1>Calender</h1> 
        <div class="arrow-link"><a href="javascript:void(0)" id="last-month"><i class="fa fa-angle-left" aria-hidden="true"></i></a></div>
        <select id="month-select" class="month-select">

        </select>
        <select id="year-select" class="month-select">
        
        </select>
        <div class="arrow-link"><a href="javascript:void(0)" id="next-month"><i class="fa fa-angle-right" aria-hidden="true"></i></a></div>
        `;
    }

    function createCalenderContainer() {

        var calenderSection = document.createElement("div");
        document.getElementById('container').appendChild(calenderSection);
        calenderSection.setAttribute('id','main-section');
        calenderSection.setAttribute('class','main-section');

        calenderSection.innerHTML = 
        `
        <div id="calender-wrap" class="calender-wrap">
            <div id="week-heading" class="week-heading clearfix">

            </div>
            <div id="all-weeks" class="all-weeks clearfix">

            </div>
        </div>
        `;
        
    }  

    function createMonthWeekDay() {

        for(var i = 0; i < monthNames.length; i++) {
            var monthParent = document.getElementById('month-select');
            var monthChild = document.createElement("option");
            var monthChildText = document.createTextNode(monthNames[i]);
            monthChild.value = i;
            monthChild.appendChild(monthChildText);
            monthParent.appendChild(monthChild);
        }

        for(var i = 0; i < yearNames.length; i++) {
            var yearParent = document.getElementById('year-select');
            var yearChild = document.createElement("option");
            var yearChildText = document.createTextNode(yearNames[i]);
            yearChild.value = yearNames[i];
            yearChild.appendChild(yearChildText);
            yearParent.appendChild(yearChild);
        }

        for(var i = 0; i < weekNames.length; i++) {
            var weekParent = document.getElementById('week-heading');
            var weekChild = document.createElement("div");
            var weekChildText = document.createTextNode(weekNames[i]);
            weekChild.appendChild(weekChildText);
            weekParent.appendChild(weekChild);
        }

        for(var i = 0; i < 6; i++) {
            var weekDayParent = document.getElementById('all-weeks');
            var weekDayChild = document.createElement("div");
            weekDayChild.setAttribute("class",'week');
            weekDayChild.setAttribute("id",`week-${i+1}`);
            weekDayParent.appendChild(weekDayChild);
        }
    }
    
    function createCalender() {

        var d = new Date();
        var month = d.getMonth();
        var year = d.getFullYear();
        
        document.getElementById("month-select").selectedIndex = month;
        document.getElementById("year-select").value = year;

        createTile(year,month);

    }  

    function allEvents() {

        document.getElementById('month-select').addEventListener("change",function(){
            selectYearMonth();
        })
        
        document.getElementById('year-select').addEventListener("change",function(){
            selectYearMonth();
        })
    
        document.getElementById('last-month').addEventListener("click",function(){
            lastMonth();
        })
    
        document.getElementById('next-month').addEventListener("click",function(){
            nextMonth();
        })
        
    }

    function selectYearMonth() {

        var month = document.getElementById("month-select").value;
        var year = document.getElementById("year-select").value;
        
        createTile(year,month);
    
    }

    function nextMonth() {

        var previousMonth = document.getElementById("month-select").value;
        var previousYear = document.getElementById("year-select").value;

        var previousDate = new Date(previousYear,previousMonth,1);

        previousDate.setMonth(previousDate.getMonth()+1);

        var month = previousDate.getMonth();
        var year = previousDate.getFullYear();

        document.getElementById("month-select").selectedIndex = month;
        document.getElementById("year-select").value = year;
        
        createTile(year,month);
        
    }

    function lastMonth() {

        var previousMonth = document.getElementById("month-select").value;
        var previousYear = document.getElementById("year-select").value;

        var previousDate = new Date(previousYear,previousMonth,1);

        previousDate.setMonth(previousDate.getMonth()-1);

        var month = previousDate.getMonth();
        var year = previousDate.getFullYear();

        document.getElementById("month-select").selectedIndex = month;
        document.getElementById("year-select").value = year;
        
        createTile(year,month);

    }

    function getDayData(year,month) {

        var dates = 32 - new Date(year, month, 32).getDate();

        var weeks = {0:[]};
        for(var j = 0; j < 7; j++){
            var tempDays = [];
            for(var i = 0; i < dates; i++){
                var eachDay = new Date(year,month,i+1);
                if(eachDay.getMonth() == month){
                    if(eachDay.getDay() == j){  
                        tempDays.push(eachDay.getDate()) 
                        weeks[j] =  tempDays;
                    }
                }   
            }
            if(weeks[j]){
                for(var k = 1; k <= weekNames.length; k++){
                    if(weeks[j-k]){
                        if(weeks[j][0] < weeks[j-k][0]){
                            weeks[j-k].unshift("");
                        }
                    } 
                }
            }
        }
        return weeks;
    }

    function createTile(year,month) {

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

    
})();