import React from "react"
import G6 from "@antv/g6"
import nodes from "./nodes"
import edges from "./edges"
import combos from "./combos"

nodes.map(item => {
    G6.registerNode(...item)
})

edges.map(item => {
    G6.registerEdge(...item)
})

combos.map(item => {
    G6.registerCombo(...item)
})

export default G6
