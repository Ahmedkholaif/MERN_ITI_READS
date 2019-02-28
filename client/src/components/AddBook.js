import React, {Component} from "react";
import {Alert, Button, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

class AddBook extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            categories:nextProps.categories,
            authors:nextProps.authors
        });
    }

    state = {
        modal: false,
        books: [],
        categories: [],
        authors: []
    };

    toggle(id) {
        this.setState(prevState => ({
            modal: !prevState.modal,
        }));
    }

    handleselectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0
        });
    };

    render() {
        const {categories, authors, error} = this.state;
        const categoiresView = categories.length ? categories.map(category =>
            <option  key={category._id} value={category._id}>{category.catName}</option>
        ) : error ? <h1><Alert color='danger'>{error}</Alert></h1> : null;
        const authorView = authors.length ? authors.map(author =>
            <option  key={author._id} value={author._id}>{author.fullName}</option>
        ) : error ? <h1><Alert color='danger'>{error}</Alert></h1> : null;

        return (
            <div>
                <h1>Book Contents</h1>
                <Button color="success" onClick={this.toggle}>Add Book</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop}
                       className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add Category</ModalHeader>
                    <ModalBody>
                        <Input type="text" value={this.state.bookName} onChange={this.handleOnChangeBookName}
                               placeholder='Book Name'/>
                        <Input type="select" name="selectCategory" id="categorySelect">
                            {categoiresView}
                        </Input>
                        <Input type="select" name="selectAuthor" id="authorSelect">
                            {authorView}
                        </Input>
                        <Input
                            type="file"
                            name=""
                            id="addImageBook"
                            onChange={this.handleselectedFile}
                            placeholder='Book Photo '/>
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
