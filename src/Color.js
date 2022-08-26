import React from 'react';
import './Color.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FormGroup } from 'react-bootstrap';

import ColorPicker from './ColorPicker';



export default class Color extends React.Component {
    render() {
        const app = this.props.app;

        const totalWeight = app.state.colors.reduce((collector, color) => {return color.enabled ? collector + color.weight : collector}, 0);
        const weightPercent = this.props.color.enabled ? Math.round(1000 * (this.props.color.weight / totalWeight)) / 10 : 0;

        const allowDisable = !this.props.color.enabled || this.props.app.state.colors.filter((c) => c.enabled).length > 1; //must have at least one color enabled
        const enableTitle = allowDisable ? `Color will be ${this.props.color.enabled ? "included in" : "excluded from"} the next reroll` : "Must have at least one color enabled";

        let deleteButton = null;
        if (!this.props.background) {
            deleteButton = (
                <Button
                    variant="danger"
                    size="sm"
                    disabled={!this.props.allowDelete}
                    title="Delete color"
                    onClick={() => app.handleDeleteColor.bind(app)(this.props.colorId)}
                    aria-label="Delete color"
                >
                    <i className="bi-trash"></i>
                </Button>
            );
        }

        return (
            <div className="colorControl">
                <div>{this.props.background ? "Background Color" :`Color ${this.props.colorId}`}</div>
                <ColorPicker colorId={this.props.colorId} color={this.props.color.color} app={app} />

                <FormGroup controlId={`weight-${this.props.colorId}`} className="colorWeight">
                    <Form.Label column className="colorWeightLabel">
                        Weight:
                    </Form.Label>
                    <div>
                        <Form.Control
                            type="number"
                            size="sm"
                            className="sizeInput"
                            min={0}
                            step="any"
                            value={this.props.color.weight}
                            disabled={!this.props.color.enabled}
                            onChange={(event) => app.handleWeightChange.bind(app)(event, this.props.colorId)}
                        />
                    </div>
                    <div className="colorWeightPercent">
                        {`(${weightPercent}%)`}
                    </div>
                </FormGroup>

                <div className="colorEnableDelete">
                    <div title={enableTitle}>
                        <Form.Switch
                            label={this.props.background ? "Use as square color" : "Enabled"}
                            id={`color-${this.props.colorId}-enable`}
                            checked={this.props.color.enabled}
                            onChange={() => app.handleToggleColor.bind(app)(this.props.colorId)}
                            disabled={!allowDisable}
                            title={enableTitle}
                        />
                    </div>
                    {deleteButton}
                </div>
            </div>
        );
    }
}
