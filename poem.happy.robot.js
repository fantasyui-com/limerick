const { Actor, Room, Item, Location } = require(__dirname+'/index.js');


const language = {

  poemTitles: [
    '{{actor_name}} enters {{location_name}}',
  ],

  closingLines: [
    'Journey ends in {{location_name}}',
  ],

  itemInteractions: [
    '{{actor_name}} finds {{item_name}}',
  ],

  locationTransitions: [
    'Leaving {{location_name}} and entering {{destination_name}}',
  ],

};

const actor = new Actor(
  ['Robot'],
  ['Happy Robot'],
  {language},
);

const universe = new Room( ['universe'], ['infinite universe'] );
const lobby = new Room( ['lobby'], ['quiet lobby'] );
const battery = new Room( ['battery'], ['powerful battery'] );
const nothing = new Room( ['nothing'], ['nothing'] );

universe.has(nothing);
universe.contains(universe);
universe.contains(lobby);
lobby.has(battery);

actor.enter(universe);

while(actor.move()){}
