// @flow
import { type Changes } from './changes/index';
import { type Option } from './type';
import type Debug from 'debug';

export default function onBeforeInput(
    opts: Option,
    changes: Changes,
    debug: Debug
) {
    return (
        event: SyntheticInputEvent<*>,
        change: Change,
        editor: Editor
    ): ?true => {
        debug('onBeforeInput', event);
        event.preventDefault();
        changes.insertText(event.data);
        return true;
    };
}
