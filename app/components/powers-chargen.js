import EmberObject from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
    didInsertElement: function() {
      let self = this;
      this.set('updateCallback', function() { return self.onUpdate(); } );
    },
    onUpdate: function() {
      let extras = this.get('model.app.game.extra_plugins');
      if (!extras.any(e => e === 'powers')) {
        return {};
      }

      let data = {};
      this.get('model.char.powers').filter(t => t.name && t.name.length > 0)
         .forEach(t => data[t.name] = t.desc);
      return data;
    },
      
    actions: { 
        addPower() {
          this.get('model.char.powers').pushObject(EmberObject.create( {name: "Power Name", desc: "Enter a Description"} ));
        },
        removePower(name) {
          let found = this.get('model.char.powers').find(t => t.name === name);
          if (found) {
            this.get('model.char.powers').removeObject(found);  
          }
        }
    
    }
});