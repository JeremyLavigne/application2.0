import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// ====================================

class Element1 extends React.Component {
    
    render() {
        return (
            <div className={this.props.element1 + ' element1-' + this.props.position}>

            </div>
        );
    }
    
}

class Element2 extends React.Component {
    
    render() {
        return (
            <div className={'element2-' + this.props.position + ' ' + this.props.element2}>

            </div>
        );
    }
    
}

class Cheese extends React.Component {
    
    render() {
        return (
            <div className={this.props.cheese}>
                <Element1 
                    element1={this.props.element1}
                    position={1}
                />
                <Element1 
                    element1={this.props.element1}
                    position={2}
                />
                <Element1 
                    element1={this.props.element1}
                    position={3}
                />
                <Element1 
                    element1={this.props.element1}
                    position={4}
                />
                <Element1 
                    element1={this.props.element1}
                    position={5}
                />
            
                <Element2 
                    element2={this.props.element2}
                    position={1}
                />
                <Element2 
                    element2={this.props.element2}
                    position={2}
                />
                <Element2 
                    element2={this.props.element2}
                    position={3}
                />
                <Element2 
                    element2={this.props.element2}
                    position={4}
                />
            </div>
        );
    }
    
}

class Sauce extends React.Component {
    
    render() {
        return (
            <div className={this.props.sauce}>
                <Cheese 
                    cheese={this.props.cheese}
                    element1={this.props.element1}
                    element2={this.props.element2}
                />
            </div>
        );
    }
    
}

class Pate extends React.Component {
    
    render() {
        return (
            <div className="pizza-vide">
                <Sauce 
                    sauce={this.props.sauce}
                    cheese={this.props.cheese}
                    element1={this.props.element1}
                    element2={this.props.element2}
                />
            </div>
        );
    }
    
}

// ===================================

class NewGame extends React.Component {
    
    render() {
        return (
            <button className="new-game-btn" 
            onClick={this.props.onClick}>
                New Game
            </button>
        );
    }
    
}

class Rules extends React.Component {
    
    render() {
        return ( 
            <div>
            Prepare pizzas for customers.
            <br /><br />
            1 - Choose a sauce.
            <br /><br />
            2 - Add some cheese, or not.
            <br /><br />
            3 - Add Ingredients.
             
            <p className={this.props.loser ? "lose-msg" : ""}>{this.props.loser ? "You lose, start a new game ;)" : ""}</p>
            </div>
             );
    }
    
}

class Score extends React.Component {
    
    render() {
        return (
            <p className={this.props.check ? "score check" : "score"}>
                Score : {this.props.score}
            </p>
        );
    }
    
}

// ===================================

class Box extends React.Component {
    
    render() {
        return (
            <button className={"box" + this.props.content} onClick={this.props.onClick}></button>
        );
    }
    
}

