import React, {Component} from 'react';
import axios from "axios";
import {Alert, Button, Table} from "reactstrap";

class BookView extends Component {
    constructor(props) {
        super(props);
        this.handleData = this.handleData.bind(this);
    }

    state = {
        books: [],
        categories: this.props.categories,
        authors: this.props.authors
    };

    handleData(data) {
        this.setState({
            authors: data
        });
    }


    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                this.setState({books: response.data});
                console.log(response);
            }).catch(error => {
            console.log(error);
            this.setState({error: 'Error retrieving data'})
        })

    }

    componentWillReceiveProps(nextProps, nextContext) {
        const authors = nextProps.authors;
        const categories = nextProps.categories;
        this.setState({
            categories: categories,
            authors: authors
        });
    }

    handleDeleteBook = deletedId => {
        axios.delete('https://jsonplaceholder.typicode.com/posts' + {deletedId})
            .then(response => {
                console.log(response);
            }).catch(error => {
            this.setState({error: 'Error Delete Operation'})
        })

        this.setState({
            books: this.state.books.filter(book => book.id !== deletedId)
        });
    }


    render() {
        const {books, error} = this.state;
        const booksView = books.length ? books.map(book =>
            <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.body}</td>
                <td>{book.body}</td>
                <td><Button color='danger' onClick={() => this.handleDeleteBook(book.id)}>Delete</Button></td>
                <td><Button color='success'>Edit</Button></td>
            </tr>
        ) : error ? <h1><Alert color='danger'>{error}</Alert></h1> : null;
        return (
            <div>
                <Table>
                    <thead>
                    <tr>
                        <th>Book Photo</th>
                        <th>Book Name</th>
                        <th>Book Author</th>
                        <th>Book Category</th>
                        <th>#</th>
                        <th>#</th>
                    </tr>
                    </thead>
                    <tbody>
                    {booksView}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default BookView;