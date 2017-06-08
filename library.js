const template = require('lodash/template');
const startCase = require('lodash/startCase');
const oneof = require('oneof');

class Item {
  constructor(names, descriptions) {
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

class Location {

  constructor(names,descriptions) {
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





class Actor {

  constructor(names, descriptions, options) {
    this.theEnd = false;
    this.templateOptions = {interpolate: /{{([\s\S]+?)}}/g };

    this.names = names;
    this.descriptions = descriptions;

    this.poemTitles = options.language.poemTitles.map( i=> template(i,this.templateOptions) );
    this.closingLines = options.language.closingLines.map( i=> template(i,this.templateOptions) );
    this.itemInteractions = options.language.itemInteractions.map( i=> template(i,this.templateOptions) );
    this.locationTransitions = options.language.locationTransitions.map( i=> template(i,this.templateOptions) );

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
    let newLocation = oneof( this.location.locations );
    if(newLocation){
      this.goto( newLocation );
    }else{
      this.end();
    }
  }

  look(){
    let itemToInspect = oneof( this.location.items );
    if(itemToInspect) {

    console.log( oneof(this.itemInteractions)({
      actor_name: this.name(),
      item_name:itemToInspect.description(),
      location_name: this.location.name(),
    }) );
    }

  }

  enterInto( location ) {
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


class Room extends Location {}

module.exports = { Actor, Room, Item, Location };
