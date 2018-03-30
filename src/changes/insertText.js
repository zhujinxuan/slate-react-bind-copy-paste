// @flow

import { type Set } from 'immutable';
import { type Change, type Mark } from 'slate';
import { type Option } from '../type';

type typeInsertText = (Change, string, marks?: Set<Mark>) => Change;
function insertText(opts: Option): typeInsertText {
    return (change: Change, text: string, marks?: Set<Mark>) => {
        const { value } = change;
        const { document, selection } = value;
        marks =
            marks ||
            selection.marks ||
            document.getInsertMarksAtRange(selection);

        change.insertTextByKey(value.startKey, value.startOffset, text, marks, {
            normalize: false
        });

        let range = selection.isBackward ? selection.flip() : selection;
        if (value.endKey === value.startkey)
            range = range.moveFocus(text.length);
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
    };
}

export default insertText;
export type { typeInsertText };
