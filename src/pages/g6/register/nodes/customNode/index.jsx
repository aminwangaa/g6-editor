import React from "react"
import OPEN from "../../img/open.png"

const customNode = [
    'customNode',
    {
        options: {
            style: {

            },
            stateStyles: {

            },
        },
        draw(model, group) {
            // 定义的其他方法，都可以在draw里面调用， 如 drawShape、drawLabel 等。
            const keyShape = group.addShape("rect", {
                attrs: {
                    width: 120,
                    height: 40,
                    stroke: "blue",
                },
                name: "rect"
            })
            const text1 = group.addShape("text", {
                attrs: {
                    x: 12,
                    y: 18,
                    stroke: "blue",
                    text: model.firstText
                },
                name: "text1"
            })

            const text2 = group.addShape("text", {
                attrs: {
                    x: 12,
                    y: 36,
                    stroke: "blue",
                    text: model.secondText
                },
                name: "text2"
            })

            const text3 = group.addShape("text", {
                attrs: {
                    x: 12,
                    y: 56,
                    stroke: "transparent",
                    text: model.thirdText
                },
                name: "text3"
            })

            const openIcon = group.addShape("image", {
                attrs: {
                    x: 140,
                    y: 0,
                    width: 24,
                    height: 24,
                    img: OPEN
                },
                name: "openIcon"
            })
            return keyShape
        },
        update (model, group) {
            console.log(model, group)
        },
    },
    'rect'
]

export default customNode