import React from 'react';
import 'react/addons';

export default React.createClass({
  playVideoHndler(e) {
    let elem = e.target

    if (elem.paused)
        elem.play()
    else
        elem.pause()
  },

  render() {
    let {src} = this.props;

    return (
      <div className="embed-responsive embed-responsive-16by9">
        <video className="embed-responsive-item" onClick={this.playVideoHndler}>
          <source src={src} type="video/mp4" />
        </video>
      </div>
    );
  }
});
