import React from 'react';
import './Controls.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FormGroup } from 'react-bootstrap';

import Color from "./Color";
import ColorList from "./ColorList";

class Controls extends React.Component {
    render() {
        const app = this.props.app;
        return (
            <Form className="d-grid gap-2">
                <Button onClick={app.reroll.bind(app)} className="rerollButton">
                    <Row><Col></Col><Col xs="auto">Reroll</Col><Col className="diceIcon">🎲</Col></Row>
                </Button>
                <SizeControls app={this.props.app} />
                <Form.Switch
                    label="Show square labels"
                    id="show-labels"
                    checked={app.state.showLabels}
                    onChange={app.handleToggleLabels.bind(app)}
                />
                <Color background colorId={0} color={app.state.colors[0]} app={app} />
                <ColorList colors={app.state.colors.slice(1)} app={app} />
            </Form>
        );
    }
}



class SizeControls extends React.Component {
    render() {
        const app = this.props.app;

        const inputs = Object.keys(app.state.wallSize).map((label) => {
            return (
                <LengthInput
                    label={label}
                    key={label}
                    value={app.state.wallSize[label]}
                    onChange={app.handleSizeChange.bind(app)}
                />
            );
        });

        return (
            <div>
                {inputs}
            </div>
        );
    }
}



class LengthInput extends React.Component {
    render() {
        const id = this.props.label.replaceAll(' ', '');
        return (
            <FormGroup controlId={id} as={Row} className="align-items-center">
                <Form.Label column>
                    {`${this.props.label}: `}
                </Form.Label>
                <Col xs="auto">
                    <Form.Control
                        type="number"
                        size="sm"
                        className="sizeInput"
                        name={this.props.label}
                        min={0}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        step={this.props.label === "Square Spacing" ? 0.01 : "any"}
                    />
                </Col>
            </FormGroup>
        );
    }
}



export default Controls;