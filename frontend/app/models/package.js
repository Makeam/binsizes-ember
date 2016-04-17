import DS from 'ember-data';

export default DS.Model.extend({
    val: DS.attr(),
    unit: DS.attr(),
    percent: DS.attr('number'),
    binsize: DS.belongsTo('binsize')
});
