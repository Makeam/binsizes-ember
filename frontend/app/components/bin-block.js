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


var updateSlider= function(pack, available){
    console.log('updateSlider');
    var target = $('#slider-' + pack.get('val') + '-' + pack.get('unit'));
    var max_percent = Number(pack.get('percent')) + Number(available)
    target.css('min-height', (max_percent * 3) + 'px');
    target.parent().css('top', (300 - (max_percent * 3)) + 'px');
    target.slider({
        orientation: "vertical",
        max: max_percent
    });
};

var initSlider = function(pack, available){
    console.log('initSlider');
    var binsize = pack.get('binsize');
    var brothers = binsize.get('packages');
    var target = $('#slider-' + pack.get('val') + '-' + pack.get('unit'));
    target.slider();
    updateSlider(pack, available);
    target.slider({
        value: pack.get('percent'),
        orientation: "vertical",
        range: "min",
        slide: function(event, ui) {
            pack.set('percent', ui.value);
            available = 100 - computeAllocated(binsize);
            brothers.forEach(function(item,i,arr){
                updateSlider(item, available);
            });
        }
    });
};

export default Ember.Component.extend({
    classNames: ['package', 'pack-block'],
    didRender(){
        this._super(...arguments);
        console.log('didrender Bin');
        var binsize = this.package.get('binsize');
        var allocated = computeAllocated(binsize);
        computeAVG(binsize);
        initSlider(this.package, (100 - allocated));
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
