(function () {

    var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    var startYear = 2010, endYear = 2025;

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
        <div class="arrow-link"><a href="javascript:void(0)" id="previous-month"><i class="fa fa-angle-left" aria-hidden="true"></i></a></div>
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

        for(var i = startYear; i <= endYear; i++) {
            var yearParent = document.getElementById('year-select');
            var yearChild = document.createElement("option");
            var yearChildText = document.createTextNode(i);
            yearChild.value = i;
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
    
        document.getElementById('previous-month').addEventListener("click",function(){
            previousMonth();
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

    function previousMonth() {

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

    function createTile(year,month) {

        var clearAllWeeks = document.getElementById('all-weeks');
        clearAllWeeks.innerHTML = '';

        let firstDay = (new Date(year, month)).getDay();

        var dates = 32 - new Date(year, month, 32).getDate();

        for(var i = 0; i < dates; i++){

            if(i == 0){
                for(var j = 0; j < firstDay; j++){

                    var dayTile = document.createElement("div");
                    dayTile.setAttribute("class","day-of-week-empty");
                    var parentElement = document.getElementById('all-weeks');
                    parentElement.appendChild(dayTile);
                            
                }
            }

            var dayTile = document.createElement("div");
            var tileDate = document.createTextNode(i+1);
            dayTile.setAttribute("class","day-of-week");
            dayTile.appendChild(tileDate);
            var parentElement = document.getElementById('all-weeks');
            parentElement.appendChild(dayTile);

            var currentDate = new Date();
            if((i+1) == currentDate.getDate() && currentDate.getMonth() == month && currentDate.getFullYear() == year) {
                dayTile.setAttribute('class','day-of-week active');
            }
        }
    }
    
})();