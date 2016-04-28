import Ember from 'ember';

export default Ember.Service.extend({
    allocated(model){
        var allocated = 0;
        var packages = model.get('packages');
        packages.forEach(function(item, i, arr){
            allocated += Number(item.get('percent'));
        });
        console.log('Compute Allocated : ' + allocated);
        return allocated;
    },
    avg(model){
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
        return avg;
    },
    updateSlider(pack, available){
        console.log('updateSlider:'+ available);
        var target = $('#slider-' + pack.get('val') + '-' + pack.get('unit'));
        var max_percent = Number(pack.get('percent')) + Number(available)
        target.css('min-height', (max_percent * 3) + 'px');
        target.parent().css('top', (300 - (max_percent * 3)) + 'px');
        target.slider({
            orientation: "vertical",
            max: max_percent
        });
    },
    initSlider(pack, available){
        console.log('initSlider');
        var _this = this
        var binsize = pack.get('binsize');
        var brothers = binsize.get('packages');
        var target = $('#slider-' + pack.get('val') + '-' + pack.get('unit'));
        target.slider();
        this.updateSlider(pack, available);
        target.slider({
            value: pack.get('percent'),
            orientation: "vertical",
            range: "min",
            slide: function(event, ui) {
                pack.set('percent', ui.value);
                available = 100 - _this.allocated(binsize);
                brothers.forEach(function(item,i,arr){
                    _this.updateSlider(item, available);
                });
            }
        });
    }
});
