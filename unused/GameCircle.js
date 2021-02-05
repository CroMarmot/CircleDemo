import React from 'react';
import {Circle} from "./Circle";
import {Level} from "./Level";
export function GameCircle(props) {
    return <Circle x={props.x} y={props.y} color={Level[props.lvl].color} radius={Level[props.lvl].radius} />;
}
