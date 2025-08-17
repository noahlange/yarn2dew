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
    YarnName: 'emote',
    Parameters: [
      { Name: 'actor', Type: 'string' },
      { Name: 'emote', Type: 'number' }
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
    YarnName: 'move',
    Parameters: [
      { Name: 'actor', Type: 'string' },
      { Name: 'x', Type: 'number' },
      { Name: 'y', Type: 'number' },
      { Name: 'd', Type: 'number' }
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
    Parameters: [{ Name: 'count', Type: 'number' }]
  },
  {
    YarnName: 'shake',
    Parameters: [
      { Name: 'actor', Type: 'string' },
      { Name: 'duration', Type: 'number' }
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
    YarnName: 'stopAnimation',
    Parameters: [{ Name: 'actor', Type: 'string' }]
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
  },
  {
    YarnName: 'viewport',
    Parameters: [
      { Name: 'x', Type: 'number' },
      { Name: 'y', Type: 'number' }
    ]
  }
];

export default commands;
