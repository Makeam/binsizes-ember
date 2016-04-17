// binsize.js
import DS from 'ember-data';

export default DS.Model.extend({
    avg: DS.attr(),
    const: DS.attr('boolean'),
    packages: DS.hasMany('package'),
    allocated: Ember.computed('packages', function(){
        var allocated = 0;
        var packages = this.get('packages');
        packages.forEach(function(item, i, arr){
            allocated += Number(item.get('percent'));
        });
        console.log('Allocated : ' + allocated);
        return allocated;
    }),
    available: Ember.computed('allocated', function(){
        console.log('Allocated : ' + (100 - this.get('allocated')));
        return (100 - this.get('allocated'));
    })
});
