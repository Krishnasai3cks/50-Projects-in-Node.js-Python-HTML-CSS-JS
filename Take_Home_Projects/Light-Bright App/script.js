class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            color: 'black',
            prevcolor: 'black',
        }
        this.colors = ['yellow','red','blue','orange','pink','violet','gray']
        this.handleChangeColor = this.handleChangeColor.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }
    componentDidMount(){
        let boxes = document.getElementsByClassName('box');
        this.setState({
            color: this.colors[Math.floor(Math.random()*this.colors.length)]
        });
        document.getElementById('innercontainer').addEventListener('click',()=>{})
        let drag = false;
        document.addEventListener( //changes here
                'mousedown', (e) =>{
                    let {className} = e.target;
                    drag = false;
                    if(className.substring(0,3) == 'box'){
                        drag = true;
                    }
                    
                });
        document.addEventListener('mouseup',(e)=>{ //changed here
            if(e.target.className.substring(0,3)== 'box'){
                drag = false;
                let color = this.colors[Math.floor(Math.random()*this.colors.length)];
                let prevcolor = this.state.color;
                this.setState({
                    prevcolor,
                    color:color
                });
            }
        });
        for(let i of boxes){
            i.addEventListener('mousemove',(e)=>{ if(drag){ this.changeColor(e)}})    
        }
    }
    onClickHandler(e){ 
        console.log(e);
        let color = this.colors[Math.floor(Math.random()*this.colors.length)];
        let prevcolor = this.state.color;
        this.setState({prevcolor,
            color:color})
        this.changeColor(e);
    }
    changeColor(e){
        let {color} = this.state;
        e.target.setAttribute('class','box '+color)
    }
    onDoubleClick(e){
        e.target.setAttribute('class','box black')
    }
    handleChangeColor(){
        this.setState({
            color: this.state.prevcolor,
            prevcolor: this.state.color,
        });
    }
    handleReset(){
        this.setState({
            color: 'black',
            prevcolor:'black',
        })
        for(let i of document.getElementsByClassName('box')){
            i.setAttribute('class',"box black")
        }
    }
    render() {
        return( 
            <div id="container"> 
                <button onClick={this.handleChangeColor}>Previous Color</button>
                <button onClick={this.handleReset}>Reset All</button>

                <div id="innercontainer">
                    {
                        [...Array(306)].map((j,i)=>{
                            return <div id={i.toString()} key={i.toString()} onDoubleClick={this.onDoubleClick} onClick={this.onClickHandler} className="box black"></div>
                        })
                    }
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App/>,document.getElementById('app'));