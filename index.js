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
const as = type;



class Containment {
  constructor() {
    this.thingsList = [];
  }

  join(item, type) {
    this.thingsList.push({item, type});
  }

  things(type) {
    let filtered = filter(this.thingsList, {type});
    if(filtered){
      let response = filtered.map(i=>i.item);
      //console.log(response);
      return response;
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
    this.templateOptions = {interpolate: /{{([\s\S]+?)}}/g };
    this.names = names;
    this.descriptions = descriptions;
    if(options){
      if(options.language){
        this.poemTitles = options.language.poemTitles.map( i=> template(i,this.templateOptions) );
        this.closingLines = options.language.closingLines.map( i=> template(i,this.templateOptions) );
        this.itemInteractions = options.language.itemInteractions.map( i=> template(i,this.templateOptions) );
        this.locationTransitions = options.language.locationTransitions.map( i=> template(i,this.templateOptions) );
      }
    }
  }

  name(){
    return oneof(this.names);
  }

  description(){
    return oneof(this.descriptions);
  }

  goto(location){

    let locationTransition = oneof(this.locationTransitions)({
      actor_name: this.name(),
      location_name: this.location.description(),
      destination_name: location.description(),
    });
    console.log(locationTransition);
    this.location = location;
  }

  description(){
    console.log(this.location.description());
  }

  end(){

    console.log(oneof(this.closingLines)({
      actor_name: this.name(),
      location_name: this.location.description()
    }));

    this.theEnd = true;
  }

  wander(){
    let newLocation = oneof( this.location.things(type.container) );
    //console.log('newLocation', newLocation)
    if(newLocation){
      this.goto( newLocation );
    }else{
      this.end();
    }
  }

  look(){

    let itemToInspect = oneof( this.location.things( type.thing ) );

     //let itemToInspect = oneof( this.location.items );

    if(itemToInspect) {
    console.log( oneof(this.itemInteractions)({
      actor_name: this.name(),
      item_name:itemToInspect.description(),
      location_name: this.location.name(),
    }) );
    }
  }

  enter( location ) {
    this.location = location;
    let title = oneof(this.poemTitles)({
      actor_name: this.name(),
      location_name: this.location.name(),
    });
    title = startCase(title);
    console.log(title + "\n");
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



module.exports = {as, Universe, Player, Actor, Room, Item, Location, Container, Action };
