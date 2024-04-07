export type StringOrURI = string | Spicetify.URI;
export type StringOrURIArrayable = StringOrURI | StringOrURI[];
export type SpicetifyURIType = (typeof Spicetify.URI.Type)[keyof typeof Spicetify.URI.Type];

/**
 * Coerces the input into a Spicetify URI.
 *
 * @param uri - The input to be coerced into a Spicetify URI.
 * @returns The coerced Spicetify URI.
 * @throws {Error} if the input is an invalid URI.
 */
export function coerceIntoURI(uri: StringOrURI): Spicetify.URI;
export function coerceIntoURI(uri: any): never;
export function coerceIntoURI(uri: any): Spicetify.URI | never {
	const coercedURI = typeof uri === "string" ? Spicetify.URI.from(uri) : uri;
	if (coercedURI === null) {
		throw new Error("Invalid URI");
	}

	return coercedURI;
}

/**
 * Coerces the input into an array of Spicetify.URI objects.
 * If the input is not an array, it will be wrapped in an array.
 *
 * @param uris - The input to be coerced into an array of Spicetify.URI objects.
 * @returns An array of Spicetify.URI objects.
 * @throws {Error} If the input is not an array or cannot be coerced into a Spicetify.URI object.
 */
export function coerceIntoURIArray(uris: StringOrURIArrayable): Spicetify.URI[];
export function coerceIntoURIArray(uris: any): never;
export function coerceIntoURIArray(uris: any): Spicetify.URI[] | never {
	if (!Array.isArray(uris)) {
		uris = [uris];
	}

	return uris.map(coerceIntoURI);
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
export function assertURIType(uri: StringOrURI, validType: SpicetifyURIType | Iterable<SpicetifyURIType>): Spicetify.URI;
export function assertURIType(uri: any, validType: SpicetifyURIType | Iterable<SpicetifyURIType>): never;
export function assertURIType(uri: any, validType: SpicetifyURIType | Iterable<SpicetifyURIType>): Spicetify.URI | never {
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
export function assertURIArrayType(URIArray: StringOrURI[], validType: Parameters<typeof assertURIType>[1]): Spicetify.URI[];
export function assertURIArrayType(URIArray: any, validType: Parameters<typeof assertURIType>[1]): never;
export function assertURIArrayType(URIArray: any[], validType: Parameters<typeof assertURIType>[1]): Spicetify.URI[] | never {
	if (!Array.isArray(URIArray)) {
		throw new Error("Object is not an array");
	}

	URIArray.forEach((uri) => assertURIType(uri, validType));

	return URIArray;
}
