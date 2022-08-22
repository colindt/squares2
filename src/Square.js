import React from 'react';
import "./Square.css";



export default class Square extends React.Component {
    render () {
        return (
            <div
                className="square"
                style={this.props.style}
                onClick={this.props.onClick}
                title="Click to cycle color"
            ></div>
        );
    }
}