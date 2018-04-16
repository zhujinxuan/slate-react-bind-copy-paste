// @flow
import { type Change, type Range, type Node, type Document } from 'slate';

type Option = {
    deleteAtRange: (Change, Range, ?Object) => Change,
    insertFragmentAtRange: (Change, Range, Document, ?Object) => Change,
    getFragmentAtRange: (Node, Range) => Document,
    htmlSerializer?: {
        deserialize: string => Document | Value
    }
};
export type { Option };
