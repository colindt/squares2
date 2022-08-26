import React from "react";
import "./Wall.css";


export default class Wall extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }


    handleResize() {
        const width = this.ref.current.offsetWidth;
        const height = this.ref.current.offsetHeight;
        const wallSize = this.props.app.state.wallSize;

        this.props.app.setState({
            ...this.props.app.calculateCellSize(wallSize, width, height),
            width  : width,
            height : height,
            squares :  this.props.app.generateSquares(wallSize, width, height),
        });
    }


    componentDidMount() {
        this.resizer = new ResizeObserver(this.handleResize.bind(this));
        this.resizer.observe(this.ref.current);
        //this.handleResize(); //this happens automagically. I guess going from not existing to existing counts as a resize
    }


    componentWillUnmount() {
        this.resizer.disconnect();
    }
    

    render() {
        const app = this.props.app;
        const appState = app.state;
        return (
            <div id="wall"
                className={this.props.showLabels ? "labels" : ""}
                ref={this.ref}
            >
                <div className="wallTable">
                    {appState.squares && appState.squares.map((row,i) => {
                        return (
                            <div className="wallRow" key={i}>
                                {row}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
