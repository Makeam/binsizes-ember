import Ember from 'ember';
console.log('binsize controller.');

var computeAllocated = function(){
    var allocated = 0;
    var packages = model.binsize.get('packages');
    packages.forEach(function(item, i, arr){
        allocated += item.get('percent');
    });
    console.log('Allocated : ' + allocated);
    return allocated;
};

export default Ember.Controller.extend({
    didRender(){
        this._super(...arguments);
        console.log('didRender');
//        computeAllocated();
    },
    actions:{
        changePercent: function(p, percent){
            console.log('change percent');
            console.log(p.percent);
            console.log(percent);
            p.set("percent", percent);
            var binsizeRef = p.belongsTo('binsize');
            var binsize = binsizeRef.value();
            var id = binsize.id;
//            binsize = this.store.peekRecord('binsize', id);
            binsize.reload();
            console.log('Allocated : ' + binsize.get('allocated'));
        }
    }
});
