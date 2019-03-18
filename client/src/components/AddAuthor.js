import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Input } from "reactstrap";
import axios from "axios";
import { Redirect } from 'react-router-dom'

class AddAuthor extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    state = {
        modal: false,
        authors: [],
        author: {
            fullName: '',
            dateOfBirth: '',
            img: '',
        },
        selectedFile: null,
    };

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));

        if (this.state.author.dateOfBirth === '' || this.state.author.authorFullName === '') {
        } else {
            const token = localStorage.token;
            if (token) {
                const data = new FormData();
                data.append(
                    "file",
                    this.state.selectedFile,
                    this.state.selectedFile.name
                );

                data.append("body", JSON.stringify(this.state.author));
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
                axios.post('/api/admin/authors', data, conf)
                    .then(response => {
                        const authorsProps = this.props.authors;
                        authorsProps.push(response.data.author);
                        this.setState({ authors: authorsProps });
                        this.props.handlerFromParant(authorsProps);
                        this.setState({ authors: '' });

                    }).catch(error => {
                    });
            }
        }
    }

    handleOnChaneFname = event => {
        this.setState({ author: { ...this.state.author, fullName: event.target.value } });
    }
    handleOnChaneDate = event => {
        this.setState({ author: { ...this.state.author, dateOfBirth: event.target.value } });
    }
    handleselectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0
        });
    };

    render() {
        return (
            localStorage.token ?
                <div>
                    <h1>Authors Contents</h1>
                    <Button color="success" onClick={this.toggle}>Add Author</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop}
                        className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Add Author</ModalHeader>
                        <ModalBody>
                            <Input type="text" value={this.state.authorFullName} onChange={this.handleOnChaneFname}
                                placeholder='Author FirstName' />
                            <Input type="date" value={this.state.authorDate} onChange={this.handleOnChaneDate}
                                placeholder='Author Date' />
                            <Input
                                type="file"
                                name=""
                                id="exampleFile"
                                onChange={this.handleselectedFile}
                                placeholder='Author Photo ' />

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggle}>Add
                                Author</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Close</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                : <Redirect to={{ pathname: '/', state: { from: this.props.location } }} />
        );
    }
}

export default AddAuthor;