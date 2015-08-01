import React from 'react';
import BookReviewsActionCreators from '../actions/BookReviewsActionCreators.js';
import BookReviewsStore from '../stores/BookReviewsStore.js';
import BookReview from '../components/BookReview.jsx';
import Constants from '../Constants.js';
import {Button, Input, Modal} from 'react-bootstrap';
import {ListGroup} from 'react-bootstrap';
import {Navigation} from 'react-router';

export default React.createClass({
  mixins: [Navigation],

  getInitialState() {
    let bookId = this.props.params.id

    BookReviewsActionCreators.loadBookReviews(bookId)

    return {reviews: BookReviewsStore.getAll()}
  },

  _onChange() {
    this.setState(function(prev) {
      prev.reviews = BookReviewsStore.getAll()

      return prev
    })
  },

  submit() {
    var forms = []

    this.state.reviews.forEach(function(item) {
      var fileForms = {
        avatar: this.refs['review-' + item.id].refs.avatarForm.getDOMNode(),
      }

      forms.push({
        form: item,
        files: fileForms
      })
    }.bind(this))

    BookReviewsActionCreators.editBookReviews(this.props.params.id, forms).then(function() {
      this.transitionTo('books')
    }.bind(this))
  },

  createBookReviewsDom(reviews) {
    for (var i = 0, length = reviews.length; i < Constants.ConfigSources.BOOK_REVIEWS_COUNT - length; i++) {
      reviews.push({})
    }

    return reviews.map(review=> <BookReview ref={'review-' + review.id} review={review} />)
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
    else
      return (
        <div>
          <ListGroup>
            {this.createBookReviewsDom(reviews)}
          </ListGroup>
          <Button bsStyle='primary' onClick={this.submit}>Edit book</Button>
        </div>
      )
  }
});
