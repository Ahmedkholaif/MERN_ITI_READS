import React, {Component} from 'react';
import {Table, Button, Alert, ModalHeader, ModalBody, ModalFooter, Modal, Input} from "reactstrap";
import axios from 'axios';
import '../css/CategoriesView.css';
import AddCategory from './AddCategory';

class CategoriesView extends Component {
    constructor(props) {
        super(props);
        this.handleData = this.handleData.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    state = {
        categories: [],
        modal: false,
        NameEdit: '',
        IdEdit: 0
    };

    toggle(id) {
        this.setState(prevState => ({
            modal: !prevState.modal,
            NameEdit: '',
            IdEdit: 0
        }));

        const categories = this.state.categories;
        const category = categories.filter(category => {
            return category.id === id;
        });

        const catid = category[0].id;
        const cattitle = category[0].title;
        this.setState({
            NameEdit: cattitle,
            IdEdit: catid
        });
    }

    handleUpdateCategory() {
        const title = this.state.NameEdit;
        const id = this.state.IdEdit;
        if (title !== '' && id !== 0) {
            const categories = this.state.categories;
            for (var key in categories) {
                if(categories[key].id===id){
                    categories[key].title=title;
                }
            }
            this.setState({categories: categories});
        }
        this.setState({
            NameEdit: '',
            idEdit: ''
        });
        // send post
        axios.post('/',{
            id:id,
            title:title
        }).then(response=>{
            console.log(response);
        }).catch(error=>{
            console.log(error);
        });
    }

    handleData(data) {
        this.setState({
            categories: data
        });
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/albums')
            .then(response => {
                this.setState({categories: response.data});
                console.log(response);
            }).catch(error => {
            console.log(error);
            this.setState({error: 'Error reteiriving data'})
        })
    }

    handleDeleteCategory = deletedId => {
        axios.delete('https://jsonplaceholder.typicode.com/albums/' + {deletedId})
            .then(response => {
                console.log(response);
            }).catch(error => {
            this.setState({error: 'Error Delete Operation'})
        })

        this.setState({categories: this.state.categories.filter(category => category.id !== deletedId)});
    }

    handleOnChange = event => {
        this.setState({NameEdit: event.target.value});
        console.log(this.state.NameEdit);
    }

    render() {
        const {categories, error} = this.state;
        const categoriesView = categories.length ? categories.map(category =>
            <tr key={category.id}>
                <td>{category.title}</td>
                <td><Button color='danger' onClick={() => this.handleDeleteCategory(category.id)}>Delete</Button></td>
                <td><Button color='success' onClick={() => this.toggle(category.id)}>Edit</Button></td>
            </tr>
        ) : error ? <h1><Alert color='danger'>{error}</Alert></h1> : null;

        return (
            <div className='CategoriesTable'>
                <AddCategory categories={this.state.categories} handlerFromParant={this.handleData}/>
                <Modal isOpen={this.state.modal} toggle={() => this.toggle()}
                       className={this.props.className}>
                    <ModalHeader>Add Category</ModalHeader>
                    <ModalBody>
                        <Input type="text" defaultValue={this.state.NameEdit} onChange={this.handleOnChange}
                               placeholder='Category Name'/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleUpdateCategory()}>Edit Category</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Table>
                    <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>#</th>
                        <th>#</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categoriesView}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default CategoriesView;