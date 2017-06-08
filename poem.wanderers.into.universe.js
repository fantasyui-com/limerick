const { Actor, Room, Item, Location } = require(__dirname+'/index.js');


const language = {

  poemTitles: [
    /* note the elongated structure of title [actor(s) [motion] ... of [location]] */
    '{{actor_name}} falling into the fabric of {{location_name}}',
    '{{actor_name}} falling into the depths of {{location_name}}',
    '{{actor_name}} hidden within the h eights of {{location_name}}',
  ],

  closingLines: [
    'And we rest quietly in {{location_name}}',
    'And we are reborn within {{location_name}}',
    'And we find adventure in {{location_name}}',
    'And none will come to visit {{location_name}} again.',
  ],

  itemInteractions: [
    'Thinking of {{item_name}} helps us understand',
    'Understanding {{item_name}} finds us wanting',
    'Within the year {{item_name}} helps us see',
    'Overnight {{item_name}} fills us with light',
  ],

  locationTransitions: [
    'Leaving {{location_name}} we step into {{destination_name}}',
    'We fly out of {{location_name}} together',
    'We glide together into {{destination_name}}',
    'Escaping {{location_name}} we slide into {{destination_name}}',
    'Falling asleep in {{location_name}} we come to awaken inside {{destination_name}}',
  ],

};

const wanderer = new Actor(
  ['wanderers', 'adventurers', 'thinkers'],
  ['beings of light', 'lovers of night'],
  {language},
);

const universe = new Room(
  ['universe', 'existence'],
  ['fabric of time', 'all the worlds combined']
);

const light = new Room(
  ['light', 'the sun and the moon'],
  [ 'a brightly lit orb', 'throbbing light', 'the light of us', ]
);

const sea = new Room(
  ['infinity', 'sea'],
  [ 'infinity of eden', 'endless horizon', 'infinite starscape', 'final frontier' ]
);

const love = new Item(
  ['love', 'heart and soul'],
  [ 'the music of the spheres', 'the wanting of forever', 'the dream of a dynasty' ]
);

const land = new Room(
  ['island', 'lost city'],
  [ 'place of complexity', 'the base plateau', 'familiar places', 'the streets at night' ]
);

const forest = new Room(
  ['familiar', 'grand'],
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

while(wanderer.move()){}
