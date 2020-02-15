import React from 'react';
import PropTypes from 'prop-types';
import Calculator from './calculator';
import Styles from '../../scss/home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.onClick = this.onButtonClick.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);

    document.body.onkeydown = this.onKeyDown.bind(this);
    document.body.onkeyup = this.onKeyUp.bind(this);

    document.addEventListener('touchstart', (evt) => { evt.preventDefault() }, { passive: true });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementsByClassName(`${Styles.home}`)[0].classList.add('fadeIn');
      });
    });
  }

  onKeyDown(evt) {
    let button = this.calculator.refs[evt.key];

    if (button && !button.isActive()) {
      this.props.keyDownAction(evt.key);
    }
  }

  onKeyUp(evt) {
    let button = this.calculator.refs[evt.key];

    this.props.keyDownAction('');
    this.props.keyUpAction(evt.key, this.props);
  }

  onButtonClick(key) {
    this.props.keyDownAction('');
    this.props.keyUpAction(key, this.props);
  }

  onMouseDown(key) {
    this.props.keyDownAction(key);
  }

  onMuteIconClick(value) {
    this.props.muteAction(value);
  }

  render() {
    return (
      <div className={Styles.home}>
        <img src="https://c.yell.com/t_bigRect,f_auto/7f0a6a4e-3899-4052-8299-f05597a86992_image_png.png"  alt="Insurance Revolution" className={Styles.logo}/>
        <div className={Styles.home__content}>
          <Calculator ref={(calculator) => this.calculator = calculator}
            {...this.props}
            onMouseDown={this.onMouseDown.bind(this)}
            buttonClick={this.onButtonClick.bind(this)}
            muteIconClick={this.onMuteIconClick.bind(this)} />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  muteAction: PropTypes.func
  , muted: PropTypes.bool
  , keyDownAction: PropTypes.func
  , keyDown: PropTypes.string
  , keyUpAction: PropTypes.func
};

export default Home;
