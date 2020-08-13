import { observable, action } from 'mobx';

class interviewStore {
    @observable uuid = null;


    @action getData = () => {
        console.log(222)
    };
}

export default new interviewStore();
