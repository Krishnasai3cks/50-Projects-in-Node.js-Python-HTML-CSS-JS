const textArea = document.getElementById('text-input');
// import { puzzlesAndSolutions } from './puzzle-strings.js';
const errordiv = document.getElementById('error-msg');
const clearbtn = document.getElementById('clear-button');
const solvebtn = document.getElementById('solve-button');
const htmlinputs = document.getElementsByClassName('sudoku-input');



//  MAIN SOLVE METHOD // MAIN SOLVE METHOD
//// MAIN SOLVE METHOD// MAIN SOLVE METHOD
// MAIN SOLVE METHOD// MAIN SOLVE METHOD
// MAIN SOLVE METHOD


//solve our sudoku 
function solve(stringmatrix){
  if(ifsolved(stringmatrix)){
    return stringmatrix;
  }
  else{
    const possibilities = possibleval(stringmatrix);
    const validmatrix = ifthatisvalid(possibilities);
    return backtracking(validmatrix);
  }
}//solve function 

// check if  It is already solved 
function ifsolved(matrix){
  for(var i = 0; i< 9; i++)
    for(var j = 0 ; j < 9 ; j++)
      if(matrix[i][j] == '.')
        return false
  return true
}//ifsolved


// LOOP OVER ALL POSSIBLE VALUES 
function possibleval(matrix){
  var sol = [];
  const emptybox = emptyboxs(matrix);
  if(emptybox != undefined){
    for(var i = 1; i <= 9 ; i++){
      var box = [...matrix]
      var row = [...box[emptybox[0]]] 
      row[emptybox[1]] = i
      box[emptybox[0]] = row
      sol.push(box)
    }
  }
  return sol;
}


function emptyboxs(matrix){
  for(var i = 0; i < 9; i++){
    for(var j = 0; j < 9; j++){
      if(matrix[i][j] == '.')
        return [i, j]
    }
  }  
}


// Lets to backtracking now
function backtracking(matrix){
  if(matrix.length < 1){
    return false
  }
  else{
    var ele = matrix.shift();
    const result = solve(ele)
    if(result != false){
      return result
   }else{
     return backtracking(matrix);
   }
  }
}

//check if the new box is valid
function ifthatisvalid(matrix){
  var sol=[];
  for(var i = 0;i < matrix.length;i++){
    if(allgood(matrix[i])){
      sol.push(matrix[i])
    }
  }
  return sol
}//ifthatis valid
function allgood(matrix){
  return checkrow(matrix) && checkcol(matrix) && checkbox(matrix)
}

//CHECK EACH ROW
function checkrow(matrix){
    for (var i = 0; i < 9; i++){
        var cur = []
        for (var j = 0; j < 9; j++){
            if (cur.includes(matrix[i][j])){
                return false
            }
            else if (matrix[i][j] != '.'){
                cur.push(matrix[i][j])
            }
        }
    }
    return true
}   //checkrow

//check each column
function checkcol(matrix){
  for(var i=0;i<9;i++){
    var cur = []
    for(var j=0; j<9; j++){
      if(cur.includes(matrix[j][i]) ){
        return false
      }else if(matrix[j][i] != '.')
        cur.push(matrix[j][i])
    }
  }
  return true
}   //checkcol

//check each box
function checkbox(matrix){
  var newmat = [[0, 0], [0, 1], [0, 2],
                            [1, 0], [1, 1], [1, 2],
                            [2, 0], [2, 1], [2, 2]];
  for (var y = 0; y < 9; y += 3){
        for (var x = 0; x < 9; x += 3){
            // each traversal should examine each box
            var cur = []
            for (var i = 0; i < 9; i++){
                var coords = [...newmat[i]]
                coords[0] += y
                coords[1] += x
                if (cur.includes(matrix[coords[0]][coords[1]])){
                    return false
                }
                else if (matrix[coords[0]][coords[1]] != '.'){
                    cur.push(matrix[coords[0]][coords[1]])
                }
            }
        }
    }
  return true
}//checkbox




function convertmattostr(mat){
  var str = '';
  for(var i in mat){
    for(var j in mat[i]){
      str += mat[i][j]
    }
  }
  return str;
}
// change values inside the html table
function creategrid(matrix){
  var rowind = 'ABCDEFGHI'.split('');
  var colind = '123456789'.split('');
  var str = convertmattostr(matrix);
  
  var count = 0;
  for( var i of rowind){
    for(var j of colind){
      if(checkvalidcharacter(str[count]) && str[count]!=='.'){
       document.getElementById(i+''+j).value = str[count];
      }
      else{
        document.getElementById(i+''+j).value = '';
      }
      count++;
    }// col for 
  } // row for
}//creategrid

// check if input is in range 1 - 9 
const checkvalidcharacter = str => {
  const possibleNum = parseInt(str);
  return (possibleNum >= 1 && possibleNum <= 9) && str;
}//checkvalidcharacter

// updating textarea as per the values 
function updatetextarea(){
    const cells = Array.from(document.querySelectorAll('.sudoku-input'));
    textArea.value = cells.reduce((str, {value}) => {
        value !== '' && checkvalidcharacter(value) ? str += value : str += '.'; 
        return str
      }
    ,'');
}//updatetextarea

//update grids and textarea when a solution is found 
const solvefunction = solve => {
 // Only handle cases where the puzzle is valid
  if (solve) {
    const string = Object.values(solve).join().replace(/\,/g, '');
    creategrid(string), updatetextarea();
  }
  else{
    alert("This sudoku cannot be solved")
    errordiv.innerText = "This cannot be solved"
    
  }
} //solvefunction

function checkvalidinput(str){
  var a = createstringmatrix(str);
    if(str.length === 81){
      errordiv.innerText ="yaaay valid input"
      return a;
    }
    else if(str.length !== 81){
      errordiv.innerText= "Error: Expected puzzle to be 81 characters long."
      return false;
    }
    else{
      errordiv.innerText = 'completely unexpected error my friend';
      return false;
    }
}
//create an empty matrix from given string 
function createstringmatrix(str){
    var x = new Array(9);
    for (var i = 0; i < x.length; i++) {
      x[i] = Array(9);
    }
    var count = 0;
    for(var i in x){
        for(var j = 0; j< 9; j++){
              if(str[count] !='.') 
               x[i][j] = +str[count]
              else
                x[i][j] = '.'
              count++;
        }
    }
    return x;
}//createstringmatrix

function clearinput(){
    const textArea = document.getElementById('text-input');
    return creategrid(''), textArea.value ='';
}
document.addEventListener('DOMContentLoaded', () => {
  // Load a simple puzzle into the text area
  const defaultStr = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
   creategrid(defaultStr);// add default string values into html
  textArea.value = defaultStr;
  
  Array.from(htmlinputs).forEach(input => input.addEventListener('input', updatetextarea));

  solvebtn.addEventListener('click',()=>{
    const a = checkvalidinput(textArea.value);
    if(a!=false){
      return solvefunction(convertmattostr(solve(a)))
    }
  },false)
  
  clearbtn.addEventListener('click',clearinput,false)
});// event listener 
/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
    checkvalidinput, /* length is 81 or not */
    checkvalidcharacter, /* if character is between 1 & 9 */
    ifthatisvalid, /*check row col and box */
     solve,
    updatetextarea,/* for text area */
    creategrid, /* addvalues from input to textarea */
    solvefunction, /* showsolution*/
    clearinput,
    createstringmatrix
    
    
    
  }
} catch (e) {}
