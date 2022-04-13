import React , {Component} from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {v1 as uuid} from 'uuid';
import '../index.css';
import axios from 'axios';
class ShoppingList extends Component <any, any> {
    

    state={
       

        items : [
              { _id: '' ,name: '' },
              
        ]                         
    }
    getitem(){
        axios
          .get('http://localhost:5000/api/items')
          .then(res => {
            this.setState((state: { items: any; }) => ({
                items : res.data
           }))
          
            console.log(this.state.items)
          })
          .catch(err =>{
            console.log('Error from ShoppingList');
          })
    }

    componentDidMount() {
        this.getitem()
      };
    additem(data: { _id:any, name:any}){
        axios
          .post('http://localhost:5000/api/items', data)
          .then(res => {
            this.getitem() 
          })
          .catch(err =>{
            console.log('Error from adding ShoppingList');
          })
    }
    deleteitem(id: string){
        axios
          .delete(`http://localhost:5000/api/items/${id}`)
          .then(res => {
           console.log("deleted successfully")
          })
          .catch(err =>{
            console.log('Error from adding ShoppingList');
          })

    }

    render(){
        const {items} = this.state;
        return(
                       
            <Container >
                <Button color="dark" style={{marginBottom: '10px'}}
                         onClick={ () => {
                             const name =prompt('Enter Item'); 
                             if(name){
                                 this.additem({_id: uuid(),name:name})
                                }
                            }
                            }>
                    Add Item
                </Button>
                <ListGroup>
                    <TransitionGroup className="shopping-list" >
                        { items.map( ({_id, name})=> (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button className="remove-btn" color="danger"
                                        onClick={ () => {
                                            this.deleteitem(_id)
                                            this.setState((state: any) => ({
                                                items : this.state.items.filter(item => item._id !== _id)
                                            }));
                                        }}>
                                        &times;
                                    </Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        )
                        )}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }

}
export default ShoppingList;