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

const lunk = new Actor(
  ['Lunk'],
  ['Ricky the Lunk'],
  {language},
);

const gym = new Room( ['gym'], ['gym'] );
const restroom = new Room( ['restroom'], ['restroom'] );
const toilet = new Item( ['toilet'], ['toilet'] );

gym.contains(restroom);
restroom.has(toilet);

['Squat Station', 'Barbells', 'Bench Press', 'Incline Bench Press', 'Hammer Strength machine', 'Cables and Pulleys', 'Dumb Bells', 'Pull Up Bar', 'Lat Pull Down Machine', 'Leg Extension Machine', 'Leg Curl Machine', 'Hyper Extension Bench', 'Dipping Bars', 'Smith Machine', 'Rowing Machine', 'Glute Ham Developer', 'Preacher Bench', 'Abdominal Bench', 'Leg Press machine', 'Hack Squat Machine', 'Calf Machines', 'Leg Adduction / Abduction Machine', 'Pec Deck Machine', 'Kettle Bells',]
.forEach(i=>gym.has( new Room( [i], [i] ) ) )

lunk.enter(gym);

while(lunk.move()){}
