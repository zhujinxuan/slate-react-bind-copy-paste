// @flow

import type Debug from 'debug';
import { type Change } from 'slate';
import { type Option } from '../type';

type typeSplitBlock = Change => Change;
function splitBlock(opts: Option, debug: Debug): typeSplitBlock {
    return (change: Change) => {
        const { value } = change;
        const { document, selection } = value;
        const { startKey, endKey, startOffset, endOffset } = selection;
        debug('splitBlock');
        const node = document.getClosestBlock(startKey);
        change.splitDescendantsByKey(node.key, startKey, startOffset, {
            normalize: selection.isCollapsed
        });

        if (!selection.isCollapsed) {
            let range = selection.isBackward ? selection.flip() : selection;
            range = range.moveAnchorToStartOf(
                change.value.document.getNextBlock(node.key)
            );
            if (startKey === endKey) {
                range = range.moveFocusTo(
                    range.anchorKey,
                    endOffset - startOffset
                );
            }
            opts.deleteAtRange(change, range);
        }
        return change.collapseToEnd();
    };
}

export default splitBlock;
export type { typeSplitBlock };
