// This is a local (non-robust) polyfill that supports the `get()` function of FormData, if none.
// It's doing so by brutally modify the constructor, and just save the form on some attribute.

// Notice we're using `let` instead of `const` in many places, so it will be compatible with other legacy browsers.
// This is needed since the legacy polyfill sources are currently not being transformed to legacy browsers currently, see:
//  https://github.com/vitejs/vite/issues/10284

/** @typedef {FormData & { __local_polyfill_form: HTMLFormElement | undefined }} FormDataExtended */

if (!FormData.prototype.get) {
    let /* const */ originalConstructor = FormData.prototype.constructor;
    /**
     * 
     * @param {HTMLFormElement | undefined} form 
     */
    FormData.prototype.constructor = function (form) {
        originalConstructor(form);
        /** @type {FormDataExtended} */ (this).__local_polyfill_form = form;
    };

    FormData.prototype.get = function (name) {
        let /* const */ formExtended = /** @type {FormDataExtended} */ (this);
        let /* const */ form = formExtended.__local_polyfill_form;

        if (!form) {
            return null;
        }

        let /* const */ elements = form.elements;

        for (let i = 0; i < elements.length; ++i) {
            let /* const */ item = /** @type {HTMLInputElement} */ elements.item(i);
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