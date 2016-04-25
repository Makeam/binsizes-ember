import Ember from 'ember';

export default Ember.Route.extend({
    model(params){
    return this.store.createRecord('binsize',{
        const: false,
        avg: 0
    })
}
});
