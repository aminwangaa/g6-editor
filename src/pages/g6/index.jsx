import React, { useEffect, useState } from "react"
import styles from "./index.module.less"
import G6 from "@antv/g6"

const Demo = () => {
    // 根据官网例子的接口获取的数据
    const data = {
        "id": "Modeling Methods",
        "children": [
            {
                "id": "Classification",
                "children": [
                    { "id": "Logistic regression" },
                    { "id": "Linear discriminant analysis" },
                    { "id": "Rules" },
                    { "id": "Decision trees" },
                    { "id": "Naive Bayes" },
                    { "id": "K nearest neighbor" },
                    { "id": "Probabilistic neural network" },
                    { "id": "Support vector machine" }
                ]
            },
            {
                "id": "Consensus",
                "children": [
                    {
                        "id": "Models diversity",
                        "children": [
                            { "id": "Different initializations" },
                            { "id": "Different parameter choices" },
                            { "id": "Different architectures" },
                            { "id": "Different modeling methods" },
                            { "id": "Different training sets" },
                            { "id": "Different feature sets" }
                        ]
                    },
                    {
                        "id": "Methods",
                        "children": [
                            { "id": "Classifier selection" },
                            { "id": "Classifier fusion" }
                        ]
                    },
                    {
                        "id": "Common",
                        "children": [
                            { "id": "Bagging" },
                            { "id": "Boosting" },
                            { "id": "AdaBoost" }
                        ]
                    }
                ]
            },
            {
                "id": "Regression",
                "children": [
                    { "id": "Multiple linear regression" },
                    { "id": "Partial least squares" },
                    { "id": "Multi-layer feedforward neural network" },
                    { "id": "General regression neural network" },
                    { "id": "Support vector regression" }
                ]
            }
        ]
    }

    const [graph, setGraph] = useState(null) // 设置画布

    // 初始化画布
    const setGraphObj = () => {
        const width = document.getElementById('container').scrollWidth;
        const height = document.getElementById('container').scrollHeight || 500;
        const graph = new G6.TreeGraph({
            container: 'container',
            width,
            height,
            modes: { // 设置默认mode 和 behavior
                default: [
                    {
                        type: 'collapse-expand',
                        onChange: function onChange(item, collapsed) {
                            const data = item.get('model').data;
                            data.collapsed = collapsed;
                            return true;
                        },
                    },
                    'drag-canvas',
                    'zoom-canvas',
                ],
            },
            defaultNode: { // 设置默认节点的样式
                type: "rect", // 节点类型
                size: 24, // 大小
                anchorPoints: [ // 左右接入点的位置
                    [0, 0.5], // 左中 [0， 0] 左下 [0, 1] 左上
                    [1, 0.5], // 右中
                ],
                style: {
                    fill: '#C6E5FF',
                    stroke: '#5B8FF9',
                },
            },
            defaultEdge: { // 设置默认边
                type: 'cubic-horizontal', // 类型
                style: {
                    stroke: '#A3B1BF',
                },
            },
            layout: { // 默认布局
                type: 'mindmap', // 类型
                direction: 'H', // 方向
                getHeight: () => { // 节点的高度
                    return 16;
                },
                getWidth: () => { // 节点的宽度
                    return 16;
                },
                getVGap: () => { // 节点的垂直间隙
                    return 10;
                },
                getHGap: () => { // 节点的水平间隙
                    return 50;
                },
            },
        });

        let centerX = 0;
        graph.node(function(node) {
            if (node.id === 'Modeling Methods') {
                centerX = node.x;
            }

            return {
                label: node.id,
                labelCfg: {
                    position:
                        node.children && node.children.length > 0
                            ? 'left'
                            : node.x > centerX
                            ? 'right'
                            : 'left',
                    offset: 5,
                },
            };
        });

        graph.edge(edge => { // 设置边的样式
            return {
                id: edge.id,
                type: 'line',
                style: {
                    // fill: 'steelblue',
                    stroke: 'blue',
                },
            };
        });

        graph.on('nodes:mouseenter', (e) => {
            const item = e.item;
            const model = item.getModel()
            model.style.cursor = 'grab'
            graph.update(item, model)
            graph.paint()
        });

        graph.on('nodes:dragstart', (e) => {
            const item = e.item;
            const model = item.getModel()
            model.style.cursor = 'grabbing'
            graph.update(item, model)
            graph.paint()
        });

        graph.on('nodes:drag', (e) => {
            // 鼠标所在位置 转化为现在目标节点所在位置
            // 750 250
            const {clientX, clientY} = e
            // 将视口坐标转换为屏幕/页面坐标。
            const point = graph.getPointByClient(clientX, clientY)
            // {x: 6.1054067460319175, y: -188.58602740575392}
            const item = e.item;
            const model = item.getModel()
            model.style.cursor = 'grabbing'
            item.updatePosition(point)
            graph.update(item, model)
            graph.paint()
        });

        graph.on('nodes:dragend', (e) => {
            const item = e.item;
            const model = item.getModel()
            model.style.cursor = 'grab'
            graph.update(item, model)
            graph.paint()
        });

        setGraph(graph)
    }

    useEffect(() => {
        setGraphObj() // 初始化画布
    }, [])

    useEffect(() => {
        if (graph && data) {
            renderGraph() // 渲染画布
        }
    }, [data, graph])

    const renderGraph = () => {
        graph.clear(); // 清除画布
        graph.data(data); // 传递数据
        graph.render(); // 渲染画布
        graph.fitView(); // 适应视图
    }

    return (
        <div>
            <div id={"container"}/>
        </div>
    )
}

export default Demo
