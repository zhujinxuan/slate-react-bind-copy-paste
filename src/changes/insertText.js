// @flow

import { type Set } from 'immutable';
import type Debug from 'debug';
import { type Change, type Mark } from 'slate';
import { type Option } from '../type';

type typeInsertText = (Change, string, marks?: Set<Mark>) => Change;
function insertText(opts: Option, debug: Debug): typeInsertText {
    return (change: Change, text: string, marks?: Set<Mark>) => {
        const { value } = change;
        const { document, selection } = value;
        marks =
            marks ||
            selection.marks ||
            document.getInsertMarksAtRange(selection);

        debug('insertText', { change, text, marks });
        change.insertTextByKey(value.startKey, value.startOffset, text, marks, {
            normalize: false
        });

        let range = selection.isBackward ? selection.flip() : selection;
        if (range.anchorKey === range.focusKey) {
            range = range.moveFocus(text.length);
        }
        range = range.moveAnchor(text.length);

        if (!range.isCollapsed) {
            opts.deleteAtRange(change, range, {
                snapshot: true,
                normalize: false
            });
        }

        if (!selection.isCollapsed) {
            change.normalize();
        }
        // If the text was successfully inserted, and the selection had marks on it,
        // unset the selection's marks.
        if (selection.marks && document != change.value.document) {
            change.select({ marks: null });
        }
        return change.collapseToEnd();
    };
}

export default insertText;
export type { typeInsertText };
