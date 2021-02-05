import React from "react";
import Matter from "matter-js";
import {createRef} from "react";
import {Level} from "../Cfg/Level";
import _ from "lodash";

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Events = Matter.Events;

class BallProvider {
    static createBall(lvl) {
        return {
            lvl,
        }
    }

    static randomNext() {
        return BallProvider.createBall(Math.floor(5 * Math.random()))
    }

}

function addBody(world, lvl, x, y) {
    const ball = BallProvider.createBall(lvl);
    const circleIns = Bodies.circle(x, y, Level[lvl].radius, {
        restitution: 0.7,
        render: {
            fillStyle: Level[lvl].color
        },
        customData: {
            lvl: ball.lvl
        }
    });
    World.add(world, circleIns);
}

export class MatterJsGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scene: createRef(),
            nextBall: BallProvider.randomNext(),
            score: 0
        };
    }

    componentDidMount() {
        const engine = Engine.create({
            // positionIterations: 20
        });

        const width = 300;
        const height = 700;
        const borderWidth = 100;

        const render = Render.create({
            element: this.state.scene.current,
            engine,
            options: {
                width,
                height,
                wireframes: false
            }
        });

        World.add(engine.world, [
            // walls
            // center x,center y,width,height
            Bodies.rectangle(-borderWidth / 2, height / 2, borderWidth, height, {isStatic: true}),
            Bodies.rectangle(width + borderWidth / 2, height / 2, borderWidth, height, {isStatic: true}),
            Bodies.rectangle(width / 2, height + borderWidth / 2, width, borderWidth, {isStatic: true}),
        ]);

        // add mouse control
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: Mouse.create(render.canvas),
            constraint: {
                stiffness: 0,
                render: {
                    visible: false
                }
            }
        });


        World.add(engine.world, mouseConstraint);

        const mouseDownCb = _.throttle((event) => {
            addBody(engine.world, this.state.nextBall.lvl, event.mouse.mousedownPosition.x, 50);
            this.setState({
                nextBall: BallProvider.randomNext()
            });
        }, 500, {trailing: false});

        Matter.Events.on(mouseConstraint, "mousedown", mouseDownCb);

        Events.on(engine, 'collisionEnd', (e) => {
            e.pairs.forEach(coll => {
                if (!coll.bodyA.customData) {
                    return;
                }
                const lvlA = coll.bodyA.customData.lvl;
                const lvlB = coll.bodyB.customData.lvl;
                if (lvlA === lvlB) {
                    const newXY = coll.bodyA.position.y > coll.bodyB.position.y ? coll.bodyA.position : coll.bodyB.position;
                    World.remove(engine.world, coll.bodyA);
                    World.remove(engine.world, coll.bodyB);
                    addBody(engine.world, lvlA + 1, newXY.x, newXY.y);
                    this.setState({
                        score: this.state.score + Level[lvlA].score
                    })
                }
            })
        });

        Engine.run(engine);
        Render.run(render);
    }

    render() {
        return <div>
            <div ref={this.state.scene}/>
            <div>Next Ball:{this.state.nextBall.lvl} Score: {this.state.score}</div>
        </div>;
    }
}
