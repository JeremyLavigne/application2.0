import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// ====================================
// Pizza

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
            <div className={this.props.element2 + ' element2-' + this.props.position}>

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

class Dough extends React.Component {
    
    render() {
        return (
            <div className="empty-pizza">
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
// Others Elements

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
            <div className="rules">
                <p>
                    Prepare pizzas for customers, as much as you can!
                    <br /><br />
                    1 - Add some sauce.
                    <br /><br />
                    2 - Add some cheese, or not.
                    <br /><br />
                    3 - Add ingredients.
                </p>

                <p className={(this.props.loseGame || this.props.timeOver || (this.props.timer < 1)) ? 
                "lose-msg" : 
                ""}>

                    {this.props.loseGame ? 
                     "You lose, start a new game ;)" : 
                     ""}

                    {(this.props.timeOver || (this.props.timer < 1)) ?
                        "Time is over, good job! Start a new game ;)" : 
                        ""}
                </p>
            </div>
             );
    }
    
}

class Score extends React.Component {
    
    render() {
        return (
            <p className={this.props.orderCheck ? "score check" : "score"}>
                Score : {this.props.score}
            </p>
        );
    }
    
}

// ===================================
// Header - Footer

class Timer extends React.Component {
    
    render() {
        return (
            <p className="timer">
                00:{(this.props.timer < 10) ? "0" + this.props.timer : this.props.timer}
            </p>
        );
    }
    
}

class BestScore extends React.Component {
    
    render() {
        return (
            <p className={(this.props.bestScore > 0) ?
                "best-score" :
                ""}>
            
                {(this.props.bestScore > 0) ?
                "Best Score : " + this.props.bestScore :
                ""}
            </p>
        );
    }
    
}

class Footer extends React.Component {
    
    render() {
        return (
            <div className="footer">
                <p>Build by Jeremy Lavigne </p>
                <p>Images from <a href="https://pixabay.com"> Pixabay</a></p>
            </div>
        );
    }
}

// ===================================
// Ingredients

class Box extends React.Component {
    
    render() {
        return (
            <button className={"box" + this.props.content} onClick={this.props.onClick}>
            </button>
        );
    }
    
}

// ===================================
// Main class 

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          order: newOrder(),
          preparation: ['','','',''],
          score: 0,
          orderCheck: false,
          loseGame: false,
          startGame: false,
          timer: 30,
          interval: {},
          timeOver: false,
          bestScore: 0
    };
  }
   
  decrementChrono() {
      let timer = this.state.timer;
      
      if (timer < 1) {
          return;
      }
      timer -= 1;
      
      this.setState({
        timer: timer
      });
  }
    
  handleClick(content, groupe) {

      /* Variable declaration */
      const preparation = this.state.preparation.slice(); 
      let order = this.state.order.slice();
      let score = this.state.score;
      let orderCheck = this.state.orderCheck;
      let loseGame = this.state.loseGame;
      let startGame = this.state.startGame;
      let timer = this.state.timer;
      let interval = this.state.interval;
      let timeOver = this.state.timeOver;
      let bestScore = this.state.bestScore;
      
      
      /* Block if game is over */
      if (gameOver(order, preparation)) {
          return;
      }

      /* Block and notice if time is over */
      if (timer < 1) {
          timeOver = true;
          bestScore = score;
          this.setState({timeOver: timeOver,
                        bestScore: bestScore});
          return;
      }
      
      /* Chrono starts in first click */
      if (startGame === false){
          startGame = true;
          interval = setInterval(
              () => (
                this.decrementChrono()
              )
              , 1000);
          this.setState({startGame: startGame,
                        interval: interval});
      }
      
      /* Nothing can be added before sauce */
      if ((groupe > 1) && (preparation[0] === '')) {
          return;
      }
      
      /* If you add element before cheese, it means you do not add cheese */
      if ((groupe > 2) && (preparation[1] === '')) {
          preparation[1] = 'noCheese';
      }
      
      if (preparation[groupe - 1] !== '') { 
          return;
      } else {
        preparation[groupe - 1] = content;
        this.setState({preparation: preparation});
        
      }  
      
      /* Notice if you lose */
      if (gameOver(order, preparation)) {
          loseGame = true; 
          clearInterval(interval);
          bestScore = score;
          this.setState({
                  loseGame: loseGame,
                  interval: interval,
                  bestScore: bestScore
                });
          return;
      }
      
      /* Notice if you win */
      if (success(order, preparation)) {
          score += 1;
          order = newOrder();
          orderCheck = true; /* Notice it is ok */
          this.setState({order: order,
                  preparation: ['','','',''],
                  score: score,
                  orderCheck: orderCheck
                });
      }
      
      /* Uncheck after 400 ms */
      if (orderCheck) {
        setTimeout(function() {
            this.setState({orderCheck: false});
        }.bind(this), 400);
      }

}

  newGame() {
    
    let order = this.state.order.slice();  
    let interval = this.state.interval;

    order = newOrder();
    clearInterval(interval);

    this.setState({order: order,
                  preparation: ['','','',''],
                  score: 0, 
                  orderCheck: false,
                  loseGame: false,
                  startGame: false,
                  timer: 30,
                  interval: {},
                  timeOver: false
                  });
  }    
    
  render() {

    return (
        <div>
        
          <header className="header">
        
            <Timer
               timer={this.state.timer}
            />
        
            <BestScore
                bestScore={this.state.bestScore}
            />
        
          </header>

          <main className="game">
        
            <section className="pizzas">
        
                <div className="order">
        
                    <h2>Order</h2>
        
                    <div className="empty-bloc">   
        
                      <Dough
                        sauce={this.state.order[0]}
                        cheese={this.state.order[1]}
                        element1={this.state.order[2]}
                        element2={this.state.order[3]}
                      />
        
                    </div>
        
                    <NewGame
                        onClick={() => this.newGame()} 
                    />
                    
                </div>
                    
                <div>
                        
                    <Rules 
                        loseGame={this.state.loseGame}
                        timeOver={this.state.timeOver}
                        timer={this.state.timer}
                    />
                    
                </div>
                    
                <div className="preparation">  
                    
                    <h2>Preparation</h2> 
                
                    <div className="empty-bloc">
                        
                      <Dough
                        sauce={this.state.preparation[0]}
                        cheese={this.state.preparation[1]}
                        element1={this.state.preparation[2]}
                        element2={this.state.preparation[3]}
                      />
                      
                    </div>
                      
                    <Score 
                        score={this.state.score}
                        orderCheck={this.state.orderCheck}
                    />
                    
                </div>
                    
            </section>
                    
            <section className="ingredients">
                
                <div className="categories">
                    
                    <div>
                    
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
                    
                    <div>
                    
                        <Box 
                            content={'cheese'}
                            onClick={() => this.handleClick('cheese', 2)}
                        />
                        
                    </div>
                        
                </div>

                <div className="categories"> 
                    
                    <div>
                    
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
                    
                    <div>
                    
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
                        
            </section>
                        
          </main>

          <footer>
                            
            <Footer />
                            
          </footer>
                        
        </div>
                        
    );
  }
}


