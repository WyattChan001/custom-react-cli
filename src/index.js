import React from 'react'
import ReactDom from 'react-dom'
import './style.scss'
import AppRouter from './router'
class App extends React.Component {
    render() {
        return (
            <AppRouter />
        )
    }
}

ReactDom.render(<App />, document.getElementById('app'))
