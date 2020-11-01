class App extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        offset: 0,
        randomValueArray: [],
        countA:0,
        countB:0,
        countC:0,
      }
      this.executed = false;
      document.addEventListener('keydown',(e)=>{this.keyHandler(e)});
      this.checkForCollision = this.checkForCollision.bind(this);
      this.keyHandler = this.keyHandler.bind(this);
    }
    componentDidChange(){

    }
  componentDidMount(){
    let sequentialArray = [];
    let randomValueArray = [];
    for(let i=30;i<1200;i+=30){
        for(let j=30;j<600;j+=30){
            sequentialArray.push([i,j])
        }
    }
    let finalBlockade = [[1170,240],[1140,240],[1140,270],[1170,300],[1170,300],[1140,300]];
    for(let coord of finalBlockade){
        let {i,j} = {i:coord[1],j:coord[0]}
        let newBox = document.createElement('div');
        newBox.setAttribute('class','final-box');
        sequentialArray = sequentialArray.filter(x=>x.toString()!== coord.toString());
        newBox.style.left = i+'px';
        newBox.style.top = j+'px';
        container.appendChild(newBox);
    }
    sequentialArray = sequentialArray.filter(x=> x.toString()!== [1170,270].toString());
    let valuesArray = [...sequentialArray];
    let final_food = document.createElement('div');
    final_food.setAttribute('id','winner');
    final_food.style.top = '1170px';
    final_food.style.left = '270px';
    container.appendChild(final_food);
    for(let i=0;i<100;i++){
        let randomIndex = Math.floor(Math.random()*sequentialArray.length);
        let randomValue = sequentialArray[randomIndex];
        valuesArray = valuesArray.filter(x=> x.toString()!==randomValue.toString());
        randomValueArray.push(randomValue);
        let newElement = document.createElement('div');
        newElement.setAttribute('class','absolute');
        newElement.style.left = randomValue[1]+'px';
        newElement.style.top = randomValue[0]+'px'; document.getElementById('container').appendChild(newElement);
    }
    for(let i=0;i<18;i++){
        let foodIndex = Math.floor(Math.random()*valuesArray.length);
        let foodValue = valuesArray[foodIndex];
        let container =  document.getElementById('container');
        let foodElement = document.createElement('div');
        foodElement.setAttribute('class','food');
        foodElement.style.left = foodValue[1]+'px';
        foodElement.style.top = foodValue[0]+'px';
        if(i<5){
            foodElement.innerText = 'a';
        } else if(i<10){
            foodElement.innerText = 'b';
        } else if(i<15){
            foodElement.innerText = 'c';
        } else{
            foodElement.setAttribute('class','MainFood');
            i==15?foodElement.innerText = 'A':i==16?foodElement.innerText='B':i==17?foodElement.innerText='C':console.log();
            i==15?foodElement.setAttribute('id','firstFood'):i==16?foodElement.setAttribute('id','secondFood'):i==17?foodElement.setAttribute('id','thirdFood'):console.log();
        }
        
        container.appendChild(foodElement);
    }
    
    this.setState({
        randomValueArray,
    })
  }
  checkForCollision(){
    let plP = document.getElementById('player').getBoundingClientRect();
    let allowMove = {
        leftCollision: false,
        rightCollision: false,
        topCollision: false,
        bottomCollision: false,
    }
    for(let box of document.getElementsByClassName('absolute')){
        let rva = box.getBoundingClientRect();
        if((rva.top == plP.top)&& rva.right == plP.left){
            allowMove.leftCollision = true;
        }
        if((rva.top == plP.top)&& rva.left == plP.right){
            allowMove.rightCollision = true;
        }
        if((rva.left == plP.left)&& rva.bottom == plP.top){
            allowMove.topCollision = true;
        }
        if((rva.left == plP.left)&& rva.top == plP.bottom){
            allowMove.bottomCollision = true;
        }
    }
    for(let box of document.getElementsByClassName('final-box')){
        let boxCoords = box.getBoundingClientRect();
        if((boxCoords.top == plP.top)&& boxCoords.right == plP.left){
            this.checkIfWin();
            allowMove.leftCollision = true;
        }
        if((boxCoords.top == plP.top)&& boxCoords.left == plP.right){
            this.checkIfWin();
            allowMove.rightCollision = true;
        }
        if((boxCoords.left == plP.left)&& boxCoords.bottom == plP.top){
            this.checkIfWin();
            allowMove.topCollision = true;
        }
        if((boxCoords.left == plP.left)&& boxCoords.top == plP.bottom){
            this.checkIfWin();
            allowMove.bottomCollision = true;
        }
    }
    for(let boxFood of document.getElementsByClassName('MainFood')){
        let text = boxFood.innerText;
        let foodIndices = boxFood.getBoundingClientRect();
        if(plP.top == foodIndices.top && plP.bottom == foodIndices.bottom && plP.left == foodIndices.left && plP.right == foodIndices.right)
        {
            if(text == 'A'){
                if(this.allEaten('countA')){
                    document.getElementById('container').removeChild(boxFood);
                    this.setState({
                        countA: this.state.countA+=1
                    })
                } else {
                        this.youLose();
                }
            } else if (text == 'B'){
                if(this.allEaten('countB')){
                    document.getElementById('container').removeChild(boxFood);
                    this.setState({
                        countB: this.state.countB+=1
                    })
                } else {
                        this.youLose();
                }
            } else {
                if(this.allEaten('countC')){
                    document.getElementById('container').removeChild(boxFood);
                    this.setState({
                        countC: this.state.countC+=1
                    })
                } else {
                    this.youLose();
                }
            }
        }
    }
    for(let food of document.getElementsByClassName('food')){
        let text  = food.innerText;
        let foodIndices = food.getBoundingClientRect();
        if(plP.top == foodIndices.top && plP.bottom == foodIndices.bottom && plP.left == foodIndices.left && plP.right == foodIndices.right){  
            if(text == 'a'){
                this.setState({
                    countA: this.state.countA+=1
                })
            } else if (text == 'b'){
                this.setState({
                    countB: this.state.countB+=1
                })
            } else {
                this.setState({
                    countC: this.state.countC+=1
                })
            }
            document.getElementById('container').removeChild(food);
        }
    }
    return allowMove
  }
  youLose(){
      let result = confirm("Game Over! You Lost! Do you want to restart?");
      if(result){
          location.reload();
      }
  }
  checkIfWin(){
      let {countA,countB,countC} = this.state;
      let finalBox = document.getElementsByClassName('final-box');
      if(countA == 6 && countB == 6 && countC == 6){
        let container = document.getElementById('container');
        for(let i of finalBox){
            i.style.display = 'none';
            container.removeChild(i);
        }
        if(!this.executed){
            setTimeout(()=>{
                alert("Game Ends! You Win!");
                location.reload();
            },500)
            this.executed= true;
        }
      }
      return false;
  }
  allEaten(foodType){
    if(this.state[foodType]==5){
        return true
    }
    return false
  }
  keyHandler(e){ 
    let player = document.getElementById('player');
    let container = document.getElementById('container');
    let containerTop = container.offsetTop;
    let playerSize = 30;
    let left = player.offsetLeft;
    let top = player.offsetTop;
    let {leftCollision,rightCollision,topCollision,bottomCollision} = this.checkForCollision([left,top]);
    if((!leftCollision && e.keyCode == 37 && (left >= playerSize))){ //left
        player.style.left = (left-playerSize)+'px';
    }
    else if((!topCollision)&&e.keyCode == 38 && (top >= playerSize )){//top
        player.style.top = (top-playerSize)+'px';
        if((this.state.offset+30 >= playerSize)){
        container.style.top = (containerTop+30)+'px';
        this.setState({offset: this.state.offset-playerSize })
        }
    }
    else if((!rightCollision)&&e.keyCode == 39 &&(left <= (600-40))){//right
        player.style.left = (left+playerSize)+'px';

    }
    else if((!bottomCollision)&&e.keyCode == 40 &&(top <= (1200-40))){//bottom
        player.style.top = (top+playerSize)+'px';
        if(this.state.offset-30<=870){
            container.style.top = (containerTop -30)+'px';
            this.setState({offset: this.state.offset+playerSize })
        }
    }
  }
  render(){
    return(
      <div id="outer-container" style={{backgroundColor: 'black'}}>
        <div id="container">
          <div id="player">
          </div>
        </div>
      </div>
    )
  }
}
ReactDOM.render(<App/>,document.getElementById('app'));