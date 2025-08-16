import type { YSLSCommand, YSLSFunction } from './types';

export const commands: YSLSCommand[] = [
  {
    YarnName: 'start',
    Language: 'text',
    Documentation: 'Sets the start position and direction for a character.',
    Parameters: [
      { Name: 'Character', Type: 'string' },
      { Name: 'x', Type: 'number' },
      { Name: 'y', Type: 'number' },
      { Name: 'direction', Type: 'number' }
    ]
  },
  {
    YarnName: 'when',
    Language: 'text',
    Documentation: 'Adds a condition to the event key string.',
    Parameters: [
      { Name: 'Condition', Type: 'string' },
      { Name: 'Parameters', Type: 'any', IsParamsArray: true }
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
    YarnName: 'action',
    Parameters: [
      { Name: 'Trigger', Type: 'string' },
      { Name: 'Parameters', Type: 'any', IsParamsArray: true }
    ]
  },
  {
    YarnName: 'mail',
    Parameters: [{ Name: 'name', Type: 'string' }]
  },
  {
    YarnName: 'showFrame',
    Parameters: [
      { Name: 'character', Type: 'string' },
      { Name: 'frame', Type: 'number' }
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
    YarnName: 'globalFade',
    Language: 'text',
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
    Language: 'text',
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
    YarnName: 'end',
    Language: 'text',
    Parameters: [
      {
        Name: 'keyword',
        Type: 'string',
        DefaultValue: 'null',
        Documentation: 'one of (bed, beginGame, warpOut, invisible, newDay, position <x> <y>)'
      }
    ]
  },
  {
    YarnName: 'cutscene',
    Language: 'text',
    Parameters: [{ Name: 'Cutscene ID', Type: 'string' }]
  },
  {
    YarnName: 'fork',
    Language: 'text',
    Parameters: [{ Name: 'Fork name', Type: 'string' }]
  },
  {
    YarnName: 'switchEvent',
    Language: 'text',
    Parameters: [{ Name: 'Event name', Type: 'string' }]
  },
  {
    YarnName: 'emote',
    Language: 'text',
    Parameters: [
      { Name: 'character', Type: 'string' },
      { Name: 'emote', Type: 'number' }
    ]
  },
  {
    YarnName: 'changeLocation',
    DefinitionName: 'ChangeLocation',
    Language: 'text',
    Parameters: [{ Name: 'Location', Type: 'string' }]
  },
  {
    YarnName: 'playSound',
    Language: 'text',
    Parameters: [{ Name: 'sound', Type: 'string' }]
  },
  {
    YarnName: 'loopSound',
    Language: 'text',
    Parameters: [
      { Name: 'sound', Type: 'string' },
      { Name: 'duration', Type: 'number' }
    ]
  },
  {
    YarnName: 'loopSoundStop',
    Language: 'text',
    Parameters: [{ Name: 'sound', Type: 'string' }]
  },
  {
    YarnName: 'speak',
    Language: 'text',
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
    YarnName: 'stopAnimation',
    Parameters: [{ Name: 'character', Type: 'string' }]
  },
  {
    YarnName: 'stopSound',
    Parameters: [
      { Name: 'sound ID', Type: 'string' },
      { Name: 'immediate', Type: 'bool', DefaultValue: 'true' }
    ]
  },
  {
    YarnName: 'textAboveHead',
    Parameters: [
      { Name: 'character', Type: 'string' },
      { Name: 'text', Type: 'string' }
    ]
  },
  {
    YarnName: 'shake',
    Parameters: [
      { Name: 'character', Type: 'string' },
      { Name: 'duration', Type: 'number' }
    ]
  },
  {
    YarnName: 'animate',
    Language: 'text',
    Parameters: [
      { Name: 'character', Type: 'string' },
      { Name: 'flipX', Type: 'bool' },
      { Name: 'loop', Type: 'bool' },
      { Name: 'duration', Type: 'number' },
      { Name: 'frames', Type: 'number', IsParamsArray: true }
    ]
  },
  {
    YarnName: 'warp',
    Parameters: [
      { Name: 'character', Type: 'string' },
      { Name: 'x', Type: 'number' },
      { Name: 'y', Type: 'number' },
      { Name: 'continue', Type: 'bool', DefaultValue: 'false' }
    ]
  },
  {
    YarnName: 'changePortrait',
    Parameters: [
      { Name: 'character', Type: 'string' },
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
      { Name: 'character', Type: 'string' },
      {
        Name: 'sprite',
        Type: 'string',
        DefaultValue: 'void',
        Documentation: 'Overworld sprite to use; empty to reset.'
      }
    ]
  },
  {
    YarnName: 'move',
    Parameters: [
      { Name: 'character', Type: 'string' },
      { Name: 'x', Type: 'number' },
      { Name: 'y', Type: 'number' },
      { Name: 'd', Type: 'number' }
    ]
  },
  {
    YarnName: 'positionOffset',
    Parameters: [
      { Name: 'character', Type: 'string' },
      { Name: 'x', Type: 'number' },
      { Name: 'y', Type: 'number' },
      {
        Name: 'continue',
        Type: 'bool',
        DefaultValue: 'false',
        Documentation: "Pause the event while the NPC's position is being offset."
      }
    ]
  },
  {
    YarnName: 'faceDirection',
    Parameters: [
      { Name: 'character', Type: 'string' },
      { Name: 'direction', Type: 'number' },
      {
        Name: 'continue',
        Type: 'bool',
        DefaultValue: 'false',
        Documentation: "Pause the event while the NPC's position is being offset."
      }
    ]
  },
  {
    YarnName: 'screenFlash',
    Parameters: [{ Name: 'count', Type: 'number' }]
  },
  { YarnName: 'beginSimultaneousCommand', Parameters: [] },
  { YarnName: 'endSimultaneousCommand', Parameters: [] }
];

export const functions: YSLSFunction[] = [
  {
    YarnName: 'Random',
    DefinitionName: 'Random',
    ReturnType: 'bool',
    Language: 'text',
    Parameters: [
      { Name: 'chance', Type: 'number', Documentation: 'decimal' },
      { Name: 'addDailyLuck', Type: 'bool', DefaultValue: 'false' }
    ]
  },
  {
    YarnName: 'PlayerVisitedLocation',
    DefinitionName: 'PlayerVisitedLocation',
    ReturnType: 'bool',
    Language: 'text',
    Parameters: [{ Name: 'Location', Type: 'string' }]
  },
  {
    YarnName: 'DayOfMonth',
    DefinitionName: 'DayOfMonth',
    ReturnType: 'bool',
    Language: 'text',
    Parameters: [{ Name: 'Day', Type: 'number', Documentation: '1-indexed.', IsParamsArray: true }]
  },
  {
    YarnName: 'DaysPlayed',
    DefinitionName: 'DaysPlayed',
    ReturnType: 'bool',
    Language: 'text',
    Parameters: [
      { Name: 'min', Type: 'number' },
      { Name: 'max', Type: 'number', DefaultValue: '(unlimited)' }
    ]
  },
  {
    YarnName: 'IsPassiveFestivalOpen',
    DefinitionName: 'IsPassiveFestivalOpen',
    ReturnType: 'bool',
    Language: 'text',
    Parameters: [{ Name: 'id', Type: 'string' }]
  },
  {
    YarnName: 'IsPassiveFestivalToday',
    DefinitionName: 'IsPassiveFestivalToday',
    ReturnType: 'bool',
    Language: 'text',
    Parameters: [{ Name: 'id', Type: 'string' }]
  },
  {
    YarnName: 'PlayerFriendshipPoints',
    DefinitionName: 'PlayerFriendshipPoints',
    ReturnType: 'bool',
    Language: 'text',
    Parameters: [
      { Name: 'player', Type: 'string' },
      { Name: 'npc', Type: 'string' },
      { Name: 'minPoints', Type: 'number' },
      { Name: 'maxPoints', Type: 'number', DefaultValue: 'null' }
    ]
  }
];
