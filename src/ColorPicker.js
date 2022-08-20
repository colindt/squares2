import React from 'react';
import './ColorPicker.css';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { HexColorPicker } from "react-colorful";



export default class ColorPicker extends React.Component {
    /* special thanks to the popover picker example from the react-colorful documentation:
     * https://codesandbox.io/s/opmco?file=/src/PopoverPicker.js
    */

    constructor(props) {
        super(props);
        this.popoverRef = React.createRef();
        this.state = {
            open : false,
        };
    }


    componentDidMount() {
        document.addEventListener("mousedown",  this.handleClickOutsidePopover);
        document.addEventListener("touchstart", this.handleClickOutsidePopover);
    }


    componentWillUnmount() {
        document.removeEventListener("mousedown",  this.handleClickOutsidePopover);
        document.removeEventListener("touchstart", this.handleClickOutsidePopover);
    }


    _handleClickOutsidePopover(event) {
        if (!this.popoverRef.current || this.popoverRef.current.contains(event.target)) {return;} //clicking the popover does nothing
        this.setState({open : false}); //clicking outside the popover closes it
    }
    handleClickOutsidePopover = this._handleClickOutsidePopover.bind(this);


    render() {
        const app = this.props.app;

        return (
            <div className="colorPicker">
                <div className="colorSwatchPopoverPicker" ref={this.popoverRef}>
                    <div
                        className="colorSwatch"
                        style={{backgroundColor : this.props.color}}
                        onClick={() => this.setState({open : !this.state.open})}
                    ></div>

                    {this.state.open && (
                        <div className="colorPopover">
                            <HexColorPicker color={this.props.color} onChange={(value) => app.handleColorChange.bind(app)(value, true, this.props.colorId)}/>
                        </div>
                    )}
                </div>

                <InputGroup>
                    <InputGroup.Text>#</InputGroup.Text>
                    <Form.Control
                        type="text"
                        size="sm"
                        className="colorTextInput"
                        value={this.props.color.slice(1)}
                        minLength={6}
                        maxLength={7}
                        pattern="#?[0-9a-fA-F]{6}"
                        onChange={(event) => app.handleColorChange.bind(app)(event.target.value, event.target.validity.valid, this.props.colorId)}
                    />
                </InputGroup>
            </div>
        );
    }
}
