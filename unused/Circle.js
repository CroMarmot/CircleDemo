import React, { useCallback } from 'react';
import { Graphics } from '@inlet/react-pixi';
export function Circle(props) {
    const draw = useCallback((g) => {
        g.clear();
        g.lineStyle(0)
        g.beginFill(props.color, 1)
        g.drawCircle(props.x, props.y, props.radius)
        g.endFill()
    }, [props]);
    return <Graphics draw={draw} />;
}
