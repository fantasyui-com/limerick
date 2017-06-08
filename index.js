const { Actor, Room, Item, Location } = require('./library.js');


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
  ['robot'],
  ['happy robot'],
  {language},
);

const universe = new Room( ['universe'], ['infinite universe'] );



actor.enterInto(universe);

while(actor.move()){}
