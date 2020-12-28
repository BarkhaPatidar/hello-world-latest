var main_div = document.createElement("div");
document.body.appendChild(main_div);
main_div.setAttribute('id','container');
main_div.setAttribute('class','container');

var title_div = document.createElement("div");
main_div.appendChild(title_div);
title_div.setAttribute('id','title-section');
title_div.setAttribute('class','title-section');

document.getElementById('title-section').innerHTML = 
`
<h1>Calender</h1> 
<div class="arrow-link"><a href="javascript:void(0)"  onclick="last_month()">&lt;</a></div>
<select id="month-select" class="month-select">
    <option value="0">January</option>
    <option value="1">February</option>
    <option value="2">March</option>
    <option value="3">April</option>
    <option value="4">May</option>
    <option value="5">June</option>
    <option value="6">July</option>
    <option value="7">August</option>
    <option value="8">September</option>
    <option value="9">October</option>
    <option value="10">November</option>
    <option value="11">December</option>
</select>
<select id="year-select" class="month-select">
    <option value="2015">2015</option>
    <option value="2016">2016</option>
    <option value="2017">2017</option>
    <option value="2018">2018</option>
    <option value="2019">2019</option>
    <option value="2020">2020</option>
    <option value="2021">2021</option>
    <option value="2022">2022</option>
    <option value="2023">2023</option>
    <option value="2024">2024</option>
    <option value="2025">2025</option>
</select>
<div class="arrow-link"><a href="javascript:void(0)"  onclick="next_month()">&gt;</a></div>
`;


var main_section = document.createElement("div");
main_div.appendChild(main_section);
main_section.setAttribute('id','main-section');
main_section.setAttribute('class','main-section');
document.getElementById('main-section').innerHTML =
`
<div id="main-cal" class="main-cal">
    <table id="cal-table" class="cal-table">
    <tbody id="weeks" class="weeks">   
        <tr id="week-0" class="week">
            <th class="">Sun</th>
            <th class="">Mon</th>
            <th class="">Tue</th>
            <th class="">Wed</th>
            <th class="">Thu</th>
            <th class="">Fri</th>
            <th class="">Sat</th>
        </tr>
        <tr id="week-1" class="week">
        
        </tr>
        <tr id="week-2" class="week">
            
        </tr>
        <tr id="week-3" class="week">
          
        </tr>
        <tr id="week-4" class="week">
          
        </tr>
        <tr id="week-5" class="week">
           
        </tr>
    </tbody>    
    </table>
</div>    

`;



(function () {

    var d = new Date();
    var today = d.getDate()
    var month = d.getMonth();
    var year = d.getFullYear();

    document.getElementById("month-select").selectedIndex = month;
    document.getElementById("year-select").value = year;

    function getDaysInMonth(month, year) {

        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() == month) {
          days.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }
        return days;

    }

    var days = getDaysInMonth(month,year);

    const groups = days.reduce((acc, date) => {

        const week = `${date.getDay()}`;
        if (!acc[week]) {
          acc[week] = [];
        }
        acc[week].push(date.getDate());
        return acc;

    }, {});

    

    for(var i=6; i>=0; i--){

        if(groups[i]!=undefined && groups[i-1]!=undefined){

            if(groups[i][0]<groups[i-1][0]){
                groups[i-1].unshift("");
            }

        }    

    } 

    console.log(groups);

    for(var i=0; i<7; i++){

        for(var j=0; j<groups[i].length; j++ ){

            var node = document.createElement("td");
            var textnode = document.createTextNode(groups[i][j]);
            node.appendChild(textnode);
            node.setAttribute("class","day-of-week");
            var parent_ele = document.getElementById(`week-${j+1}`);
            parent_ele.appendChild(node);

            if(groups[i][j]==today) {
                node.setAttribute('class','active');
            }

        }

    }  


})();

function year_month(){
    var month = document.getElementById("month-select").value;
    var year = document.getElementById("year-select").value;
    
    var active_element = document.getElementsByClassName("active");
    if(active_element[0] != undefined){
        active_element[0].classList.remove("active");
    }

    var all_td = document.getElementsByTagName("td");
    var td_index;
    for (td_index = all_td.length - 1; td_index >= 0; td_index--) {
        all_td[td_index].parentNode.removeChild(all_td[td_index]);
    }


    function getDaysInMonth(month, year) {
        
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() == month) {
          days.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }
        return days;

    }

    var days = getDaysInMonth(month,year);

    const groups = days.reduce((acc, date) => {

        const week = `${date.getDay()}`;
        if (!acc[week]) {
          acc[week] = [];
        }
        acc[week].push(date.getDate());
        return acc;

    }, {});

    for(var i=6; i>=0; i--){

        if(groups[i]!=undefined && groups[i-1]!=undefined){

            if(groups[i][0]<groups[i-1][0]){
                groups[i-1].unshift("");
            }

        }    

    } 

    for(var i=0; i<7; i++){
        
        for(var j=0; j<groups[i].length; j++ ){

            var node = document.createElement("td");
            var textnode = document.createTextNode(groups[i][j]);
            node.setAttribute("class","day-of-week");
            node.appendChild(textnode);
            var parent_ele = document.getElementById(`week-${j+1}`);
            parent_ele.appendChild(node);

            var current_date = new Date();

            if(groups[i][j]==current_date.getDate() && current_date.getMonth() == month && current_date.getFullYear() == year) {
                node.setAttribute('class','active');
            }

        }

    } 
}

