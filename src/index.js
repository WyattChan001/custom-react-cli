import React from 'react'
import ReactDom from 'react-dom'
import HomePage from './home'
import './style.scss'

class App extends React.Component {
    render() {
        return (
            <div style={{color: '#333'}} className="test test2">
                <HomePage />
            </div>
        )
    }
}

ReactDom.render(<App />, document.getElementById('app'))
