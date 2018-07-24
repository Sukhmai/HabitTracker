// Our labels along the x-axis
var dates = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
var habits = ["Running", "Walking the Dog"];
var habitNum=0;
var updateName="";
// For drawing the lines
var emptyData=[[0,4,3,4,5,2,2],[20,50,0,0,10,110,70]];
var goals=[3,40];
var type ='line';
var ctx = document.getElementById("canvas1");
var yAxisLabel="Miles";
var labels=["Miles","Minutes"];
var colorPresets=[["#42d4f4","#42d4f4"],["#62f441","#62f441"],["#f4ac41","#f4ac41"],["#417ff4","#417ff4"],["#f4d941","#f4d941"]];
var randNums=[Math.floor(Math.random() * colorPresets.length)];
var goalPercentsNumerator=[0,0,0,0,0,0,0];
var goalPercentsDenominator=[0,0,0,0,0,0,0];
var goalPercents=[0,0,0,0,0,0,0];
addRandomColor();
var configArray=[{
  type: 'bar',
  data: {
    labels: dates,
    datasets: [
      { 
        data: emptyData[0],
         label: habits[0],
         borderColor: colorPresets[randNums[0]][0],
         backgroundColor: colorPresets[randNums[0]][1],
         fill:false
      }
    ]
  },
  options: {
         responsive: true,
          scales: {
    		yAxes: [{
      			scaleLabel: {
        		display: true,
        		labelString: labels[0]
      			},
            ticks:{
            min:0  
            }
    		}]

  		}
     }
},
{
  type: 'bar',
  data: {
    labels: dates,
    datasets: [
      { 
        data: emptyData[1],
         label: habits[1],
         borderColor: colorPresets[randNums[1]][0],
         backgroundColor: colorPresets[randNums[1]][1],
         fill:false
      }
    ]
  },
  options: {
         responsive: true,
          scales: {
    		yAxes: [{
      			scaleLabel: {
        		display: true,
        		labelString: labels[1]
      			},
            ticks:{
            min:0  
            }
    		}]
    		
  		}
     }
}]

var myChart = new Chart(ctx, configArray[0]);
for(i=0; i<habits.length;i++)
{
	createHabitButton(habits[i]);
}
changeLogData();
fillGoals();

function destroy()
{
	myChart.destroy();
}
function switchLine()
{
	configArray[habitNum].type = 'line';
	destroy();
	myChart = new Chart(ctx, configArray[habitNum]);
}
function switchBar()
{
	configArray[habitNum].type = 'bar';
	destroy();
	myChart = new Chart(ctx, configArray[habitNum]);
}


function submit()
{
	var textValue = document.getElementById("searchTxt").value;
	var day = document.getElementById("Days").value;
	for(i=0; i<dates.length;i++)
	{
		if(day==dates[i])
		{
      emptyData[habitNum][i]=textValue;
      myChart.update();
      document.getElementById("logTable").rows[i+1].cells[1].innerHTML=emptyData[habitNum][i];
      var val = textValue;
      if(val>=goals[habitNum])
      {
        document.getElementById("logTable").rows[i+1].cells[1].style.background="rgb(151, 219, 154)";
      }
      else if(val==0)
      {
        document.getElementById("logTable").rows[i+1].cells[1].style.background="rgb(224, 90, 83)";
      }
      else
      {
        document.getElementById("logTable").rows[i+1].cells[1].style.background="rgb(245, 252, 55)"; 
      }
      fillGoals();
		}
	}
}
  function submit2()
  {
    var num=0
    var d = new Date();
    var i=(d.getDay()-1)%7;
    var textValue = document.getElementById("dayInput").value;
    for(i=0; i<habits.length;i++)
    {
      if(updateName==habits[i])
      {
        num=i;
      }
    }
    emptyData[num][i]=textValue;
    myChart.update();
    document.getElementById("logTable").rows[i+1].cells[1].innerHTML=emptyData[habitNum][i];
    var val = textValue;
    if(val>=goals[habitNum])
    {
      document.getElementById("logTable").rows[i+1].cells[1].style.background="rgb(151, 219, 154)";
    }
    else if(val==0)
    {
      document.getElementById("logTable").rows[i+1].cells[1].style.background="rgb(224, 90, 83)";
    }
    else
    {
      document.getElementById("logTable").rows[i+1].cells[1].style.background="rgb(245, 252, 55)"; 
    }
    fillGoals();
    show(document.getElementById("updateDay"));   
  }
