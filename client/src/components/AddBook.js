import React, { Component } from "react";
import { Alert, Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from 'axios'
class AddBook extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            categories: nextProps.categories,
            authors: nextProps.authors,
        });
        // console.log(nextProps.categories,nextProps.authors);
        // console.log(this.state.categories,this.state.authors);
    }

    state = {
        modal: false,
        books: [],
        categories: [],
        authors: [],
        book: {
            bookName: '',
            author: '',
            category: '',
            description: ''
        },
        selectedFile: null,
    };

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal,
        }));
        if (this.state.book.bookName === '' || this.state.book.author === '' || this.state.book.category === ''
            || this.state.book.description === ''
        ) {
        } else {
            const token = localStorage.token;
            if (token) {
                const data = new FormData();
                data.append(
                    "file",
                    this.state.selectedFile,
                    this.state.selectedFile.name
                );

                data.append("body", JSON.stringify(this.state.book));
                const conf = {
                    onUploadProgress: ProgressEvent => {
                        this.setState({
                            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
                        });
                    },
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth": token
                    }
                };
                axios.post('/api/admin/books', data, conf)
                    .then(response => {
                        const booksProps = this.props.books;
                        booksProps.push(response.data.book);
                        this.setState({
                            books: booksProps
                        });
                        this.props.handlerFromParant(booksProps);
                        this.setState({
                            books: ''
                        });

                    }).catch(error => {
                        console.log(error);
                    });
            }
        }
    }

    handleOnChangeBookName = event => {
        this.setState({ book: { ...this.state.book, bookName: event.target.value } });
    }
    handleOnChangeCategory = event => {
        this.setState({ book: { ...this.state.book, category: event.target.value } });
    }
    handleOnChangeAuthor = event => {
        this.setState({ book: { ...this.state.book, author: event.target.value } });
    }
    handleOnChangeDescription = event => {
        this.setState({ book: { ...this.state.book, description: event.target.value } });
    }

    handleselectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0
        });
    };

    render() {
        const { categories, authors, error } = this.state;
        const categoiresView = categories.length ? categories.map(category =>
            <option key={category._id} value={category.catName}>{category.catName}</option>
        ) : error ? <h1><Alert color='danger'>{error}</Alert></h1> : null;
        const authorView = authors.length ? authors.map(author =>
            <option key={author._id} value={author.fullName}>{author.fullName}</option>
        ) : error ? <h1><Alert color='danger'>{error}</Alert></h1> : null;

        return (
            <div>
                <h1>Book Contents</h1>
                <Button color="success" onClick={this.toggle}>Add Books </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add Book</ModalHeader>
                    <ModalBody>
                        <Input type="text" value={this.state.bookName} onChange={this.handleOnChangeBookName}
                            placeholder='Book Name' />
                        <Input type="select" name="selectCategory" id="categorySelect" onClick={this.handleOnChangeCategory}>
                            {categoiresView}
                        </Input>
                        <Input type="select" name="selectAuthor" id="authorSelect" onClick={this.handleOnChangeAuthor} >
                            {authorView}
                        </Input>
                        <textarea name="description" id="authorSelect" onChange={this.handleOnChangeDescription}
                            placeholder='Discription '></textarea>

                        <Input
                            type="file"
                            name=""
                            id="addImageBook"
                            onChange={this.handleselectedFile}
                            placeholder='Book Photo ' />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Add Book</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AddBook;
