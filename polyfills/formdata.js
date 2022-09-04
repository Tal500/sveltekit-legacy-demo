// This is a local (non-robust) polyfill that supports the `get()` function of FormData, if none.
// It's doing so by brutally modify the constructor, and just save the form on some attribute.

/** @typedef {FormData & { __local_polyfill_form: HTMLFormElement | undefined }} FormDataExtended */

if (!FormData.prototype.get) {
    const originalConstructor = FormData.prototype.constructor;
    /**
     * 
     * @param {HTMLFormElement | undefined} form 
     */
    FormData.prototype.constructor = function (form) {
        originalConstructor(form);
        /** @type {FormDataExtended} */ (this).__local_polyfill_form = form;
    };

    FormData.prototype.get = function (name) {
        const formExtended = /** @type {FormDataExtended} */ (this);
        const form = formExtended.__local_polyfill_form;

        if (!form) {
            return null;
        }

        const elements = form.elements;

        for (let i = 0; i < elements.length; ++i) {
            const item = /** @type {HTMLInputElement} */ elements.item(i);
            if (item.name === name) {
                return item.value;
            }
        }

        return null;
    };

    // TODO (if you want a more robust version):
    // * Read correctly the values of radio items.
    // * Define support for `set`, `append` and the rest of the "modern" properties in a similar fashion.
}

export {}