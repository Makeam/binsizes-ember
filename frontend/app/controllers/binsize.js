import Ember from 'ember';
console.log('binsize controller.');

//var computeAllocated = function(model){
//    var allocated = 0;
//    var packages = model.binsize.get('packages');
//    packages.forEach(function(item, i, arr){
//        allocated += Number(item.get('percent'));
//    });
//    console.log('Compute Allocated : ' + allocated);
//    return allocated;
//};
//
//var setLegend = function(allocated){
//    console.log('setLegend');
//    $('p.allocated span').html(allocated);
//    $('p.available span').html((100 - allocated));
//};

export default Ember.Controller.extend({
//    mkm: function(){
//        return computeAllocated(this.model);
//    }.property('packages'),
//    actions:{
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
//            this.model.volume.allocated = allocated;
//            console.log('Allocated : ' + allocated);
//            setLegend(allocated);
//            console.log('this.model.volume.allocated : ' + this.model.volume.allocated);
//        }
//    }
});
