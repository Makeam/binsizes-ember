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
//
var computeAVG = function(model){
    var allocated = 0,
        avg = 0,
        flow = 0,
        packages = model.get('packages');

    packages.forEach(function(item, i, arr){
        allocated += Number(item.get('percent'));
        flow += item.get('bytes') * item.get('percent');
    });

    avg = (allocated > 0) ? Number(flow / allocated) : 0;
    model.set('avg', avg);
    console.log('Compute AVG : ' + avg);
    return avg;
};

var setLegend = function(allocated){
    console.log('setLegend');
    $('p.allocated span').html(allocated);
    $('p.available span').html((100 - allocated));
};

var setConstSelect = function(model){
    console.log('setConstSelect');
    var v = Number(model.get('const'));
    $('option[value="' + v + '"]').attr('selected','selected');
    if (v == 1) {
        var packages = model.get('packages');
        packages.forEach(function(item, i, arr){
            var pack_value = item.get('val') + ' ' + item.get('unit');
            $('option[value="' + pack_value + '"]').attr('selected','selected');
        });
    }
};


export default Ember.Component.extend({
    didRender(){
        this._super(...arguments);
        console.log('didrender');
        var allocated = computeAllocated(this.model);
        setLegend(allocated);
        setConstSelect(this.model);
    },
    actions:{
        addBin: function(){
            console.log('Add bin');
            var can_save = true;
            var unit = $('select[name="new_package_unit"]').val();
            var val = $('input[name="new_package_val"]').val();

            var packages = this.model.get('packages');
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
            console.log('change type select component');
            console.log($('select[name="binsize_const"]').val());
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
        },
        changePackage: function(){
            console.log('change package params');
            var pack_params = $('select[name="package_params"]').val().split(' ');
            var packages = this.model.get('packages');
            packages.forEach(function(item,i,arr){
                item.set('val', pack_params[0]);
                item.set('unit', pack_params[1]);
//                item.save();
            });
        },
        saveConfiguration: function(model){
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
