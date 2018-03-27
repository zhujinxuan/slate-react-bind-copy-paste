// @flow

import { type Change, type Editor } from 'slate';
import { getEventTransfer } from 'slate-react';

function onCopy(opts, changes) {
    return (
        event: SyntheticClipboardEvent<*>,
        change: Change,
        editor: Editor
    ): ?true => {
        const { htmlSerializer } = opts;
        const transfer = getEventTransfer(event);
        if (transfer.type === 'text') {
            const { text } = transfer;
            changes.insertText(change, text);
            return true;
        }
        let fragment;
        if (transfer.type === 'fragment') {
            fragment = transfer.fragment;
        } else if (htmlSerializer && transfer.type === 'html') {
            fragment = htmlSerializer.deserialize(transfer.html);
        }
        if (!fragment) return undefined;
        changes.insertFragment(change, fragment);
        return true;
    };
}

export default onCopy;
