import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter,Input} from 'reactstrap';
import axios from 'axios';

class AddCategory extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    state = {
        modal: false,
        categories: [],
        categoryName: ''
    };

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));

        if (this.state.categoryName === '') {
        } else if (this.state.categoryName !== '') {
            axios.post('/', {
                categoryName: this.state.categoryName
            }).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            });
            const categoriesProps = this.props.categories;
            categoriesProps.push({userId: 1, id: Math.floor(Math.random() * 1000), title: this.state.categoryName});
            this.setState({categories: categoriesProps});
            this.props.handlerFromParant(categoriesProps);
            this.setState({categoryName: ''});
        }
    }

    handleOnChange = event => {
        this.setState({categoryName: event.target.value});
    }

    render() {
        return (
            <div>
                <h1>Category Contents</h1>
                <Button color="success" onClick={this.toggle}>Add Category</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop}
                       className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add Category</ModalHeader>
                    <ModalBody>
                        <Input type="text" value={this.state.categoryName} onChange={this.handleOnChange}
                               placeholder='Category Name'/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Add
                            Category</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AddCategory;
