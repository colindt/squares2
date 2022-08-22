import React from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Controls from './Controls';
import Wall from './Wall';
import Square from './Square';

import { weightedRandom, contrast } from './util';



export default class App extends React.Component {
    constructor(props) {
        super(props);

        const wallSize = {
            "Wall Width" : 122,
            "Wall Height" : 98,
            "Square Width": 10,
            "Square Height" : 10,
            "Square Spacing" : 2,
        };

        const colors = [
            {
                color : "#ffffff",
                enabled : true,
                weight: 100,
            },
            {
                color : "#d6adbc",
                enabled : true,
                weight: 100,
            },
            {
                color : "#94ac9d",
                enabled : true,
                weight: 100,
            },
            {
                color : "#a1c3e5",
                enabled : true,
                weight: 100,
            },
            {
                color : "#a3b0d4",
                enabled : true,
                weight: 100,
            },
        ];

        const cellColors = [
            [1, 4, 0, 2, 4, 0, 4, 1, 3, 4], 
            [4, 2, 1, 4, 3, 3, 2, 4, 0, 2], 
            [1, 0, 3, 2, 1, 0, 3, 1, 3, 1], 
            [0, 4, 1, 1, 4, 1, 2, 0, 3, 4], 
            [2, 2, 4, 3, 0, 3, 3, 4, 2, 0], 
            [3, 1, 0, 1, 2, 0, 2, 0, 1, 2], 
            [0, 2, 3, 0, 2, 3, 1, 3, 4, 0], 
            [4, 4, 2, 3, 1, 4, 2, 0, 3, 1], 
        ]

        this.state = {
            wallSize : wallSize,
            colors : colors,
            cellColors : cellColors,
            squares : undefined, //automaticallly populated when the Wall component mounts
            width : 0,
            height : 0,
            showLables : false,
        };
    }


    reroll(event) {
        event.preventDefault();
        
        const newCellColors = this.generateRandomCellColors();
        const newSquares = this.colorSquares(this.state.squares, newCellColors);

        this.setState({
            cellColors : newCellColors,
            squares : newSquares,
        });
    }


    generateRandomCellColors() {
        const columns = this.calculateColumns(this.state.wallSize);
        const rows = this.calculateRows(this.state.wallSize);
        const c = Math.ceil(columns);
        const r = Math.ceil(rows);

        const enabledColorIds = this.state.colors.map((c,i) => c.enabled ? i : null).filter((id) => id !== null);
        const weights = this.state.colors.filter((c) => c.enabled).map((c) => c.weight);


        return Array(r).fill(null).map((_unused, i) => {
            return Array(c).fill(null).map((_unused, j) => {
                return weightedRandom(enabledColorIds, weights);
            });
        });
    }


    handleSquareClick(row, column) {
        const oldColor = this.state.cellColors[row][column];
        const newColor = (oldColor + 1) % this.state.colors.length;

        const newCellColors = this.state.cellColors.slice();
        newCellColors[row][column] = newColor;
        
        const newSquares = this.colorSquares(this.state.squares, newCellColors);
        
        this.setState({
            cellColors : newCellColors,
            squares : newSquares,
        });
    }


    handleSizeChange(event) {
        let newWallSize = {...this.state.wallSize};
        newWallSize[event.target.name] = Number(event.target.value);

        const squares = this.generateSquares(newWallSize, this.state.width, this.state.height);

        this.setState({
            wallSize : newWallSize,
            squares: squares,
        });
    }


    handleToggleLabels() {
        this.setState({
            showLables : !this.state.showLables,
        });
    }


    handleToggleColor(colorId) {
        const newColors = this.state.colors.slice();
        newColors[colorId].enabled = !newColors[colorId].enabled;
        this.setState({colors : newColors});
    }

    handleWeightChange(event, colorId) {
        const newColors = this.state.colors.slice();
        newColors[colorId].weight = Number(event.target.value);
        this.setState({colors : newColors});
    }


    handleDeleteColor(colorId) {
        this.setState({
            colors : this.state.colors.filter((color,i) => {return i !== colorId})
        }, this.updateSquareColors);
    }


    handleAddColor() {
        this.setState({
            colors : this.state.colors.concat({
                color : "#000000", //todo
                enabled : true,
                weight : 100,
            })
        }, this.updateSquareColors);
    }


    handleColorChange(newColor, valid, colorId) {
        const newColors = this.state.colors.slice();

        let newValue = newColor;
        if (newValue[0] === "#") {newValue = newValue.slice(1);}
        //todo: some sort of validation
        newValue = `#${newValue}`;

        newColors[colorId].color = newValue;
        
        this.setState({colors : newColors});

        if (valid) {
            this.updateSquareColors();
        }
    }


    calculateColumns(wallSize) {
        return (wallSize["Wall Width"]  - wallSize["Square Spacing"]) / (wallSize["Square Width"]  + wallSize["Square Spacing"])
    }


