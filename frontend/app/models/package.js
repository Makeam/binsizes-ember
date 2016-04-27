import DS from 'ember-data';

export default DS.Model.extend({
    val: DS.attr(),
    unit: DS.attr(),
    percent: DS.attr('number'),
    binsize: DS.belongsTo('binsize'),
    bytes: Ember.computed('val', 'unit', function(){
        var sizes = [];
        sizes['B'] = 1;
        sizes['KB'] = sizes['B'] * 1024;
        sizes['MB'] = sizes['KB'] * 1024;
        sizes['GB'] = sizes['MB'] * 1024;

        return this.get('val') * sizes[this.get('unit')]
    })
});
