// binsize.js
import DS from 'ember-data';

export default DS.Model.extend({
    avg: DS.attr(),
    const: DS.attr(),
    packages: DS.hasMany('package')
});
