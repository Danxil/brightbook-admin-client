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
        <a href="#">
          <video className="embed-responsive-item" onClick={this.playVideoHndler} preload="none" poster="https://developers.google.com/youtube/images/YouTube-icon-dark.png">
            <source src={src} type="video/mp4" />
          </video>
        </a>
      </div>
    );
  }
});
