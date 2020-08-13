import React from "react"
import { Route, Switch, Redirect, withRouter } from "react-router-dom"
import { compose } from "redux"
import Loadable from "./utils/loadable"
import Loading from "./components/loading";

// G6Editor
const G6Editor = Loadable({
    loader: () =>
        import("./pages/g6/editor/index"),
    loading: () => (<Loading />)
})

class RouteList extends React.Component {

    render() {
        return (
            <Switch>
                <Route path="/g6-editor" component={G6Editor} />
                <Redirect to="/g6-editor" />
            </Switch>
        )
    }
}

export default compose(
    withRouter,
)(RouteList)
