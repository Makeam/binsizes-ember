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

var setConstSelect = function(value){
    console.log('setConstSelect');
    var v = String(Number(value));
    $('option[value="' + v + '"]').attr('selected','selected');
};

//var initSlider = function(pack, available){
//    console.log();
//    var target = $('#slider-' + pack.get('val') + '-' + pack.get('unit'));
//    var max_percent = Number(pack.get('percent')) + Number(available)
//    target.css('min-height', (max_percent * 3) + 'px');
//    target.parent().css('top', (300 - (max_percent * 3)) + 'px');
//    target.slider();
//    target.slider({
//        value: pack.get('percent'),
//        orientation: "vertical",
//        range: "min",
//        max: max_percent,
//        slide: function(event, ui) {
//            pack.set('percent', ui.value);
//        }
//    });
//};

export default Ember.Component.extend({
    didRender(){
        this._super(...arguments);
        console.log('didrender');
        var allocated = computeAllocated(this.model);
//        computeAVG(this.model);
        setLegend(allocated);
        setConstSelect(this.model.get('const'));
//        var packages = this.model.get('packages');
//        packages.forEach(function(item,i,arr){
//            initSlider(item, (100 - allocated));
//        });
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
//        deletePackage: function(pack){
//              pack.deleteRecord();
//              pack.save().then(function(p){
//                  $('.package-' + pack.id).hide();
//              },function(adapterError){
//                  console.log(adapterError.errors[0].description)
//              });
//        },
//        changePercent: function(p, percent){
//            console.log('change percent');
//            var allocated = computeAllocated(this.model);
//            var will_allocate = Number(allocated) + Number(percent) - p.get('percent');
//            console.log('will_allocate : ' + will_allocate);
//            console.log('will_allocate > 100 ' + (will_allocate > 100));
//            if (will_allocate > 100) {
//                percent = Number(percent) + 100 - will_allocate;
//            }
//            console.log('percent ' + percent);
//            p.set('percent', percent);
//            allocated = computeAllocated(this.model);
//            console.log('Allocated : ' + allocated);
//            setLegend(allocated);
//        },
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
