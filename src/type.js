// @flow
import { type Change, type Range, type Node, type Document } from 'slate';

type Option = {
    deleteAtRange: (Change, Range, ?Object) => Change,
    insertFragmentAtRange: (Change, Range, Document, ?Object) => Change,
    getFragmentAtRange: (Node, Range) => Document,
    htmlSerializer?: {
        serialize: Document => string,
        deserialize: string => Document
    }
};
export type { Option };
