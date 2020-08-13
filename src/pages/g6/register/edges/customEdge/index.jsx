import React from "react"
import G6 from "@antv/g6"
import { isArray } from "lodash"

const customEdge = [
    'customEdge',
    {
        getPath(item) {
            // 函数返回边的路径
            let startPoint = null
            let endPoint = null
            if (isArray(item)) {
                startPoint = item[0]
                endPoint = item[1]
            } else {
                startPoint = item.startPoint;
                endPoint = item.endPoint;
            }
            const a = (endPoint.y - startPoint.y) / 4
            // 设置边的路径
            const path = [
                ['M', startPoint.x, startPoint.y],
                ['L', startPoint.x, startPoint.y + a],
                ['L', startPoint.x / 3 + endPoint.x, startPoint.y + a],
                ['L', startPoint.x / 3 + endPoint.x, endPoint.y - a],
                ['L', startPoint.x, endPoint.y - a],
                ['L', endPoint.x, endPoint.y],
            ]
            return path
        },
        getShapeStyle(cfg) {
            console.log(cfg)
            const startPoint = cfg.startPoint;
            const endPoint = cfg.endPoint;
            const controlPoints = this.getControlPoints(cfg);
            let points = [startPoint]; // the start point
            // the control points
            if (controlPoints) {
                points = points.concat(controlPoints);
            }
            // the end point
            points.push(endPoint);
            const path = this.getPath(points);
            const style = Object.assign(
                {},
                G6.Global.defaultEdge.style,
                {
                    stroke: cfg.style.stroke || "#666",
                    lineWidth: 1,
                    path,
                },
                cfg.style,
            );
            return style;
        },
    },
    "line"
]

export default customEdge
