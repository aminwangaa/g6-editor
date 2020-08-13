import React from "react"
import styles from "./index.module.less"
import { Button } from "antd"
import {useStores} from "../../../utils/mobx";

const GraphBar = () => {
    const { editorStore } = useStores()
    const { addPeerItem, addChildItem, changeModeToEdit } = editorStore
    const btns = [
        {
            label: "编辑",
            click: changeModeToEdit,
        },
        {
            label: "添加同级节点",
            click: addPeerItem,
        },
        {
            label: "添加子级节点",
            click: addChildItem,
        },
    ]

    return (
        <div className={styles.graphBar}>
            {btns.map((item, index) => (
                <Button
                    key={index}
                    className={styles.btn}
                    onClick={item.click}
                >
                    {item.label}
                </Button>
            ))}
        </div>
    )
}

export default GraphBar
