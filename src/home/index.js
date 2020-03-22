import React from 'react'
import './test.scss'
import './test.css'
import Logo from '@/assets/img/logo.png'

export default class Home extends React.Component {
    render()  {
        return (
            <div className="test test2">
                <p>Hello World</p>
                <img src={Logo} alt="青苹果" style={{width:360,height:280}} />
            </div>
        )
    }
}
