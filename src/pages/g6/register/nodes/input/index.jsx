import React from "react"

const input = [
    'input',
    {
        draw: (cfg, group) => {
            group.addShape('rect', {
                attrs: {
                    x: 0,
                    y: 0,
                    draggable: true,
                    width: cfg.width,
                    height: cfg.height,
                    stroke: "blue"
                },
                draggable: true
            })

            return group.addShape('dom', {
                attrs: {
                    x: 2,
                    y: 2,
                    draggable: true,
                    width: cfg.width,
                    height: cfg.height,
                    // 传入 DOM 的 html
                    html: `<input id="${cfg.id}Input" style="border: none;outline: none;line-height: 24px;" />`
                },
                draggable: true
            });
        },
        afterDraw: (cfg, group) => {
            console.log(cfg)
            const valChange = (val) => {
                console.log(222)
            }
            const input = document.getElementById(`${cfg.id}Input`)
        },
        update: (cfg, group) => {

        }
    },
    "single-node"
]

export default input
