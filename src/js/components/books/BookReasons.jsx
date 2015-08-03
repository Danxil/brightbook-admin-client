import React from 'react';
import BookReasonsActionCreators from '../../actions/BookReasonsActionCreators.js';
import BookReasonsStore from '../../stores/BookReasonsStore.js';
import BookReason from './BookReason.jsx';
import Constants from '../../Constants.js';
import {Button, Input, Modal} from 'react-bootstrap';
import {ListGroup} from 'react-bootstrap';
import {Navigation} from 'react-router';
import _ from 'underscore';

export default React.createClass({
  mixins: [Navigation],

  getInitialState() {
    let bookId = this.props.params.id
    BookReasonsActionCreators.loadBookReasons(bookId)

    return {}
  },

  _onChange() {
    this.setState(function(prev) {
      prev.reasons = _.clone(BookReasonsStore.getAll())

      return prev
    })
  },

  submit() {
    var forms = []

    this.state.reasons.forEach(function(item, index) {
      var ref = item.id ? 'reason-' + item.id : 'elem-' + index

      var fileForms = {
        avatar: this.refs[ref].refs.avatarForm.getDOMNode(),
      }

      forms.push({
        form: item,
        files: fileForms
      })
    }.bind(this))

    var callback = function() {
      this.transitionTo('books')
    }

    BookReasonsActionCreators.editBookReasons(this.props.params.id, forms).then(callback.bind(this), callback.bind(this))
  },

  createBookReasonsDom(reasons) {
    for (var i = 0, length = reasons.length; i < Constants.ConfigSources.BOOK_REASONS_COUNT - length; i++) {
      reasons.push({})
    }

    return reasons.map(function(reason, index) {
      var ref = reason.id ? 'reason-' + reason.id : 'elem-' + index
      return <BookReason ref={ref} reason={reason} />
    })
  },

  componentDidMount() {
    BookReasonsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    BookReasonsStore.removeChangeListener(this._onChange);
  },

  render() {
    let {reasons} = this.state;

    if (!reasons)
      return <div></div>
    else {
      return (
        <div>
          <ListGroup>
            {this.createBookReasonsDom(reasons)}
          </ListGroup>
          <Button bsStyle='primary' onClick={this.submit}>Edit reason</Button>
        </div>
      )
    }
  }
});
