import Ember from 'ember';

export default Ember.Service.extend({
    setLegend(allocated){
        console.log('setLegend');
        $('p.allocated span').html(allocated);
        $('p.available span').html((100 - allocated));
    },
    setConstSelect(model){
        console.log('setConstSelect');
        var v = Number(model.get('const'));
        $('option[value="' + v + '"]').attr('selected','selected');
        if (v == 1) {
            this.setBinParamsSelect(model)
        }
    },
    setBinParamsSelect(model){
        var packages = model.get('packages');
        $('option[value="512 B"]').attr('selected','selected');
        packages.forEach(function(item, i, arr){
            if (!(item.get('isNew'))){
                var pack_value = item.get('val') + ' ' + item.get('unit');
                $('option[value="' + pack_value + '"]').attr('selected','selected');
            }
        });
    }
});
