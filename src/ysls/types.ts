export interface YSLSData {
  Commands: YSLSCommand[];
  Functions: YSLSFunction[];
}

export interface YSLSParameter {
  Name: string;
  Type: string;
  DefaultValue?: string;
  IsParamsArray?: boolean;
  Documentation?: string;
}

export interface YSLSFunction {
  YarnName: string;
  Language?: string;
  DefinitionName: string;
  ReturnType: string;
  Documentation?: string;
  Parameters: YSLSParameter[];
}

export interface YSLSCommand {
  YarnName: string;
  Language?: string;
  DefinitionName?: string;
  Signature?: string;
  Documentation?: string;
  Parameters: YSLSParameter[];
}