// ===================================

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          order: newOrder(),
          preparation: ['','','',''],
          score: 0,
          check: false,
          loser: false 
    };
  }

    /* Click sur une box */
  handleClick(content, groupe) {

      const preparation = this.state.preparation.slice(); 
      let order = this.state.order.slice();
      let score = this.state.score;
      let check = this.state.check;
      let loser = this.state.loser;
      
      /* Bloquer si la partie est finie */
      if (gameOver(order, preparation)) {
          return;
      }
      
      /* Empecher le fromage avant la sauce */
      if ((groupe > 1) && (preparation[0] === '')) {
          return;
      }
      
      /* Considerer qu'il n'y a pas de fromage si on met un element */
      if ((groupe > 2) && (preparation[1] === '')) {
          preparation[1] = 'noCheese';
      }
      
      if (preparation[groupe - 1] !== '') { 
          return;
      } else {
        preparation[groupe - 1] = content;
        this.setState({preparation: preparation});
        
      }  
      
      /* Defaite ou non */
      if (gameOver(order, preparation)) {
          console.log('loser');
          loser = true; /* Notice the lose */
          this.setState({
                  loser: loser
                });
          return;
      }
      
      /* Victoire ou non */
      if (success(order, preparation)) {
          score += 1;
          order = newOrder();
          check = true; /* Notice it is ok */
          this.setState({order: order,
                  preparation: ['','','',''],
                  score: score,
                  check: check
                });
      }
      
      /* Uncheck after 400 ms */
      if (check) {
        setTimeout(function() {
            this.setState({check: false});
        }.bind(this), 400);
      }
      
      console.log(preparation);
}


  newGame() {
      
    let order = this.state.order.slice();  

    order = newOrder();

    this.setState({order: order,
                  preparation: ['','','',''],
                  score: 0, 
                  check: false,
                  loser: false
                  });
  }    
    
  render() {


    return (
      <div className="game">
        <div className="pizzas">
            <div>
                <h2>Order</h2>
                <div className="bloc-vide">    
                  <Pate
                    sauce={this.state.order[0]}
                    cheese={this.state.order[1]}
                    element1={this.state.order[2]}
                    element2={this.state.order[3]}
                  />
                </div>
            </div>
            <div className="infos-middle">
                <NewGame
                    onClick={() => this.newGame()} 
                />
                <Rules 
                    loser={this.state.loser}
                />
                <Score 
                    score={this.state.score}
                    check={this.state.check}
                />
            </div>
            <div>    
                <h2>Preparation</h2>    
                <div className="bloc-vide">
                  <Pate
                    sauce={this.state.preparation[0]}
                    cheese={this.state.preparation[1]}
                    element1={this.state.preparation[2]}
                    element2={this.state.preparation[3]}
                  />
                </div>
            </div>
        </div>
        <div className="ingredients">
            <div className="categories">
                <div className="categorie-sauce">
                    <Box 
                        content={'tomato'}
                        onClick={() => this.handleClick('tomato', 1)}
                    />
                    <Box 
                        content={'cremeFraiche'}
                        onClick={() => this.handleClick('cremeFraiche', 1)}
                    />
                </div>
            </div>
                
            <div className="categories">
                <div className="categorie-cheese">
                    <Box 
                        content={'cheese'}
                        onClick={() => this.handleClick('cheese', 2)}
                    />
                </div>
            </div>
                
            <div className="categories"> 
                <div className="categorie-add1">
                    <Box 
                        content={'mushroom'}
                        onClick={() => this.handleClick('mushroom', 3)}
                    />
                    <Box 
                        content={'spinach'}
                        onClick={() => this.handleClick('spinach', 3)}
                    />
                    <Box 
                        content={'olive'}
                        onClick={() => this.handleClick('olive', 3)}
                    />
                    <Box 
                        content={'oignon'}
                        onClick={() => this.handleClick('oignon', 3)}
                    />
                </div>
            </div>
                
            <div className="categories">  
                <div className="categorie-add1">
                    <Box 
                        content={'shrimp'}
                        onClick={() => this.handleClick('shrimp', 4)}
                    />
                    <Box 
                        content={'pepper'}
                        onClick={() => this.handleClick('pepper', 4)}
                    />
                    <Box 
                        content={'bacon'}
                        onClick={() => this.handleClick('bacon', 4)}
                    />
                    <Box 
                        content={'sausage'}
                        onClick={() => this.handleClick('sausage', 4)}
                    />
                </div>
            </div>    
        </div>
      </div>
    );
  }
}



// ========================================

ReactDOM.render(<Game />, document.getElementById("main"));

// =======================================

function newOrder() {

    let finalOrder = [];
    const group1 = ['tomato', 'cremeFraiche'];
    const group2 = ['cheese', 'noCheese'];
    const group3 = ['mushroom', 'spinach', 'olive', 'oignon'];
    const group4 = ['shrimp', 'pepper', 'bacon', 'sausage'];

    let alea1 = Math.random();
    let alea2 = Math.random();
    let alea3 = Math.random();
    let alea4 = Math.random();

    if (alea1 < 0.8) {
        finalOrder.push(group1[0]);
    } else {
        finalOrder.push(group1[1]);
    }

    if (alea2 < 0.8) {
        finalOrder.push(group2[0]);
    } else {
        finalOrder.push(group2[1]);
    }

    if (alea3 < 0.4) {
        finalOrder.push(group3[0]);
    } else if (alea3 < 0.6) {
        finalOrder.push(group3[1]);
    } else if (alea3 < 0.8) {
        finalOrder.push(group3[2]);
    } else {
        finalOrder.push(group3[3]);
    }

    if (alea4 < 0.25) {
        finalOrder.push(group4[0]);
    } else if (alea4 < 0.5) {
        finalOrder.push(group4[1]);
    } else if (alea4 < 0.75) {
        finalOrder.push(group4[2]);
    } else {
        finalOrder.push(group4[3]);
    }
    console.log(finalOrder);
    return finalOrder;
}

function success(order, preparation) {
    
    for (let i = 0 ; i < 4 ; i++) {
        if (order[i] !== preparation[i]) {
            return false;
        }
    } 
    return true; 
}

function gameOver(order, preparation) {

/* Cut off when there is a mistake and propose a new game */
    
    for (let i = 0 ; i < 4 ; i++) {
        if ((preparation[i] !== '') && (preparation[i] !== order[i])) {
            return true;
        } 
    }
    
    return false; 
}

