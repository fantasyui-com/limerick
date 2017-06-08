const { Actor, Room, Item, Location } = require(__dirname+'/index.js');
const oneof = require('oneof');


const language = {

  poemTitles: [
    '{{actor_name}} enters {{location_name}}',
  ],


  itemInteractions: [
    '{{actor_name}} finds {{item_name}}',
  ],

  locationTransitions: [
    '{{actor_name}} has left {{location_name}} and entered {{destination_name}}',
  ],

  closingLines: [
    'Journey ends with {{location_name}} slowly fading away.',
  ],

};

const actor = oneof([
  new Actor(['bird'],  ['rebelious bird'], {language}),
  //new Actor(['robot'], ['happy robot'], {language}),
  //new Actor(['seed'],  ['world seed'], {language}),
]);


const universe = new Room( ['universe'], ['infinite universe'] );
const peace = new Room( ['peace'], ['infinite peace'] );
universe.contains(peace);


actor.enterInto(universe);

while(actor.move()){}
