import Ember from 'ember';

var computeAllocated = function(model){
    var allocated = 0;
    var packages = model.get('packages');
    packages.forEach(function(item, i, arr){
        allocated += Number(item.get('percent'));
    });
    console.log('Compute Allocated : ' + allocated);
    return allocated;
};

var setLegend = function(allocated){
    console.log('setLegend');
    $('p.allocated span').html(allocated);
    $('p.available span').html((100 - allocated));
};

export default Ember.Component.extend({
    didRender(){
        this._super(...arguments);
        console.log('didrender');
        setLegend(computeAllocated(this.model));
    },
    actions:{
        addBin: function(){
            console.log('Add bin');
            console.log($('input[name="new_package_val"]').val());
            console.log($('select[name="new_package_unit"]').val());
            var can_save = true;
            var unit = $('select[name="new_package_unit"]').val();
            var val = $('input[name="new_package_val"]').val();

            var packages = this.model.get('packages');
            console.log('count: ' + packages.get('length'));
            if (packages.get('length') >= 8 ){
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
            console.log('change type select component');
            console.log($('select[name="binsize_const"]').val());
            var binsize_const = $('select[name="binsize_const"]').val();
            this.model.set('const', binsize_const);
            if (binsize_const == 1){
                var packages = this.model.get('packages');
                packages.forEach(function(item,i,arr){
                    item.destroy();
                });
                var pack = this.store.createRecord('package', {
                    val: 512,
                    unit: 'B',
                    percent: 100,
                    binsize: this.model
                });
            }
        },
        changePackage: function(){
            console.log('change package params component');
            var pack_params = $('select[name="package_params"]').val().split(' ');
            console.log(pack_params[0] + ' : ' + pack_params[1]);
            var packages = this.model.get('packages');
            packages.forEach(function(item,i,arr){
                item.set('val', pack_params[0]);
                item.set('unit', pack_params[1]);
//                item.save();
            });
        },
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
        },
        saveConfiguration: function(model){
            model.save().then(function(binsize){
                console.log('Binsize Saved');
                var packages = binsize.get('packages');
                packages.forEach(function(item, i, arr){
                    console.log('Package: ' + i);
                    item.save().then(function(pack){
                        console.log('Package Saved');
                    },function(adapterError){
                        console.log(adapterError.errors[0].description);
                    });
                });
            },function(adapterError){
                console.log(adapterError.errors[0].description);
            })
        }
    }
});
