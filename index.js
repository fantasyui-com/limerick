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

class Eventing {

  constructor() {
    this.templateOptions = {interpolate: /{{([\s\S]+?)}}/g };

    this.eventingData = {};
  }

  on(event, messages){
    if (!this.eventingData[event]) this.eventingData[event] = [];
    this.eventingData[event] = this.eventingData[event].concat(messages.map( i=>i.replace(/(\{\{[a-z]+) ([a-z]+\}\})/g, '$1_$2')).map( i=> template(i,this.templateOptions)));
    //console.log( this.names, this.eventingData  )
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
  constructor() {
    super();
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





class Item extends Containment {
  constructor(names, descriptions) {
    super()
    this.names = names;
    this.descriptions = descriptions;
  }
  name(){
    return oneof(this.names);
  }
  description(){
    return oneof(this.descriptions);
  }
}



class Action extends Containment {
  constructor(names, descriptions) {
    super()
    this.names = names;
    this.descriptions = descriptions;
  }
  name(){
    return oneof(this.names);
  }
  description(){
    return oneof(this.descriptions);
  }
}

class Actor extends Containment {
  constructor(names, descriptions) {
    super()
    this.names = names;
    this.descriptions = descriptions;
  }
  name(){
    return oneof(this.names);
  }
  description(){
    return oneof(this.descriptions);
  }
}






class Location extends Containment {

  constructor(names,descriptions) {
    super()
    this.names = names;
    this.descriptions = descriptions;
    this.locations = [];
    this.items = [];

  }

  name(){
    return oneof(this.names);
  }

  description(){
    return oneof(this.descriptions);
  }

  contains(location) {
    this.locations.push(location);
  }

  has(item) {
    this.items.push(item);
  }





}






class Entity extends Containment {

  constructor(names, descriptions, options) {

    super()
    this.theEnd = false;
    this.names = names;
    this.descriptions = descriptions;

  }

  name(){
    return oneof(this.names);
  }

  description(){
    return oneof(this.descriptions);
  }

  goto(location){

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

  end(){
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
      this.goto( newLocation );
    }else{
      this.end();
    }
  }

  look(){
    let itemToInspect = oneof( this.location.things( type.thing ) );
    if(itemToInspect) {
      itemToInspect.emit('discovery', {

        actor_name: this.name(),
        actor_description: this.description(),

        item_name:itemToInspect.name(),
        item_description:itemToInspect.description(),

        location_name: this.location.name(),
        location_description: this.location.description(),

      });
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


class Player extends Entity   {}
class Room  extends Location {}
class Universe  extends Location {}
class Container  extends Location {}



module.exports = {as:type, Universe, Player, Actor, Room, Item, Location, Container, Action };
