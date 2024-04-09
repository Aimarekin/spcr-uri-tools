export type StringOrURI = string | Spicetify.URI;
export type StringOrURIArrayable = StringOrURI | StringOrURI[];
export type SpicetifyURIType = (typeof Spicetify.URI.Type)[keyof typeof Spicetify.URI.Type];

/**
 * Asserts that the input is an object that is/can be transformed into a Spicetify URI.
 *
 * @param uri - The input to be asserted as a Spicetify URI.
 * @returns The Spicetify URI.
 * @throws {Error} If the input is not a valid Spicetify URI.
 */
export function assertURI(uri: any): Spicetify.URI {
	uri = Spicetify.URI.from(uri);
	if (!(uri instanceof Spicetify.URI)) {
		throw new Error("Object is not a Spicetify.URI instance");
	}

	return uri;
}

/**
 * Asserts that the input is an array of objects that are/can be transformed into Spicetify URIs.
 * If the input is not an array, it will be converted into an array with a single element.
 *
 * @param uris - The input to be asserted as an array of Spicetify URIs or a single Spicetify URI.
 * @returns An array of Spicetify URIs.
 * @throws {Error} If the input is not a valid Spicetify URI.
 */
export function assertURIArray(uris: any): Spicetify.URI[] {
	if (!Array.isArray(uris)) {
		uris = [uris];
	}

	return uris.map((uri: any) => assertURI(uri));
}

/**
 * Asserts the type of a Spicetify URI object.
 *
 * @param uri - The Spicetify URI object to assert.
 * @param validType - The valid type(s) that the URI object should have.
 * @returns The input URI object if it has the expected type.
 * @throws {Error} If the input URI object is not a Spicetify.URI instance or if its type does not match the expected type(s).
 * @throws {Error} If validType is not a string, Set, or iterable.
 */
export function assertURIType(uri: any, validType: SpicetifyURIType | Iterable<SpicetifyURIType>): Spicetify.URI {
	if (!(uri instanceof Spicetify.URI)) {
		throw new Error("Object is not a Spicetify.URI instance");
	}

	if (typeof validType === "string") {
		if (uri.type !== validType) {
			throw new Error(`Invalid URI type. Expected ${validType}`);
		}
	} else if (validType instanceof Set) {
		if (!validType.has(uri.type)) {
			throw new Error(`Invalid URI type. Expected one of ${Array.from(validType).join(", ")}`);
		}
	} else if (validType[Symbol.iterator] !== undefined) {
		for (const type of validType) {
			if (uri.type === type) {
				return uri;
			}
		}
		throw new Error(`Invalid URI type. Expected one of ${Array.from(validType).join(", ")}`);
	} else {
		throw new Error("Invalid validType. Must be a string, Set, or iterable.");
	}

	return uri;
}

/**
 * Asserts the type of a Spicetify URI object.
 *
 * @param uri - The array of Spicetify URI objects to assert.
 * @param validType - The valid type(s) that the URI object should have.
 * @returns The input object if it has the expected type.
 * @throws {Error} If input object is not an array with Spicetify.URI instances or if its type does not match the expected type(s).
 * @throws {Error} If validType is not a string, Set, or iterable.
 */
export function assertURIArrayType(URIArray: any[], validType: Parameters<typeof assertURIType>[1]): Spicetify.URI[] {
	if (!Array.isArray(URIArray)) {
		throw new Error("Object is not an array");
	}

	return URIArray.map((uri) => assertURIType(uri, validType));
}
