import { deepFreeze, echo, isFunction } from './core-utils';
import { formatSize } from './size-utils';
import numeral from 'numeral';

const namedFormatter = deepFreeze({
    none: echo,
    size: formatSize,
    percentage: value => numeral(value).format('%')
});


export function getFormatter(format = 'none') {
    return isFunction(format) ? format : namedFormatter[format];
}
