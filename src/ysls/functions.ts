import type { YSLSFunction } from './types';

const functions: YSLSFunction[] = [
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
    Parameters: [
      { Name: 'Day', Type: 'number', Documentation: '1-indexed.', IsParamsArray: true }
    ]
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

export default functions;
