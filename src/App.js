import React,{Component} from 'react';
import './App.css';
import photo1 from "./images/p1.jpeg";
import photo2 from "./images/p2.jpeg";
import photo3 from "./images/p3.jpeg";
import photo4 from "./images/p4.jpeg";
import photo5 from "./images/p5.jpeg";
import photo6 from "./images/p6.jpeg";
import photo7 from "./images/p7.jpeg";
import photo8 from "./images/p8.jpeg";
import photo9 from "./images/p9.jpeg";
import photo10 from "./images/p10.jpeg";

class App extends Component{

  constructor(props)
  {
    super(props);
    this.state = {
        score:0,
        over:"",
        highest:0,
        cards:[
                {photo:photo5,flag:false,name:"p5"},
                {photo:photo1,flag:false,name:"p1"},
                {photo:photo3,flag:false,name:"p3"},
                {photo:photo2,flag:false,name:"p2"},
                {photo:photo4,flag:false,name:"p4"},
                {photo:photo6,flag:false,name:"p6"},
                {photo:photo7,flag:false,name:"p7"},
                {photo:photo8,flag:false,name:"p8"},
                {photo:photo9,flag:false,name:"p9"},
                {photo:photo10,flag:false,name:"p10"}
        ]
    };
  }

  unsetFlag = ()=>{
    const cards = this.state.cards;
    for(var i=0;i<cards.length;i++)
    {
        cards[i].flag = false;
    } 
    this.setState({cards:cards});
  }

  checkHighest = ()=>{
    if(this.state.score>this.state.highest)
              {
                this.setState({highest:this.state.score});
              }
  }

  suffle = ()=>{

      const cards = this.state.cards;

      for(var i=0;i<cards.length;i++)
      {
        const j = Math.floor(Math.random()*cards.length);
        const temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
      }

      this.setState({cards:cards});    
  }

  handleClick = (cname)=>{
    const cards = this.state.cards;
    for(var i=0;i<cards.length;i++)
    {
      if(cards[i].name===cname)
      {
        if(cards[i].flag)
          {
              this.setState({over:"Game Over"});
              break;
          }
          else
          {
              cards[i].flag = true;
              this.setState({score:this.state.score+20});
              break;
          }
      }
    }
    if(this.state.over==="Game Over")
      this.unsetFlag();
    else
      this.suffle();
  }

  restart = ()=>{
    this.setState({over:"",score:0});
    this.unsetFlag();
  }

  render()
  {
    const cards = this.state.cards.map(card => <div className="card" key={card.name} onClick={()=>this.handleClick(card.name)}>
        <img src={card.photo} alt={card.name} />
      </div>); 
      this.checkHighest();
    return (
      <>
        <center>
          <h1 className="heading">Card Game</h1>
          <h3>Score : {this.state.score} <span className="ml-50">Highest : {this.state.highest}</span></h3>
          <h1 className="gameover">{this.state.over}</h1>        
          {this.state.over ? <button onClick={this.restart} className="startbtn">Start Again</button> :   <div>{cards}</div>}
        </center>
      </>
    );    
  }

}

export default App;
