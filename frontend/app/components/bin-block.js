import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['package', 'pack-block'],
    compute: Ember.inject.service('compute-parts'),
    didRender(){
        this._super(...arguments);
        console.log('didrender Bin');
        var binsize = this.package.get('binsize');
        var allocated = this.get('compute').allocated(binsize);
        this.get('compute').avg(binsize);
        this.get('compute').initSlider(this.package, (100 - allocated));
    },
    actions:{
        deletePackage: function(pack){
            pack.deleteRecord();
            pack.save().then(function(p){
                $('.package-' + pack.id).hide();
            },function(adapterError){
                console.log(adapterError.errors[0].description)
            });
        },
        changePercent: function(p, percent){
            console.log('change percent');
            var allocated = computeAllocated(this.model);
            var will_allocate = Number(allocated) + Number(percent) - p.get('percent');
            console.log('will_allocate : ' + will_allocate);
            console.log('will_allocate > 100 ' + (will_allocate > 100));
            if (will_allocate > 100) {
                percent = Number(percent) + 100 - will_allocate;
            }
            console.log('percent ' + percent);
            p.set('percent', percent);
            allocated = computeAllocated(this.model);
            console.log('Allocated : ' + allocated);
            setLegend(allocated);
        }
    }
});
