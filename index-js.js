(function () {

    var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    var startYear = 2010, endYear = 2025;

    var weekNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    createCalenderHeader();

    createCalenderContainer();

    prepareMonthHtml();

    prepareYearHtml();

    prepareWeekHtml();

    createCalender();

    allEvents();

    function createCalenderHeader() {
        document.body.innerHTML = '<div class="container-wrapper"><div id="container" class="container"><div id="header" class="header"></div></div></div>';
        document.getElementById('header').innerHTML = 
        `
        <h1>Calendar</h1> 
            <div class="arrow-link"><a href="javascript:void(0)" id="previous-month"><i class="fa fa-angle-left" aria-hidden="true"></i></a></div>
            <div class="dropdown-wrap">
            <select id="month-select" class="month-select">
            </select>
            <select id="year-select" class="month-select">
            </select>
            </div>
            <div class="arrow-link"><a href="javascript:void(0)" id="next-month"><i class="fa fa-angle-right" aria-hidden="true"></i></a></div>
        `;
    }

    function createCalenderContainer() {
        document.getElementById('container').innerHTML += `
        <div id="main-section" class="main-section">
            <div id="calender-wrap" class="calender-wrap">
                <div id="week-heading" class="week-heading clearfix">
                </div>
                <div id="all-weeks" class="all-weeks clearfix">
                </div>
            </div>
        </div>`;
    }  

    function prepareMonthHtml() {
        for (var i = 0; i < monthNames.length; i++) {
            document.getElementById('month-select').innerHTML += `<option value="${i}">${monthNames[i]}</option>`;
        }
    }
    
    function prepareYearHtml() {
        for (var i = startYear; i <= endYear; i++) {
            document.getElementById('year-select').innerHTML += `<option value="${i}">${i}</option>`;
        }
    }
    
    function prepareWeekHtml() {
        for (var i = 0; i < weekNames.length; i++) {
            document.getElementById('week-heading').innerHTML += `<div>${weekNames[i]}</div>`;
        }
    }
    
    function createCalender() {
        var d = new Date();
        var month = d.getMonth();
        var year = d.getFullYear();
        changeYearAndMonth(year, month)
    }  

    function changeYearAndMonth(year, month) {
        document.getElementById("month-select").value = month;
        document.getElementById("year-select").value = year;
        createTile(year, month);
    }

    function allEvents() {
        document.getElementById('month-select').addEventListener("change", function() {
            selectYearMonth();
        })
        
        document.getElementById('year-select').addEventListener("change", function() {
            selectYearMonth();
        })
    
        document.getElementById('previous-month').addEventListener("click", function() {
            previousMonth();
        })
    
        document.getElementById('next-month').addEventListener("click", function() {
            nextMonth();
        }) 
    }

    function selectYearMonth() {
        var month = document.getElementById("month-select").value;
        var year = document.getElementById("year-select").value;
        createTile(year, month);
        // document.getElementById('month-select').options[month].style.padding=0;
    }

    function nextMonth() {
        var previousMonth = document.getElementById("month-select").value;
        var previousYear = document.getElementById("year-select").value;
        var previousDate = new Date(previousYear, previousMonth, 1);
        previousDate.setMonth(previousDate.getMonth()+1);
        var month = previousDate.getMonth();
        var year = previousDate.getFullYear();
        changeYearAndMonth(year, month) 
    }

    function previousMonth() {
        var previousMonth = document.getElementById("month-select").value;
        var previousYear = document.getElementById("year-select").value;
        var previousDate = new Date(previousYear, previousMonth, 1);
        previousDate.setMonth(previousDate.getMonth()-1);
        var month = previousDate.getMonth();
        var year = previousDate.getFullYear();
        changeYearAndMonth(year, month)
    }

    function createTile(year, month) {
        document.getElementById('all-weeks').innerHTML = '';
        var dates = 32 - new Date(year, month, 32).getDate();
        for (var i = 0; i < dates; i++) {
            if (i == 0) {
                previousMonthDates(year, month);
            }
            var currentDate = new Date();
            if ((i+1) == currentDate.getDate() && currentDate.getMonth() == month && currentDate.getFullYear() == year) {
                document.getElementById('all-weeks').innerHTML += `<div class="day-of-week active">${i+1}</div>`; 
            } else {
                document.getElementById('all-weeks').innerHTML += `<div class="day-of-week">${i+1}</div>`; 
            }
            if (i == (dates - 1)) {
                nextMonthDates();
            }
        }
    }

    function previousMonthDates(year, month) {
        var firstDay = (new Date(year, month)).getDay();
        var currentMonth = new Date(year, month, 1);
        currentMonth.setMonth(currentMonth.getMonth()-1);
        var previousMonth = currentMonth;
        var previousFullYear = previousMonth.getFullYear();
        var previousMonthNumber = previousMonth.getMonth();
        var datesOfPreviousMonth = 32 - new Date(previousFullYear, previousMonthNumber, 32).getDate();
        let lastDayOfPreviousMonth = (new Date(previousFullYear, previousMonthNumber, datesOfPreviousMonth)).getDate();
        for (var j = (firstDay - 1); j >= 0; j--) {
            document.getElementById('all-weeks').innerHTML += `<div class="day-of-week greyed-tile">${lastDayOfPreviousMonth-j}</div>`;      
        }
    }

    function nextMonthDates() {
        var numberOfTiles = (document.getElementsByClassName('day-of-week')).length;
        var divisionBySeven = Math.ceil(numberOfTiles/7);
        var multipleOfSeven = divisionBySeven * 7;
        var numberOfNewTiles = multipleOfSeven - numberOfTiles;
        for (var j = 0; j < numberOfNewTiles; j++) {
            document.getElementById('all-weeks').innerHTML += `<div class="day-of-week greyed-tile">${j+1}</div>`;      
        }
    }

})();