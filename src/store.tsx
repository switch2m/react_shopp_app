import {
    observable,
    action,
    reaction,
    makeObservable,
    runInAction,
  } from "mobx";
  
  import { createContext } from "react";
  
  import axios from "axios";
  
  const api = "http://localhost:3001/api/items";
  
  export interface Item {
    _id?: string;
    name: string;
  }
  
  class ItemStore {
    constructor() {
      makeObservable(this);
      reaction(
        () => this.items,
        (_) => console.log(this.items)
      );
      this.items = [];
    }
  
    @observable items: any;
  
    @action addItem = (item: Item) => {
      this.items.push(item);
    };
  
    @action removeItem = (id: string) => {
      this.items = this.items.filter((item :any) => item._id !== id);
    };
    
    @action.bound
    getAllItems = async () => {
      const items = await this.fetchItemsData();
      runInAction(() => {
        for (let i = 0; i < items.length; i++) {
          this.items.push({
            _id: items[i]["_id"],
            name: items[i]["name"],
          });
        }
      });
    };
  
    @action.bound
    addItemDb = (item: Item) => {
      axios.post(api, item).then((res) => {
        console.log(res);
      });
    };
  
    @action.bound
    deleteItemDb = (id: string) => {
      console.log(id)
      axios.delete(api + `/${id}`,).then((res) => {
        console.log(res);
      });
    };
  
    fetchItemsData = async () => {
      return axios.get(api).then((res) => res.data);
    };
  }
  
  export default createContext(new ItemStore());