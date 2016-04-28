import Ember from 'ember';


export default Ember.Component.extend({
    setUI: Ember.inject.service('set-interface-parts'),
    compute: Ember.inject.service('compute-parts'),
    didRender(){
        this._super(...arguments);
        var allocated = this.get('compute').allocated(this.model);
        this.get('setUI').setLegend(allocated);
        this.get('setUI').setConstSelect(this.model);
    },
    actions:{
        addBin: function(){
            var can_save = true;
            var unit = $('select[name="new_package_unit"]').val();
            var val = $('input[name="new_package_val"]').val();
            var packages = this.model.get('packages');

            $('input[name="new_package_val"]').val('');

            console.log('count: ' + packages.get('length'));
            if ((packages.get('length') >= 8 ) || (val == '')){
                can_save = false;
            } else {
                packages.forEach(function(item,i,arr){
                    if ((item.get('val') == val) && (item.get('unit') == unit)){
                        console.log('reject');
                        can_save = false;
                    }
                });
            }
            if (can_save) {
                var pack = this.store.createRecord('package', {
                    val: val,
                    unit: unit,
                    percent: 0,
                    binsize: this.model
                });
//              pack.save();
            }
        },
        changeType: function(){
            var binsize_const = $('select[name="binsize_const"]').val();
            this.model.set('const', Boolean(Number(binsize_const)));
            if (binsize_const == 1){
                var packages = this.model.get('packages');
                packages.forEach(function(item,i,arr){
                    item.destroyRecord();
                });
                var pack = this.store.createRecord('package', {
                    val: 512,
                    unit: 'B',
                    percent: 100,
                    binsize: this.model
                });
            }
            this.get('compute').avg(this.model);
        },
        changePackage: function(){
            var pack_params = $('select[name="package_params"]').val().split(' ');
            var packages = this.model.get('packages');
            packages.forEach(function(item,i,arr){
                item.set('val', pack_params[0]);
                item.set('unit', pack_params[1]);
//                item.save();
            });
        },
        saveConfiguration: function(model){
            this.get('compute').avg(this.model);
            this.model.save().then(function(binsize){
                console.log('Binsize Saved');
                var packages = binsize.get('packages'),
                    saved = true;
                packages.forEach(function(item, i, arr){
                    item.save().then(function(pack){
                        console.log('Package Saved');
                    },function(adapterError){
                        console.log(adapterError.errors[0].description);
                        saved = false;
                    });
                });
                if (saved) { $('.saved').show().delay(1500).fadeOut();}
            },function(adapterError){
                console.log(adapterError.errors[0].description);
            })
        }
    }
});
