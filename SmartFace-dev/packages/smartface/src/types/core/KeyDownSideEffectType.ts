import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../types/SmartFaceComponent';
import type { SfEventType } from '../shared/SfEventTypes';

type ModifierType = {
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
};

type ShortcutType = {
  key: string;
} & ModifierType;

type KeyDownSideEffectPropsType = {
  onKeyDown: SfEventType;
  shortcut: ShortcutType;
};

export type KeyDownSideEffectBackendType = SmartFaceBackendComponent<'KeyDown', KeyDownSideEffectPropsType>;

export type KeyDownSideEffectAdapterPropsType = SmartFaceAdapterPropsType<KeyDownSideEffectBackendType>;
