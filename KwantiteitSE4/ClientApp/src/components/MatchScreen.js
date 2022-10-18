import React, { useState } from 'react';
import { Button, Input } from 'antd';
import 'antd/dist/antd.css';
import './MatchScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { postScore } from '../redux/actions/setScore';

const turnCount = 0;

export const getTurnCount = () => {
  return turnCount;
}



export const MatchScreen = () => {
  
  const store = useSelector((state) => state.scores);
  const score = store.value;

  const game = useSelector((state) => state.games.currentGame);
  const dispatch = useDispatch();
  const currentSet = game?.sets?.at(-1);
  const currentLeg = currentSet?.legs?.at(-1);
  const currentTurn = currentLeg?.turns?.at(-1);
  console.log(currentSet);
  console.log(currentLeg);
    console.log(currentTurn);

    if (currentTurn == undefined || currentTurn == null) {
        //nieuwe turn aanmaken
    }

    const zeroTrigger = () => {
      //functie wordt aangeroepen op het moment dat een worp de totaalscore naar 0 brengt en door een double is uitgegooid.
      //de speler van de huidige turn is dan de winnaar van de leg
      currentLeg.winnerID = currentTurn.playerID;
      let gameWinCondition = Math.floor(game.numberOfSets / 2) + 1;
      let setWinCondition = Math.floor(game.numberOfLegs / 2) + 1;

      //als een leg is gewonnen wordt er gecheckt of er genoeg legs zijn gewonnen om een set te winnen.
        if (currentSet.legs.filter(l => l.winnerID == game.player1ID).length >= setWinCondition || currentSet.legs.filter(l => l.winnerID == game.player2ID).length >= setWinCondition) {
            //zo ja, bepaal welke speler de set heeft gewonnen.
            if (currentSet.legs.filter(l => l.winnerID == game.player1ID).length >= setWinCondition) {
                currentSet.winnerID = game.player1ID;
            }
            else {
                currentSet.winnerID = game.player2ID;
            }
            //als er een set is gewonnen wordt er gecheckt of er genoeg sets zijn gewonnen om de game te winnen
            if (game.sets.filter(s => s.winnerID == game.player1ID).length >= gameWinCondition || game.sets.filter(s => s.winnerID == game.player2ID).length >= gameWinCondition) {
                //zo ja, bepaal welke speler de game heeft gewonnen
                if (game.sets.filter(s => s.winnerID == game.player1ID).length >= gameWinCondition) {
                    game.winnerID = game.player1ID;
                }
                else {
                    game.winnerID = game.player2ID;
                }
            }
            //als de game nog niet gewonnen is, moet er een nieuwe set en een nieuwe leg worden gestart
            else {
                //nieuwe set en leg starten
                //nieuwe leg in de nieuwe set wordt gestart door de speler van de 2e leg van de vorige set.
                //new set
                //new leg (met setID van hierboven, met startplayer van de 2e leg van de vorige set > currentSet.legs.at(1).playerID)
            }
        }
        // als de set nog niet gewonnen is, start dan een nieuwe leg in dezelfde set
      else {
          //nieuwe leg starten
      }
      //Alles naar database gooien
      //MatchScreen refresh
  }

    
  const [firstThrow, setFirstThrow] = useState('');
  const [secondThrow, setSecondThrow] = useState('');
  const [thirdThrow, setThirdThrow] = useState('');
  const changeHandle = (event) => {
      setFirstThrow(event.target.value);
      dispatch(postScore([firstThrow]));
  }
  const changeSecondThrowValue = (event) => {
      setSecondThrow(event.target.value);
      dispatch(postScore([firstThrow, secondThrow]));
  }
  const changeThirdThrowValue = (event) => {
      setThirdThrow(event.target.value);
      dispatch(postScore([firstThrow, secondThrow, thirdThrow]));
  }
  return (
        <div className='matcheditor'>
            <div className='matcheditor__scoreinput'>
                <table>
                    <tr>
                        <th>Player Name <br /> Turn Count</th>
                    </tr>
                    <tr>
                        <td>
                            <Input className='firstInputScore' maxLength='3' type="text" id="firstThrow" value={firstThrow.toUpperCase()} onChange={changeHandle}></Input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Input className='secondInputScore' maxLength='3' type="text" id="secondThrow" value={secondThrow.toUpperCase()} onChange={changeSecondThrowValue}></Input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Input className='thirdInputScore' maxLength='3' type="text" id="thirdThrow" value={thirdThrow.toUpperCase()} onChange={changeThirdThrowValue}></Input>
                        </td>
                    </tr>
                    <tr>
                        <th>{score}</th>
                    </tr>
                </table>
                <div className='matcheditor__scoreinput__options'>
                    <Button type='default' className='matcheditor__scoreinput__Button' onClick={() => dispatch(postScore([firstThrow, secondThrow, thirdThrow]))}>
                        Enter
                    </Button>
                    <Button type='default' className='matcheditor__scoreinput__Button'>
                        <img className='matcheditor__scoreinput__undo' src="https://findicons.com/files/icons/2315/default_icon/256/undo.png" />
                    </Button>
                </div>
            </div>
            <div className='matcheditor__scoretracker'>
                <table>
                    <tr>
                        <th colSpan='2'>🟢 Player 1</th>
                        <td colSpan='1'></td>
                        <th colSpan='2'>⚫ Player 2</th>
                    </tr>
                    <tr>
                        <td>Turn</td>
                        <td>Score</td>
                        <td>Round</td>
                        <td>Score</td>
                        <td>Turn</td>
                    </tr>
                    <tr>
                        <td>140</td>
                        <td>361</td>
                        <td>1</td>
                        <td>421</td>
                        <td>80</td>
                    </tr>
                    <tr>
                        <td>81</td>
                        <td>280</td>
                        <td>2</td>
                        <td>241</td>
                        <td>180</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>3</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th colSpan='2'>Total: 280</th>
                        <td colSpan='1'></td>
                        <th colSpan='2'>Total: 241</th>
                    </tr>
                </table>
            </div>
        </div>
  )
}
