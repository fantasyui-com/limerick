const EventEmitter = require('events');

const template = require('lodash/template');
const startCase = require('lodash/startCase');
const oneof = require('oneof');
const filter = require('lodash/filter');
const shuffle = require('lodash/shuffle');


const type = {
  container: {type: 'container'},
  thing: {type: 'thing'},
  action: {type: 'action'},
}

class Namable {

  constructor(options) {
    this.names = options.names;
    this.descriptions = options.descriptions;
  }

  name(){
    if( (!this.names) || (this.names.length === 0) ) throw new Error('Names must not be empty: ' + JSON.stringify(this))
    return oneof(this.names);
  }

  description(){
    if( (!this.descriptions) || (this.descriptions.length === 0) ) throw new Error('Descriptions must not be empty: ' + JSON.stringify(this))
    return oneof(this.descriptions);
  }
}


class Eventing extends Namable {

  constructor(options) {
    super(options);

    this.templateOptions = {interpolate: /{{([\s\S]+?)}}/g };

    this.eventingData = {};
  }

  on(event, messages){
    if (!this.eventingData[event]) this.eventingData[event] = [];
    this.eventingData[event] = this.eventingData[event].concat(messages.map( i=>i.replace(/(\{\{[a-z]+) ([a-z]+\}\})/g, '$1_$2')).map( i=> template(i,this.templateOptions)));

  }

  emit(event, data){
    /// console.log('Heard %s', event, this.names)
    if (this.eventingData[event]) {
      let eventMessages = oneof(this.eventingData[event])(data);
      console.log(eventMessages);
    }
  }

}


class Containment extends Eventing {
  constructor(options) {
    super(options);

    this.containmentData = [];
  }

  join(item, type) {
    this.containmentData.push({item, type});
  }

  things(type) {

    let filtered = filter(this.containmentData, {type});
    if(filtered){
      let response = filtered.map(i=>i.item);
      return response;
    } else {
      return undefined;
    }

  }

}











class Location extends Containment {

  constructor(options) {
    super(options);

    this.locations = [];
    this.items = [];
  }

  contains(location) {
    this.locations.push(location);
  }

  has(item) {
    this.items.push(item);
  }

}






class Entity extends Containment {

  constructor(options) {
    super(options);

    this.theEnd = false;
  }

  wanderGoto(location){

    this.location.emit('leave', {

      actor_name: this.name(),
      actor_description: this.description(),

      location_name: this.location.name(),
      location_description: this.location.description(),

      destination_name: location.name(),
      destination_description: location.description(),

    });

    this.location = location;

    this.location.emit('enter', {

      actor_name: this.name(),
      actor_description: this.description(),

      location_name: location.name(),
      location_description: location.description(),

    });



  }

  // description(){
  //   console.log(this.location.description());
  // }

  wanderEnd(){
    this.emit('finish', {
      actor_name: this.name(),
      actor_description: this.description(),
      location_name: this.location.name(),
      location_description: this.location.description(),
    });
    this.theEnd = true;
  }


  wander(){
    let newLocation = oneof( this.location.things(type.container) );
    if(newLocation){
      this.wanderGoto( newLocation );
    }else{
      this.wanderEnd();
    }
  }


  look(){

    let things = this.location.things( type.thing );

    if(things.length > 0){
      let itemToInspect = oneof( things );
      let data = {
        actor_name: this.name(),
        actor_description: this.description(),

        item_name:itemToInspect.name(),
        item_description:itemToInspect.description(),
        location_name: this.location.name(),
        location_description: this.location.description(),
      };
      if(itemToInspect) itemToInspect.emit('discovery', data);
      things.map(i=>i.emit('proximity', data))

    }
  }

  enter( location ) {
    this.location = location;

    let data = {

      actor_name: this.name(),
      actor_description: this.description(),

      location_name: this.location.name(),
      location_description: this.location.description(),

    };

    this.emit('start', data);
    console.log("");

    this.location.emit('enter', data);
  }

  move(){
    this.look();
    this.wander();
    console.log("")
    return !this.theEnd;
  }

}

class Item extends Containment { constructor(options) { super(options) } }
class Action extends Containment { constructor(options) { super(options) } }
class Actor extends Containment { constructor(options) { super(options) } }
class Player extends Entity { constructor(options) { super(options) } }
class Room  extends Location { constructor(options) { super(options) } }
class Universe  extends Location { constructor(options) { super(options) } }
class Container  extends Location { constructor(options) { super(options) } }



module.exports = {as:type, Universe, Player, Actor, Room, Item, Location, Container, Action };