function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
function show(x) {
    if (x.style.display != "block") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function addAHabit() {
	var habitName = document.getElementById("habitName").value;
	habits.push(habitName);
	createHabitButton(habitName);
	show(document.getElementById("myDIV"));
	show(document.getElementById("addUnits"));
	}

function createHabitButton(habitName) {
	var button = document.createElement("input");
	button.setAttribute('type','button');
	button.setAttribute('class','button1');
	button.setAttribute('value',habitName);
	button.nameH=habitName;
	button.onclick=changeHabit;
	document.getElementById("habitList").appendChild(button);
	document.getElementById("habitName").value="";

  var button2 = document.createElement("input");
  button2.setAttribute('type','button');
  button2.setAttribute('class','button1');
  button2.setAttribute('value',habitName);
  button2.nameH=habitName;
  button2.onclick=updateDay;
  document.getElementById("habitList2").appendChild(button2);
}
function changeHabit(evt)
{
	habitTitle=evt.target.nameH;
	for(i=0; i<habits.length;i++)
	{
		if(habits[i]==habitTitle)
		{
			habitNum=i;
		}

	}
	destroy();
  if(habitNum>=configArray.length)
  {
	createNewConfig(habitTitle);
  }
	myChart = new Chart(ctx, configArray[habitNum]);
  document.getElementById("header").innerHTML=habitTitle;
  changeLogData();
}

function createNewConfig(habitName)
{
  addRandomColor();
  emptyData.push([0,0,0,0,0,0,0]);
	configArray.push(
{
  type: 'bar',
  data: {
    labels: dates,
    datasets: [
      { 
        data: emptyData[habitNum],
         label: habitName,
         borderColor: colorPresets[randNums[habitNum]][0],
         backgroundColor: colorPresets[randNums[habitNum]][1],
         fill:false
      }
    ]
  },
  options: {
         responsive: true,
          scales: {
    		yAxes: [{
      			scaleLabel: {
        		display: true,
        		labelString: labels[habitNum]
      			},
            ticks:{
            min:0  
            }
    		}]
    		
  		}
     }
}
)
}
function addUnitMeasure(){
	var unit = document.getElementById("addUnitInput").value;
	yAxisLabel=unit;
  labels.push(unit);
	document.getElementById("addUnitInput").value="";
	show(document.getElementById("addUnits"))
  show(document.getElementById("goal")); 
}

function addRandomColor()
{
var randHolder=0;
var checkIfRandom=true;
while(checkIfRandom==true)
{
  checkIfRandom=false;
  randHolder=Math.floor(Math.random() * colorPresets.length);
  for(i=0;i<randNums.length;i++)
  {
    if(randHolder==randNums[i])
    {
      checkIfRandom=true;

    }
  }
}
randNums.push(randHolder);
}

function changeLogData()
{
  for(i=1; i<emptyData[habitNum].length+1;i++)
  {
    document.getElementById("logTable").rows[i].cells[1].innerHTML=emptyData[habitNum][i-1];
    var val = parseInt(document.getElementById("logTable").rows[i].cells[1].innerHTML);
    if(val>=goals[habitNum])
    {
      document.getElementById("logTable").rows[i].cells[1].style.background="rgb(151, 219, 154)";
    }
    else if(val==0)
    {
      document.getElementById("logTable").rows[i].cells[1].style.background="rgb(224, 90, 83)";
    }
    else
    {
      document.getElementById("logTable").rows[i].cells[1].style.background="rgb(245, 252, 55)";
    }
  }
  document.getElementById("logTable").rows[0].cells[1].innerHTML=labels[habitNum];
}

  
function addGoal()
{
goals.push(document.getElementById("goalInput").value);
document.getElementById("goalInput").value="";
show(document.getElementById("goal"));
}

function fillGoals()
{
  goalPercents=[0,0,0,0,0,0,0];
  goalPercentsNumerator=[0,0,0,0,0,0,0];
  goalPercentsDenominator=[0,0,0,0,0,0,0];
  for(i=0; i<emptyData.length;i++)
  {
    for(j=0; j<emptyData[i].length;j++)
    {
      //alert(emptyData[i]);
      if(emptyData[i][j]>=goals[i])
      {
        //alert(goalPercentsNumerator);
        goalPercentsNumerator[j]+=1;

      }
      goalPercentsDenominator[j]+=1;
      //alert(goalPercentsDenominator[j]);      
    }
  }
  for(i=0; i<goalPercentsNumerator.length;i++)
  {
      goalPercents[i]=goalPercentsNumerator[i]/goalPercentsDenominator[i];
      document.getElementById("calendarTable").rows[1].cells[i+1].innerHTML=(goalPercents[i]*100).toFixed(2)+"%";
  }  

}

function updateDay(evt)
{
show(document.getElementById("updateToday"));
updateName=evt.target.nameH;
}

