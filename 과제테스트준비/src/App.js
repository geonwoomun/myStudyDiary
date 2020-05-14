// import Sample from './Sample.js'
import Todo from './Todo.js';

export default class App {

    $target = null
    dashboard = null
    
    constructor($target) {
        this.$target = $target

        // this.dashboard = new Sample($target);
        this.init($target);
    }

    init($target) {
        new Todo($target);
    }
}