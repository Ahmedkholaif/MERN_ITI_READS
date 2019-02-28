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
        author:{
            fullName: '',
            dateOfBirth: '',
        },
        IdEdit: 0,
        selectedFile: null,
        loaded: 0,
    };

    handleData(data) {
        this.setState({
            authors: data
        });
    }

    toggle(id) {
        this.setState(prevState => ({
            modal: !prevState.modal,
            author:{
                fullName: '',
                dateOfBirth: '',
            },
            IdEdit: 0
        }));
        if (id !== null) {
            const authors = this.state.authors;
            const author = authors.filter(author => {
                return author._id === id;
            });
    
            console.log(author);
            const id = author[0]._id;
            const fullName = author[0].fullName;
            const dateOfBirth = author[0].dateOfBirth;
            this.setState({
                author : {
                    fullName,
                    dateOfBirth,
                },
                IdEdit:id,
            });
        }
    }

    handleUpdateAuthor() {

        const fullName = this.state.author.fullName;
        const dateOfBirth = this.state.author.dateOfBirth;
        const id = this.state.IdEdit;
        if (fullName !== '' && id !== 0 && dateOfBirth !== '') {
            const authors = this.state.authors;
            authors.forEach(author => {
                if (author.id === id) {
                    author.fullName = fullName;
                    this.setState({
                        authors: authors});
                }
            });
            this.setState({
                author:{
                    fullName:'',
                    dateOfBirth:'',
                },
                IdEdit: 0
            });
                // send post
        const token = localStorage.token;
        if(token) {
            const conf ={
            headers:{
            "x-auth":token,
            }
            }
            axios.put(`/api/admin/categories/${id}`,{
                fullName,
                dateOfBirth,
            },conf)
            .then(res =>{
                console.log(res);
                if(res.status === 200){
                    console.log(res);

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

    handleDeleteAuthor = deletedId => {

        const token = localStorage.token;
        if(token) {
            const conf ={
              headers:{
              "x-auth":token,
            }
          }
        axios.delete(`/api/admin/authors/${deletedId}`,conf)
        .then(res =>{
            if(res.status === 200){
            console.log(res);
            } else {
                console.log("not deleted from db");
            }
         })
        .catch(err => {
            console.log(err)})
            this.setState({error: 'Error Delete Operation'})
        }
        this.setState({authors: this.state.authors.filter(author =>author._id !== deletedId)});
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

    handleOnChangefullName = event => {
        this.setState({author:{
            fullName :event.target.value
        }
        });
        console.log(this.state.author.fullName);
    }
    
    handleOnChangeDate = event => {
        this.setState({author:{
            dateOfBirth:event.target.value
        }
        });
        console.log(this.state.author.dateOfBirth);
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
                <td><img src={author.img} alt="img" width="75" height="75"/></td>
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
                        <Input type="text" defaultValue={this.state.author.fullName}
                               onChange={this.handleOnChangefullName}
                               placeholder='Full FIrstName'/>
                        <Input type="date" defaultValue={this.state.author.dateOfBirth}
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
