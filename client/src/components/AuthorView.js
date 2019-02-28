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
        AuthorFullNameEdit: '',
        IdEdit: 0,
        AuthorDateEdit: '',
        selectedFile: null,
        loaded: 0,
        img: "",
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
        const author_id = author[0].id;
        const author_fname = author[0].title;
        const author_lname = author[0].title;
        const author_date = author[0].title;
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
    const token = localStorage.token;
    if(token) {
        const conf = {
        headers:{
            "x-auth":token,
        }
        }
    axios.get('/api/admin/authors',conf)
        .then(response => {
            console.log(response);
            this.setState(
                {authors: response.data.authors }
                );
                this.props.passAuthors(response.data);
                
        
        }).catch(error => {
        console.log(error);
        this.setState({error: 'Error reteiriving data'})
    })
    }
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

    handleselectedFile = event => {
        this.setState({
          selectedFile: event.target.files[0],
          loaded: 0
        });
      };

    render() {
        const {authors, error} = this.state;
        const authorsView = authors.length ? authors.map(author =>
            <tr key={author._id}>
                <td><img src={author.img} alt="img"/></td>
                <td>{author.fullName}</td>
                <td>{author.dateOfBirth}</td>
                <td><Button color='danger' onClick={() => this.handleDeleteAuthor(author._id)}>Delete</Button></td>
                <td><Button color='success' onClick={() => this.toggle(author._id)}>Edit</Button></td>
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
                        <Input
                                 type="file"
                                 name=""
                                 id="exampleFile"
                                 onChange={this.handleselectedFile}
                                 placeholder='Author Photo '/>
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleUpdateAuthor()}>Edit Author</Button>{' '}
                        <Button color="secondary" onClick={()=>this.toggle(null)}>Close</Button>
                    </ModalFooter>
                </Modal>
                <Table>
                    <thead>
                    <tr>
                        <th>Author Photo</th>
                        <th>Author Full-Name</th>
                        <th>Author Date Of Birth </th>
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
