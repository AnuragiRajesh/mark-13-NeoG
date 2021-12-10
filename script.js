
function reverseStr(str){
  var charList = str.split('');
  var reverseListOfChar = charList.reverse();
  var reversedStr = reverseListOfChar.join('');
  return reversedStr
}


function isPalindrome(str) {
  var reversedStr2 =  reverseStr(str);
  
  return str===reversedStr2;
}




function converIntoDate(date){
  var dateStr = {day:"",month:"",year:""};
  if(date.day<10){
    dateStr.day = "0" + date.day;
  }
  else {
    dateStr.day = date.day.toString(); 
  }

  if(date.month<10){
    dateStr.month = "0" + date.month;

  }
  else {
    dateStr.month = date.month.toString(); 
  }

  dateStr.year = date.year.toString();
  return dateStr
}






function dateFormats(date) {
  var dateStr = converIntoDate(date)
  var DDMMYYYY = dateStr.day + dateStr.month + dateStr.year;
  var MMDDYYYY = dateStr.month + dateStr.day + dateStr.year;
  var YYYYMMDD = dateStr.year + dateStr.month + dateStr.day;
  var DDMMYY   = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var MMDDYY   = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var YYMMDD   = dateStr.year.slice(2) + dateStr.month + dateStr.day;
  return [DDMMYYYY, MMDDYYYY, YYYYMMDD, DDMMYY, MMDDYY, YYMMDD]
}

function checkPalindromeForAllFormats(date){
  var listOfPalindromes = dateFormats(date);
  

  var flag = false;


  for(var i=0; i<listOfPalindromes.length; i++){
    if(isPalindrome(listOfPalindromes[i])){
      // console.log((listOfPalindromes[i]))
      flag = true;
      break;
    }
      
  }
  return flag

}

function isLeapYear(year){
  if(year% 400 === 0){
    return true;
  }

  if(year% 100 ===0){
    return false
  }
  if( year% 4 ===0){
    return true
  }

  return false

}


function getNextDate(date){
  var day = date.day +1
  var month = date.month
  var year = date.year

  var daysInMonth = [ 31, 28, 31, 30, 31, 30,  31, 31, 30, 31, 30, 31]; 
  if(month===2){ // checking for leapyear
    if(isLeapYear(year)){
      if(day>29){
        day = 1;
        month++;

      }
    }
    
    else {
      if(day>28){
        day=1;
        month++;
      }
    }

  }
  else {
    // checking if the day exceeds the max days in month
    if(day > daysInMonth[month-1]){
      day = 1;
      month++
    }
  }

  if(month > 12){
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year
  };


}



function getNextPalindromeDate(date) {
  var count =0;
  var nextDate = getNextDate(date);



  while(1){
    count++;
    var isPalindrome = checkPalindromeForAllFormats(nextDate);
    if(isPalindrome){
      break;
    }
    nextDate = getNextDate(nextDate);
  }


  return [count,nextDate]

}




var input = document.querySelector("#bInput")
var button = document.querySelector("#btn")
var finalOutput = document.querySelector("#pTag")

button.addEventListener("click",clickHandler)



function clickHandler(P) {
  var bStr = input.value;
  if(bStr !== ''){
    var listOfDate = bStr.split('-');

    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0])
    };

    var isPalindrome2 = checkPalindromeForAllFormats(date)

    if(isPalindrome2){
      finalOutput.innerText = "Yes, Your Birthday is a Palindrome ❤️‍🔥."
    }

    else {
      var[count, nextDate] = getNextPalindromeDate(date);
      finalOutput.innerText = `No, Your Birthday is not a Palindrome. The next Palindrome Birthday is ${nextDate.day} ${nextDate.month} ${nextDate.year} you missed by ${count} days.`
    }




  }
  
}




 