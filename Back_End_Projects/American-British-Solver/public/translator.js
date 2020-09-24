import { americanOnly } from './american-only.js';
import { britishOnly } from './british-only.js';
import { americanToBritishSpelling } from './american-to-british-spelling.js';
import { americanToBritishTitles } from './american-to-british-titles.js';
const translatebtn = document.getElementById('translate-btn')
const textArea = document.getElementById('text-input');
const translationDiv = document.getElementById('translated-sentence');
const errordiv = document.getElementById('error-msg');
const converted = [];

function reversedictionaries(obj){
  return Object.keys(obj).reduce((acc, curr) => {
    acc[obj[curr]] = curr;
    return acc;
  }, {});
}
const objUpperCase = obj => {
  return Object.keys(obj).reduce((acc, curr) => {
    const upperKey = curr[0].toUpperCase() + curr.slice(1);
    acc[upperKey] = upperKey.includes('.') ? upperKey.replace('.', '') : `${upperKey}.`;

    return acc;
  }, {});
}
function convertamericantobritish(string){
            

  if(string.length == 0){
    errordiv.textContent = 'Error: No text to translate.'
  }else{
    var newstr = replacetitle(string,{...americanToBritishTitles,...objUpperCase(americanToBritishTitles)});
    var solution = checkifpresent(newstr, {...americanOnly,...americanToBritishSpelling});
  }
  solution = convertTime(solution,':');
  solution = addgreen(solution);

  if(solution == string){
    translationDiv.innerHTML = ('Everything looks good to me!')
  }else{
    translationDiv.innerHTML = solution
  }
}

function convertbritishtoamerican(string){
  if(string.length == 0){
    errordiv.textContent = 'Error: No text to translate.'
  }
  else{
      var newstr = replacetitle(string,reversedictionaries({...americanToBritishTitles,...objUpperCase(americanToBritishTitles)}));

      var solution = checkifpresent(newstr, reversedictionaries({...britishOnly,...americanToBritishSpelling}));
  }
  solution = convertTime(solution,'.');
  solution = addgreen(solution);

  if(solution == string){
    translationDiv.innerHTML = ('Everything looks good to me!')
  }else{
    translationDiv.innerHTML = solution
  }
}
function addgreen(str){
  var a = str.split(' ')
  for(var i in converted){
    if(a.includes(converted[i])){
      var temp= a.indexOf(converted[i])
      a[temp] = `<span class='highlight'>${a[temp]}</span>`
    }
  }
  return a.join(' ')
}
function convertTime(str,checkchar){
  var oppochar;
  (checkchar == '.')? oppochar = ':' : oppochar = '.'
  var a = str.split(' ');
  for(var i in a){
    if(a[i].includes(checkchar) && (a[i][a[i].indexOf(checkchar)+1] != undefined)){
      a[i] = a[i].split(checkchar).join(oppochar)
      converted.push(a[i])
    }
  }
  

  return a.join(' ')
}
function replacetitle(str,dict){
  var a = str.split(' ');
    var keys = Object.keys(dict)
    for(var i of keys){
       if(a.includes(i)){
         var temp = a.indexOf(i)
           a[temp] = dict[a[temp]]
           converted.push(a[temp])

       }
    }
  return a.join(' ')
}
function checkifpresent(str,dict){
  var a = str.split(' ');
    var keys = Object.keys(dict)
    for(var i of keys){
        if(a.includes(i)){
          var temp = a.indexOf(i)
          a[temp] = dict[a[temp]]
          converted.push(a[temp])
        }
    }

  return a.join(' ')
}
//********* step 2 *********
//********* step 2 *********
//********* step 2 *********

function fintranslator(str, toconvert){

  if(toconvert == 'british'){

    return convertamericantobritish(str);
  }
  else if(toconvert == 'american') {
    return convertbritishtoamerican(str);
  }
}
const clearAll = () => {
  return textArea.value = '', translationDiv.textContent = '', errordiv.textContent = '';
}

const clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', () => {
  clearAll();
});


translatebtn.addEventListener('click', () => {
  const localevar = document.getElementById('locale-select').value === 'american-to-british' ? 'british' : 'american';

  const finalsolution = fintranslator(textArea.value, localevar);
}); // start here 



/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
  clearAll,
  fintranslator,
  convertbritishtoamerican,
  convertamericantobritish
    
  }
} catch (e) {}
