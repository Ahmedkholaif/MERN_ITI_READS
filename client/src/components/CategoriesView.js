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

        if(id !== null) {
            const categories = this.state.categories;
            const category = categories.filter(category => {
                return category._id === id;
             });

        const catid = category[0]._id;
        const cattitle = category[0].catName;
        this.setState({
            NameEdit: cattitle,
            IdEdit: catid
        });
        }
        
    }

handleUpdateCategory() {
    
const title = this.state.NameEdit;
const id = this.state.IdEdit;
if (title && id ) {
    const categories = this.state.categories;
    for (let key in categories) {
        if(categories[key]._id === id){
        categories[key].catName =title;
        this.setState({categories: categories});
        this.setState({
            NameEdit: '',
            idEdit: ''
        });
        // send put request 
        const token = localStorage.token;
        if(token) {
            const conf ={
            headers:{
            "x-auth":token,
            }
            }
            axios.put(`/api/admin/categories/${id}`,{
                catName:title
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
}
}

handleData(data) {
    this.setState({
        categories: data
    });
}

componentDidMount() {
    const token = localStorage.token;
    if(token) {
        const conf ={
            headers:{
            "x-auth":token,
        }
        }
    axios.get(`/api/admin/categories`,conf)
    .then(res =>{
        console.log(res);
        this.setState({
            categories: res.data
            })
            this.props.passCategories(res.data);
                
        })
    .catch(err => {
        console.log(err)})
        this.setState({error: 'Error reteiriving data'})
    }
}
    handleDeleteCategory = deletedId => {
        const token = localStorage.token;
        if(token) {
            const conf ={
              headers:{
              "x-auth":token,
            }
          }
        axios.delete(`/api/admin/categories/${deletedId}`,conf)
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
        this.setState({categories: this.state.categories.filter(category => category._id !== deletedId)});
        
    }

    handleOnChange = event => {
        this.setState({NameEdit: event.target.value});
        console.log(this.state.NameEdit);
    }

    render() {
        const {categories, error} = this.state;
        const categoriesView = categories.length ? categories.map(category =>
            <tr key={category._id}>
                <td>{category.catName}</td>
                <td><Button color='danger' onClick={() => this.handleDeleteCategory(category._id)}>Delete</Button></td>
                <td><Button color='success' onClick={() => this.toggle(category._id)}>Edit</Button></td>
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
                        <Button color="secondary" onClick={()=>this.toggle(null)}>Close</Button>
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