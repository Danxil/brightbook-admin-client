import React from 'react';
import AppContainer from './components/AppContainer.jsx';
import CategoriesContainer from './components/CategoriesContainer.jsx';
import AddCategory from './components/AddCategory.jsx';
import EditCategory from './components/EditCategory.jsx';
import BooksContainer from './components/BooksContainer.jsx';
import AddBook from './components/AddBook.jsx';
import EditBook from './components/EditBook.jsx';
import BookReviews from './components/BookReviews.jsx';
import {run, HashLocation, Route, Link } from 'react-router';

let routes = (
    <Route handler={AppContainer}>
        <Route name="categories" path="/categories" handler={CategoriesContainer} />
        <Route name="add-category" path="/add-category" handler={AddCategory} />
        <Route name="edit-category" path="/categories/:id" handler={EditCategory} />
        <Route name="books" path="/books" handler={BooksContainer} />
        <Route name="add-book" path="/add-book" handler={AddBook} />
        <Route name="edit-book" path="/books/:id" handler={EditBook} />
        <Route name="edit-book-reviews" path="/books/:id/reviews" handler={BookReviews} />
    </Route>
)

run(routes, HashLocation, (Root) => {
    React.render(<Root/>, document.getElementById('main'));
});