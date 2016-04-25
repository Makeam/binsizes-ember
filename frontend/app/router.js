import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('binsize', { path: 'binsize/:binsize_id' });
  this.route('create');
});

export default Router;