function next_month(){

    var old_month = document.getElementById("month-select").value;
    var old_year = document.getElementById("year-select").value;

    var d_date = new Date(old_year,old_month,1);

    d_date.setMonth(d_date.getMonth()+1);

    var month = d_date.getMonth();
    var year = d_date.getFullYear();

    document.getElementById("month-select").selectedIndex = month;
    document.getElementById("year-select").value = year;
    
    var active_element = document.getElementsByClassName("active");
    if(active_element[0] != undefined){
        active_element[0].classList.remove("active");
    }

    var all_td = document.getElementsByTagName("td");
    var td_index;
    for (td_index = all_td.length - 1; td_index >= 0; td_index--) {
        all_td[td_index].parentNode.removeChild(all_td[td_index]);
    }


    function getDaysInMonth(month, year) {
        
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() == month) {
          days.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }
        return days;

    }

    var days = getDaysInMonth(month,year);

    const groups = days.reduce((acc, date) => {

        const week = `${date.getDay()}`;
        if (!acc[week]) {
          acc[week] = [];
        }
        acc[week].push(date.getDate());
        return acc;

    }, {});

    for(var i=6; i>=0; i--){

        if(groups[i]!=undefined && groups[i-1]!=undefined){

            if(groups[i][0]<groups[i-1][0]){
                groups[i-1].unshift("");
            }

        }    

    } 

    for(var i=0; i<7; i++){
        
        for(var j=0; j<groups[i].length; j++ ){

            var node = document.createElement("td");
            var textnode = document.createTextNode(groups[i][j]);
            node.setAttribute("class","day-of-week");
            node.appendChild(textnode);
            var parent_ele = document.getElementById(`week-${j+1}`);
            parent_ele.appendChild(node);

            var current_date = new Date();

            if(groups[i][j]==current_date.getDate() && current_date.getMonth() == month && current_date.getFullYear() == year) {
                node.setAttribute('class','active');
            }

        }

    } 
}

function last_month(){

    var old_month = document.getElementById("month-select").value;
    var old_year = document.getElementById("year-select").value;

    var d_date = new Date(old_year,old_month,1);

    d_date.setMonth(d_date.getMonth()-1);

    var month = d_date.getMonth();
    var year = d_date.getFullYear();

    document.getElementById("month-select").selectedIndex = month;
    document.getElementById("year-select").value = year;
    
    var active_element = document.getElementsByClassName("active");
    if(active_element[0] != undefined){
        active_element[0].classList.remove("active");
    }

    var all_td = document.getElementsByTagName("td");
    var td_index;
    for (td_index = all_td.length - 1; td_index >= 0; td_index--) {
        all_td[td_index].parentNode.removeChild(all_td[td_index]);
    }


    function getDaysInMonth(month, year) {
        
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() == month) {
          days.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }
        return days;

    }

    var days = getDaysInMonth(month,year);

    const groups = days.reduce((acc, date) => {

        const week = `${date.getDay()}`;
        if (!acc[week]) {
          acc[week] = [];
        }
        acc[week].push(date.getDate());
        return acc;

    }, {});

    for(var i=6; i>=0; i--){

        if(groups[i]!=undefined && groups[i-1]!=undefined){

            if(groups[i][0]<groups[i-1][0]){
                groups[i-1].unshift("");
            }

        }    

    } 

    for(var i=0; i<7; i++){
        
        for(var j=0; j<groups[i].length; j++ ){

            var node = document.createElement("td");
            var textnode = document.createTextNode(groups[i][j]);
            node.setAttribute("class","day-of-week");
            node.appendChild(textnode);
            var parent_ele = document.getElementById(`week-${j+1}`);
            parent_ele.appendChild(node);

            var current_date = new Date();

            if(groups[i][j]==current_date.getDate() && current_date.getMonth() == month && current_date.getFullYear() == year) {
                node.setAttribute('class','active');
            }

        }

    } 
}


document.getElementById('month-select').addEventListener("change",function(){
    year_month();
})

document.getElementById('year-select').addEventListener("change",function(){
    year_month();
})