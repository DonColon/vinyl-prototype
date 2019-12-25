const obiectum = {

    equals(value = null, other = null) {
        if (value === other) {
            return true;
        }

        if (value === null || other === null) {
            return false;
        }

        if (typeof value !== 'object' && typeof other !== 'object') {
            return value === other;
        }

        const valueKeys = Object.keys(value);
        const otherKeys = Object.keys(other);

        if (valueKeys.length !== otherKeys.length) {
            return false;
        }

        return valueKeys.every((key) => this.equals(value[key], other[key]));
    },

    freeze(value = {}) {
        const object = value;

        for (const key of Object.keys(value)) {
            if (value[key] instanceof Object) {
                object[key] = this.freeze(value[key]);
            }
        }

        return Object.freeze(object);
    },

    merge(target = {}, ...sources) {
        const object = target;

        if (this.isMergeableObject(target)) {
            for (const source of sources) {
                if (this.isMergeableObject(source)) {
                    for (const key of Object.keys(source)) {
                        object[key] = (target[key] instanceof Object && source[key] instanceof Object)
                            ? this.merge(target[key], source[key])
                            : source[key];
                    }
                }
            }
        }

        return target;
    },

    navigate(value = {}, path = '') {
        return path.split('/').reduce((previousValue, currentValue) => previousValue && previousValue[currentValue], value);
    },

    select(value = {}, ...selectedKeys) {
        const result = {};

        for (const key of selectedKeys) {
            if (this.has(value, key)) {
                result[key] = value[key];
            }
        }

        return result;
    },


    values(value = {}, sorted = false) {
        const values = [];

        const valueKeys = this.keys(value, sorted);

        for (const key of valueKeys) {
            values.push(value[key]);
        }

        return values;
    },

    keys(value = {}, sorted = false) {
        const valueKeys = Object.keys(value);
        if (sorted) valueKeys.sort();
        return valueKeys;
    },

    has(value = {}, key = '') {
        const valueKeys = Object.keys(value);
        return valueKeys.indexOf(key) !== -1;
    },

    size(value = {}) {
        return Object.keys(value).length;
    },


    isMergeableObject(value) {
        const nonNullObject = value && typeof value === 'object';

        return nonNullObject
            && Object.prototype.toString.call(value) !== '[object RegExp]'
            && Object.prototype.toString.call(value) !== '[object Date]';
    },

    isObject(value) {
        return typeof value === 'object';
    },

    isString(value) {
        return typeof value === 'string';
    },

    isNumber(value) {
        return typeof value === 'number';
    },

    isUndefined(value) {
        return typeof value === 'undefined';
    },

};

export default Object.freeze(obiectum);
