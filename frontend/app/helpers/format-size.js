import Ember from 'ember';

export function formatSize(params/*, hash*/) {
    let size = params[0],
        body,
        text = '',
        sizes = [];

    sizes[0] = { unit: ' Gb ', size: 1024 * 1024 * 1024 };
    sizes[1] = { unit: ' Mb ', size: 1024 * 1024 };
    sizes[2] = { unit: ' Kb ', size: 1024 };
    sizes[3] = { unit: ' Bytes ', size: 1 };

    sizes.forEach(function(item, i, arr){
        console.log(item.size);
        console.log(size + ' / ' + item.size);
        if (size > item.size) {

            body = Math.floor(size / item.size);
            console.log('Body ' + body);
            size = size - item.size * body;
            text += body + item.unit;
            console.log('text ' + text);
        }
    });

    return text;
}

export default Ember.Helper.helper(formatSize);
