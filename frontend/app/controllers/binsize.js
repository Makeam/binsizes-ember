import Ember from 'ember';
console.log('wow');
export default Ember.Controller.extend({
    actions:{
        changePercent: function(p, percent){
            console.log('change percent');
            console.log(p.percent);
            console.log(percent);
            p.set("percent", percent);
        }
    }
});
