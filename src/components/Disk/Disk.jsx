import React from "react";
import { useDrag } from 'react-dnd';
import {ItemTypes} from '../../ItemTypes'




export default function Disk(props) {
    const { className, discId, stick, addDisk } = props;
    const isDrag = props.index === 0  ? true : false;
    const [{ isDragging }, drag] = useDrag(() => ({
        type:  'ItemTypes.Disk',
        canDrag:  props.index === 0  ? true : false ,
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                // alert(`You dropped ${discId} from ${stick} into ${dropResult.name}!`);
                let response = {disc: discId, from: stick, to: dropResult.name}
                addDisk(response);
            }
        },
        // collect: (monitor) => ({
        //     isDragging: monitor.isDragging(),
        //     handlerId: monitor.getHandlerId(),
        // }),
    }));


    return (
        <div ref={drag} style={{
            opacity: isDragging ? 0.5 : 1,
            fontSize: 25,
            fontWeight: 'bold',
            cursor: 'move',
        }} className={ className } index={props.index}>{discId}</div>

    );
}
