import React from 'react';
import "./About.css"

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show : false,
        }
    }


    _handleClose() {
        this.setState({
            show : false,
        });
    }
    handleClose = this._handleClose.bind(this);


    render() {
        return (<>
            <Button
                variant="link"
                className="aboutLink"
                onClick={() => this.setState({show : true})}
            >
                <i className="bi-question-circle"></i>Help/About: What is this?
            </Button>
            <Modal
                className="aboutBox"
                size="lg"
                show={this.state.show}
                onHide={this.handleClose}
                fullscreen="md-down"
            >
                <Modal.Header closeButton>
                    <Modal.Title>About</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        A few years ago my sister was planning to paint an accent wall with colored squares and asked me
                        if I could make a program to randomly generate patters to see what they would look like. The
                        resulting web app that I made can be found here: <a href="https://colindt.net/squares">colindt.net/squares</a>
                    </p>
                    <p>The app was a success, and the wall turned out great, as seen here:</p>
                    <p><img src="photo.jpg" alt="the real-life wall" /></p>
                    <p>
                        The original is pretty limited though. The colors and sizes of the wall and the squares are
                        hard-coded based on what was already chosen. So I decided to remake it with more options and
                        customizability using <a href="https://reactjs.org/">React</a> as a vehicle for developing my skills.
                    </p>
                    <hr className="hr-p" />
                    <h4>Usage</h4>
                    <h5>Reroll</h5>
                    <p>
                        Press the <strong>Reroll</strong> button to generate a new random wall of squares.
                        Some actions, like adding or removing a color, require a reroll to see their effects.
                    </p>
                    <h5>Size Controls</h5>
                    <p>
                        The <strong>Wall Width</strong> and <strong>Height</strong> determine the total size of the
                        entire wall. <strong>Square Width</strong> and <strong>Height</strong> determine the size of the
                        "squares". <strong>Square Spacing</strong> determines the size of the gaps between and around
                        the squares. The units are arbitrary, but the defaults are based on a 10'2" x 8'2" wall, with
                        10" squares spaced 2" apart, which is close to the real walls shown above.
                    </p>
                    <p>
                        The wall will automatically scale to fit the display area, which may seem unintuitive at first
                        when increasing the wall size makes things smaller.
                    </p>
                    <h5>Show square labels</h5>
                    <p>
                        A switch to show color numbers in the squares. This was a requested feature from version 1 to
                        allow for printing out an easy reference sheet to use when painting (printing is currently
                        poorly supported in this version).
                    </p>
                    <h5>Colors</h5>
                    <p>
                        These are the colors that will be used for the squares and the gaps between them
                        (the <strong>Background Color</strong>). Each color control has a color swatch that you can
                        click to bring up a color picker, or you can type or paste
                        a <a href="https://en.wikipedia.org/wiki/Web_colors#Hex_triplet">hex color code</a> into the
                        adjacent text box.
                    </p>
                    <p>
                        Each color has an <strong>Enable</strong> switch (or <strong>Use as square color</strong> in the
                        case of the background color) that you can turn off the prevent that color from being included
                        in the next reroll without having to delete it. You can also <strong>delete</strong> a color
                        from the list entirely by pressing the <strong>red trash button</strong>.
                    </p>
                    <p>
                        The <strong>Weight</strong> setting controls the relative amount of each color to be generated
                        in the next reroll. The percentage next to it shows the calculated percentage for that color
                        based on the total weights of all enabled colors. Wall generation is still random, so this
                        percentage is only approximate.
                    </p>
                    <p>
                        You can add a color to the list by pressing the <strong>Add Color</strong> button. You'll need
                        to reroll to see the new color show up in the wall.
                    </p>
                    <h5>Manual Color Cycling</h5>
                    <p>
                        If the randomly generated layout isn't quite right for you (maybe there's too many greens in a
                        row to look good on a wall), you can manually cycle a square's color through the list of colors
                        (including disabled ones) by <strong>clicking on it</strong>. This was a requested feature
                        from version 1.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>);
    }
}
