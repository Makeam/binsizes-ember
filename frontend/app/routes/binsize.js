import Ember from 'ember';

export default Ember.Route.extend({
    actions:{
        addBin: function(){
            console.log('Add bin');
        },
        changeType: function(){
            console.log('change type select');
        },
        changePPercent: function(){
            console.log('change percent');
            console.log(this);
        }
    },
    model(params){
        return this.store.findRecord('binsize', params.binsize_id);
    }
});
