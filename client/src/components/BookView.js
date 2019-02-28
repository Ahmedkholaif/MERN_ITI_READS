import React, {Component} from 'react';
import axios from "axios";
import {Alert, Button, Table} from "reactstrap";
import AddBook from '../components/AddBook';
import {Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Redirect} from 'react-router'
class BookView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            categories: [],
            authors:[],
            book:{
                bookName:'',
                author:'',
                category:'',
            },
            selectedFile: null,
            loaded: 0,
        };
        this.handleData = this.handleData.bind(this);
        this.handleUpdateBook = this.handleUpdateBook.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    handleData(data) {
        this.setState({
            books: data
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            categories: nextProps.categories,
            authors: nextProps.authors
        })
    }

    toggle(id) {
        // console.log(id);
        this.setState(prevState => ({
            modal: !prevState.modal,
            book:{
                bookName:'',
                author:'',
                category:'',
            },
            IdEdit: 0
        }));
        if (id !== null) {
            const books = this.state.books;
            const book = books.filter(book => {
                return book._id === id;
            });
            
            const bookName = book[0].bookName;
            const author = book[0].author;
            const category = book[0].category;
            const description = book[0].description;
            this.setState({
                book: {
                    bookName,
                    author,
                    category,
                    description,
                },
                IdEdit: id,
            });
        }
    }

    handleUpdateBook  () {

        const bookName = this.state.book.bookName;
        const author = this.state.book.author;
        const category = this.state.book.category;
        const description = this.state.book.description;

        const id = this.state.IdEdit;
        if (bookName !== '' && id !== 0 && author !== '' && category !== '' && description !== '') {
            const books = this.state.books;
            for (let key in books ) {
                if (books[key]._id === id) {
                    books[key].bookName = bookName;
                    books[key].author = author;
                    books[key].category = category;
                    books[key].description = description;
                    console.log(books[key]);
            // send post
            const token = localStorage.token;
            if (token) {
                const data = new FormData();
                 data.append(
                    "file",
                    this.state.selectedFile,
                    this.state.selectedFile.name,
                  );

                 data.append("body", JSON.stringify(this.state.book));
                 const conf = {
                    // onUploadProgress: ProgressEvent => {
                    // this.setState({
                    //     loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
                    // });
                    // },
                    headers: {
                    "Content-Type": "application/json",
                    "x-auth": token
                    }
                };

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

                        axios.put(`/api/admin/books/${id}`, data, conf)
                            .then(res => {
                                console.log(res);
                                if (res.status === 200) {
                                    books[key].img = res.data.img;

                                    this.setState({
                                        books,
                                        book: {
                                            bookName: '',
                                            description: '',
                                            author: '',
                                            category: '',
                                        },
                                        IdEdit: 0
                                    });

                                    console.log(res.data.img);

                                } else {
                                    console.log("not updated in db");
                                }
                            })
                            .catch(err => {
                                console.log({err});
                                this.setState({error: 'Error Delete Operation'})
                            })
                    }
                }
            }
        }
    }


    componentDidMount() {

         const token = localStorage.token;
        if(token) {
        const conf = {
        headers:{
            "x-auth":token,
        }
        }
        axios.get('/api/admin/books', conf)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    this.setState(
                        {books: response.data.books}
                    );
                }
                // this.props.passAuthors(response.data);
            }).catch(error => {
            console.log(error);
            this.setState({error: 'Error reteiriving data'})
        })
        }

    }

    handleDeleteBook = deletedId => {
        const token = localStorage.token;
        if (token) {
            const conf = {
                headers: {
                    "x-auth": token,
                }

            }
            axios.delete(`/api/admin/books/${deletedId}`, conf)
                .then(res => {
                    if (res.status === 200) {
                        console.log(res);
                    } else {
                        console.log("not deleted from db");
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            this.setState({error: 'Error Delete Operation'})
        }
        this.setState({books: this.state.books.filter(book => book._id !== deletedId)});
    }

    handleOnChangeBookName = event => {
        this.setState({book: {...this.state.book,bookName: event.target.value}});
    }
    handleOnChangeCategory = event => {
        this.setState({book: {...this.state.book,category: event.target.value}});
    }
    handleOnChangeAuthor = event => {
        this.setState({book: {...this.state.book,author: event.target.value}});
    }
    handleOnChangeDescription = event => {
        this.setState({book: {...this.state.book,description: event.target.value}});
    }

    handleselectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0
        });
    };

    render() {

        const {categories, books, authors, error} = this.state;
        const categoiresView = categories.length ? categories.map(category =>
            <option key={category._id} value={category.catName}>{category.catName}</option>
        ) : error ? <h1><Alert color='danger'>{error}</Alert></h1> : null;
        const authorView = authors.length ? authors.map(author =>
            <option key={author._id} value={author.fullName}>{author.fullName}</option>
        ) : error ? <h1><Alert color='danger'>{error}</Alert></h1> : null;

        const bookslength = books.length;
        const booksView = bookslength ? books.map(book =>
            <tr key={book._id}>
                <td><img src={book.img} alt="img" width="75" height="75"/></td>
                <td>{book.bookName}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.description}</td>
                <td><Button color='danger' onClick={() => this.handleDeleteBook(book._id)}>Delete</Button></td>
                <td><Button color='success' onClick={() => this.toggle(book._id)}>Edit</Button></td>
            </tr>
        ) : error ? <h1><Alert color='danger'>{error}</Alert></h1> : null;
        return (
            localStorage.token ?
                <div>
                    <AddBook categories={this.state.categories} handlerFromParant={this.handleData}
                             books={this.state.books}
                             authors={this.state.authors}/>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop}
                           className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Add Book</ModalHeader>
                        <ModalBody>
                            <Input type="text" value={this.state.bookName} defaultValue={this.state.book.bookName}
                                   onChange={this.handleOnChangeBookName}
                                   placeholder='Book Name'/>
                            <Input type="select" name="selectCategory" defaultValue={this.state.book.category}
                                   id="categorySelect" onClick={this.handleOnChangeCategory}>
                                {categoiresView}
                            </Input>
                            <Input type="select" name="selectAuthor" id="authorSelect"
                                   defaultValue={this.state.book.author}
                                   onClick={this.handleOnChangeAuthor}>
                                {authorView}
                            </Input>
                            <textarea name="description" id="authorSelect" defaultValue={this.state.book.description}
                                      onChange={this.handleOnChangeDescription}
                                      placeholder='Discription '></textarea>

                            <Input
                                type="file"
                                name=""
                                id="addImageBook"
                                onChange={this.handleselectedFile}
                                placeholder='Book Photo '/>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.handleUpdateBook}> Edit Book</Button>{' '}
                            <Button color="secondary" onClick={() => this.toggle(null)}>Close</Button>
                        </ModalFooter>
                    </Modal>

                    <Table>
                        <thead>
                        <tr>
                            <th>Book Photo</th>
                            <th>Book Name</th>
                            <th>Book Author</th>
                            <th>Book Category</th>
                            <th>Book Description</th>
                            <th>#</th>
                            <th>#</th>
                        </tr>
                        </thead>
                        <tbody>
                        {booksView}
                        </tbody>
                    </Table>
                </div>
                : <Redirect to={{pathname: '/', state: {from: this.props.location}}}/>
        );
    }
}

export default BookView;