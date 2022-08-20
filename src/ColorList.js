import React from 'react';
import './ColorList.css';

import Button from 'react-bootstrap/Button';

import Color from "./Color"



export default class ColorList extends React.Component {
    render() {
        const app = this.props.app;

        return (
            <div className="colorList">
                {this.props.colors.map((color,i) => {
                    return <Color
                        colorId={i+1}
                        key={i+1}
                        color={color}
                        allowDelete={this.props.colors.length !== 1} //must have at least one color
                        app={app}
                    />;
                })}
                <Button
                    className="addColorButton"
                    size="sm"
                    onClick={app.handleAddColor.bind(app)}
                >
                    Add Color
                </Button>
            </div>
        );
    }
}
