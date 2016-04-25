import Ember from 'ember';

export default Ember.Route.extend({
    actions:{
        addBin: function(){
            console.log('Add bin');
        },
        changeType: function(){
            console.log('change type select');
        }
    },
    model(params){
        return this.store.findRecord('binsize', params.binsize_id)
    }
//    model(params){
//        return Ember.RSVP.hash({
//            binsize: this.store.findRecord('binsize', params.binsize_id)
//        });
//    }
});
