import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['package', 'pack-block'],
    setUI: Ember.inject.service('set-interface-parts'),
    compute: Ember.inject.service('compute-parts'),
    didRender(){
        this._super(...arguments);
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
            var _this = this;
            var binsize = this.package.get('binsize');
            var brothers = binsize.get('packages');
            var allocated = this.get('compute').allocated(binsize);
            var will_allocate = Number(allocated) + Number(percent) - p.get('percent');

            if (will_allocate > 100) {
                percent = Number(percent) + 100 - will_allocate;
            }
            p.set('percent', percent);

            allocated = this.get('compute').allocated(binsize);

            var available = 100 - allocated;
            brothers.forEach(function(item, i, arr){
                _this.get('compute').updateSlider(item, available);
            });

            this.get('setUI').setLegend(allocated);
        }
    }
});
