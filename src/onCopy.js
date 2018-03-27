// @flow

import { type Change, type Editor } from 'slate';
import { cloneFragment } from 'slate-react';

function onCopy(opts) {
    return (
        event: SyntheticClipboardEvent<*>,
        change: Change,
        editor: Editor
    ): ?true => {
        const { value } = change;
        const { document, selection } = value;
        const fragment = opts.getFragment(document, selection);
        if (!fragment) return undefined;
        cloneFragment(event, value, fragment);
        return true;
    };
}
export default onCopy;
