
    
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      playStyle: '',
      playerOne:'',
      playerTwo:'',
      turn: ['two','one'][Math.floor(Math.random()*2)],
      presentIndex: 0,
      clickedButtons: [0,0,0,0,0,0,0,0,0],
    };
    this.firstTurn = '';
    this.executed = 0;
    this.moveToNextPage = this.moveToNextPage.bind(this);
    this.onClickEventsForFirstPage = this.onClickEventsForFirstPage.bind(this);
    this.onClickEventsForSecondPage = this.onClickEventsForSecondPage.bind(this);
    this.gameEnds = this.gameEnds.bind(this);
    this.checkIfGameEnds  = this.checkIfGameEnds.bind(this);
    this.switchTurns = this.switchTurns.bind(this);
    this.tripleEquals = this.tripleEquals.bind(this);
    this.bestMove = this.bestMove.bind(this);
    this.reset = this.reset.bind(this);
    this.handleDraw = this.handleDraw.bind(this);
    this.handleWinner = this.handleWinner.bind(this);
  }
  
  //// It all starts from here !!!!!!!!!!!!!!!!!!!
  componentDidMount(){
    if(this.state.turn == 'two'){
      this.firstTurn = 'two';
    }
    document.getElementById('start').style.display= 'flex';
    document.querySelector('#mainXOROdiv').style.display = 'none';
    document.querySelector('#playAreaMain').style.display = 'none';
    this.onClickEventsForFirstPage();
    this.onClickEventsForSecondPage();
    document.getElementById('reset').addEventListener('click',this.reset());
  }
  componentDidUpdate(){
    var {playStyle,playerTwo,clickedButtons} = this.state;
    if(this.executed <1 && playStyle === 'single' && this.firstTurn == 'two' && playerTwo!==''){
      this.executed++;
      this.switchTurns('one',playerTwo,clickedButtons,0);
    }
  }
  reset(){
    var newturn = ['two','one'][Math.floor(Math.random()*2)];
        this.setState({playStyle: '',playerOne:'',playerTwo:'',
                       turn: newturn,'two': 0,clickedButtons: [0,0,0,0,0,0,0,0,0],});
        /****
        THIS IS DANGEROUS HERE
        yoU HAVE TO CHANGE THIS IN FUTURE
        DON'T FORGET TO CHANGE THIS  THIS IS DANGEROUS HERE
        yoU HAVE TO CHANGE THIS IN FUTURE
        DON'T FORGET TO CHANGE THIS  THIS IS DANGEROUS HERE
        yoU HAVE TO CHANGE THIS IN FUTURE
        DON'T FORGET TO CHANGE THIS  THIS IS DANGEROUS HERE
        yoU HAVE TO CHANGE THIS IN FUTURE
        DON'T FORGET TO CHANGE THIS  THIS IS DANGEROUS HERE
        yoU HAVE TO CHANGE THIS IN FUTURE
        DON'T FORGET TO CHANGE THIS  THIS IS DANGEROUS HERE
        yoU HAVE TO CHANGE THIS IN FUTURE
        DON'T FORGET TO CHANGE THIS 
        ****/
        this.executed = 0;
        this.firstTurn = newturn;
        this.moveToNextPage(document.querySelector('#start'));
        '012345678'.split('').map((ind)=>{
          document.getElementById(ind).innerText = '';
        });
  }
  /// componentDidMount is above !!!!!!!!!!!!!!!!!!!!
  gameEnds(winner){
    if(winner === 'draw'){
      this.handleDraw();
    } else {
      if(this.state.playStyle == 'single'){
        winner = (this.state.playerTwo == winner)? 'computer wins!':'you win!';
      } else {
        winner = (this.state.playerTwo == winner)? 'player2 wins!':'You win!';
      }
      this.handleWinner(winner);
    }
  }
  handleDraw(){
    var element = document.querySelector('#handleDraw');
    this.moveToNextPage(element);
  }
  handleWinner(winner){
    var element = document.querySelector('#handleWin');
    document.querySelector('#winh1').innerText = winner;
    this.moveToNextPage(element);
  }
  checkIfGameEnds(clickedButtons,player){
    let winner = null;
    let nonZero = 0;
    for(let i=0;i<9;i+=3){
      if(this.tripleEquals(clickedButtons[i], clickedButtons[i+1], clickedButtons[i+2])){
        winner = clickedButtons[i];
      }
    }
    for(let i=0;i<3;i++){ if(this.tripleEquals(clickedButtons[i],clickedButtons[i+3],clickedButtons[i+6])){
        winner = clickedButtons[i];
      }
    }
    if(this.tripleEquals(clickedButtons[0],clickedButtons[4],clickedButtons[8])){
      winner = clickedButtons[0];
    }
    if(this.tripleEquals(clickedButtons[2],clickedButtons[4],clickedButtons[6])){
      winner = clickedButtons[2];
    }
    for(let i=0;i<9;i++){
      if(clickedButtons[i]==0) {
        nonZero++;
      }
    }
    if(winner){
      this.gameEnds(player);
      return winner;
    } else if(winner == null && nonZero === 0){
      this.gameEnds('draw');
      return 'draw';
    }
    else {
      return winner;
    }
  }
  tripleEquals(a,b,c){
    return (a==b && b==c && a!=0);
  }
  
  /* event handlers for first page */
  onClickEventsForFirstPage(){
    var single = document.getElementById('single');
    single.addEventListener('click',()=>{
        this.moveToNextPage(document.querySelector('#mainXOROdiv'));
        this.setState({playStyle: 'single'});
    });
    var double = document.getElementById('double');
    double.addEventListener('click',()=>{
        this.moveToNextPage(document.querySelector('#mainXOROdiv'));
        this.setState({ playStyle: 'double'});
    });
  }
  moveToNextPage(page){
    document.querySelector('#start').style.display = 'none';
    document.querySelector('#playAreaMain').style.display = 'none';
    document.getElementById('OnWhenPlaying').style.display = 'none';
    document.querySelector('#mainXOROdiv').style.display = 'none';
    document.querySelector('#handleWin').style.display = 'none';
    document.querySelector('#handleDraw').style.display = 'none';
    page.style.display = 'flex';
    if(page.id == 'playAreaMain'){
          document.getElementById('OnWhenPlaying').style.display = 'block';
    }
  }
  /* event handler for first page above
  event handler for second page below */
  onClickEventsForSecondPage(){
    var X = document.querySelector('#xInSpan');
    var O = document.querySelector('#oInSpan');
    var clickedBtn = '';
    X.addEventListener('click',()=>{
          this.moveToNextPage(document.querySelector('#playAreaMain'));
          this.setState({playerOne:'X',playerTwo:'O'})
    });
    O.addEventListener('click',()=>{
          this.moveToNextPage(document.querySelector('#playAreaMain'));
          this.setState({playerOne:'O',playerTwo:'X'})
    });
  }
  /*event handler for second page above */
  
  render(){
    return(
     <div id="component">
        <div class="centredivs " onClick={this.reset} id="handleWin"><h1 id="winh1"></h1><h4>Click in this area to restart</h4></div>
        <div class="centredivs " onClick={this.reset} id="handleDraw"><h1>It's a draw!</h1><h4>Click in this area to restart</h4></div>
        <div id="OnWhenPlaying">
          <span id="playerplaying">Player One Turn</span>&emsp;<button id="reset">reset</button>
        </div>
        <div id="start" class="centredivs">
          <div class="middledivs">
            <h2>Choose game type</h2>
            <hr id="horirow"/>
            <div class='deepestdivs'>
              <h3 id="single" class="firstheadings">SINGLE</h3>
              <h3 id="double" class="firstheadings">DOUBLE</h3>
            </div>
          </div>
        </div>
        <div id="mainXOROdiv" class="centredivs">
          <div class="middledivs"> 
            <h2> Would you like to be an X or O</h2>
            <div class="deepestdivs">
            <span class="xoro" id="xInSpan">X</span><span id="oInSpan" class="xoro">O</span>
            </div>
          </div>
        </div>
        <div id="playAreaMain" class="centredivs">
            <div id='innerplayarea'> 
              {
                [0,1,2,3,4,5,6,7,8].map(data=>(
                  <button id={data} onClick={this.onClickEventsForBoxes} class="boxes"></button>
                ))
              }
            </div>
        </div>  
     </div>
    );
  }
  switchTurns(turn,player,clickedButtons,boxesId){
    this.setState({turn:turn});
    if(String(boxesId) == "NaN"){
      return this.checkIfGameEnds(clickedButtons,player);
    }
    document.getElementById(boxesId).innerText = player;
    document.getElementById('playerplaying').innerText="Player "+turn+" turn";
    clickedButtons[boxesId]=player;
      this.setState({
          clickedButtons:clickedButtons,
      });
    var didTheGameEnd = this.checkIfGameEnds(clickedButtons,player);
    if(!didTheGameEnd){
      return false
    } else {
      return true
    }
  }
  bestMove(array,easy=false){
    let {playerOne,playerTwo} = this.state;
    let player = playerOne;
    let computer = playerTwo;
    if(easy){
      for(var i=0;i<array.length;i++){
        if(array[i]===0){
          return i
        }
      }
    } else {
      function tripleEqual(a,b,c){
        return a===b && b===c && a!=0;
      }
      function checkIfGameEndsTwo(){
       let winner = null;
        for(let i=0;i<9;i+=3){
          if(tripleEqual(array[i], array[i+1], array[i+2])){
            winner = array[i];
          }
        }
        for(let i=0;i<3;i++){
          if(tripleEqual(array[i],array[i+3],array[i+6])){
            winner = array[i];
          }
        }
        if(tripleEqual(array[0],array[4],array[8])){
          winner = array[0];
        }
        if(tripleEqual(array[2],array[4],array[6])){
          winner = array[2];
        }
        let nonZero = 0;
        for(let i=0;i<9;i++){
          if(array[i]==0) {
            nonZero++;
          }
        }
        if(winner == null && nonZero === 0){
          return 'draw';
        }
        else {
          return winner;
        }
      }
      var timesExecuted = 0;
      const scores = {
        draw: 0,
      };
          scores[computer] = 1;
          scores[player] = -1;
      function minimax(array,depth,maximizingPlayer){
          let result = checkIfGameEndsTwo();
          // timesExecuted+=1;
          if(timesExecuted<3000){
            if(result!== null){
              return scores[result];
            }
          }
          else{
            return "This is too much"
          }
          if(maximizingPlayer){
            let bestScore = -10000;
            for(let i=0;i<9;i++){
              if(array[i]==0){
                array[i] = computer;
                let tempScore = minimax(array,depth+1,false);
                array[i] = 0;
                bestScore = Math.max(tempScore,bestScore);
                
              }
            }
              return bestScore;
          } else {
            let bestScore = 10000;
            for(let i=0;i<9;i++){
              if(array[i]==0){
                array[i] = player;
                let tempScore = minimax(array,depth+1,true);
                array[i] = 0;
                bestScore = Math.min(tempScore,bestScore);
              }
            }
              return bestScore;
          }
        }
      let bestScore = -10000;
      let bestIndex;
      for(let i=0;i<9;i++){
        if(array[i] === 0){
          array[i] = computer;
          let score = minimax(array,0,false);
          array[i] = 0;
          if(score>bestScore){
            bestScore = score;
            bestIndex = i;
          }
        }
      }
      bestIndex = parseInt(bestIndex);
      return bestIndex;
    }
  }
  
  // function minimax(node, depth, maximizingPlayer) is
  //   if depth = 0 or node is a terminal node then
  //       return the heuristic value of node
  //   if maximizingPlayer then
  //       value := −∞
  //       for each child of node do
  //           value := max(value, minimax(child, depth − 1, FALSE))
  //       return value
  //   else (* minimizing player *)
  //       value := +∞
  //       for each child of node do
  //           value := min(value, minimax(child, depth − 1, TRUE))
  //       return value
  onClickEventsForBoxes=(e)=>{
    if(e){
      var a = event.target;
      if(!a.innerText){
        var {playerOne,playerTwo,presentIndex,turn,clickedButtons,playStyle} = this.state;
        var aid = parseInt(a.id);
        if(playStyle =='single'){
          var isTheGameOver = this.switchTurns('two',playerOne,clickedButtons,aid);
          if(!isTheGameOver){
            var computerMove = this.bestMove(clickedButtons);
            this.switchTurns('one',playerTwo,clickedButtons,computerMove);
          }
        } else {
          if(turn == 'one'){
            this.switchTurns('two',playerOne,clickedButtons,aid);
          } else {
            this.switchTurns('one',playerTwo,clickedButtons,aid);
          }
        }
      }
    }
  }
}
ReactDOM.render(<App/>,document.getElementById('app'));