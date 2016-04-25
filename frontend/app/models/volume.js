// volume.js
import DS from 'ember-data';

export default DS.Model.extend({
    allocated: DS.attr('number'),
    available: Ember.computed('allocated', function(){
        return 100 - this.get('allocated');
    })
});