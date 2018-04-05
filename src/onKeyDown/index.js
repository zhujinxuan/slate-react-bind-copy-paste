// @flow
import isHotKey from 'is-hotkey';
import Debug from 'debug';
import { type Change, type Editor } from 'slate';
import { type Option } from '../type';
import { type Changes } from '../changes/index';

const HOTKEYS = {
    SPLITBLOCK: (event: SyntheticKeyBoardEvent<*>) => isHotKey('enter', event),
    DELETE: (event: SyntheticKeyBoardEvent<*>) => isHotKey('backspace', event)
};

const debug = new Debug('slate:event:customized');

export default function onKeyDown(opts: Option, changes: Changes) {
    return (
        event: SyntheticKeyBoardEvent<*>,
        change: Change,
        editor: Editor
    ): ?true => {
        debug('onKeyDown', { event });
        if (HOTKEYS.SPLITBLOCK(event)) {
            changes.splitBlock(change);
            return true;
        }
        if (HOTKEYS.DELETE(event)) {
            changes.delete(change);
            return true;
        }
        return undefined;
    };
}
