import React, {Component} from 'react';
import '../css/AuthorView.css';
import AddAuthor from './AddAuthor';
import axios from "axios";
import {Alert, Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";


class AuthorView extends Component {
    constructor(props) {
        super(props);
        this.handleData = this.handleData.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    state = {
        authors: [],
        modal: false,
        AuthorFirstNameEdit: '',
        IdEdit: 0,
        AuthorLastNameEdit: '',
        AuthorDateEdit: '',
    };

    handleData(data) {
        this.setState({
            authors: data
        });
    }

    toggle(id) {
        this.setState(prevState => ({
            modal: !prevState.modal,
            AuthorFirstNameEdit: '',
            AuthorLastNameEdit: '',
            AuthorDateEdit: '',
            IdEdit: 0
        }));

        const authors = this.state.authors;
        const author = authors.filter(author => {
            return author.id === id;
        });

        console.log(author);
        const author_id = author[id];
        const author_fname = author["title"];
        const author_lname = author["title"];
        const author_date = author[title];
        this.setState({
            AuthorFirstNameEdit: author_fname,
            AuthorLastNameEdit: author_lname,
            AuthorDateEdit: author_date,
            IdEdit: author_id
        });
    }

    handleUpdateAuthor() {
        try {

            const fname = this.state.AuthorFirstNameEdit;
            const lname = this.state.AuthorLastNameEdit;
            const date = this.state.AuthorDateEdit;
            const id = this.state.IdEdit;
            if (fname !== '' && id !== 0 && lname !== '' && date !== '') {
                const authors = this.state.authors;
                for (var key in authors) {
                    if (authors[key].id === id) {
                        authors[key].title = fname;
                    }
                }
                this.setState({authors: authors});
            }
            this.setState({
                AuthorFirstNameEdit: '',
                AuthorLastNameEdit: '',
                AuthorDateEdit: '',
                IdEdit: 0
            });
            // send post
            axios.post('/', {
                id: id,
                fname: fname,
                lname: lname,
                date: date
            }).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            });
        } catch (e) {
            console.log(e.message);
            console.log(e);
        }
    }

    handleDeleteAuthor = deletedId => {

        axios.delete('https://jsonplaceholder.typicode.com/albums/' + {deletedId})
            .then(response => {
                console.log(response);
            }).catch(error => {
            this.setState({error: 'Error Delete Operation'})
        })
        // const authors = this.state.authors;
        // authors.filter(author => {
        //     return author.id !== deletedId;
        // });
        this.setState({
            authors: this.state.authors.filter(author => author.id !== deletedId)
        });
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/albums')
            .then(response => {
                this.setState({authors: response.data});
                console.log(response);
            }).catch(error => {
            console.log(error);
            this.setState({error: 'Error reteiriving data'})
        })
    }

    handleOnChangeFname = event => {
        this.setState({AuthorFirstNameEdit:event.target.value});
        console.log(this.state.AuthorFirstNameEdit);
    }
    handleOnChangeLname = event => {
        this.setState({AuthorLastNameEdit:event.target.value});
        console.log(this.state.AuthorLastNameEdit);
    }
    handleOnChangeDate = event => {
        this.setState({AuthorDateEdit:event.target.value});
        console.log(this.state.AuthorDateEdit);
    }

    render() {
        const {authors, error} = this.state;
        const authorsView = authors.length ? authors.map(author =>
            <tr key={author.id}>
                <td>{author.title}</td>
                <td>{author.title}</td>
                <td>{author.title}</td>
                <td>{author.title}</td>
                <td><Button color='danger' onClick={() => this.handleDeleteAuthor(author.id)}>Delete</Button></td>
                <td><Button color='success' onClick={() => this.toggle(author.id)}>Edit</Button></td>
            </tr>
        ) : error ? <h1><Alert color='danger'>{error}</Alert></h1> : null;

        return (
            <div>
                <AddAuthor authors={this.state.authors} handlerFromParant={this.handleData}/>
                <Modal isOpen={this.state.modal} toggle={() => this.toggle()}
                       className={this.props.className}>
                    <ModalHeader>Edit Author</ModalHeader>
                    <ModalBody>
                        <Input type="text" defaultValue={this.state.AuthorFirstNameEdit}
                               onChange={this.handleOnChangeFname}
                               placeholder='Author FIrstName'/>
                        <Input type="text" defaultValue={this.state.AuthorLastNameEdit}
                               onChange={this.handleOnChangeLname}
                               placeholder='Author LastName'/>
                        <Input type="date" defaultValue={this.state.AuthorDateEdit}
                               onChange={this.handleOnChangeDate}
                               placeholder='Author Date fo Birth'/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleDeleteAuthor()}>Edit Author</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Table>
                    <thead>
                    <tr>
                        <th>Author Photo</th>
                        <th>Author First-Name</th>
                        <th>Author Last-Name</th>
                        <th>Author-Date</th>
                        <th>#</th>
                        <th>#</th>
                    </tr>
                    </thead>
                    <tbody>
                    {authorsView}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default AuthorView;