// ========================================
// Main render

ReactDOM.render(<Game />, document.getElementById("root"));

// =======================================
// global functions 

function newOrder() {

    /* Var declaration */
    let finalOrder = [];
    const group1 = ['tomato', 'cremeFraiche'];
    const group2 = ['cheese', 'noCheese'];
    const group3 = ['mushroom', 'spinach', 'olive', 'oignon'];
    const group4 = ['shrimp', 'pepper', 'bacon', 'sausage'];

    let alea1 = Math.random();
    let alea2 = Math.random();
    let alea3 = Math.random();
    let alea4 = Math.random();

    /* Tomato 80%, creme 20% */
    if (alea1 < 0.8) {
        finalOrder.push(group1[0]);
    } else {
        finalOrder.push(group1[1]);
    }

    /* Tomato 80%, creme 20% */
    if (alea2 < 0.8) {
        finalOrder.push(group2[0]);
    } else {
        finalOrder.push(group2[1]);
    }

    /* mushroom 40%, 20% for others ingredients */
    if (alea3 < 0.4) {
        finalOrder.push(group3[0]);
    } else if (alea3 < 0.6) {
        finalOrder.push(group3[1]);
    } else if (alea3 < 0.8) {
        finalOrder.push(group3[2]);
    } else {
        finalOrder.push(group3[3]);
    }

    /* 25% for each ingredients */
    if (alea4 < 0.25) {
        finalOrder.push(group4[0]);
    } else if (alea4 < 0.5) {
        finalOrder.push(group4[1]);
    } else if (alea4 < 0.75) {
        finalOrder.push(group4[2]);
    } else {
        finalOrder.push(group4[3]);
    }

    return finalOrder;
}

function success(order, preparation) {
    
    /* Return true if every element match */
    for (let i = 0 ; i < 4 ; i++) {
        if (order[i] !== preparation[i]) {
            return false;
        }
    } 
    return true; 
}

function gameOver(order, preparation) {
    
    /* Return true if a placed element does not match */
    for (let i = 0 ; i < 4 ; i++) {
        if ((preparation[i] !== '') && (preparation[i] !== order[i])) {
            return true;
        } 
    }
    return false; 
}

// =======================================

/* 
Best score appears only if score > 0. It is saved if you restart using "New Game" button, but go back to zero when you refresh page.

Some issues with background, turn green sometimes in some parts => my bad or create-react-app bad?
*/