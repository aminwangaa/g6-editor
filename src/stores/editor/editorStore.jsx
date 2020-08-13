import { observable, action } from 'mobx';
import { message } from "antd"

class editorStore {
    @observable graph = null // 画布
    @observable currentType = null // 当前选中目标的类型 node edge
    @observable currentId = null // 当前选中ID
    @observable edit = false // 编辑状态
    @observable fontSize = 14 // 供修改的文字大小
    @observable defaultFontSize = 14 // 默认文字大小

    // 初始数据
    @observable treeData = {
        id: "1",
        parent: null,
        label: "新建主题",
        labelCfg: {
            style: {
                fontSize: this.defaultFontSize
            }
        },
        // linkPoints: {
        //     top: true,
        //     bottom: true,
        //     left: true,
        //     right: true,
        //     size: 5,
        //     fill: '#fff',
        // },
        style: {
            radius: 6
        },
        anchorPoints: [[0.5, 0], [0.5, 1], [0, 0.5], [1, 0.5]], // 四个锚点
        children: [

        ]
    }

    @action setTreeData = (data) => {
        this.treeData = data
    }

    @action setCurrentLayout = (direction) => {
        // 切换方向 粗略。。 不同类型不同样式布局 有空再整
        const layout = {
            type: 'mindmap',
            direction: direction,
            getHeight: () => {
                return 16;
            },
            getWidth: () => {
                return 16;
            },
            getVGap: () => {
                return 10;
            },
            getHGap: () => {
                return 100;
            },
            getSide: () => {
                return 'right';
            },
        }
        this.graph.changeLayout(layout)
        this.graph.paint()
        this.graph.fitView()
    }

    @action changeLabelCfg = (value, type) => {
        // 修改label样式 目前 文字大小 颜色
        if (this.currentId) {
            const target = this.graph.findDataById(this.currentId)
            this.graph.update(target.id,{
                labelCfg: {
                    style: {
                        [type]: value
                    }
                }
            }, true)
            this.graph.paint()
            this.graph.fitView()
        }
    }

    @action setEdit = flag => {
        this.edit = flag
    }

    @action setEditorGraph = (graph) => {
        this.graph = graph
    };

    @action setData = (data) => {
        this.data = data
    }

    @action setCurrentType = (type) => {
        this.currentType = type
    }

    @action setCurrentId = (id) => {
        this.currentId = id
    }

    @action addItem = (target) => {
        // 添加节点
        let id = null
        if (target.children && target.children.length > 0) {
            const tId = target.children[target.children.length - 1].id
            const cIds = tId.split("-")
            cIds[cIds.length - 1] = `${~~cIds[cIds.length - 1] + 1}`
            id = cIds.join("-")
        } else {
            // 子节点为空时 添加子节点
            id = target.id + '-' + 1
        }

        return {
            id: `${id}`,
            parent: `${target.id}`,
            label: "分支主题",
            labelCfg: {
                style: {
                    fontSize: this.defaultFontSize
                }
            },
            style: {
                radius: 6,
            },
            // linkPoints: {
            //     top: true,
            //     bottom: true,
            //     left: true,
            //     right: true,
            //     size: 5,
            //     fill: '#fff',
            // },
            anchorPoints: [[0.5, 0], [0.5, 1], [0, 0.5], [1, 0.5]],
            children: []
        }
    }

    @action addChildItem = () => {
        if (!this.edit) {
            message.warning("请先切换编辑模式～")
            return
        }
        if (!this.currentId) {
            message.warning("请先选择目标节点～")
            return
        }
        const target = this.graph.findDataById(this.currentId)
        // 添加子节点
        const data = this.addItem(target)
        this.graph.addChild(data, this.currentId)
        this.setTreeData(this.graph.findDataById("1"))
        this.graph.paint()
        this.graph.fitView()
    }

    @action addPeerItem = () => {
        if (!this.edit) {
            message.warning("请先切换编辑模式～")
            return
        }
        if (!this.currentId) {
            message.warning("请先选择目标节点～")
            return
        }
        const target = this.graph.findDataById(this.currentId)
        // 获取父节点 添加子节点
        const parent = this.graph.findDataById(target.parent)
        if (!target.parent) {
            message.warning("根节点无法添加同级元素～")
            return
        }
        const data = this.addItem(parent)
        this.graph.addChild(data, target.parent)
        this.setTreeData(this.graph.findDataById("1"))
        this.graph.paint()
        this.graph.fitView()
    }

    @action changeModeToEdit = () => {
        // 点击编辑按钮时
        if (this.edit) {
            // 清除之前选中的节点选中状态
            if (this.currentId) {
                const oldItem = this.graph.findById(this.currentId)
                this.graph.clearItemStates(oldItem, ["selected"])
            }
            // 重设为默认状态
            this.graph.setMode("default")
            this.edit = false
        } else {
            this.graph.setMode("edit")
            this.edit = true
        }
    }
}

export default new editorStore();
