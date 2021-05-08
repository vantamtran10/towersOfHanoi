import logo from './logo.svg';
import './App.css';
import Disk from "./components/Disk/Disk";

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DiskColum from "./components/Disk/DiskColum";
import React, { useState } from "react";

function App() {

    const [sticks, setSticks] = useState({
        stick0: [
            { id: 0, className: 'disk-item-3', index: 0 },
            { id: 1, className: 'disk-item-2', index: 1 },
            { id: 2, className: 'disk-item-1', index: 2 },
        ],
        stick1: [],
        stick2: [],
    });


    const handleDrag = (response) => {
        // console.log(response.disc + ' ' + response.from + ' ' + response.to);
        if (response.from !== null && response.to !== null) {
            const diskColumnFrom = response.from;
            const diskColumnTo = response.to;
            if (diskColumnFrom !== diskColumnTo) {
                let sourceClone = sticks[diskColumnFrom];
                let destinationClone = sticks[diskColumnTo];
                if (
                    destinationClone.length
                        ? sourceClone[0].id < destinationClone[0].id
                        : true
                ) {
                        destinationClone.forEach((disc) => {
                            disc.index += 1;
                        });
                        console.log(sourceClone);
                        destinationClone.unshift({ ...sourceClone[0] });

                        sourceClone.splice(response.from.index, 1);
                        sourceClone.forEach((disc) => {
                            disc.index--;
                        });
                        setSticks({
                            ...sticks,
                            [diskColumnFrom]: sourceClone,
                            [diskColumnTo]: destinationClone,
                        });

                    // check win
                    if (sticks.stick2.length === 3) {
                        setTimeout( ()=>{
                            window.alert('You win!');

                        }, 100);
                        //reset to init state
                        setTimeout(()=>{
                            setSticks({
                                stick0: [
                                    { id: 0, className: 'disk-item-3', index: 0 },
                                    { id: 1, className: 'disk-item-2', index: 1 },
                                    { id: 2, className: 'disk-item-1', index: 2 }
                                ],
                                stick1: [],
                                stick2: []})
                        }, 150);
                    };
                }
            }
        }
    }

  return (
    <div className="container">
        <h1 className="text-lighten-3">Welcome to Tower of Hanoi</h1>
        <DndProvider backend={HTML5Backend}>
            <div className="row center-align blue lighten-5">
                <div className="col s4">
                   <DiskColum discs={sticks['stick0']} stick='stick0' addDisk={handleDrag} />
                </div>

                <div className="col s4">
                    <DiskColum discs={sticks['stick1']} stick='stick1' addDisk={handleDrag} />
                </div>

                <div className="col s4">
                    <DiskColum discs={sticks['stick2']} stick='stick2' addDisk={handleDrag} />
                </div>
            </div>
        </DndProvider>
    </div>

  );
}

export default App;
