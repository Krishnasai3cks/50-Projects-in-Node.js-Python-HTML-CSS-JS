const root = document.getElementById('root');
class LocalStorage{
    setItem(item){
        localStorage.setItem('_krishna_recipebox',JSON.stringify(item));
    }
    getItem(){
        return JSON.parse(localStorage.getItem("_krishna_recipebox"));
    }
}
let newLocalStorage = new LocalStorage();
class App extends React.Component {
    constructor(props){
        super(props);
        this.defaultRecipes = [
            {
              name : 'Artichoke-Pasta',ingredients : ['2 tablespoons butter', '2 cloves garlic, minced','1 cup heavy cream','3/4 teaspoon salt','1 teaspoon fresh-ground black pepper', '2 1/2 cups canned, drained artichoke hearts (two 14-ounce cans), rinsed and cut into halves or quarters','3/4 pound fusilli','1/2 cup grated Parmesan cheese','2 tablespoons chopped chives, scallion tops, or parsley',],directions : ['In a medium saucepan, melt the butter over moderately low heat. Add the garlic and cook for 30 seconds. Stir in the cream, salt, pepper, and artichoke hearts. Cook until just heated through, about 3 minutes.','In a large pot of boiling, salted water, cook the fusilli until just done, about 13 minutes. Drain the pasta and toss with the cream sauce, Parmesan, and chives.']
            },
            {
              name : "Garlic-Chicken",ingredients : ["3 tablespoons butter","1 teaspoon seasoning salt","1 teaspoon onion powder ","4 skinless, boneless chicken breast halves","2 teaspoons garlic powder"], directions : ["Melt butter in a large skillet over medium high heat.", "Add chicken and sprinkle with garlic powder, seasoning salt and onion powder.", "Saute about 10 to 15 minutes on each side, or until chicken is cooked through and juices run clear."]
            },
            {
              name : "Easy-Chocolate-Pie",ingredients : ["1 (12 ounce) can evaporated milk","1 (5.9 ounce) package chocolate instant pudding mix", "1 (6.5 ounce) can whipped cream", "1/2 cup miniature semi-sweet chocolate chips (optional)","1 (9 inch) graham cracker pie crust","Another can of whipped cream for garnish (optional)"], directions : ["Pour milk into medium bowl. Add dry pudding mix; beat with wire whisk until well blended and mixture just begins to thicken. Stir in half of the chocolate chips.","Add contents of whipped cream can; stir gently but quickly until well blended. Pour into crust; cover.","Refrigerate 6 hours, or until set. Cut into 8 slices to serve. Garnish with additional whipped cream and remaining chocolate chips, if desired."]
            },
            {
              name : 'Lime-Chicken-Tacos', ingredients : ['1 1/2 pounds skinless, boneless chicken breast meat - cubed', '1/8 cup red wine vinegar', '1/2 lime, juiced', '1 teaspoon white sugar', '1/2 teaspoon salt', '1/2 teaspoon ground black pepper', '2 green onions, chopped', '2 cloves garlic, minced', '1 teaspoon dried oregano', '10 (6 inch) corn tortillas', '1 tomato, diced', '1/4 cup shredded lettuce', '1/4 cup shredded Monterey Jack cheese', '1/4 cup salsa'], directions : ['Saute chicken in a medium saucepan over medium high heat for about 20 minutes. Add vinegar, lime juice, sugar, salt, pepper, green onion, garlic and oregano. Simmer for an extra 10 minutes.', 'Heat an iron skillet over medium heat. Place a tortilla in the pan, warm, and turn over to heat the other side. Repeat with remaining tortillas. Serve lime chicken mixture in warm tortillas topped with tomato, lettuce, cheese and salsa.']
            },
            {
              name : 'Artichoke-Dip',ingredients : ['1 8oz package soft cream cheese', '4oz mayonnaise','4oz sour cream','1/4 Cup Fresh Grated Parmesan Cheese','1/4 Cup Fresh Grated Romano Cheese','2 eggs','3/4 Cup dairy sour cream','1 16oz can artichoke hearts','1/4 Cup fresh chopped chives','1 tbs fresh minced garlic'],directions : ['Soften the cream cheese before mixing.','Rinse well, then dice the artichokes into small ½” size pieces.','Into a mixing bowl place the softened cream cheese. Mix in the mayonnaise, sour cream, the Parmesan and Romano cheese, artichokes and garlic.','When the mixture is fairly well blended, spoon into a 9” round glass pie dish.', 'Set Oven to Bake at 350 degrees.','Place un-covered dish into oven for 20 – 25 minutes until the edges appear slightly golden and mixture is bubbling at the edge.','Remove and sprinkle chopped chives on top and let cool about 5 minutes before serving.','Enjoy!'] 
            },
          ];
          
        // newLocalStorage.setItem(this.defaultRecipes);
        // console.log(newLocalStorage.getItem())
        this.state = {
            recipes: newLocalStorage.getItem(),
            editing: '',
        }
        this.openRecipe = this.openRecipe.bind(this);
        this.deleteRecipe= this.deleteRecipe.bind(this);
        this.editRecipe = this.editRecipe.bind(this);
        this.editRecipeHandler = this.editRecipeHandler.bind(this);
        this.newRecipeHandler = this.newRecipeHandler.bind(this);
        this.newRecipe = this.newRecipe.bind(this);
    }
    openRecipe(event){
        console.log("button clicked","index",event.target.id);
        this.state.recipes.map(recipe=>{
            document.getElementById(recipe.name).style.display = 'none';
            if("name"+recipe.name == event.target.id){
                document.getElementById(recipe.name).style.display = 'block';
            }
        })
    }
    deleteRecipe(recipe){
        let id = recipe.name;
        if(confirm("Do You want to delete "+id+"")){
            let {recipes} = this.state;
            recipes = recipes.filter(value => {return value.name !== id})
            console.log(JSON.stringify(recipes));
            newLocalStorage.setItem(recipes);
            this.setState({
                recipes: newLocalStorage.getItem(),
            })
        }
    }
    editRecipe(recipe){
        let id = recipe.name;
        id=id.replace('edit','');
        console.log(id);
        document.getElementById('editName').value= recipe.name;
        document.getElementById('editIngredients').value = recipe.ingredients.join('\\');
        document.getElementById('editDirections').value = recipe.directions.join('\\');
        this.setState({
            editing: id,
        });
        let popUp=document.getElementById('editPopUp');
        popUp.style.display = 'flex';
    }
    newRecipe(){
        let popUp=document.getElementById('newPopUp');
        popUp.style.display = 'flex';
    }
    editRecipeHandler(e){
        e.preventDefault();
        let editName  = document.getElementById('editName').value;
        let editIngredients = document.getElementById('editIngredients').value.split('\\')
        let editDirections = document.getElementById('editDirections').value.split('\\')
        
        let popUp=document.getElementById('editPopUp');
        popUp.style.display = 'none';
        console.log(this.state.editing);
        if(this.state.editing === null){
            alert("Click edit button first")
        } else {
            let {recipes} = this.state;
            let recipe = {
                name: editName,
                ingredients: editIngredients,
                directions: editDirections,
            }

            recipes = recipes.filter(value=>{return value.name !== this.state.editing});
            recipes = [...recipes,recipe];
            newLocalStorage.setItem(recipes);
            this.setState({
                recipes: recipes,
            })
            this.setState({
                editing: '',
            });
        }
    }
    hideTheForm(id){
        id = id.replace('button','');
        console.log(document.getElementById(id+'PopUp'));
        document.getElementById(id+'PopUp').style.display = 'none';
        document.getElementById(id+'Name').value = '';
        document.getElementById(id+'Ingredients').value = '';
        document.getElementById(id+'Directions').value = '';
    }
    newRecipeHandler(e){
        e.preventDefault();

        let newName  = document.getElementById('newName').value;
        let newIngredients = document.getElementById('newIngredients').value.split(`\\`);
        let newDirections = document.getElementById('newDirections').value.split(`\\`);
        // console.log('newrecipehandler',{newName,newIngredients,newDirections})
        let recipe = {
            name: newName,
            ingredients:newIngredients,
            directions:newDirections,
        }
        
        let popUp=document.getElementById('newPopUp');
        popUp.style.display = 'none';
        let {recipes} = this.state;
        // console.log("state recipe",this.state.recipes);
        // console.log("new recipe", recipe);
        recipes.push(recipe);
        newLocalStorage.setItem(recipes);
        this.setState({
            recipes: recipes,
        });
    }
    componentDidMount(){
        let {recipes} = this.state;
        if(newLocalStorage.getItem()== null){
            newLocalStorage.setItem(this.defaultRecipes);
        }
        recipes.map(recipe=>{
            document.getElementById(recipe.name).style.display = 'none';
            if(recipe == recipes[0]){
                document.getElementById(recipe.name).style.display = 'block';
            }
        });
    } 
    componentDidUpdate(){
        console.log("state change",this.state.recipes);
    }
    render(){
        return(
            <div id="container">
                <div className="recipePopUp" id="editPopUp">
                    <button id='editbutton' onClick={()=>this.hideTheForm('editbutton')}>close<i className="fa fa-close closeButton"></i></button>
                    <h1> Edit a Recipie </h1>
                    <form onSubmit={(e)=>this.editRecipeHandler(e)}>

                        <input type="text" class="text" id="editName"></input>
                        <input type="text" class="text" id="editIngredients" rows="5" cols="50" placeholder="Enter your ingredients separated by \ "></input>
                        <input type="text" class="text" id="editDirections" placeholder="Enter the directions separated by \ "></input>
                        <input type="submit" value="submit" class="submit"></input>
                    </form>
                </div>
                <div className="recipePopUp" id="newPopUp">
                    <button id="newbutton" onClick={()=>this.hideTheForm('newbutton')}>close<i className="fa fa-close closeButton"></i></button>
                    <h1> Add a new Recipie </h1>
                    <form onSubmit={(e)=>this.newRecipeHandler(e)}>
                    
                        <input type="text" class="text" id="newName" placeholder="Enter recipe name"></input>
                        <input type="text" class="text" id="newIngredients" placeholder="Enter your ingredients separated by \ "></input>
                        <input type="text" class="text" id="newDirections" placeholder="Enter the directions separated by \ "></input>
                        <input type="submit" value="submit" class="submit"></input>
                    </form>
                </div>
                <h1 id="heading">Recipe Box 😋</h1>
                <div id="recipeList">
                    <div className="innerlist">
                        <h1 id="recipieh1">Your recipies</h1>
                        <hr style={{width:'100%'}}/>
                        { 
                        this.state.recipes.map((a,ind)=>{
                            return <div class={ind%2==0?"dark":"light"} id={'name'+a.name} style={{cursor:"pointer"}} onClick={this.openRecipe}>{a.name}</div>
                            })
                        }
                    </div>
                </div>
                <div id="recipeProcess">
                    <div className="secondinnerlist">
                        {
                            this.state.recipes.map(recipe=>{
                                return( 
                                <div class="recipeElements"  id={recipe.name}>
                                    <div class="title">
                                        <h1 >{recipe.name}</h1>
                                        <div style={{display: 'flex'}}>
                                            <button id={`delete${recipe.name}`} className="del" onClick={(e)=>this.deleteRecipe(recipe)}><i className="fa fa-trash"></i></button> 
                                            <button id={`edit${recipe.name}`} className="edit" onClick={(e)=>this.editRecipe(recipe)}><i className="fa fa-edit"></i></button>
                                        </div>
                                    </div>
                                    <div id="ulwrapper">
                                        <h1>Ingredients:</h1>
                                        <ul>
                                            {recipe.ingredients.map(val=>{return <li>{val}</li>})}
                                        </ul>
                                        <h1>Directions</h1>
                                        <ol>
                                            {recipe.directions.map(point=>{
                                                return <li>{point}</li>
                                            })
                                            }
                                        </ol>
                                    </div>
                                    <div id="endsecondinner">
                                        <button id="newRecipe"  onClick={this.newRecipe
                                        }><i className="fa fa-plus"></i>new recipe</button>
                                    </div>
                                </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
    
}

ReactDOM.render(<App />,root);