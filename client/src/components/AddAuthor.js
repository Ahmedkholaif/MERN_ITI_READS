import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Input} from "reactstrap";
import axios from "axios";


class AddAuthor extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    state = {
        modal: false,
        authors: [],
        authorFirstName: '',
        authorLastName: '',
        authorDate: ''
    };

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));

        if (this.state.authorDate === '' || this.state.authorLastName === '' || this.state.authorLastName === '') {
        } else if (this.state.authorDate !== '' && this.state.authorLastName !== '' && this.state.authorLastName !== '') {
            axios.post('/', {
                authorFirstName: this.state.authorFirstName,
                authorLastName: this.state.authorLastName,
                authorDate: this.state.authorDate
            }).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            });
            const authorsProps = this.props.authors;
            authorsProps.push({userId: 1, id: Math.floor(Math.random() * 1000), title: this.state.authorFirstName});
            this.setState({authors: authorsProps});
            this.props.handlerFromParant(authorsProps);
            this.setState({authors: ''});
        }
    }

    handleOnChaneFname = event => {
        this.setState({authorFirstName: event.target.value});
    }
    handleOnChaneLname = event => {
        this.setState({authorLastName: event.target.value});
    }
    handleOnChaneDate = event => {
        this.setState({authorDate: event.target.value});
    }


    render() {
        return (
            <div>
                <h1>Authors Contents</h1>
                <Button color="success" onClick={this.toggle}>Add Author</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop}
                       className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add Author</ModalHeader>
                    <ModalBody>
                        <Input type="text" value={this.state.authorFirstName} onChange={this.handleOnChaneFname}
                               placeholder='Author FirstName'/>
                        <Input type="text" value={this.state.authorLastName} onChange={this.handleOnChaneLname}
                               placeholder='Author LastName'/>
                        <Input type="date" value={this.state.authorDate} onChange={this.handleOnChaneDate}
                               placeholder='Author Date'/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Add
                            Author</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AddAuthor;