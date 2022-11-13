declare module "@orbisclub/modules";
declare module "@orbisclub/orbis-sdk" {
  export class Orbis {
    /**
     * Initialize the SDK by connecting to a Ceramic node, developers can pass their own Ceramic object if the user is
     * already connected within their application
     */
    constructor(options?: any);
    /** Initiate some values for the class */
    ceramic: any;
    session: any;
    api: any;
    /** The connect function will connect to an EVM wallet and create or connect to a Ceramic did */
    connect(
      provider: any,
      lit?: boolean
    ): Promise<
      | false
      | {
          status: number;
          error: any;
          result: string;
          did?: undefined;
          details?: undefined;
        }
      | {
          status: number;
          did: any;
          details: any;
          result: string;
          error?: undefined;
        }
    >;
    /** Automatically reconnects to a session stored in localStorage, returns false if there isn't any session in localStorage */
    isConnected(): Promise<
      | false
      | {
          status: number;
          did: any;
          details: any;
          result: string;
        }
    >;
    /** Connect to Lit only (usually in the case the lit signature wasn't generated in the first place) */
    connectLit(
      provider: any,
      address: any
    ): Promise<
      | {
          status: number;
          result: string;
          error?: undefined;
        }
      | {
          status: number;
          error: any;
          result: string;
        }
    >;
    /** Test function to check the status of the Solana provider */
    testConnectSolana(): Promise<
      | {
          status: number;
          error: any;
          result: string;
          did?: undefined;
          details?: undefined;
        }
      | {
          status: number;
          did: any;
          details: any;
          result: string;
          error?: undefined;
        }
    >;
    /** Destroys the Ceramic session string stored in localStorage */
    logout():
      | {
          status: number;
          result: string;
          error?: undefined;
        }
      | {
          status: number;
          error: any;
          result: string;
        };
    /** Authenticate a did with a seed */
    connectWithSeed(seed: any): Promise<{
      status: number;
      did: any;
      details: any;
      result: string;
    }>;
    /** Update user profile */
    updateProfile(content: any): Promise<
      | {
          status: number;
          doc: any;
          result: string;
          error?: undefined;
        }
      | {
          status: number;
          error: any;
          result: string;
          doc?: undefined;
        }
    >;
    /** Save the last read time for notifications for the connected user */
    setNotificationsReadTime(
      type: any,
      timestamp: any,
      context?: any
    ): Promise<
      | {
          status: number;
          doc: any;
          result: string;
          error?: undefined;
        }
      | {
          status: number;
          error: any;
          result: string;
          doc?: undefined;
        }
    >;
    /** Connected users can share a new post following our schemas */
    createPost(
      content: any,
      encryptionRules?: any
    ): Promise<
      | {
          status: number;
          doc: any;
          result: string;
          error?: undefined;
        }
      | {
          status: number;
          error: any;
          result: string;
          doc?: undefined;
        }
      | {
          status: number;
          result: string;
        }
    >;
    /** Connected users can edit their post */
    editPost(
      stream_id: any,
      content: any,
      encryptionRules?: any
    ): Promise<
      | {
          status: number;
          doc: any;
          result: string;
          error?: undefined;
        }
      | {
          status: number;
          result: string;
          error?: undefined;
        }
      | {
          status: number;
          error: any;
          result: string;
        }
    >;
    /** Users can delete one of their post */
    deletePost(stream_id: any): Promise<
      | {
          status: number;
          doc: any;
          result: string;
          error?: undefined;
        }
      | {
          status: number;
          error: any;
          result: string;
          doc?: undefined;
        }
    >;
    /** Connected users can react to an existing post */
    react(
      post_id: any,
      type: any
    ): Promise<
      | {
          status: number;
          doc: any;
          result: string;
          error?: undefined;
        }
      | {
          status: number;
          error: any;
          result: string;
          doc?: undefined;
        }
      | {
          status: number;
          result: string;
        }
    >;
    /** Users can create or update a new group which can be used as a context when sharing posts */
    createGroup(content: any): Promise<
      | {
          status: number;
          doc: any;
          result: string;
          error?: undefined;
        }
      | {
          status: number;
          error: any;
          result: string;
          doc?: undefined;
        }
      | {
          status: number;
          group_id: any;
          result: string;
        }
    >;
    /** Users can create a channel in a group */
    createChannel(
      group_id: any,
      content: any
    ): Promise<
      | {
          status: number;
          doc: any;
          result: string;
          error?: undefined;
        }
      | {
          status: number;
          error: any;
          result: string;
          doc?: undefined;
        }
      | {
          status: number;
          result: string;
        }
    >;
    /** User can update a channel */
    updateChannel(
      channel_id: any,
      content: any
    ): Promise<
      | {
          status: number;
          doc: any;
          result: string;
          error?: undefined;
        }
      | {
          status: number;
          error: any;
          result: string;
          doc?: undefined;
        }
      | {
          status: number;
          result: string;
        }
    >;
    /** Users can join or leave groups using this function */
    setGroupMember(
      group_id: any,
      active?: boolean
    ): Promise<
      | {
          status: number;
          doc: any;
          result: string;
          error?: undefined;
        }
      | {
          status: number;
          error: any;
          result: string;
          doc?: undefined;
        }
      | {
          status: number;
          result: string;
        }
    >;
    /** Users can follow other users */
    setFollow(
      did: any,
      active?: boolean
    ): Promise<
      | {
          status: number;
          doc: any;
          result: string;
          error?: undefined;
        }
      | {
          status: number;
          error: any;
          result: string;
          doc?: undefined;
        }
      | {
          status: number;
          result: string;
        }
    >;
    /** User can update a group */
    updateGroup(
      stream_id: any,
      content: any
    ): Promise<
      | {
          status: number;
          doc: any;
          result: string;
          error?: undefined;
        }
      | {
          status: number;
          error: any;
          result: string;
          doc?: undefined;
        }
      | {
          status: number;
          result: string;
        }
    >;
    /** Update a post */
    updatePost(stream_id: any, body: any): Promise<void>;
    /** Create a new conversation */
    createConversation(content: any): Promise<
      | {
          status: number;
          doc: any;
          result: string;
          error?: undefined;
        }
      | {
          status: number;
          error: any;
          result: string;
          doc?: undefined;
        }
    >;
    /** Send a direct message in a conversation */
    sendMessage(content: any): Promise<
      | {
          status: number;
          doc: any;
          result: string;
          error?: undefined;
        }
      | {
          status: number;
          error: any;
          result: string;
          doc?: undefined;
        }
      | {
          status: number;
          result: string;
        }
    >;
    /** Decrypt an encrypted post using Lit Protocol */
    decryptPost(content: any): Promise<{
      status: number;
      result: any;
    }>;
    /** Decrypt a direct message using Lit Protocol */
    decryptMessage(content: any): Promise<{
      status: number;
      result: any;
    }>;
    /** NOT AVAILABLE FOR NOW: Users can create or update a new context such as a group or a channel within a group to organize the posts being shared */
    createContext(): Promise<void>;
    updateContext(): Promise<void>;
    /***********************
     *** CERAMIC HELPERS ***
     **********************/
    /** Helper to create a basic TileDocument on Ceramic */
    createTileDocument(
      content: any,
      tags: any,
      schema: any,
      family?: string
    ): Promise<
      | {
          status: number;
          doc: any;
          result: string;
          error?: undefined;
        }
      | {
          status: number;
          error: any;
          result: string;
          doc?: undefined;
        }
    >;
    /** Helper to update an existing TileDocument */
    updateTileDocument(
      stream_id: any,
      content: any,
      tags: any,
      schema: any,
      family?: string
    ): Promise<
      | {
          status: number;
          doc: any;
          result: string;
          error?: undefined;
        }
      | {
          status: number;
          error: any;
          result: string;
          doc?: undefined;
        }
    >;
    /** Helper to create a deterministic TileDocument on Ceramic */
    deterministicDocument(
      content: any,
      tags: any,
      schema: any,
      family?: string
    ): Promise<
      | {
          status: number;
          doc: any;
          result: string;
          error?: undefined;
        }
      | {
          status: number;
          error: any;
          result: string;
          doc?: undefined;
        }
    >;
    /*******************
     *** API QUERIES ***
     ******************/
    /** Check if a user already has active dids with this wallet address and returns profile details if any */
    getDids(address: any): Promise<{
      data: any;
      error: any;
      status: any;
    }>;
    /**
     * Retrieve posts shared in a specific context or by a specific user
     * Returns an array of posts in the `data` field or an `error`.
     */
    getPosts(
      options: any,
      page?: number
    ): Promise<{
      data: any;
      error: any;
      status: any;
    }>;
    /** Get post details */
    getPost(post_id: any): Promise<{
      data: any;
      error: any;
      status: any;
    }>;
    /** Get user reaction for a post */
    getReaction(
      post_id: any,
      did: any
    ): Promise<{
      data: any;
      error: any;
      status: any;
    }>;
    /** Get groups */
    getGroups(): Promise<{
      data: any;
      error: any;
      status: any;
    }>;
    /** Get group details */
    getGroup(group_id: any): Promise<{
      data: any;
      error: any;
      status: any;
    }>;
    /** Get group details */
    getGroupMembers(group_id: any): Promise<{
      data: any;
      error: any;
      status: any;
    }>;
    /** Check if a user is a member of a group and returns a boolean */
    getIsGroupMember(
      group_id: any,
      did: any
    ): Promise<{
      data: boolean;
      error: any;
      status: any;
    }>;
    /** Get channel details */
    getChannel(channel_id: any): Promise<{
      data: any;
      error: any;
      status: any;
    }>;
    /** Get profile details */
    getProfile(did: any): Promise<{
      data: any;
      error: any;
      status: any;
    }>;
    /** Get profiles matching the usernames passed as a parameter */
    getProfilesByUsername(username: any): Promise<{
      data: any;
      error: any;
      status: any;
    }>;
    /** Get groups memberships for a profile */
    getProfileGroups(did: any): Promise<{
      data: any;
      error: any;
      status: any;
    }>;
    /** Get list of followers for a specific did */
    getProfileFollowers(did: any): Promise<{
      data: any;
      error: any;
      status: any;
    }>;
    /** Get list of users being followed by a specific did */
    getProfileFollowing(did: any): Promise<{
      data: any;
      error: any;
      status: any;
    }>;
    /** Check if a user is already following another user and returns a boolean */
    getIsFollowing(
      did_following: any,
      did_followed: any
    ): Promise<{
      data: boolean;
      error: any;
      status: any;
    }>;
    /** Retriev notifications based on the options passed as a parameter */
    getNotifications(options: any): Promise<{
      data: any;
      error: any;
      status: any;
    }>;
    /** Get conversationv2 details */
    getConversations(options: any): Promise<{
      data: any;
      error: any;
      status: any;
    }>;
    /** Get conversation details */
    getConversation(conversation_id: any): Promise<{
      data: any;
      error: any;
      status: any;
    }>;
    /** Get messages from one conversation */
    getMessages(
      conversation_id: any,
      page?: number
    ): Promise<{
      data: any;
      error: any;
      status: any;
    }>;
  }
}
/** Definition of the Orbis class powering the Orbis SDK */
