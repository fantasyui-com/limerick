let measure = 4;
let measured = 0;

const oneof = require('oneof');
const EventEmitter = require('events');
class Time extends EventEmitter {}
const time = new Time();
const existence = setInterval(()=>{
  time.emit('tick');

  measured++;

  if(measured === measure){
    console.log("");
    measured=0;
  }

},1)

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

class Being {

  constructor(name) {
    this.name = name;

    this.titles = [
      '%s into the fabric of %s',
      '%s in %s',
      '%s lost to %s',
    ]

    this.items = [
      'Thnking of %s helps us understand',
      'Understanding %s finds us wanting',
      'Within the year %s helps us see',
      'Overnight %s fills us with light',
    ]

    this.motions = [
      'Leaving %s we step into %s',
      'Flying out of %s we glide together into %s',
      'Escaping %s we slide into %s',
      'Falling asleep in %s we come to awaken inside %s',
    ];

    this.ends = [
      'And we rest quietly in %s',
      'And we are reborn in %s',
      'And we find adventure in %s',
      'And none have come to visit %s',
    ];

  }

  goto(location){
    console.log(oneof(this.motions), this.location.description() , location.description());
      this.location = location;

  }
  description(){
    console.log(this.location.description());
  }
  end(){
    console.log(oneof(this.ends), this.location.description());
    clearInterval(existence);
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

    console.log( oneof(this.items), itemToInspect.description() );
    }

  }



  enterInto( location ) {

    this.location = location;

    console.log(oneof(this.titles) + '\n', this.name , this.location.name());

    time.on('tick', () => {
      this.look();
      this.wander();
      console.log("")

    });
  }

}

class Room extends Location {}


// PROGRAM //

const wanderer = new Being('Wanderers');

const universe = new Room(
  ['Universe', 'Existence'],
  ['fabric of time', 'all the worlds combined']
);

const light = new Room(
  ['Light', 'The Sun and the Moon'],
  [ 'a brightly lit orb', 'throbbing light', 'the light of us', ]
);

const sea = new Room(
  ['Infinity', 'Sea'],
  [ 'infinity of eden', 'endless horizon', 'infinite starscape', 'final frontier' ]
);

const love = new Item(
  ['Love', 'Heart and Soul'],
  [ 'the music of the spheres', 'the wanting of forever', 'the dream of a dynasty' ]
);


const land = new Room(
  ['Island', 'Lost City'],
  [ 'place of complexity', 'the base plateau', 'familiar places', 'the streets at night' ]
);

const forest = new Room(
  ['Familiar', 'Grand'],
  [ 'a place of learning', 'source of understanding', 'tree of knowledge', 'castle of trees' ]
);

universe.has(love);
universe.contains(light);
universe.contains(sea);
sea.contains(land);
sea.has(love);
land.contains(forest);
land.has(love);
forest.has(light);
forest.has(love);
wanderer.enterInto(universe);