    calculateRows(wallSize) {
        return (wallSize["Wall Height"]  - wallSize["Square Spacing"]) / (wallSize["Square Height"]  + wallSize["Square Spacing"])
    }


    generateSquares(wallSize, width, height) {
        const columns = this.calculateColumns(wallSize);
        const rows = this.calculateRows(wallSize);
        const c = Math.ceil(columns);
        const r = Math.ceil(rows);
        const ww = wallSize["Wall Width"];
        const wh = wallSize["Wall Height"];
        const sw = wallSize["Square Width"];
        const sh = wallSize["Square Height"];
        const ss = wallSize["Square Spacing"];

        const scale = Math.min(width / ww, height / wh);

        const borderWidth = scale * ss;

        const style = {
            borderTopWidth    : borderWidth / 2,
            borderRightWidth  : borderWidth / 2,
            borderBottomWidth : borderWidth / 2,
            borderLeftWidth   : borderWidth / 2,
        }

        const squares = Array(r).fill(null).map((_unused, i) => {
            return Array(c).fill(null).map((_unused, j) => {
                const cellStyle = {...style};

                if (i === 0) { //first row
                    cellStyle.borderTopWidth = borderWidth;
                }
                else if (i === (r - 1)) { //last row
                    if (r * (ss + sh) > wh) { //can't fit another full square
                        const newHeight = Math.floor(scale * (wh - ((r - 1) * (ss + sh)) - ss));
                        cellStyle.height = newHeight;
                        cellStyle.minHeight = newHeight;
                        cellStyle.borderBottomWidth = 0;
                    }
                    else if (r * (ss + sh) + ss > wh) { //can't fit full bottom border
                        const newBorderHeight = Math.floor(scale * (wh - (r * (ss + sh))));
                        cellStyle.borderBottomWidth = newBorderHeight;
                    }
                    else { //can fit everything
                        cellStyle.borderBottomWidth = borderWidth; //border width and height are the same
                    }
                }

                if (j === 0) { //first column
                    cellStyle.borderLeftWidth = borderWidth;
                }
                else if (j === (c - 1)) { //last column
                    if (c * (ss + sw) > ww) { //can't fit another full square
                        const newWidth = Math.floor(scale * (ww - ((c - 1) * (ss + sw)) - ss));
                        cellStyle.width = newWidth;
                        cellStyle.minWidth = newWidth;
                        cellStyle.borderRightWidth = 0;
                    }
                    else if (c * (ss + sw) + ss > ww) { //can't fit full right border
                        const newBorderWidth = Math.floor(scale * (ww - (c * (ss + sw))));
                        cellStyle.borderRightWidth = newBorderWidth;
                    }
                    else { //can fit everything
                        cellStyle.borderRightWidth = borderWidth;
                    }
                }

                return (
                    <Square
                        key={j}
                        style={cellStyle}
                        onClick={() => this.handleSquareClick(i, j)}
                    />
                );
            });
        });

        return this.colorSquares(squares);
    }


    updateSquares() {
        this.setState({squares : this.generateSquares(this.state.wallSize, this.state.width, this.state.height)});
    }


    colorSquares(oldSquares=this.state.squares, cellColors=this.state.cellColors) {
        return oldSquares.map((row, i) => {
            return row.map((cell, j) => {
                const colorId = cellColors[i][j];

                let backgroundColor = "var(--page-background-color)";
                try {
                    backgroundColor = `var(--color-${colorId})`;
                } catch (dontCare) {}

                return React.cloneElement(cell, {
                    style : {
                        ...cell.props.style,
                        backgroundColor : backgroundColor,
                        "--color-id" : `"${colorId}"`,
                        "--label-color" : contrast(this.state.colors[colorId].color),
                    }
                })
            });
        });
    }


    updateSquareColors() {
        this.setState({squares : this.colorSquares()});
    }


    render() {
        const wallSize = this.state.wallSize;
        const ww = wallSize["Wall Width"];
        const wh = wallSize["Wall Height"];
        const sw = wallSize["Square Width"];
        const sh = wallSize["Square Height"];

        const scale = Math.min(this.state.width / ww, this.state.height / wh);
        const cellWidth   = scale * sw;
        const cellHeight  = scale * sh;

        const colorDefs = {};
        for (let i in this.state.colors) {
            colorDefs[`--color-${i}`] = this.state.colors[i].color;
        }

        return (
            <Container style={{
                ...colorDefs,
                "--wall-background-color" : this.state.colors[0].color,
                "--cell-width" : `${cellWidth}px`,
                "--cell-height" : `${cellHeight}px`,
            }}>
                <Row>
                    <Col xs="auto">
                        <Controls app={this} />
                    </Col>
                    <Col>
                        <Wall showLabels={this.state.showLables} app={this} />
                    </Col>
                </Row>
            </Container>
        );
    }
}
