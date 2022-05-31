import { Component, OnInit } from '@angular/core';
import { Gamelogic } from '../gamelogic';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers:[Gamelogic]
})
export class GameComponent implements OnInit {
  
  constructor(public game :Gamelogic) { }

  ngOnInit(): void {
  }

  startGame():void{
    this.game.gameStart();
    const currentPlayer = 'Current Player : ' + this.game.currentTurn;
    const information = document.querySelector('.current-status') as HTMLElement;
    information.innerHTML= currentPlayer;
  }

 async clickSubfield(subfield:any):Promise<void>{
   if(this.game.gameStatus ===1){
     const position = subfield.currentTarget.getAttribute('position');
      this.game.setField(position,this.game.currentTurn);
       const color = this.game.getPlayerColorClass();
       subfield.currentTarget.classList.add(color);
       subfield.currentTarget.classList.add('disabledNoOfCasesDiv');
 
 await  this.game.checkGameEndWinner().then((end:Boolean)=> {
  if(this.game.gameStatus===0 && end){
   const information = document.querySelector('.current-status') as HTMLElement;
   information.innerHTML= 'The Winner is Player No: ' + this.game.currentTurn;
  }
});

     await  this.game.checkGameEndFull().then((end:Boolean)=> {
       if(this.game.gameStatus===0 && end){
        const information = document.querySelector('.current-status') as HTMLElement;
        information.innerHTML= 'No Winner, draw';
       }
     });

       this.game.changePlayer();

       if( this.game.gameStatus===1){
         const currentPlayer = 'Current Player : ' + this.game.currentTurn;
         const information = document.querySelector('.current-status') as HTMLElement;
         information.innerHTML= currentPlayer;
       }
   }

  
 }

}
