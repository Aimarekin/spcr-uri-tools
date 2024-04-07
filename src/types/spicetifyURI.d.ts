declare namespace Spicetify {
	/**
	 * Set of APIs method to parse and validate URIs.
	 */
	class URI {
		constructor(type: string, props: any);
		public type: string;
		public hasBase62Id: boolean;

		public id?: string;
		public disc?: any;
		public args?: any;
		public category?: string;
		public username?: string;
		public track?: string;
		public artist?: string;
		public album?: string;
		public duration?: number;
		public query?: string;
		public country?: string;
		public global?: boolean;
		public context?: string | typeof URI | null;
		public anchor?: string;
		public play?: any;
		public toplist?: any;

		/**
		 *
		 * @return The URI representation of this uri.
		 */
		toURI(): string;

		/**
		 *
		 * @return The URI representation of this uri.
		 */
		toString(): string;

		/**
		 * Get the URL path of this uri.
		 *
		 * @param opt_leadingSlash True if a leading slash should be prepended.
		 * @return The path of this uri.
		 */
		toURLPath(opt_leadingSlash: boolean): string;

		/**
		 *
		 * @param origin The origin to use for the URL.
		 * @return The URL string for the uri.
		 */
		toURL(origin?: string): string;

		/**
		 * Clones a given SpotifyURI instance.
		 *
		 * @return An instance of URI.
		 */
		clone(): URI | null;

		/**
		 * Gets the path of the URI object by removing all hash and query parameters.
		 *
		 * @return The path of the URI object.
		 */
		getPath(): string;

		/**
		 * The various URI Types.
		 *
		 * Note that some of the types in this enum are not real URI types, but are
		 * actually URI particles. They are marked so.
		 *
		 */
		static Type: {
			AD: string;
			ALBUM: string;
			GENRE: string;
			QUEUE: string;
			APPLICATION: string;
			ARTIST: string;
			ARTIST_TOPLIST: string;
			ARTIST_CONCERTS: string;
			AUDIO_FILE: string;
			COLLECTION: string;
			COLLECTION_ALBUM: string;
			COLLECTION_ARTIST: string;
			COLLECTION_MISSING_ALBUM: string;
			COLLECTION_TRACK_LIST: string;
			CONCERT: string;
			CONTEXT_GROUP: string;
			DAILY_MIX: string;
			EMPTY: string;
			EPISODE: string;
			/** URI particle; not an actual URI. */
			FACEBOOK: string;
			FOLDER: string;
			FOLLOWERS: string;
			FOLLOWING: string;
			IMAGE: string;
			INBOX: string;
			INTERRUPTION: string;
			LIBRARY: string;
			LIVE: string;
			ROOM: string;
			EXPRESSION: string;
			LOCAL: string;
			LOCAL_TRACK: string;
			LOCAL_ALBUM: string;
			LOCAL_ARTIST: string;
			MERCH: string;
			MOSAIC: string;
			PLAYLIST: string;
			PLAYLIST_V2: string;
			PRERELEASE: string;
			PROFILE: string;
			PUBLISHED_ROOTLIST: string;
			RADIO: string;
			ROOTLIST: string;
			SEARCH: string;
			SHOW: string;
			SOCIAL_SESSION: string;
			SPECIAL: string;
			STARRED: string;
			STATION: string;
			TEMP_PLAYLIST: string;
			TOPLIST: string;
			TRACK: string;
			TRACKSET: string;
			USER_TOPLIST: string;
			USER_TOP_TRACKS: string;
			UNKNOWN: string;
			MEDIA: string;
			QUESTION: string;
			POLL: string;
		};

		/**
		 * Creates a new URI object from a parsed string argument.
		 *
		 * @param str The string that will be parsed into a URI object.
		 * @throws TypeError If the string argument is not a valid URI, a TypeError will
		 *     be thrown.
		 * @return The parsed URI object.
		 */
		static fromString(str: string): URI;

		/**
		 * Parses a given object into a URI instance.
		 *
		 * Unlike URI.fromString, this function could receive any kind of value. If
		 * the value is already a URI instance, it is simply returned.
		 * Otherwise the value will be stringified before parsing.
		 *
		 * This function also does not throw an error like URI.fromString, but
		 * instead simply returns null if it can't parse the value.
		 *
		 * @param value The value to parse.
		 * @return The corresponding URI instance, or null if the
		 *     passed value is not a valid value.
		 */
		static from(value: any): URI | null;

		/**
		 * Checks whether two URI:s refer to the same thing even though they might
		 * not necessarily be equal.
		 *
		 * These two Playlist URIs, for example, refer to the same playlist:
		 *
		 *   spotify:user:napstersean:playlist:3vxotOnOGDlZXyzJPLFnm2
		 *   spotify:playlist:3vxotOnOGDlZXyzJPLFnm2
		 *
		 * @param baseUri The first URI to compare.
		 * @param refUri The second URI to compare.
		 * @return Whether they shared idenitity
		 */
		static isSameIdentity(baseUri: URI | string, refUri: URI | string): boolean;

		/**
		 * Returns the hex representation of a Base62 encoded id.
		 *
		 * @param id The base62 encoded id.
		 * @return The hex representation of the base62 id.
		 */
		static idToHex(id: string): string;

		/**
		 * Returns the base62 representation of a hex encoded id.
		 *
		 * @param hex The hex encoded id.
		 * @return The base62 representation of the id.
		 */
		static hexToId(hex: string): string;

		/**
		 * Creates a new 'album' type URI.
		 *
		 * @param id The id of the album.
		 * @param disc The disc number of the album.
		 * @return The album URI.
		 */
		static albumURI(id: string, disc: number): URI;

		/**
		 * Creates a new 'application' type URI.
		 *
		 * @param id The id of the application.
		 * @param args An array containing the arguments to the app.
		 * @return The application URI.
		 */
		static applicationURI(id: string, args: string[]): URI;

		/**
		 * Creates a new 'artist' type URI.
		 *
		 * @param id The id of the artist.
		 * @return The artist URI.
		 */
		static artistURI(id: string): URI;

		/**
		 * Creates a new 'collection' type URI.
		 *
		 * @param username The non-canonical username of the rootlist owner.
		 * @param category The category of the collection.
		 * @return The collection URI.
		 */
		static collectionURI(username: string, category: string): URI;

		/**
		 * Creates a new 'collection-album' type URI.
		 *
		 * @param username The non-canonical username of the rootlist owner.
		 * @param id The id of the album.
		 * @return The collection album URI.
		 */
		static collectionAlbumURI(username: string, id: string): URI;

		/**
		 * Creates a new 'collection-artist' type URI.
		 *
		 * @param username The non-canonical username of the rootlist owner.
		 * @param id The id of the artist.
		 * @return The collection artist URI.
		 */
		static collectionAlbumURI(username: string, id: string): URI;

		/**
		 * Creates a new 'concert' type URI.
		 *
		 * @param id The id of the concert.
		 * @return The concert URI.
		 */
		static concertURI(id: string): URI;

		/**
		 * Creates a new 'episode' type URI.
		 *
		 * @param id The id of the episode.
		 * @return The episode URI.
		 */
		static episodeURI(id: string): URI;

		/**
		 * Creates a new 'folder' type URI.
		 *
		 * @param id The id of the folder.
		 * @return The folder URI.
		 */
		static folderURI(id: string): URI;

		/**
		 * Creates a new 'local-album' type URI.
		 *
		 * @param artist The artist of the album.
		 * @param album The name of the album.
		 * @return The local album URI.
		 */
		static localAlbumURI(artist: string, album: string): URI;

		/**
		 * Creates a new 'local-artist' type URI.
		 *
		 * @param artist The name of the artist.
		 * @return The local artist URI.
		 */
		static localArtistURI(artist: string): URI;

		/**
		 * Creates a new 'playlist-v2' type URI.
		 *
		 * @param id The id of the playlist.
		 * @return The playlist URI.
		 */
		static playlistV2URI(id: string): URI;

		/**
		 * Creates a new 'prerelease' type URI.
		 *
		 * @param id The id of the prerelease.
		 * @return The prerelease URI.
		 */
		static prereleaseURI(id: string): URI;

		/**
		 * Creates a new 'profile' type URI.
		 *
		 * @param username The non-canonical username of the rootlist owner.
		 * @param args A list of arguments.
		 * @return The profile URI.
		 */
		static profileURI(username: string, args: string[]): URI;

		/**
		 * Creates a new 'search' type URI.
		 *
		 * @param query The unencoded search query.
		 * @return The search URI
		 */
		static searchURI(query: string): URI;

		/**
		 * Creates a new 'show' type URI.
		 *
		 * @param id The id of the show.
		 * @return The show URI.
		 */
		static showURI(id: string): URI;

		/**
		 * Creates a new 'station' type URI.
		 *
		 * @param args An array of arguments for the station.
		 * @return The station URI.
		 */
		static stationURI(args: string[]): URI;

		/**
		 * Creates a new 'track' type URI.
		 *
		 * @param id The id of the track.
		 * @param anchor The point in the track formatted as mm:ss
		 * @param context An optional context URI
		 * @param play Toggles autoplay
		 * @return The track URI.
		 */
		static trackURI(id: string, anchor: string, context?: string, play?: boolean): URI;

		/**
		 * Creates a new 'user-toplist' type URI.
		 *
		 * @param username The non-canonical username of the toplist owner.
		 * @param toplist The toplist type.
		 * @return The user-toplist URI.
		 */
		static userToplistURI(username: string, toplist: string): URI;

		static isAd(uri: URI | string): boolean;
		static isAlbum(uri: URI | string): boolean;
		static isGenre(uri: URI | string): boolean;
		static isQueue(uri: URI | string): boolean;
		static isApplication(uri: URI | string): boolean;
		static isArtist(uri: URI | string): boolean;
		static isArtistToplist(uri: URI | string): boolean;
		static isArtistConcerts(uri: URI | string): boolean;
		static isAudioFile(uri: URI | string): boolean;
		static isCollection(uri: URI | string): boolean;
		static isCollectionAlbum(uri: URI | string): boolean;
		static isCollectionArtist(uri: URI | string): boolean;
		static isCollectionMissingAlbum(uri: URI | string): boolean;
		static isCollectionTrackList(uri: URI | string): boolean;
		static isConcert(uri: URI | string): boolean;
		static isContextGroup(uri: URI | string): boolean;
		static isDailyMix(uri: URI | string): boolean;
		static isEmpty(uri: URI | string): boolean;
		static isEpisode(uri: URI | string): boolean;
		static isFacebook(uri: URI | string): boolean;
		static isFolder(uri: URI | string): boolean;
		static isFollowers(uri: URI | string): boolean;
		static isFollowing(uri: URI | string): boolean;
		static isImage(uri: URI | string): boolean;
		static isInbox(uri: URI | string): boolean;
		static isInterruption(uri: URI | string): boolean;
		static isLibrary(uri: URI | string): boolean;
		static isLive(uri: URI | string): boolean;
		static isRoom(uri: URI | string): boolean;
		static isExpression(uri: URI | string): boolean;
		static isLocal(uri: URI | string): boolean;
		static isLocalTrack(uri: URI | string): boolean;
		static isLocalAlbum(uri: URI | string): boolean;
		static isLocalArtist(uri: URI | string): boolean;
		static isMerch(uri: URI | string): boolean;
		static isMosaic(uri: URI | string): boolean;
		static isPlaylist(uri: URI | string): boolean;
		static isPlaylistV2(uri: URI | string): boolean;
		static isPrerelease(uri: URI | string): boolean;
		static isProfile(uri: URI | string): boolean;
		static isPublishedRootlist(uri: URI | string): boolean;
		static isRadio(uri: URI | string): boolean;
		static isRootlist(uri: URI | string): boolean;
		static isSearch(uri: URI | string): boolean;
		static isShow(uri: URI | string): boolean;
		static isSocialSession(uri: URI | string): boolean;
		static isSpecial(uri: URI | string): boolean;
		static isStarred(uri: URI | string): boolean;
		static isStation(uri: URI | string): boolean;
		static isTempPlaylist(uri: URI | string): boolean;
		static isToplist(uri: URI | string): boolean;
		static isTrack(uri: URI | string): boolean;
		static isTrackset(uri: URI | string): boolean;
		static isUserToplist(uri: URI | string): boolean;
		static isUserTopTracks(uri: URI | string): boolean;
		static isUnknown(uri: URI | string): boolean;
		static isMedia(uri: URI | string): boolean;
		static isQuestion(uri: URI | string): boolean;
		static isPoll(uri: URI | string): boolean;
		static isPlaylistV1OrV2(uri: URI | string): boolean;
	}
}
