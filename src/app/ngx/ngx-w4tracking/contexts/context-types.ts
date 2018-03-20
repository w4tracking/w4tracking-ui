import { ContextType } from './context-type';
export class ContextTypes {

  static readonly BUILTIN: Map<string, ContextType> = new Map<string, ContextType>([
    [
      'user',
      {
        name: 'User',
        icon: 'pficon pficon-user',
      } as ContextType
    ],
    [
      'company',
      {
        name: 'Company',
        icon: 'fa fa-cubes'
      } as ContextType
    ]
  ]);

}
