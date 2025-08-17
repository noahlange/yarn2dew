import type { YSLSCommand } from './types';

const commands: YSLSCommand[] = [
  {
    YarnName: '$',
    Documentation: 'Invoke a built-in command with the given name and args.',
    Parameters: [
      { Name: 'command', Type: 'string' },
      { Name: 'parameters', Type: 'any', IsParamsArray: true }
    ]
  },
  {
    YarnName: 'action',
    Parameters: [
      { Name: 'trigger', Type: 'string' },
      { Name: 'parameters', Type: 'any', IsParamsArray: true }
    ]
  },
  {
    YarnName: 'addBigProp',
    Documentation:
      'Adds an object at the specified tile from the TileSheets/Craftables.png sprite sheet.',
    Parameters: [
      { Name: 'x', Type: 'number' },
      { Name: 'y', Type: 'number' },
      { Name: 'object', Type: 'string' }
    ]
  },
  {
    YarnName: 'addConversationTopic',
    Documentation:
      'Starts a conversation topic with the given ID and day length (or 4 days if no length given). Setting length as 0 will have the topic last only for the current day.',
    Parameters: [
      { Name: 'id', Type: 'string' },
      { Name: 'length', Type: 'number' }
    ]
  },
  {
    YarnName: 'addCookingRecipe',
    Documentation: 'Adds the specified cooking recipe to the player.',
    Parameters: [{ Name: 'recipe', Type: 'string' }]
  },
  {
    YarnName: 'addCraftingRecipe',
    Documentation: 'Adds the specified crafting recipe to the player.',
    Parameters: [{ Name: 'recipe', Type: 'string' }]
  },
  {
    YarnName: 'addFloorProp',
    Documentation:
      'Add a non-solid prop from the current festival texture. Default solid width/height is 1. Default display height is solid height.',
    Parameters: [
      { Name: 'id', Type: 'string' },
      { Name: 'x', Type: 'number' },
      { Name: 'y', Type: 'number' },
      { Name: 'solidWidth', Type: 'number', DefaultValue: '1' },
      { Name: 'solidHeight', Type: 'number', DefaultValue: '1' },
      { Name: 'displayHeight', Type: 'number', DefaultValue: '1' }
    ]
  },
  {
    YarnName: 'addItem',
    Documentation: 'Adds the specified cooking recipe to the player.',
    Parameters: [
      { Name: 'item_id', Type: 'string' },
      { Name: 'count', Type: 'number', DefaultValue: '1' },
      { Name: 'quality', Type: 'number', DefaultValue: '0' }
    ]
  },
  {
    YarnName: 'addLantern',
    Documentation: 'Adds the specified cooking recipe to the player.',
    Parameters: [
      { Name: 'row_in_texture', Type: 'number' },
      { Name: 'x', Type: 'number' },
      { Name: 'y', Type: 'number' },
      { Name: 'radius', Type: 'number' }
    ]
  },
  {
    YarnName: 'addObject',
    Documentation: 'Adds the specified cooking recipe to the player.',
    Parameters: [
      { Name: 'x', Type: 'number' },
      { Name: 'y', Type: 'number' },
      { Name: 'item_id', Type: 'string' },
      { Name: 'layer', Type: 'number', DefaultValue: '-1' }
    ]
  },
  {
    YarnName: 'addProp',
    Documentation: 'Adds the specified cooking recipe to the player.',
    Parameters: [
      { Name: 'prop_index', Type: 'number' },
      { Name: 'x', Type: 'number' },
      { Name: 'y', Type: 'number' },
      { Name: 'solid_width', Type: 'number', DefaultValue: '1' },
      { Name: 'solid_height', Type: 'number', DefaultValue: '1' },
      { Name: 'display_height', Type: 'number', DefaultValue: '1' }
    ]
  },
  {
    YarnName: 'addQuest',
    Documentation: 'Add the specified quest to the quest log.',
    Parameters: [{ Name: 'quest_id', Type: 'string' }]
  },
  {
    YarnName: 'addSpecialOrder',
    Documentation:
      'Add a special order to the player team. This affects all players, since special orders are shared.',
    Parameters: [{ Name: 'order_id', Type: 'string' }]
  },
  {
    YarnName: 'addTemporaryActor',
    Documentation: 'Add a temporary actor.',
    Parameters: [
      {
        Name: 'sprite_asset_name',
        Type: 'string',
        Documentation:
          "Name of the sprite to add (e.g., Ghost). Underscores in the asset name are now only replaced with spaces if an exact match wasn't found"
      },
      { Name: 'sprite_width', Type: 'number' },
      { Name: 'sprite_height', Type: 'number' },
      { Name: 'tile_x', Type: 'number' },
      { Name: 'tile_y', Type: 'number' },
      { Name: 'direction', Type: 'number' },
      { Name: 'breather', Type: 'boolean', DefaultValue: 'true' },
      {
        Name: 'type',
        Type: 'string',
        DefaultValue: 'actor',
        Documentation: 'Character/Animal/Monster'
      },
      {
        Name: 'override_name',
        Type: 'string'
      }
    ]
  },
  {
    YarnName: 'animate',
    Parameters: [
      { Name: 'actor', Type: 'string' },
      { Name: 'flip_x', Type: 'bool' },
      { Name: 'loop', Type: 'bool' },
      { Name: 'duration', Type: 'number' },
      { Name: 'frames', Type: 'number', IsParamsArray: true }
    ]
  },
  { YarnName: 'beginSimultaneousCommand', Parameters: [] },
  {
    YarnName: 'changeLocation',
    DefinitionName: 'ChangeLocation',
    Parameters: [{ Name: 'location', Type: 'string' }]
  },
  {
    YarnName: 'changePortrait',
    Parameters: [
      { Name: 'actor', Type: 'string' },
      {
        Name: 'portrait',
        Type: 'string',
        DefaultValue: 'void',
        Documentation: 'Portrait to use; empty to reset.'
      }
    ]
  },
  {
    YarnName: 'changeSprite',
    Parameters: [
      { Name: 'actor', Type: 'string' },
      {
        Name: 'sprite',
        Type: 'string',
        DefaultValue: 'void',
        Documentation: 'Overworld sprite to use; empty to reset.'
      }
    ]
  },
  {
    YarnName: 'cutscene',
    Parameters: [{ Name: 'Cutscene ID', Type: 'string' }]
  },
  {
    YarnName: 'doAction',
    Documentation:
      'Acts as if the player had clicked the specified x/y coordinate and triggers any relevant action.',
    Parameters: [
      { Name: 'x', Type: 'number' },
      { Name: 'y', Type: 'number' }
    ]
  },
  {
    YarnName: 'dump',
    Documentation:
      'Starts the special "cold shoulder" and "second chance" dialogue events for the given group',
    Parameters: [
      {
        Name: 'group',
        Type: 'string',
        Documentation: 'Women if group is `girls`, otherwise men.'
      }
    ]
  },
  {
    YarnName: 'emote',
    Documentation:
      "Make the given NPC name perform an emote, which is a little icon shown above the NPC's head.",
    Parameters: [
      { Name: 'actor', Type: 'string' },
      { Name: 'emote', Type: 'number' },
      {
        Name: 'continue',
        Type: 'boolean',
        Documentation: 'If true, the next command will play out immediately.',
        DefaultValue: 'false'
      }
    ]
  },
  {
    YarnName: 'end',
    Documentation:
      'Ends the current event by fading out, then resumes the game world and places the player on the square where they entered the zone. All end parameters do this by default unless otherwise stated.',
    Parameters: []
  },
  {
    YarnName: 'end bed',
    Documentation:
      'Same as end, but warps the player to the x/y coordinate of their most recent bed. This does not warp them to the farmhouse, only to the x/y coordinate of the bed regardless of map.',
    Parameters: []
  },
  {
    YarnName: 'end beginGame',
    Documentation:
      'Used only during the introduction sequence in the bus stop event. It sets the game mode to playingGameMode, warps the player to the farmhouse (9, 9), ends the current event, and starts a new day.',
    Parameters: []
  },
  {
    YarnName: 'end credits',
    Documentation:
      'Not used in any normal events. Clears debris weather, changes the music to wedding music, sets game mode to creditsMode and ends the current event.',
    Parameters: []
  },
  {
    YarnName: 'end dialogue',
    Documentation:
      'Same as end, and additionally clears the existing NPC dialogue for the day and replaces it with the line(s) specified at the end of the command.',
    Parameters: [
      { Name: 'actor', Type: 'string' },
      { Name: 'text', Type: 'string' }
    ]
  },
  {
    YarnName: 'end dialogueWarpOut',
    Documentation: 'See `end dialogue` and `end warpOut`.',
    Parameters: [
      { Name: 'actor', Type: 'string' },
      { Name: 'text', Type: 'string' }
    ]
  },
  {
    YarnName: 'end invisible',
    Documentation:
      'Same as end, and additionally turns the specified NPC invisible (cannot be interacted with until the next day).',
    Parameters: [{ Name: 'actor', Type: 'string' }]
  },
  {
    YarnName: 'end invisibleWarpOut',
    Documentation: 'See end invisible and end warpOut.',
    Parameters: [{ Name: 'actor', Type: 'string' }]
  },
  {
    YarnName: 'end newDay',
    Documentation:
      'Ends both the event and the day (warping player to their bed, saving the game, selling everything in the shipping box, etc).',
    Parameters: []
  },
  {
    YarnName: 'end position',
    Documentation:
      'Same as end, and additionally warps the player to the map coordinates specified in x y.',
    Parameters: [
      { Name: 'x', Type: 'number' },
      { Name: 'y', Type: 'number' }
    ]
  },
  {
    YarnName: 'end warpOut',
    Documentation:
      'Same as end, and additionally finds the first warp out of the current location (second warp if male and in the bathhouse), and warps the player to its endpoint.',
    Parameters: []
  },
  {
    YarnName: 'end wedding',
    Documentation:
      "Used only in the hardcoded wedding event. Changes the character's clothes back to normal, updates Lewis' post-event chat and warps the player to their farm",
    Parameters: []
  },
  { YarnName: 'endSimultaneousCommand', Parameters: [] },
  {
    YarnName: 'eventSeen',
    Parameters: [
      { Name: 'event_id', Type: 'string' },
      { Name: 'seen', Type: 'boolean', DefaultValue: 'true' }
    ]
  },
  {
    YarnName: 'eyes',
    Documentation: "Change the player's eyes.",
    Parameters: [
      {
        Name: 'eyes',
        Type: 'number',
        Documentation: 'Integer from 0—5 (open, closed, right, left, half closed, wide open).'
      },
      {
        Name: 'blink',
        Type: 'number',
        DefaultValue: '-1000',
        Documentation: 'Blink is a timer that is represented with a negative number. '
      }
    ]
  },
  {
    YarnName: 'faceDirection',
    Parameters: [
      { Name: 'actor', Type: 'string' },
      { Name: 'direction', Type: 'number' },
      { Name: 'continue', Type: 'boolean', DefaultValue: 'false' }
    ]
  },
  {
    YarnName: 'fade',
    Parameters: [{ Name: 'unfade', Type: 'Boolean', DefaultValue: 'true' }]
  },
  {
    YarnName: 'farmerEat',
    Documentation:
      'Make the player eat an object. (The farmer actually does eat the object, so buffs will apply, healing will occur, etc.). ',
    Parameters: [
      {
        Name: 'object_id',
        Type: 'string',
        Documentation:
          "If object's IsDrink is True, the drinking animation will play instead of the eating one."
      }
    ]
  },
  {
    YarnName: 'fork',
    Parameters: [{ Name: 'Fork name', Type: 'string' }]
  },
  {
    YarnName: 'friendship',
    Parameters: [
      { Name: 'actor', Type: 'string' },
      { Name: 'amount', Type: 'number' }
    ]
  },
  {
    YarnName: 'globalFade',
    Parameters: [
      { Name: 'speed', Type: 'number', DefaultValue: '0.007' },
      {
        Name: 'continue',
        Type: 'bool',
        DefaultValue: 'false',
        Documentation: 'Continue executing the event during the fade.'
      }
    ]
  },
  {
    YarnName: 'globalFadeToClear',
    Parameters: [
      { Name: 'speed', Type: 'number', DefaultValue: '0.007' },
      {
        Name: 'continue',
        Type: 'bool',
        DefaultValue: 'false',
        Documentation: 'Continue executing the event during the fade.'
      }
    ]
  },
  {
    YarnName: 'glow',
    Parameters: [
      { Name: 'r', Type: 'number' },
      { Name: 'g', Type: 'number' },
      { Name: 'b', Type: 'number' },
      {
        Name: 'hold',
        Type: 'boolean',
        Documentation: 'If true, will fade to and hold that color until stopGlowing is used'
      }
    ]
  },
  {
    YarnName: 'halt',
    Documentation: 'Make everyone stop.',
    Parameters: []
  },
  {
    YarnName: 'hideShadow',
    Documentation: 'Hide shadow of the named actor.',
    Parameters: [
      { Name: 'actor', Type: 'string' },
      { Name: 'hide', Type: 'boolean', Documentation: 'True to hide, false to unhide.' }
    ]
  },
  {
    YarnName: 'hospitaldeath',
    Documentation: 'Forces you to lose money and items, pulls up the dialogue box with Harvey.',
    Parameters: []
  },
  {
    YarnName: 'ignoreCollisions',
    Documentation:
      "Make a character ignore collisions when moving for the remainder of the event. For example, they'll walk through walls if needed to reach their destination.",
    Parameters: [{ Name: 'actor', Type: 'string' }]
  },
  {
    YarnName: 'loopSound',
    Parameters: [
      { Name: 'sound', Type: 'string' },
      { Name: 'duration', Type: 'number' }
    ]
  },
  {
    YarnName: 'loopSoundStop',
    Parameters: [{ Name: 'sound', Type: 'string' }]
  },
  {
    YarnName: 'mail',
    Parameters: [{ Name: 'name', Type: 'string' }]
  },
  {
    YarnName: 'money',
    Documentation: 'Adds/removes the specified amount of money.',
    Parameters: [{ Name: 'amount', Type: 'number' }]
  },
  {
    YarnName: 'move',
    Documentation:
      "Make a named NPC move by the given tile offset from their current position (along one axis only), and face the given direction when they're done. ",
    Parameters: [
      { Name: 'actor', Type: 'string' },
      { Name: 'x', Type: 'number' },
      { Name: 'y', Type: 'number' },
      { Name: 'd', Type: 'number' },
      { Name: 'continue', Type: 'boolean', DefaultValue: 'false' }
    ]
  },
  {
    YarnName: 'pause',
    Language: 'text',
    Documentation: 'Pause for `duration` ms before continuing.',
    Signature: 'Pause(int duration)',
    Parameters: [
      {
        Name: 'duration',
        Type: 'number',
        Documentation: 'Number of ms to pause before continuing.'
      }
    ]
  },
  {
    YarnName: 'playSound',
    Parameters: [{ Name: 'sound', Type: 'string' }]
  },
  {
    YarnName: 'playMusic',
    Parameters: [{ Name: 'track', Type: 'string', Documentation: 'Music track ID.' }]
  },
  {
    YarnName: 'showFrame',
    Parameters: [
      { Name: 'actor', Type: 'string' },
      { Name: 'frame', Type: 'number' }
    ]
  },
  {
    YarnName: 'screenFlash',
    Documentation: 'Flashes the screen white for an instant.',
    Parameters: [
      {
        Name: 'count',
        Type: 'number',
        Documentation:
          'An alpha value from 0 to 1 adjusts the brightness, and values from 1 and out flashes pure white for x seconds.'
      }
    ]
  },
  {
    YarnName: 'setRunning',
    Documentation: 'Set the player as running.',
    Parameters: []
  },
  {
    YarnName: 'shake',
    Parameters: [
      { Name: 'actor', Type: 'string' },
      { Name: 'duration', Type: 'number' }
    ]
  },
  {
    YarnName: 'showFrame',
    Parameters: [
      { Name: 'actor', Type: 'string' },
      { Name: 'frame_id', Type: 'number' }
    ]
  },
  {
    YarnName: 'skippable',
    Documentation: 'Mark an event as skippable.',
    Parameters: []
  },
  {
    YarnName: 'speak',
    Parameters: [
      { Name: 'speaker', Type: 'string' },
      {
        Name: 'Value',
        Type: 'string',
        Documentation: 'Either a text literal or i18n string.'
      }
    ]
  },
  {
    YarnName: 'specificTemporarySprite',
    Parameters: [
      { Name: 'track', Type: 'string', Documentation: 'Music track ID.' },
      { Name: 'args', Type: 'string', IsParamsArray: true }
    ]
  },
  {
    YarnName: 'speed',
    Parameters: [
      { Name: 'actor', Type: 'string' },
      {
        Name: 'speed',
        Type: 'number'
      }
    ]
  },
  {
    YarnName: 'startJittering',
    Documentation: 'Make the player start jittering.',
    Parameters: []
  },
  {
    YarnName: 'stopAnimation farmer',
    Documentation: "Stop the farmer's current animation.",
    Parameters: []
  },
  {
    YarnName: 'stopAnimation',
    Documentation: "Stop the named NPC's current animation. Not applicable to the farmer.",
    Parameters: [{ Name: 'actor', Type: 'string' }]
  },
  {
    YarnName: 'stopGlowing',
    Documentation: 'Make the screen stop glowing.',
    Parameters: []
  },
  {
    YarnName: 'stopSound',
    Parameters: [
      { Name: 'sound ID', Type: 'string' },
      { Name: 'immediate', Type: 'bool', DefaultValue: 'true' }
    ]
  },
  {
    YarnName: 'switchEvent',
    Parameters: [{ Name: 'Event name', Type: 'string' }]
  },
  {
    YarnName: 'temporarySprite',
    Parameters: [
      { Name: 'x', Type: 'number' },
      { Name: 'y', Type: 'number' },
      { Name: 'rowInTexture', Type: 'number' },
      { Name: 'animationLength', Type: 'number' },
      { Name: 'animationInterval', Type: 'number' },
      { Name: 'flipped', Type: 'boolean' },
      { Name: 'layerDepth', Type: 'number' }
    ]
  },
  {
    YarnName: 'textAboveHead',
    Parameters: [
      { Name: 'actor', Type: 'string' },
      { Name: 'text', Type: 'string' }
    ]
  },
  {
    YarnName: 'tossConcession',
    Documentation:
      'Causes an NPC to throw their concession in the air. concessionId is from Data/Concessions.',
    Parameters: [
      { Name: 'actor', Type: 'string' },
      { Name: 'concession_id', Type: 'string' }
    ]
  },
  {
    YarnName: 'translateName',
    Documentation:
      'Set the display name for an NPC in the event to match the given translation key.',
    Parameters: [
      { Name: 'actor', Type: 'string' },
      { Name: 'translation_key', Type: 'string' }
    ]
  },
  {
    YarnName: 'tutorialMenu',
    Documentation: 'Show the tutorial menu if no other menu is open.',
    Parameters: []
  },
  {
    YarnName: 'viewport move',
    Documentation:
      'Pan the the camera in the direction (and with the velocity) defined by x/y for the given duration in milliseconds.',
    Parameters: [
      { Name: 'x', Type: 'number' },
      { Name: 'y', Type: 'number' },
      { Name: 'duration', Type: 'number', Documentation: 'movement duration' }
    ]
  },
  {
    YarnName: 'viewport',
    Parameters: [
      { Name: 'x', Type: 'number' },
      { Name: 'y', Type: 'number' }
    ]
  },
  {
    YarnName: 'waitForAllStationary',
    Parameters: []
  },
  {
    YarnName: 'waitForOtherPlayers',
    Parameters: []
  },
  {
    YarnName: 'warp',
    Parameters: [
      { Name: 'actor', Type: 'string' },
      { Name: 'x', Type: 'number' },
      { Name: 'y', Type: 'number' },
      { Name: 'continue', Type: 'bool', DefaultValue: 'false' }
    ]
  },
  {
    YarnName: 'when',
    Documentation: 'Adds a condition to the event key string.',
    Parameters: [
      { Name: 'Condition', Type: 'string' },
      { Name: 'Parameters', Type: 'any', IsParamsArray: true }
    ]
  }
];

export default commands;
