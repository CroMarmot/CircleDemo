import {useReducer, useRef} from "react";
import {Container, Sprite, Stage, useTick} from "@inlet/react-pixi";
import award_05 from "./images/award_05.png";

export const Demo = () => {
    const reducer = (_, { data }) => data
    const Bunny = () => {
        const [motion, update] = useReducer(reducer)
        const iter = useRef(0)
        useTick(delta => {
            const i = (iter.current += 0.05 * delta)
            update({
                type: 'update',
                data: {
                    x: Math.sin(i) * 100,
                    y: Math.sin(i / 1.5) * 100,
                    rotation: Math.sin(i) * Math.PI,
                    anchor: Math.sin(i / 2),
                },
            })
        })
        return (
            <Sprite
                image={award_05}
                {...motion}
            />
        )
    }
    return (
        <Stage width={100} height={100} options={{ transparent: true }}>
            <Container x={50} y={50}>
                <Bunny />
            </Container>
        </Stage>
    )
}
