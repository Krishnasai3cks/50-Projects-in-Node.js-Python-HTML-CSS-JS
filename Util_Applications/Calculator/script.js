const nums=[7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const ops = [ '/', '*', '-', '+'];
const numids={
  7: 'seven', 
  8: 'eight', 
  9: 'nine', 
  4: 'four', 
  5: 'five', 
  6: 'six', 
  1: 'one', 
  2: 'two', 
  3: 'three', 
  0: 'zero'
};
const opsids={
 '/': 'divide', 
  '*': 'multiply', 
  '-': 'subtract', 
  '+': 'add'
};
class App extends React.Component{ 
    state = {
      oldtext: undefined,
      exp:  '0'
    }
    handleClick = (e) => {
      const { oldtext, exp } = this.state;
      const { innerText } = e.target;
      switch(innerText)
      { case 'AC': {
          this.setState({
            exp: '0'
          });
          break;
        }
        case 'D':{
          this.setState({
            exp: exp.slice(0,-1)
          })
          break;
        }
        case '=': {
          const value = eval(exp);
          this.setState({
            exp: value
          });
        break;
        }
        case '.': {
          const arra = exp.split(/[\+\-\*\/]/);
          const last = arra.slice(-1)[0];
        
        if(!last.includes('.')) {
          this.setState({
            exp: exp +'.'
          })
        }
        break;
        }  
        default: {
         
          let e = undefined;
          if(ops.includes(innerText)) {
          if(ops.includes(oldtext) && innerText !== '-') {
            const lastNumberIdx = exp.split('').reverse()
                .findIndex(char => char !== ' ' && nums.includes(+char)); 
            e = exp.slice(0, exp.length - lastNumberIdx) + ` ${innerText} `;
          } else {
            e = `${exp} ${innerText} `;
          }
        } else {
          e = (exp === '0') ? innerText : (exp + innerText);
        }
        
        this.setState({
          exp: e
        });
      }
     }
    this.setState({
      oldtext: innerText
    })
    
  }
  render(){
    const {oldtext, exp} = this.state;
    return(
      <div className="buttons">
        <div className="screen" id="display"> {exp} </div>
        <div className = "clicknums">
          <button className="click clickAC" id="clear" onClick={this.handleClick}> AC </button>
          <button className="click clickdel" id="delete" onClick={this.handleClick}>D</button>
          <div class="horirow"></div>
          {nums.map(but => (
              <button class="click clicknum" id={numids[but]} onClick={this.handleClick}> {but}</button>
          ))}
          <button class="click clicknum" id='decimal' onClick={this.handleClick}>.</button>
        </div>
        <div className="clickops">
        {ops.map(ops => (
          <button class="click clickop" id={opsids[ops]} onClick={this.handleClick}> {ops}</button>
        ))}
        <button class="clickeq" id="equals" onClick={this.handleClick}> = </button>
        </div>
      </div>
    )
  }
}
ReactDOM.render(<App/>,document.getElementById("app"))
  