import React from "react"

const card = [
    'card',
    {
        draw(cfg, group) {
            // console.log(cfg)
            // 如果 cfg 中定义了 style 需要同这里的属性进行融合
            const tX = - cfg.size[0] / 2
            const tY = - cfg.size[1] / 2
            const keyShape = group.addShape('rect', {
                name: 'path-shape',
                attrs: {
                    x: - cfg.size[0] / 2,
                    y: - cfg.size[1] / 2,
                    stroke: cfg.stroke,
                    fill: cfg.fill,
                    radius: cfg.radius,
                    width: cfg.size[0],
                    height: cfg.size[1],
                },
                // 设置 draggable 以允许响应鼠标的图拽事件
                draggable: true
            });
            const { iconCfg } = cfg
            group.addShape('image', {
                attrs: {
                    x: tX + 12,
                    y: tY + (cfg.size[1] - iconCfg.height) / 2,
                    width: 36,
                    height: 36,
                    img: cfg.img || "",
                    ...cfg.iconCfg
                },
                name: "icon"
            })

            if (cfg.label) {
                // 如果有文本
                // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
                const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
                // style.text = cfg.label;
                const label = group.addShape('text', {
                    // attrs: style
                    attrs: {
                        x: iconCfg.width / 2, // 居中
                        y: 0,
                        textAlign: 'center',
                        textBaseline: 'middle',
                        text: cfg.label,
                        fill: '#666',
                        ...style
                    },
                    // must be assigned in G6 3.3 and later versions. it can be any value you want
                    name: 'text-shape',
                    // 设置 draggable 以允许响应鼠标的图拽事件
                    draggable: true
                });
            }
            return keyShape;
        },
    },
    "rect"
]

export default card
