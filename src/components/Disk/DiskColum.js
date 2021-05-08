import React from "react";
import Disk from "./Disk";
import { useDrop } from 'react-dnd';

const style = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    color: 'white',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
};

export default function DiskColum(props) {
    const { discs, stick, addDisk } = props;
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'ItemTypes.Disk',
        drop: () => ({
            name: stick
        }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

    if (discs.length > 0){

        return (
            <div className="main-col" ref={drop} style={{...style}}>

                <div className="center-col"></div>

                { discs.map((disc) => (
                    <Disk
                        key={disc.index}
                        stick={stick}
                        discId={disc.id}
                        className={disc.className}
                        addDisk={addDisk}
                        index={disc.index}
                    />
                    ))
                }
            </div>
        )
    }
    else{
        return (
            <div className="main-col" ref={drop} style={{...style}}>
                <div className="center-col"></div>
            </div>
        )
    }

}
