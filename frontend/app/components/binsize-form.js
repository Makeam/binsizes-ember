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

var setConstSelect = function(value){
    var v = String(Number(value));
    console.log(v);
    $('option[value="' + v + '"]').attr('selected','selected');
};

var initSlider = function(pack, available){
    console.log();
    var target = $('#slider-' + pack.get('val') + '-' + pack.get('unit'));
    var max_percent = Number(pack.get('percent')) + Number(available)
    target.css('min-height', (max_percent * 3) + 'px');
    target.parent().css('top', (300 - (max_percent * 3)) + 'px');
    target.slider();
    target.slider({
        value: pack.get('percent'),
        orientation: "vertical",
        range: "min",
        max: max_percent,
        slide: function(event, ui) {
            pack.set('percent', ui.value);
            console.log('model?: '+ this);
            console.log('change slider: '+ ui.value);
            console.log($(this).closest('.package').find('input').attr('value'));
            $(this).closest('.package').find('input').attr('value', ui.value);
//            $('#input-' + pack.get('val') + '-' + pack.get('unit')).attr('value', ui.value);
        }
    });
};

export default Ember.Component.extend({
    didRender(){
        this._super(...arguments);
        console.log('didrender');
        var allocated = computeAllocated(this.model);
        setLegend(allocated);
        setConstSelect(this.model.get('const'));
        var packages = this.model.get('packages');
        packages.forEach(function(item,i,arr){
            initSlider(item, (100 - allocated));
        });
    },
    actions:{
        changeFromSlide: function(){
            console.log('changeFromSlide');
        },
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
            this.model.save().then(function(binsize){
                console.log('Binsize Saved');
                var packages = binsize.get('packages');
                packages.forEach(function(item, i, arr){
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
