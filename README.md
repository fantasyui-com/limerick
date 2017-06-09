# limerick
Limerick is a Poem Generator driven by a standard OOP description language.
The language is inspired by text adventure games. A virtual being is sent
down the world of your own imagination making observations and interacting
with objects you define within.

The following is a snippet out of a poem about a little universe filled
with light and love, and land; and forrest. Resulting Poems follow bellow.

```JavaScript

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

```

Version two introduces a stand-alone motion expression object with named variables:

```JavaScript

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

```

## Interesting Examples

### Version 2

#### Bird Enters Universe

    Bird has left infinite universe and entered infinite peace

    Journey ends with infinite peace slowly fading away.

#### Lunk Enters Gym

    Lunk finds Pull Up Bar
    Leaving gym and entering restroom

    Lunk finds toilet
    Journey ends in restroom

#### Robot Enters Universe

    Robot finds nothing
    Leaving infinite universe and entering infinite universe

    Robot finds nothing
    Leaving infinite universe and entering infinite universe

    Robot finds nothing
    Leaving infinite universe and entering infinite universe

    Robot finds nothing
    Leaving infinite universe and entering infinite universe

    Robot finds nothing
    Leaving infinite universe and entering quiet lobby

    Robot finds powerful battery
    Journey ends in quiet lobby

#### Wanderers Falling Into The Fabric Of Universe

    Within the year the music of the spheres helps us see
    Falling asleep in all the worlds combined we come to awaken inside throbbing light

    And none will come to visit a brightly lit orb again.

#### Wanderers Falling Into The Depths Of Existence

    Thinking of the wanting of forever helps us understand
    Falling asleep in fabric of time we come to awaken inside final frontier

    Understanding the music of the spheres finds us wanting
    We fly out of final frontier together

    Understanding the music of the spheres finds us wanting
    Leaving the base plateau we step into source of understanding

    Overnight a brightly lit orb fills us with light
    And none will come to visit castle of trees again.

#### Adventurers Hidden Within The Heights Of Existence

    Thinking of the music of the spheres helps us understand
    And none will come to visit all the worlds combined again.

### Version 1

#### Wanderers in Existence

    Overnight the music of the spheres fills us with light
    Escaping all the worlds combined we slide into infinite starscape

    Overnight the wanting of forever fills us with light
    Escaping infinite starscape we slide into the base plateau

    Within the year the dream of a dynasty helps us see
    Leaving place of complexity we step into tree of knowledge

    Within the year the light of us helps us see
    And none have come to visit tree of knowledge

#### Escape

    Escaping all the worlds combined we slide into infinity of eden
    And we rest deep in final frontier

#### Wanderers in fabric of time

    Flying out of fabric of time we glide together into throbbing light
    And we are reborn in throbbing light

#### Wanderers in Universe

    Falling asleep in fabric of time we come to awaken inside endless horizon
    And we are reborn in infinity of eden

#### Wanderers in Existence

    the music of the spheres helps us see
    Flying out of fabric of time we glide together into endless horizon
    Flying out of infinity of eden we glide together into place for anchor
    Escaping place for anchor we slide into castle of trees
    the light of us fills us with light
    And we are reborn in source of understanding

#### Wanderers into the fabric of Universe

    the music of the spheres fills us with light
    Leaving all the worlds combined we step into infinite starscape
    the music of the spheres finds us wanting
    Leaving infinite starscape we step into the base plateau
    the music of the spheres fills us with light
    Flying out of the streets at night we glide together into source of understanding
    a brightly lit orb fills us with light
    And we are reborn in castle of trees

### Beta Version (Failed Experiments)

#### I Enters Woods

I finds horse
Leaving dark and deep woods and entering frozen lake

Journey ends in frozen lake
