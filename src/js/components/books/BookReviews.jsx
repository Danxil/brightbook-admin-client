import React from 'react';
import BookReviewsActionCreators from '../../actions/BookReviewsActionCreators.js';
import BookReviewsStore from '../../stores/BookReviewsStore.js';
import BookReview from './BookReview.jsx';
import Constants from '../../Constants.js';
import {Button, Input, Modal} from 'react-bootstrap';
import {ListGroup} from 'react-bootstrap';
import {Navigation} from 'react-router';
import _ from 'underscore';

export default React.createClass({
  mixins: [Navigation],

  getInitialState() {
    let bookId = this.props.params.id

    BookReviewsActionCreators.loadBookReviews(bookId)

    return {}
  },

  _onChange() {
    this.setState(function(prev) {
      prev.reviews = _.clone(BookReviewsStore.getAll())

      return prev
    })
  },

  submit() {
    var forms = []

    this.state.reviews.forEach(function(item, index) {
      var ref = item.id ? 'review-' + item.id : 'elem-' + index

      var fileForms = {
        avatar: this.refs[ref].refs.avatarForm.getDOMNode(),
      }

      forms.push({
        form: item,
        files: fileForms
      })
    }.bind(this))

    BookReviewsActionCreators.editBookReviews(this.props.params.id, forms).then(function() {
      if (!this.props.query.addingBook)
        this.transitionTo('books')
      else
        this.transitionTo('edit-book-reasons', {id: this.props.params.id})
    }.bind(this))
  },

  createBookReviewsDom(reviews) {
    for (var i = 0, length = reviews.length; i < Constants.ConfigSources.BOOK_REVIEWS_COUNT - length; i++) {
      reviews.push({})
    }

    return reviews.map(function(review, index) {
      var ref = review.id ? 'review-' + review.id : 'elem-' + index
      return <BookReview ref={ref} review={review} />
    })
  },

  componentDidMount() {
    BookReviewsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    BookReviewsStore.removeChangeListener(this._onChange);
  },

  render() {
    let {reviews} = this.state;

    if (!reviews)
      return <div></div>
    else {
      return (
        <div>
          <ListGroup>
            {this.createBookReviewsDom(reviews)}
          </ListGroup>
          <Button bsStyle='primary' onClick={this.submit}>Edit comments</Button>
        </div>
      )
    }
  }
});
