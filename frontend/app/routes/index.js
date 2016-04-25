import Ember from 'ember';

export default Ember.Route.extend({
    actions:{
        deleteBinsize: function(binsize){
            binsize.destroyRecord();
        }
    },
    model(){
        return this.store.findAll('binsize');
    }
});
