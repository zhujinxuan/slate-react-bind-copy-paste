// @flow

import { type Set } from 'immutable';
import { type Change, type Mark } from 'slate';

function insertText(opts) {
    return (change: Change, text: string, marks?: Set<Mark>) => {
        const { value } = change;
        const { document, selection } = value;
        marks =
            marks ||
            selection.marks ||
            document.getInsertMarksAtRange(selection);
        if (!selection.isCollapsed) {
            opts.deleteAtRange(change, change.value.selection, {
                snapshot: true,
                normalize: false
            });
        }
        change.collapseToStart();
        change.insertTextAtRange(change.value.selection, text, marks, {
            normalize: false
        });
        // change.select(selection.collapseToStart().move(text.length));
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
